<?php
require_once __DIR__ . '/../includes/lang.php';
$currentPage = 'services';
$pageTitle   = $isAr ? 'خدماتنا | فلكس للدعاية والإعلان' : 'Our Services | Flex for Advertising';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/header.php';

// ─── Fetch services from DB ───
$services = dbQuery("SELECT id, title, title_en, description, description_en, icon FROM services ORDER BY id");

if (empty($services)) {
    $services = [
        ['id'=>1,'title'=>'الطباعة الرقمية',     'title_en'=>'Digital Printing',       'description'=>'نقدم خدمات طباعة رقمية عالية الجودة لجميع أنواع المطبوعات الإعلانية باستخدام أحدث المعدات وأجود الخامات.','description_en'=>'High-quality digital printing for all advertising materials.','icon'=>'Printer'],
        ['id'=>2,'title'=>'الهوية المؤسسية',     'title_en'=>'Corporate Identity',      'description'=>'نصمم هويات بصرية متكاملة تعكس قيم علامتك التجارية.','description_en'=>'Complete visual identities that reflect your brand values.','icon'=>'Palette'],
        ['id'=>3,'title'=>'إدارة الفعاليات',     'title_en'=>'Event Management',        'description'=>'ننظم فعاليات احترافية من الفكرة حتى التنفيذ الكامل.','description_en'=>'Professional events from concept to full execution.','icon'=>'Star'],
        ['id'=>4,'title'=>'التصميم 3D',           'title_en'=>'3D Design',               'description'=>'نصمم ونصنع حروفاً مجسمة وعناصر إعلانية ثلاثية الأبعاد.','description_en'=>'3D letters and advertising elements.','icon'=>'Zap'],
        ['id'=>5,'title'=>'استيكر السيارات',     'title_en'=>'Vehicle Wraps',           'description'=>'نحول مركباتك إلى لوحات إعلانية متحركة.','description_en'=>'Transform your vehicles into moving billboards.','icon'=>'Car'],
        ['id'=>6,'title'=>'ورشة التصنيع',        'title_en'=>'Manufacturing Workshop',  'description'=>'نصنع جميع أنواع اللوحات الإعلانية.','description_en'=>'All types of signage manufacturing.','icon'=>'Wrench'],
    ];
}

// ─── Full icon map (Heroicons paths) ───
function svcIcon(string $name): string {
    $icons = [
        'Printer'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.75 19.5m.44-5.671a42.35 42.35 0 015.12-.668m0 0 3 3.375M6.75 19.5h10.5M12 15.375l3-3.375m0 0a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z"/>',
        'Layers'      => '<path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142-8.25L12 9.75"/>',
        'BookOpen'    => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>',
        'Building2'   => '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>',
        'Zap'         => '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
        'Box'         => '<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>',
        'CalendarDays'=> '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/>',
        'Gift'        => '<path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>',
        'Car'         => '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>',
        'Factory'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v9m6-9v9m6-9v9m-9.75-3.75h.008v.008H6v-.008zm3.75 0h.008v.008H9.75v-.008zm3.75 0h.008v.008H13.5v-.008zM6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>',
        'Camera'      => '<path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>',
        'Palette'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
        'Globe'       => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M12 10.5c2.998 0 5.74 1.1 7.843 2.918"/>',
        'Wrench'      => '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>',
        'Star'        => '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>',
        'MonitorPlay' => '<path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"/>',
        'SignBoard'   => '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/>',
        'DisplayStand'=> '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 3h16.5M12 16.5v4.5m-3 0h6"/>',
    ];
    $default = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"/>';
    return $icons[$name] ?? $default;
}

