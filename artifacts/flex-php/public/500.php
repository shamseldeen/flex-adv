<?php
http_response_code(500);
$isAr = (($_SESSION['lang'] ?? $_COOKIE['flex_lang'] ?? 'ar') === 'ar');
?><!DOCTYPE html>
<html lang="<?= $isAr?'ar':'en' ?>" dir="<?= $isAr?'rtl':'ltr' ?>">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= $isAr?'خطأ في الخادم':'Server Error' ?></title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&family=Poppins:wght@700;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#050505;color:#fff;font-family:'Cairo',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem}
.code{font-size:clamp(4rem,15vw,9rem);font-weight:900;background:linear-gradient(135deg,#e8281e,#7f1d1d);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1}
h1{font-size:clamp(1.25rem,3vw,2rem);font-weight:900;margin:.75rem 0}
p{color:rgba(255,255,255,.5);font-size:1rem;margin-bottom:2rem}
a{display:inline-block;background:#e8281e;color:#fff;padding:.75rem 2rem;font-weight:700;text-decoration:none}
</style>
</head>
<body>
<div>
  <div class="code">500</div>
  <h1><?= $isAr?'خطأ في الخادم':'Internal Server Error' ?></h1>
  <p><?= $isAr?'حدث خطأ غير متوقع. نعمل على إصلاحه.':'An unexpected error occurred. We\'re working on it.' ?></p>
  <a href="/"><?= $isAr?'العودة للرئيسية':'Back to Home' ?></a>
</div>
</body>
</html>
