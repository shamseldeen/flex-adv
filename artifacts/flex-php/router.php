<?php
// خادم PHP المدمج - Router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// إزالة أي prefix معروف (Replit أو /public على cPanel)
$uri = preg_replace('#^/(flex-php|public)#', '', $uri);
if ($uri === '' || $uri === null) $uri = '/';

// إزالة trailing slash (ما عدا الجذر)
if ($uri !== '/' && str_ends_with($uri, '/')) {
    $uri = rtrim($uri, '/');
}

// ─── تقديم الملفات الثابتة من مجلد public/ ───
$staticFile = __DIR__ . '/public' . $uri;
$staticExt  = strtolower(pathinfo($staticFile, PATHINFO_EXTENSION));
if ($uri !== '/' && $staticExt !== 'php' && file_exists($staticFile) && !is_dir($staticFile)) {
    $ext = $staticExt;
    $mimes = [
        'css'  => 'text/css',
        'js'   => 'application/javascript',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif'  => 'image/gif',
        'webp' => 'image/webp',
        'svg'  => 'image/svg+xml',
        'ico'  => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2'=> 'font/woff2',
        'ttf'  => 'font/ttf',
        'json' => 'application/json',
        'pdf'  => 'application/pdf',
        'mp4'  => 'video/mp4',
        'webm' => 'video/webm',
    ];
    $mime = $mimes[$ext] ?? 'application/octet-stream';

    // Cache headers for assets
    if (in_array($ext, ['js','css'])) {
        // No caching for JS/CSS so updates take effect immediately
        header('Cache-Control: no-cache, must-revalidate');
    } elseif (in_array($ext, ['png','jpg','jpeg','gif','webp','svg','woff','woff2'])) {
        header('Cache-Control: public, max-age=86400');
    }
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . filesize($staticFile));
    readfile($staticFile);
    exit;
}

// ─── API routes ───
if (strpos($uri, '/api/') === 0) {
    $apiFile = __DIR__ . $uri . (pathinfo($uri, PATHINFO_EXTENSION) ? '' : '.php');
    if (file_exists($apiFile)) {
        require $apiFile;
        exit;
    }
    $apiFile2 = __DIR__ . '/api' . substr($uri, 4) . '.php';
    if (file_exists($apiFile2)) {
        require $apiFile2;
        exit;
    }
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
    exit;
}

// ─── Page routing ───
$routes = [
    '/'             => 'public/index.php',
    '/index.php'    => 'public/index.php',
    '/about'        => 'public/about.php',
    '/about.php'    => 'public/about.php',
    '/services'     => 'public/services.php',
    '/services.php' => 'public/services.php',
    '/gallery'      => 'public/gallery.php',
    '/gallery.php'  => 'public/gallery.php',
    '/portfolio'    => 'public/portfolio.php',
    '/portfolio.php'=> 'public/portfolio.php',
    '/contact'      => 'public/contact.php',
    '/contact.php'  => 'public/contact.php',
    '/img.php'      => 'public/img.php',
];

$file = $routes[$uri] ?? null;
if ($file && file_exists(__DIR__ . '/' . $file)) {
    require __DIR__ . '/' . $file;
} else {
    http_response_code(404);
    require __DIR__ . '/public/404.php';
}