// ─── Keyword-based image map (matches /images/services/) ───
function getSvcImages(string $title): array {
    $S = '/images/services/';
    $map = [
        ['kw'=>['طباعة الرقمية','رقمية','مطبوعات','print'],   'imgs'=>[$S.'digital_printing_1.jpg', $S.'digital_printing_2.jpg']],
        ['kw'=>['أوفست','أوفسيت'],                             'imgs'=>[$S.'offset_printing_1.jpg',  $S.'digital_printing_1.jpg']],
        ['kw'=>['استيكر','تلمين','فينيل'],                    'imgs'=>[$S.'vehicle_wrap_1.jpg',      $S.'vehicle_wrap_2.jpg']],
        ['kw'=>['هوية','مؤسسية','براند','بصرية','identity'],  'imgs'=>[$S.'branding_1.jpg',          $S.'branding_2.jpg']],
        ['kw'=>['ليزر'],                                        'imgs'=>[$S.'laser_1.jpg',             $S.'laser_2.jpg']],
        ['kw'=>['ثلاثي','3d','أبعاد'],                        'imgs'=>[$S.'3d_signage_1.jpg',        $S.'3d_signage_2.jpg']],
        ['kw'=>['فعالية','معارض','مؤتمر','دعاية','advertising'], 'imgs'=>[$S.'events_1.jpg',            $S.'events_2.jpg']],
        ['kw'=>['تسويق','استشار','marketing'],                 'imgs'=>[$S.'branding_1.jpg',          $S.'graphic_design_2.jpg']],
        ['kw'=>['هدايا','ترويج'],                               'imgs'=>[$S.'promo_gifts_1.jpg',       $S.'promo_gifts_2.jpg']],
        ['kw'=>['سيار','موتور','مركبة'],                       'imgs'=>[$S.'vehicle_wrap_1.jpg',      $S.'vehicle_wrap_2.jpg']],
        ['kw'=>['ورشة','تصنيع','إنتاج'],                      'imgs'=>[$S.'workshop_1.jpg',          $S.'workshop_2.jpg']],
        ['kw'=>['لوحات','لوحة','اللوحات'],                     'imgs'=>[$S.'workshop_1.jpg',          $S.'3d_signage_1.jpg']],
        ['kw'=>['استاند','عرض احترافية','استاندات'],           'imgs'=>[$S.'events_1.jpg',            $S.'events_2.jpg']],
        ['kw'=>['لافتة','نيون','إضاءة'],                      'imgs'=>[$S.'neon_1.jpg',              $S.'neon_2.jpg']],
        ['kw'=>['تصميم','جرافيك','فيديو','موشن'],             'imgs'=>[$S.'graphic_design_1.jpg',    $S.'graphic_design_2.jpg']],
    ];
    $lower = mb_strtolower($title);
    foreach ($map as $entry) {
        foreach ($entry['kw'] as $kw) {
            if (mb_strpos($title, $kw) !== false || mb_strpos($lower, mb_strtolower($kw)) !== false) {
                return $entry['imgs'];
            }
        }
    }
    return [$S.'events_1.jpg', $S.'branding_1.jpg'];
}

$workshopItems = ['w1','w2','w3','w4','w5','w6'];
?>

<section class="page-hero">
  <div class="page-hero-glow"></div>
  <div class="container">
    <div class="section-badge"><span></span><?= t('servicesBadge') ?></div>
    <h1 style="font-size:clamp(2rem,3.75vw,3.375rem);font-weight:900;color:#fff;margin:1rem 0 1.5rem;line-height:1.1">
      <?= t('servicesPageTitle') ?><span class="brand-gradient-text"> <?= t('servicesPageHighlight') ?></span>
    </h1>
    <p style="font-size:1.125rem;color:var(--muted);max-width:640px;line-height:1.8"><?= t('servicesPageDesc') ?></p>
  </div>
</section>

