<?php
/**
 * Flex Image Resize & Compress Proxy
 * Usage: /img.php?src=/images/portfolio/xxx.jpg&w=800&h=600&q=82
 *
 * - Resizes + crops to exact w×h (smart center crop) or scales by width only
 * - AVIF (if browser + GD support) → WebP → PNG (transparent) → JPEG
 * - Persistent disk cache in img_cache/ (survives server restarts)
 * - ETag + 304 Not Modified support
 * - 1-year Cache-Control: immutable
 */

// ─── Parameters ────────────────────────────────────────────────────────────────
$src = $_GET['src'] ?? '';
$w   = max(0, min(4000, (int)($_GET['w'] ?? 0)));
$h   = max(0, min(4000, (int)($_GET['h'] ?? 0)));
$q   = max(5, min(100,  (int)($_GET['q'] ?? 82)));
// $_GET['v'] is a cache-buster param — intentionally ignored here

// ─── Security: only allow images from our own image directories ───────────────
if (!preg_match('#^/(images|assets/images)/[a-zA-Z0-9/_\-\.]+\.(jpg|jpeg|png|webp|gif|bmp)$#i', $src)) {
    http_response_code(400);
    header('Content-Type: text/plain');
    exit('Invalid source path.');
}

// Raise memory limit for large source images
@ini_set('memory_limit', '256M');

$filePath = __DIR__ . $src;
if (!is_file($filePath)) {
    http_response_code(404);
    header('Content-Type: text/plain');
    exit('Image not found.');
}

// ─── Format negotiation (AVIF → WebP → PNG/JPEG) ──────────────────────────────
$acceptHeader = $_SERVER['HTTP_ACCEPT'] ?? '';
$supportsAVIF = str_contains($acceptHeader, 'image/avif') && function_exists('imageavif');
$supportsWebP = str_contains($acceptHeader, 'image/webp');

// Detect if source is a PNG/GIF (may have transparency)
$srcExt = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
$isTransparentSrc = in_array($srcExt, ['png', 'gif', 'webp']);

if ($supportsAVIF) {
    $outputFmt  = 'avif';
    $outputMime = 'image/avif';
} elseif ($supportsWebP) {
    $outputFmt  = 'webp';
    $outputMime = 'image/webp';
} elseif ($isTransparentSrc) {
    // Preserve transparency for browsers without WebP/AVIF
    $outputFmt  = 'png';
    $outputMime = 'image/png';
} else {
    $outputFmt  = 'jpeg';
    $outputMime = 'image/jpeg';
}

// ─── Cache key & persistent path ─────────────────────────────────────────────
$mtime     = filemtime($filePath);
$cacheKey  = md5($src . '|' . $w . '|' . $h . '|' . $q . '|' . $outputFmt . '|' . $mtime);
$cacheDir  = __DIR__ . '/../img_cache/';   // persistent across server restarts
$cachePath = $cacheDir . $cacheKey . '.' . $outputFmt;

// ─── ETag for 304 Not Modified ────────────────────────────────────────────────
$etag = '"' . $cacheKey . '"';
header('ETag: ' . $etag);
header('Vary: Accept');
if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && $_SERVER['HTTP_IF_NONE_MATCH'] === $etag) {
    http_response_code(304);
    exit;
}

// ─── Serve from disk cache ────────────────────────────────────────────────────
if (is_file($cachePath)) {
    header('Content-Type: ' . $outputMime);
    header('Cache-Control: public, max-age=31536000, immutable');
    header('X-Img-Cache: HIT');
    header('Content-Length: ' . filesize($cachePath));
    readfile($cachePath);
    exit;
}

// ─── Load source image ────────────────────────────────────────────────────────
$imgInfo = @getimagesize($filePath);
if (!$imgInfo) {
    http_response_code(415);
    header('Content-Type: text/plain');
    exit('Unsupported image format.');
}
[$origW, $origH, $type] = $imgInfo;

