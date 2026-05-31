<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// ─── Rate limiting — max 5 submissions per IP per 10 minutes ──────────────────
$ip       = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateDir  = '/tmp/flex_rate/';
@mkdir($rateDir, 0755, true);
$rateFile = $rateDir . md5($ip) . '.json';
$window   = 600;   // 10 minutes
$maxHits  = 5;

$hits = [];
if (file_exists($rateFile)) {
    $hits = json_decode(file_get_contents($rateFile), true) ?: [];
}
$now  = time();
$hits = array_filter($hits, fn($t) => $now - $t < $window); // drop expired
if (count($hits) >= $maxHits) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'too_many_requests']);
    exit;
}
$hits[] = $now;
file_put_contents($rateFile, json_encode(array_values($hits)));

// ─── CSRF validation ──────────────────────────────────────────────────────────
session_start();
$body       = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$csrfSent   = $body['csrf_token'] ?? '';
$csrfStored = $_SESSION['csrf_token'] ?? '';

if (empty($csrfStored) || !hash_equals($csrfStored, $csrfSent)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'invalid_token']);
    exit;
}
// Rotate token after successful validation
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// ─── Input validation ─────────────────────────────────────────────────────────
$name    = trim($body['name']    ?? '');
$phone   = trim($body['phone']   ?? '');
$email   = trim($body['email']   ?? '');
$message = trim($body['message'] ?? '');

if (mb_strlen($name) < 2)    { echo json_encode(['ok'=>false,'error'=>'الاسم قصير']);         exit; }
if (mb_strlen($phone) < 9)   { echo json_encode(['ok'=>false,'error'=>'رقم الهاتف غير صحيح']); exit; }
if (mb_strlen($message) < 5) { echo json_encode(['ok'=>false,'error'=>'الرسالة قصيرة']);       exit; }
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok'=>false,'error'=>'البريد الإلكتروني غير صحيح']); exit;
}

// ─── Save to DB ───────────────────────────────────────────────────────────────
require_once __DIR__ . '/../includes/db.php';
$saved = dbInsert(
    "INSERT INTO contacts (name, phone, email, message, created_at) VALUES (:name, :phone, :email, :message, NOW())",
    ['name'=>$name, 'phone'=>$phone, 'email'=>$email, 'message'=>$message]
);

// Fallback: JSON file when DB unavailable
if (!$saved) {
    $file = __DIR__ . '/../storage/contacts.json';
    @mkdir(dirname($file), 0755, true);
    $existing = file_exists($file) ? (json_decode(file_get_contents($file), true) ?: []) : [];
    $existing[] = compact('name', 'phone', 'email', 'message') + ['time' => date('Y-m-d H:i:s')];
    @file_put_contents($file, json_encode($existing, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// Return new CSRF token so JS can update form for next submission
echo json_encode(['ok' => true, 'csrf_token' => $_SESSION['csrf_token']]);