<!-- Services List — horizontal card layout matching React -->
<section style="padding-top:2rem;padding-bottom:2rem">
  <div class="container">
    <div class="svc-list">
      <?php foreach ($services as $index => $svc):
        $imgs  = getSvcImages($svc['title']);
        $title = $isAr ? $svc['title'] : ($svc['title_en'] ?: $svc['title']);
        $desc  = $isAr ? $svc['description'] : ($svc['description_en'] ?: $svc['description']);
        $num   = str_pad($index + 1, 2, '0', STR_PAD_LEFT);
      ?>
      <div class="svc-card fade-in" data-testid="card-service-<?= $svc['id'] ?>">

        <!-- Image strip (left / top on mobile) -->
        <div class="svc-img-strip">
          <img class="svc-img-primary" src="<?= imgUrl($imgs[0], 400, 300, 80) ?>"
               alt="<?= htmlspecialchars($title) ?>"
               width="400" height="300"
               loading="<?= $index < 2 ? 'eager' : 'lazy' ?>"
               decoding="<?= $index < 2 ? 'auto' : 'async' ?>"
               onerror="this.style.display='none'" />
          <img class="svc-img-hover" src="<?= imgUrl($imgs[1], 400, 300, 80) ?>"
               alt="" width="400" height="300"
               loading="lazy" decoding="async"
               onerror="this.style.display='none'" />
          <div class="svc-img-gradient"></div>
        </div>

        <!-- Content -->
        <div class="svc-content">
          <div class="svc-bg-number" dir="ltr"><?= $num ?></div>

          <div class="svc-inner">
            <div class="svc-icon-box">
              <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <?= svcIcon($svc['icon'] ?? '') ?>
              </svg>
            </div>
            <div>
              <h3 class="svc-title"><?= htmlspecialchars($title) ?></h3>
              <p class="svc-desc"><?= htmlspecialchars($desc) ?></p>
            </div>
          </div>

          <div class="svc-underline"></div>
        </div>

      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Manufacturing Workshop -->
<section class="svc-workshop-section">
  <div class="container">
    <div class="svc-workshop-grid">
      <!-- Left: text -->
      <div class="fade-in">
        <div class="svc-workshop-badge">MANUFACTURING WORKSHOP</div>
        <h2 style="font-size:clamp(1.75rem,2.25vw,2.25rem);font-weight:900;color:#fff;margin:1rem 0 1.5rem;line-height:1.2">
          <?= t('workshopTitle') ?> <span class="brand-gradient-text"><?= t('workshopHighlight') ?></span>
        </h2>
        <p style="color:var(--muted);line-height:1.8;font-size:1.05rem;margin-bottom:2rem"><?= t('workshopDesc') ?></p>
        <div class="svc-workshop-items">
          <?php foreach ($workshopItems as $w): ?>
          <div class="svc-workshop-item">
            <span class="svc-ws-dot"></span>
            <span><?= t($w) ?></span>
          </div>
          <?php endforeach; ?>
        </div>
        <a href="/contact<?= $langSuffix ?>" class="btn-primary btn-primary-lg" style="margin-top:2rem;display:inline-block"><?= t('workshopBtn') ?></a>
      </div>

      <!-- Right: photo grid -->
      <div class="fade-in svc-workshop-photos">
        <?php foreach (['images/portfolio/p13_2.jpeg','images/portfolio/p9_4.jpeg','images/portfolio/p6_1.jpeg','images/portfolio/p8_1.jpeg'] as $img): ?>
        <div class="svc-ws-photo">
          <img src="<?= imgUrl('/'.$img, 400, 300, 82) ?>" alt="" loading="lazy"
               onerror="this.closest('.svc-ws-photo').style.background='#111';this.style.display='none'" />
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="svc-cta-section">
  <div class="svc-cta-noise"></div>
  <div class="container" style="position:relative;z-index:10;text-align:center">
    <h2 style="font-size:clamp(1.75rem,3vw,2.625rem);font-weight:900;color:#fff;margin-bottom:1.5rem"><?= t('servicesCtaTitle') ?></h2>
    <p style="font-size:1.1rem;color:rgba(255,255,255,.85);max-width:600px;margin:0 auto 2.5rem"><?= t('servicesCtaDesc') ?></p>
    <a href="/contact<?= $langSuffix ?>" class="svc-cta-btn" data-testid="link-services-cta"><?= t('servicesCtaBtn') ?></a>
  </div>
</section>

<style>
/* ── Service Card Layout ── */
.svc-list { display:flex; flex-direction:column; gap:0; }
.svc-card {
  display:flex; flex-direction:column;
  background:var(--card); border:1px solid var(--border);
  overflow:hidden; position:relative;
  transition:border-color .25s;
}
.svc-card:hover { border-color:rgba(232,40,30,.5); }
@media(min-width:768px) {
  .svc-card { flex-direction:row; }
  .svc-list { gap:.375rem; }
}

