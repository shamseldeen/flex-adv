<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');

require_once __DIR__ . '/../includes/db.php';

$db    = dbHealth();
$start = microtime(true);

$gallery_count = 0;
if ($db) {
    $row = dbQueryOne('SELECT COUNT(*) AS cnt FROM gallery');
    $gallery_count = (int)($row['cnt'] ?? 0);
}

echo json_encode([
    'ok'            => true,
    'timestamp'     => date('c'),
    'db'            => $db ?? ['ok' => false, 'driver' => null, 'version' => null],
    'gallery_items' => $gallery_count,
    'response_ms'   => round((microtime(true) - $start) * 1000, 2),
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
