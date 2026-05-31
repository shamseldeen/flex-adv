<?php
require_once __DIR__ . '/../includes/lang.php';
require_once __DIR__ . '/../config.php';

$currentPage = $currentPage ?? '';
$pageTitle   = $pageTitle ?? (SITE_NAME_AR . ' | ' . SITE_NAME_EN);
$logoSrcAr   = '/assets/images/logo-ar-main.png';
$logoSrcEn   = '/assets/images/logo-en-main.png';
$logoSrc     = $isAr ? $logoSrcAr : $logoSrcEn;
$langToggle  = $isAr ? 'EN' : 'عر';
$currentPath = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
$currentPath = preg_replace('#^/(public|flex-php)#', '', $currentPath) ?: '/';
$langUrl     = $currentPath . '?lang=' . ($isAr ? 'en' : 'ar');
$nextLang    = $isAr ? 'en' : 'ar';

// Language suffix for nav links — preserves language when navigating between pages
$langSuffix  = !$isAr ? '?lang=en' : '';

$navLinks = [
    ['href' => '/'           . $langSuffix, 'key' => 'home'],
    ['href' => '/about'      . $langSuffix, 'key' => 'about'],
    ['href' => '/services'   . $langSuffix, 'key' => 'services'],
    ['href' => '/gallery'    . $langSuffix, 'key' => 'gallery'],
    ['href' => '/portfolio'  . $langSuffix, 'key' => 'portfolio'],
    ['href' => '/contact'    . $langSuffix, 'key' => 'contact'],
];

$globeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="display:inline;vertical-align:middle"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 014-10z"/></svg>';
?><!DOCTYPE html>
<html lang="<?= $lang ?>" dir="<?= $dir ?>">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <meta name="description" content="<?= $isAr ? 'فلكس للدعاية والإعلان — وكالة إعلانية متكاملة في الدمام والرياض. طباعة، هوية بصرية، لافتات، تصميم 3D، فعاليات.' : 'Flex for Advertising — Full-service advertising agency in Dammam & Riyadh. Printing, branding, signage, 3D design, events.' ?>" />
  <meta name="theme-color" content="#050505" />
  <meta property="og:title" content="<?= htmlspecialchars($pageTitle) ?>" />
  <meta property="og:description" content="<?= $isAr ? 'فلكس للدعاية والإعلان — وكالة إعلانية متكاملة في الدمام والرياض' : 'Flex for Advertising — Full-service agency in Dammam & Riyadh' ?>" />
  <meta property="og:type" content="website" />
  <?php
  // ── كشف URL الموقع ديناميكياً ──────────────────────────────
  $siteUrl = defined('SITE_URL') && SITE_URL
      ? rtrim(SITE_URL, '/')
      : ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http')
        . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
  // مسار الصفحة الحالية — بدون /public prefix
  $currentPath = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
  $currentPath = preg_replace('#^/(public|flex-php)#', '', $currentPath) ?: '/';
  $ogImgSrc    = $pageOgImage ?? imgUrl('/images/landmarks/kingdom_tower.jpg', 1200, 630, 85);
  $ogImgAbs    = $siteUrl . $ogImgSrc;
  $canonicalUrl = $siteUrl . $currentPath;
  ?>
  <meta property="og:url" content="<?= htmlspecialchars($canonicalUrl) ?>" />
  <meta property="og:image" content="<?= htmlspecialchars($ogImgAbs) ?>" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="<?= $isAr ? 'ar_SA' : 'en_US' ?>" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="<?= htmlspecialchars($pageTitle) ?>" />
  <meta name="twitter:image" content="<?= htmlspecialchars($ogImgAbs) ?>" />
  <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl) ?>" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "<?= $isAr ? 'فلكس للدعاية والإعلان' : 'Flex for Advertising' ?>",
    "alternateName": "<?= $isAr ? 'Flex for Advertising' : 'فلكس للدعاية والإعلان' ?>",
    "url": "<?= $siteUrl ?>",
    "logo": "<?= $siteUrl ?>/assets/images/logo-ar-main.png",
    "image": "<?= $siteUrl ?>/assets/images/logo-ar-main.png",
    "telephone": "<?= PHONE ?>",
    "email": "<?= EMAIL ?>",
    "foundingDate": "2013",
    "numberOfEmployees": {"@type": "QuantitativeValue", "value": 50},
    "address": [
      {"@type": "PostalAddress", "addressLocality": "<?= $isAr ? 'الدمام' : 'Dammam' ?>", "addressCountry": "SA"},
      {"@type": "PostalAddress", "addressLocality": "<?= $isAr ? 'الرياض' : 'Riyadh' ?>", "addressCountry": "SA"}
    ],
    "sameAs": ["https://wa.me/<?= WHATSAPP ?>"],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
      "opens": "08:00", "closes": "17:00"
    }
  }
  </script>
  <?php if (!empty($heroPreloadSrc)): ?>
  <link rel="preload" as="image" href="<?= htmlspecialchars($heroPreloadSrc) ?>" fetchpriority="high" />
  <?php endif; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Poppins:wght@700;900&display=swap" />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Poppins:wght@700;900&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Poppins:wght@700;900&display=swap" rel="stylesheet" /></noscript>
  <link rel="stylesheet" href="/assets/css/style.css?v=<?= filemtime(__DIR__.'/../public/assets/css/style.css') ?>" />
