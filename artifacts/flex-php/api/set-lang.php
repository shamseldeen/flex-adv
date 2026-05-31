<?php
session_start();
$lang = $_GET['lang'] ?? $_POST['lang'] ?? 'ar';
if (in_array($lang, ['ar', 'en'])) {
    $_SESSION['lang'] = $lang;
    setcookie('flex_lang', $lang, time() + (365 * 24 * 3600), '/', '', false, false);
}
header('Content-Type: application/json');
echo json_encode(['ok' => true, 'lang' => $lang]);