$srcImg = match ($type) {
    IMAGETYPE_JPEG => @imagecreatefromjpeg($filePath),
    IMAGETYPE_PNG  => @imagecreatefrompng($filePath),
    IMAGETYPE_WEBP => @imagecreatefromwebp($filePath),
    IMAGETYPE_GIF  => @imagecreatefromgif($filePath),
    IMAGETYPE_BMP  => @imagecreatefrombmp($filePath),
    default        => null,
};

if (!$srcImg) {
    header('Content-Type: ' . image_type_to_mime_type($type));
    header('Cache-Control: public, max-age=86400');
    readfile($filePath);
    exit;
}

// ─── Calculate target dimensions ─────────────────────────────────────────────
if ($w > 0 && $h > 0) {
    $ratioSrc = $origW / $origH;
    $ratioDst = $w / $h;
    if ($ratioSrc > $ratioDst) {
        $cropH = $origH;
        $cropW = (int)round($origH * $ratioDst);
        $cropX = (int)(($origW - $cropW) / 2);
        $cropY = 0;
    } else {
        $cropW = $origW;
        $cropH = (int)round($origW / $ratioDst);
        $cropX = 0;
        $cropY = (int)(($origH - $cropH) / 3);
    }
    $dstW = $w; $dstH = $h;
} elseif ($w > 0) {
    if ($origW <= $w) { $dstW = $origW; $dstH = $origH; }
    else { $dstW = $w; $dstH = (int)round($origH * $w / $origW); }
    $cropW = $origW; $cropH = $origH; $cropX = 0; $cropY = 0;
} elseif ($h > 0) {
    if ($origH <= $h) { $dstW = $origW; $dstH = $origH; }
    else { $dstH = $h; $dstW = (int)round($origW * $h / $origH); }
    $cropW = $origW; $cropH = $origH; $cropX = 0; $cropY = 0;
} else {
    $dstW = $origW; $dstH = $origH;
    $cropW = $origW; $cropH = $origH; $cropX = 0; $cropY = 0;
}

// ─── Create destination canvas ────────────────────────────────────────────────
$dstImg = imagecreatetruecolor($dstW, $dstH);

// Always preserve alpha channel (needed for PNG/GIF and WebP/AVIF output)
imagealphablending($dstImg, false);
imagesavealpha($dstImg, true);
$transparent = imagecolorallocatealpha($dstImg, 0, 0, 0, 127);
imagefilledrectangle($dstImg, 0, 0, $dstW, $dstH, $transparent);

// For JPEG sources: fill with black background (no transparency)
if ($outputFmt === 'jpeg') {
    imagealphablending($dstImg, true);
    $black = imagecolorallocate($dstImg, 0, 0, 0);
    imagefilledrectangle($dstImg, 0, 0, $dstW, $dstH, $black);
}

imagecopyresampled($dstImg, $srcImg, 0, 0, $cropX, $cropY, $dstW, $dstH, $cropW, $cropH);
imagedestroy($srcImg);

// ─── Encode ───────────────────────────────────────────────────────────────────
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}

ob_start();
switch ($outputFmt) {
    case 'avif':
        imageavif($dstImg, null, $q);
        break;
    case 'webp':
        imagewebp($dstImg, null, $q);
        break;
    case 'png':
        // PNG compression 0-9; map quality (5-100) → compression (9-0)
        $pngQ = max(0, min(9, (int)round((100 - $q) * 9 / 95)));
        imagepng($dstImg, null, $pngQ);
        break;
    default:
        imageinterlace($dstImg, true); // Progressive JPEG
        imagejpeg($dstImg, null, $q);
}
$imgData = ob_get_clean();
imagedestroy($dstImg);

// ─── Save to persistent cache ─────────────────────────────────────────────────
file_put_contents($cachePath, $imgData);

// ─── Serve ────────────────────────────────────────────────────────────────────
header('Content-Type: ' . $outputMime);
header('Content-Length: ' . strlen($imgData));
header('Cache-Control: public, max-age=31536000, immutable');
header('X-Img-Cache: MISS');
header('X-Img-Src-Size: ' . $origW . 'x' . $origH . ' → ' . $dstW . 'x' . $dstH);
echo $imgData;
