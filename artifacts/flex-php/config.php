<?php
define('SITE_NAME_AR', 'فلكس للدعاية والإعلان');
define('SITE_NAME_EN', 'Flex for Advertising');
define('PHONE',    '+966563538520');
define('PHONE2',   '+966595983635');
define('WHATSAPP', '966563538520');
define('EMAIL', 'a.darag@flex-adv.com');
define('STAT_PROJECTS', 2400);
define('STAT_CLIENTS', 300);
define('STAT_YEARS', 11);
define('STAT_BRANDS', 100);

/**
 * imgUrl() — تصغير وضغط الصور عبر /img.php
 *
 * @param string $src   مسار الصورة (يبدأ بـ /images/...)
 * @param int    $w     عرض الناتج بالبيكسل (0 = بلا تغيير)
 * @param int    $h     ارتفاع الناتج (0 = نسبي تلقائياً)
 * @param int    $q     جودة الضغط 1-100 (افتراضي: 82)
 */
function imgUrl(string $src, int $w = 0, int $h = 0, int $q = 82): string {
    $p = ['src' => $src];
    if ($w > 0) $p['w'] = $w;
    if ($h > 0) $p['h'] = $h;
    if ($q !== 82) $p['q'] = $q;
    return '/img.php?' . http_build_query($p);
}

// ─── MySQL / PostgreSQL — Auto-detected in includes/db.php ───────────────────
//
// Priority: MYSQL_URL > MYSQL_HOST vars > DATABASE_URL (auto-detect scheme)
//
// لربط MySQL: أضف في بيئة المشروع (Environment Secrets):
//   MYSQL_URL  = mysql://user:pass@host:3306/dbname
// أو بشكل منفصل:
//   MYSQL_HOST = your-host
//   MYSQL_DB   = flex_adv
//   MYSQL_USER = your-user
//   MYSQL_PASS = your-pass
//   MYSQL_PORT = 3306  (اختياري)

define('MYSQL_DEFAULT_DB',   getenv('MYSQL_DB')       ?: 'flex_adv');
define('MYSQL_DEFAULT_HOST', getenv('MYSQL_HOST')      ?: 'localhost');
define('MYSQL_DEFAULT_PORT', (int)(getenv('MYSQL_PORT') ?: 3306));
define('MYSQL_DEFAULT_USER', getenv('MYSQL_USER')      ?: 'root');
define('MYSQL_DEFAULT_PASS', getenv('MYSQL_PASS')      ?: '');