</head>
<body dir="<?= $dir ?>" data-page="<?= $currentPage ?>" class="<?= $isAr ? 'ar' : 'en' ?>">

<div id="scroll-progress"></div>

<header id="navbar" class="<?= $currentPage !== 'home' ? 'solid' : '' ?>">
  <div class="container">
    <div class="nav-inner">

      <a href="/" class="nav-logo">
        <img src="<?= imgUrl($logoSrc, 400, 0, 90) ?>"
             alt="<?= SITE_NAME_AR ?>"
             height="52"
             fetchpriority="high"
             decoding="auto"
             style="height:52px;width:auto;max-width:200px;object-fit:contain"
             onerror="this.src='<?= $logoSrc ?>';this.onerror=null" />
        <div style="display:none" class="nav-logo-fallback">
          <span class="nav-logo-text">FLEX</span>
          <span class="nav-logo-sub">للدعاية والإعلان</span>
        </div>
      </a>

      <nav class="nav-links">
        <?php foreach ($navLinks as $link): ?>
          <a href="<?= $link['href'] ?>"
             class="<?= $currentPage === $link['key'] ? 'active' : '' ?>">
            <?= t($link['key']) ?>
          </a>
        <?php endforeach; ?>
        <a href="<?= $langUrl ?>" class="lang-btn lang-active" onclick="flexSwitchLang('<?= $nextLang ?>');return false;" aria-label="Switch language">
          <?= $globeSvg ?><?= $langToggle ?>
        </a>
        <a href="/contact<?= $langSuffix ?>" class="btn-primary"><?= t('startProject') ?></a>
      </nav>

      <div class="nav-mobile-actions">
        <a href="<?= $langUrl ?>" class="lang-btn lang-btn-mobile" onclick="flexSwitchLang('<?= $nextLang ?>');return false;" aria-label="Switch language">
          <?= $globeSvg ?><?= $langToggle ?>
        </a>
        <button class="nav-mobile-btn" id="mobile-menu-open" aria-label="Menu" aria-expanded="false">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

    </div>
  </div>
</header>

<div id="mobile-menu-backdrop"></div>
<div id="mobile-menu">
  <div class="mobile-menu-top">
    <a href="/" class="nav-logo">
      <img src="<?= imgUrl($logoSrc, 400, 0, 90) ?>"
           alt="<?= SITE_NAME_AR ?>"
           height="52"
           decoding="async"
           style="height:52px;width:auto;max-width:200px;object-fit:contain"
           onerror="this.style.display='none';this.nextElementSibling.style.display='inline'" />
      <span class="nav-logo-text" style="display:none;font-size:1.5rem">FLEX</span>
    </a>
    <button class="mobile-close-btn" id="mobile-menu-close" aria-label="Close">
      <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
  <nav class="mobile-links">
    <?php foreach ($navLinks as $link): ?>
      <a href="<?= $link['href'] ?>"
         class="<?= $currentPage === $link['key'] ? 'active' : '' ?>">
        <?= t($link['key']) ?>
      </a>
    <?php endforeach; ?>
  </nav>
  <div class="mobile-cta">
    <a href="<?= $langUrl ?>" class="lang-btn lang-active" onclick="flexSwitchLang('<?= $nextLang ?>');return false;" style="width:fit-content;margin-bottom:1rem">
      <?= $globeSvg ?><?= $langToggle ?>
    </a>
    <a href="/contact<?= $langSuffix ?>" class="btn-primary btn-primary-lg" style="width:100%;text-align:center"><?= t('startProject') ?></a>
  </div>
</div>