/* Image strip */
.svc-img-strip {
  position:relative; overflow:hidden;
  min-height:160px; flex-shrink:0;
}
@media(min-width:768px) { .svc-img-strip { width:192px; } }
@media(min-width:1024px){ .svc-img-strip { width:256px; } }
.svc-img-primary,.svc-img-hover {
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  transition:opacity .5s ease;
}
.svc-img-hover { opacity:0; }
.svc-card:hover .svc-img-primary { opacity:0; }
.svc-card:hover .svc-img-hover   { opacity:1; }
.svc-img-gradient {
  position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(to left, var(--card) 0%, rgba(0,0,0,.15) 100%);
}
[dir="ltr"] .svc-img-gradient { background:linear-gradient(to right, var(--card) 0%, rgba(0,0,0,.15) 100%); }

/* Content */
.svc-content {
  flex:1; position:relative; padding:2rem 2.5rem;
  overflow:hidden; display:flex; flex-direction:column; justify-content:center;
}
.svc-bg-number {
  position:absolute; top:0; right:2rem; /* rtl: right, ltr: left */
  font-size:7rem; line-height:1; font-weight:900;
  color:rgba(255,255,255,.025); pointer-events:none; select-none:none;
  transition:color .3s;
}
[dir="ltr"] .svc-bg-number { right:auto; left:2rem; }
.svc-card:hover .svc-bg-number { color:rgba(232,40,30,.06); }
.svc-inner { display:flex; align-items:flex-start; gap:1.5rem; position:relative; z-index:1; }
.svc-icon-box {
  background:var(--background); border:1px solid var(--border);
  padding:1rem; color:var(--primary); flex-shrink:0;
  transition:background .25s, color .25s;
}
.svc-card:hover .svc-icon-box { background:var(--primary); color:#fff; }
.svc-title { font-size:clamp(1.25rem,2vw,1.875rem); font-weight:900; color:#fff; margin-bottom:1rem; }
.svc-desc  { font-size:1.05rem; color:var(--muted); line-height:1.8; max-width:680px; }
.svc-underline {
  position:absolute; bottom:0; left:0; right:0; height:2px;
  background:var(--primary); width:0; transition:width .5s ease;
}
.svc-card:hover .svc-underline { width:100%; }

/* Workshop */
.svc-workshop-section {
  background:var(--card); border-top:1px solid var(--border);
  padding:6rem 0;
}
.svc-workshop-grid { display:grid; gap:4rem; align-items:center; }
@media(min-width:1024px) { .svc-workshop-grid { grid-template-columns:1fr 1fr; } }
.svc-workshop-badge {
  display:inline-flex; align-items:center;
  font-size:.75rem; font-weight:900; letter-spacing:.12em;
  color:var(--primary); border:1px solid rgba(232,40,30,.3);
  padding:.25rem .75rem; margin-bottom:1.5rem;
}
.svc-workshop-items { display:grid; grid-template-columns:repeat(2,1fr); gap:.75rem; }
.svc-workshop-item {
  display:flex; align-items:center; gap:.75rem;
  padding:1rem; border:1px solid var(--border);
  font-size:.9rem; font-weight:600; color:var(--text);
  transition:border-color .2s;
}
.svc-workshop-item:hover { border-color:rgba(232,40,30,.3); }
.svc-ws-dot { width:8px; height:8px; border-radius:50%; background:var(--primary); flex-shrink:0; }
.svc-workshop-photos { display:grid; grid-template-columns:repeat(2,1fr); gap:4px; }
.svc-ws-photo { overflow:hidden; aspect-ratio:1; }
.svc-ws-photo img { width:100%; height:100%; object-fit:cover; transition:transform .4s; }
.svc-ws-photo:hover img { transform:scale(1.07); }

/* Services CTA */
.svc-cta-section {
  position:relative; overflow:hidden;
  padding:5rem 0;
  background:linear-gradient(135deg, #e8281e 0%, #b91c1c 100%);
}
.svc-cta-noise {
  position:absolute; inset:0; opacity:.08;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.svc-cta-btn {
  display:inline-block; padding:1.25rem 2.5rem;
  background:var(--background); color:var(--text);
  font-weight:900; font-size:1.1rem; font-family:inherit;
  text-decoration:none; transition:background .2s,color .2s;
}
.svc-cta-btn:hover { background:#fff; color:#000; }
</style>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
