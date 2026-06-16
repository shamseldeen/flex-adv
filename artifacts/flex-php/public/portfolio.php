<?php
require_once __DIR__ . '/../includes/lang.php';
$currentPage = 'portfolio';
$pageTitle   = $isAr ? 'أعمالنا | فلكس للدعاية والإعلان' : 'Portfolio | Flex for Advertising';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/header.php';

$portfolio = dbQuery("SELECT id, title, title_en, category, category_en, image_url, description, description_en, client, year, gallery FROM portfolio ORDER BY CASE category WHEN 'لافتات وواجهات' THEN 1 WHEN 'واجهات ومشاريع كبرى' THEN 2 WHEN 'هوية بصرية' THEN 3 WHEN 'فعاليات ومعارض' THEN 4 WHEN 'ستاندات وتوتيم' THEN 5 WHEN 'ديكور داخلي' THEN 6 WHEN 'استيكر وتغليف' THEN 7 ELSE 8 END ASC, id ASC");

/* Categories */
$catCounts = [];
$catRows   = dbQuery("SELECT category, category_en, COUNT(*) AS cnt FROM portfolio GROUP BY category, category_en ORDER BY COUNT(*) DESC");
foreach ($catRows as $r) {
    if ($r['category']) $catCounts[$r['category']] = ['cnt'=>(int)$r['cnt'],'en'=>$r['category_en'] ?? $r['category']];
}

if (empty($portfolio)) {
    $portfolio = [
        ['id'=>42,'title'=>'خيالة | هوية الواجهة الكاملة','title_en'=>'Khayallah | Complete Brand Facade','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/khayallah_facade_night_1.jpeg','description'=>'تصميم وتنفيذ الواجهة الإعلانية الكاملة','description_en'=>'Full facade design and installation','client'=>'خيالة','year'=>2024,'gallery'=>[]],
        ['id'=>45,'title'=>'إكسبرس موتورز | هوية صالة العرض','title_en'=>'Express Motors | Showroom Identity','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/express_motors_1.jpeg','description'=>'','description_en'=>'','client'=>'Express Motors','year'=>2024,'gallery'=>[]],
        ['id'=>48,'title'=>'IMAGE Restaurant | الشعار الذهبي ثلاثي الأبعاد','title_en'=>'IMAGE Restaurant | 3D Gold Signature Logo','category'=>'هوية بصرية','category_en'=>'Visual Identity','image_url'=>'/images/portfolio/image_restaurant_gold_1.jpeg','description'=>'','description_en'=>'','client'=>'IMAGE Restaurant','year'=>2024,'gallery'=>[]],
        ['id'=>49,'title'=>'Drive7 | هوية صالة العرض','title_en'=>'Drive7 | Showroom Visual Identity','category'=>'هوية بصرية','category_en'=>'Visual Identity','image_url'=>'/images/portfolio/drive7_1.jpeg','description'=>'','description_en'=>'','client'=>'Drive7','year'=>2024,'gallery'=>[]],
        ['id'=>50,'title'=>'The Roof | هوية المطعم الراقي','title_en'=>'The Roof | Fine Dining Brand Identity','category'=>'هوية بصرية','category_en'=>'Visual Identity','image_url'=>'/images/portfolio/theroof_1.jpeg','description'=>'','description_en'=>'','client'=>'The Roof','year'=>2024,'gallery'=>[]],
        ['id'=>51,'title'=>'سافي للأسنان | الهوية البصرية','title_en'=>'Savvy Dental | Brand Identity Package','category'=>'مطبوعات','category_en'=>'Print Media','image_url'=>'/images/portfolio/savvy_dental_1.jpeg','description'=>'','description_en'=>'','client'=>'Savvy Dental','year'=>2024,'gallery'=>[]],
        ['id'=>52,'title'=>'Fuchsia | تغليف الشاحنة التجارية','title_en'=>'Fuchsia | Commercial Truck Wrap','category'=>'استيكر وتغليف','category_en'=>'Wrap & Sticker','image_url'=>'/images/portfolio/fuchsia_truck_1.jpeg','description'=>'','description_en'=>'','client'=>'Fuchsia','year'=>2024,'gallery'=>[]],
        ['id'=>53,'title'=>'PepsiCo | الفعالية الموسيقية','title_en'=>'PepsiCo | Music Event Production','category'=>'فعاليات ومعارض','category_en'=>'Events & Exhibitions','image_url'=>'/images/portfolio/pepsi_music_2.jpeg','description'=>'','description_en'=>'','client'=>'PepsiCo','year'=>2024,'gallery'=>[]],
        ['id'=>54,'title'=>'Enterprise | معرض تجاري متكامل','title_en'=>'Enterprise | Full Trade Exhibition','category'=>'فعاليات ومعارض','category_en'=>'Events & Exhibitions','image_url'=>'/images/portfolio/enterprise_1.jpeg','description'=>'','description_en'=>'','client'=>'Enterprise','year'=>2024,'gallery'=>[]],
        ['id'=>55,'title'=>'الوعد | لافتة واجهة المبنى','title_en'=>'Al Awad | Building Facade Signage','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/alawad_facade.jpeg','description'=>'','description_en'=>'','client'=>'الوعد','year'=>2024,'gallery'=>[]],
        ['id'=>56,'title'=>'Life Spirit | واجهة العلامة التجارية','title_en'=>'Life Spirit | Brand Facade Installation','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/life_spirit_facade.jpeg','description'=>'','description_en'=>'','client'=>'Life Spirit','year'=>2024,'gallery'=>[]],
        ['id'=>57,'title'=>'Papillon | واجهة المطعم الفاخر','title_en'=>'Papillon | Luxury Restaurant Facade','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/papillon_facade.jpeg','description'=>'','description_en'=>'','client'=>'Papillon','year'=>2024,'gallery'=>[]],
        ['id'=>58,'title'=>'إنمار | تركيب اللافتة الخارجية','title_en'=>'Inmar | External Signage Installation','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/inmar_facade.jpeg','description'=>'','description_en'=>'','client'=>'إنمار','year'=>2024,'gallery'=>[]],
        ['id'=>59,'title'=>'المركز الصحي الأولي | واجهة مكتملة','title_en'=>'Primary Health Center | Complete Facade','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/medical_center_1.jpeg','description'=>'','description_en'=>'','client'=>'مركز الجودة الصحية','year'=>2024,'gallery'=>[]],
        ['id'=>60,'title'=>'عيادة طبية | لافتات أكريليك داخلية','title_en'=>'Medical Clinic | Interior Acrylic Signage','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/clinic_signs_1.jpeg','description'=>'','description_en'=>'','client'=>'مركز طبي','year'=>2024,'gallery'=>[]],
        ['id'=>61,'title'=>'لافتة رخامية | حروف ذهبية فاخرة','title_en'=>'Marble Signage | Premium Gold Letters','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/facade_sign_marble.jpeg','description'=>'','description_en'=>'','client'=>'مشروع خاص','year'=>2024,'gallery'=>[]],
        ['id'=>62,'title'=>'Business Yard | لافتات المجمع التجاري','title_en'=>'Business Yard | Commercial Complex Signage','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/business_yard_1.jpeg','description'=>'','description_en'=>'','client'=>'Business Yard','year'=>2024,'gallery'=>[]],
        ['id'=>63,'title'=>'Protein Up | تصميم واجهة المتجر','title_en'=>'Protein Up | Store Facade Design','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/protein_up_1.jpeg','description'=>'','description_en'=>'','client'=>'Protein Up','year'=>2024,'gallery'=>[]],
        ['id'=>64,'title'=>'آيس كريما | لافتة المحل التجاري','title_en'=>'Ice Creamaa | Store Commercial Signage','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/ice_creamaa_1.jpeg','description'=>'','description_en'=>'','client'=>'آيس كريما','year'=>2024,'gallery'=>[]],
        ['id'=>65,'title'=>'VITO | تصميم واجهة متجر الملابس','title_en'=>'VITO | Clothing Store Facade Design','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/wa_001.jpg','description'=>'','description_en'=>'','client'=>'VITO','year'=>2025,'gallery'=>[]],
        ['id'=>66,'title'=>'E5DMNii | لافتة الخدمات الرقمية','title_en'=>'E5DMNii | Digital Services Illuminated Sign','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/wa_002.jpg','description'=>'','description_en'=>'','client'=>'E5DMNii Digital Services','year'=>2025,'gallery'=>[]],
        ['id'=>67,'title'=>'MINISO | لافتات المتجر المضيئة','title_en'=>'MINISO | Illuminated Box Signs','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/wa_005.jpg','description'=>'','description_en'=>'','client'=>'MINISO KSA','year'=>2025,'gallery'=>[]],
        ['id'=>68,'title'=>'ريّنا | توتيم إعلاني أسطواني','title_en'=>'Ribna | Cylindrical Advertising Totem','category'=>'ستاندات وتوتيم','category_en'=>'Stands & Totems','image_url'=>'/images/portfolio/wa_010.jpg','description'=>'','description_en'=>'','client'=>'ريّنا','year'=>2024,'gallery'=>[]],
        ['id'=>69,'title'=>'شعار ذهبي | ديكور لوبي استقبال','title_en'=>'Gold Logo | Illuminated Reception Decor','category'=>'ديكور داخلي','category_en'=>'Interior Decor','image_url'=>'/images/portfolio/wa_020.jpg','description'=>'','description_en'=>'','client'=>'عميل مؤسسي','year'=>2025,'gallery'=>[]],
        ['id'=>70,'title'=>'مطعم سينيور | الواجهة الخارجية','title_en'=>'Señor Restaurant | External Facade','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/wa_035.jpg','description'=>'','description_en'=>'','client'=>'سينيور','year'=>2024,'gallery'=>[]],
        ['id'=>71,'title'=>'OOMCO | واجهة محطة الوقود','title_en'=>'OOMCO | Fuel Station Facade','category'=>'واجهات ومشاريع كبرى','category_en'=>'Large-Scale Projects','image_url'=>'/images/portfolio/wa_050.jpg','description'=>'','description_en'=>'','client'=>'OOMCO','year'=>2025,'gallery'=>[]],
        ['id'=>72,'title'=>'Delta | واجهة محطة الوقود','title_en'=>'Delta | Fuel Station Facade','category'=>'واجهات ومشاريع كبرى','category_en'=>'Large-Scale Projects','image_url'=>'/images/portfolio/wa_070.jpg','description'=>'','description_en'=>'','client'=>'Delta','year'=>2025,'gallery'=>[]],
        ['id'=>73,'title'=>'محطة BP | الإضاءة الليلية','title_en'=>'BP Station | Night LED Lighting System','category'=>'واجهات ومشاريع كبرى','category_en'=>'Large-Scale Projects','image_url'=>'/images/portfolio/wa_100.jpg','description'=>'','description_en'=>'','client'=>'BP KSA','year'=>2024,'gallery'=>[]],
        ['id'=>74,'title'=>'نايس | واجهة المجمع التجاري','title_en'=>'Nice | Commercial Complex Facade Signage','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/wa_120.jpg','description'=>'','description_en'=>'','client'=>'Nice KSA','year'=>2025,'gallery'=>[]],
        ['id'=>75,'title'=>'مبنى تجاري | كسوة الألواح المركبة','title_en'=>'Commercial Building | Composite Panel Cladding','category'=>'واجهات ومشاريع كبرى','category_en'=>'Large-Scale Projects','image_url'=>'/images/portfolio/wa_140.jpg','description'=>'','description_en'=>'','client'=>'مطور عقاري','year'=>2025,'gallery'=>[]],
        ['id'=>76,'title'=>'الموسى للأبواب | لافتة المحل','title_en'=>'AlNeosa Doors | Store Facade Sign','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/wa_160.jpg','description'=>'','description_en'=>'','client'=>'AlNeosa Doors','year'=>2025,'gallery'=>[]],
        ['id'=>77,'title'=>'Grill Rock | واجهة المطعم الأمريكي','title_en'=>'Grill Rock | American Restaurant Facade','category'=>'لافتات وواجهات','category_en'=>'Signage & Facades','image_url'=>'/images/portfolio/wa_180.jpg','description'=>'','description_en'=>'','client'=>'Grill Rock','year'=>2025,'gallery'=>[]],
        ['id'=>78,'title'=>'مشروع بناء | كسوة الواجهات العازلة','title_en'=>'Construction Project | Insulated Facade Cladding','category'=>'واجهات ومشاريع كبرى','category_en'=>'Large-Scale Projects','image_url'=>'/images/portfolio/wa_200.jpg','description'=>'','description_en'=>'','client'=>'مطور عقاري','year'=>2025,'gallery'=>[]],
        ['id'=>79,'title'=>'Enterprise | هوية الفرع الداخلية','title_en'=>'Enterprise | Branch Interior Identity','category'=>'هوية بصرية','category_en'=>'Visual Identity','image_url'=>'/images/portfolio/wa_220.jpg','description'=>'','description_en'=>'','client'=>'Enterprise Rent-A-Car','year'=>2025,'gallery'=>[]],
    ];
    $catCounts = [
        'لافتات وواجهات'       => ['cnt'=>19,'en'=>'Signage & Facades'],
        'واجهات ومشاريع كبرى'  => ['cnt'=>5, 'en'=>'Large-Scale Projects'],
        'هوية بصرية'            => ['cnt'=>5, 'en'=>'Visual Identity'],
        'فعاليات ومعارض'        => ['cnt'=>2, 'en'=>'Events & Exhibitions'],
        'ستاندات وتوتيم'        => ['cnt'=>1, 'en'=>'Stands & Totems'],
        'ديكور داخلي'           => ['cnt'=>1, 'en'=>'Interior Decor'],
        'استيكر وتغليف'         => ['cnt'=>1, 'en'=>'Wrap & Sticker'],
        'مطبوعات'               => ['cnt'=>1, 'en'=>'Print Media'],
    ];
}

$totalPf = count($portfolio);

/* Lightbox data — flatten cover + gallery per project */
$lbData    = [];
$cardStart = [];

foreach ($portfolio as $i => $item) {
    $cardStart[$i] = count($lbData);
    $title   = $isAr ? $item['title'] : ($item['title_en'] ?: $item['title']);
    $cat     = $isAr ? $item['category'] : ($item['category_en'] ?: $item['category']);
    $client  = $item['client'] ?? '';
    $year    = (string)($item['year'] ?? '');
    $desc    = $isAr ? ($item['description'] ?? '') : ($item['description_en'] ?? $item['description'] ?? '');
    $gallery = json_decode($item['gallery'] ?? '[]', true) ?: [];
    $allImgs = array_merge([$item['image_url']], $gallery);
    $total   = count($allImgs);
    foreach ($allImgs as $gi => $imgPath) {
        $lbData[] = [
            'img'   => imgUrl($imgPath, 1400, 0, 88),
            'title' => $title,
            'cat'   => $cat,
            'client'=> $client,
            'year'  => $year,
            'desc'  => $desc,
            'gidx'  => $gi + 1,
            'gtotal'=> $total,
        ];
    }
}
$lbTotal = count($lbData);

/* Grid span pattern helper (mirrors React getSpanClass) */
function getSpanClass(int $index): string {
    $pattern = [
        'pf-span-wide',    // 0
        'pf-span-tall',    // 1
        'pf-span-normal',  // 2
        'pf-span-normal',  // 3
        'pf-span-normal',  // 4
        'pf-span-wide',    // 5
        'pf-span-tall',    // 6
        'pf-span-normal',  // 7
        'pf-span-normal',  // 8
    ];
    return $pattern[$index % count($pattern)];
}
?>

<!-- ═══════════════════════════════════════
     HERO — Cinematic 3D
════════════════════════════════════════ -->
<section class="pf3-hero">

  <!-- SVG grid background -->
  <div class="pf3-hero-bg" aria-hidden="true">
    <svg class="pf3-grid-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="pg" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg)"/>
    </svg>
    <div class="pf3-glow-top"></div>
    <div class="pf3-glow-br"></div>
  </div>

  <!-- Floating stat chips -->
  <div class="pf3-chip pf3-chip--tr pf3-chip--1">
    <div class="pf3-chip-icon">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
    </div>
    <div><p class="pf3-chip-val" dir="ltr">+2400</p><p class="pf3-chip-lbl"><?= $isAr ? 'مشروع ناجح' : 'Successful Projects' ?></p></div>
  </div>
  <div class="pf3-chip pf3-chip--tr pf3-chip--2">
    <div class="pf3-chip-icon">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
    </div>
    <div><p class="pf3-chip-val" dir="ltr">+300</p><p class="pf3-chip-lbl"><?= $isAr ? 'عميل راضٍ' : 'Satisfied Clients' ?></p></div>
  </div>
  <div class="pf3-chip pf3-chip--tl pf3-chip--3">
    <div class="pf3-chip-icon">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    </div>
    <div><p class="pf3-chip-val" dir="ltr">+11</p><p class="pf3-chip-lbl"><?= $isAr ? 'سنوات خبرة' : 'Years Experience' ?></p></div>
  </div>
  <div class="pf3-chip pf3-chip--tl pf3-chip--4">
    <div class="pf3-chip-icon">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    </div>
    <div><p class="pf3-chip-val" dir="ltr">+100</p><p class="pf3-chip-lbl"><?= $isAr ? 'براند يثق بنا' : 'Trusted Brands' ?></p></div>
  </div>

  <!-- Hero body -->
  <div class="container pf3-hero-body">

    <!-- Badge -->
    <div class="pf3-badge">
      <span class="pf3-badge-dot"></span>
      <span class="pf3-badge-txt"><?= $isAr ? 'معرض أعمالنا' : 'Our Portfolio' ?></span>
    </div>

    <!-- Headline -->
    <h1 class="pf3-h1">
      <?php if ($isAr): ?>
        مشاريع <span class="pf3-h1-grad">مميزة<span class="pf3-h1-line"></span></span>
      <?php else: ?>
        Featured <span class="pf3-h1-grad">Projects<span class="pf3-h1-line"></span></span>
      <?php endif; ?>
    </h1>

    <p class="pf3-hero-desc">
      <?= $isAr
        ? 'تصفح أرشيفنا المليء بالحملات الإعلانية الناجحة والمشاريع الإبداعية التي ساهمت في تغيير مسار علامات تجارية كبرى.'
        : 'Browse our rich archive of successful advertising campaigns and creative projects that helped reshape major brands.' ?>
    </p>

    <!-- Scroll hint -->
    <div class="pf3-scroll-hint">
      <span class="pf3-scroll-line"></span>
      <span class="pf3-scroll-txt"><?= $isAr ? 'تمرر لاستكشاف' : 'Scroll to explore' ?></span>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     STICKY FILTER BAR
════════════════════════════════════════ -->
<div class="pf3-filter-bar" id="pf3-filter">
  <div class="container">
    <div class="pf3-filter-inner no-scrollbar">

      <!-- All -->
      <button class="pf3-fbtn pf3-fbtn--active" data-cat="all">
        <span class="pf3-fbtn-bg"></span>
        <span class="pf3-fbtn-inner">
          <?= $isAr ? 'الكل' : 'All' ?>
          <span class="pf3-fbtn-count">(<?= $totalPf ?>)</span>
        </span>
      </button>

      <span class="pf3-fdivider"></span>

      <?php foreach ($catCounts as $arCat => $info): ?>
      <button class="pf3-fbtn" data-cat="<?= htmlspecialchars($arCat) ?>">
        <span class="pf3-fbtn-bg"></span>
        <span class="pf3-fbtn-inner">
          <?= htmlspecialchars($isAr ? $arCat : $info['en']) ?>
          <span class="pf3-fbtn-count">(<?= $info['cnt'] ?>)</span>
        </span>
      </button>
      <?php endforeach; ?>

    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════
     PORTFOLIO GRID — Editorial 3D
════════════════════════════════════════ -->
<section class="pf3-works" id="pf-works">
  <div class="container">

    <div class="pf3-grid" id="pf3-grid">
      <?php foreach ($portfolio as $i => $item):
        $title   = $isAr ? $item['title'] : ($item['title_en'] ?: $item['title']);
        $cat     = $isAr ? $item['category'] : ($item['category_en'] ?: $item['category']);
        $gallery = json_decode($item['gallery'] ?? '[]', true) ?: [];
        $flatIdx = $cardStart[$i];
        $spanCls = getSpanClass($i);
        $padIdx  = str_pad($i+1, 2, '0', STR_PAD_LEFT);
      ?>
      <article class="pf3-item <?= $spanCls ?> pf3-in"
               data-cat="<?= htmlspecialchars($item['category']) ?>"
               data-idx="<?= $flatIdx ?>"
               data-tilt>

        <!-- Image -->
        <div class="pf3-item-inner">
          <div class="pf3-item-img-wrap">
            <img class="pf3-item-img"
                 src="<?= imgUrl($item['image_url'], 800, 600, 82) ?>"
                 alt="<?= htmlspecialchars($title) ?>"
                 loading="<?= $i < 6 ? 'eager' : 'lazy' ?>"
                 onerror="this.closest('.pf3-item-img-wrap').style.background='#1a1a1a';this.style.display='none'" />
          </div>

          <!-- Dark gradient -->
          <div class="pf3-item-veil"></div>

          <!-- Mouse glare -->
          <div class="pf3-item-glare" aria-hidden="true"></div>

          <!-- Brand top line (appears on hover) -->
          <div class="pf3-item-topline"></div>

          <!-- Category chip -->
          <div class="pf3-item-cat-chip">
            <?= htmlspecialchars($cat) ?>
          </div>

          <!-- Index number -->
          <div class="pf3-item-idx" dir="ltr"><?= $padIdx ?></div>

          <!-- Bottom content -->
          <div class="pf3-item-body">
            <h2 class="pf3-item-title"><?= htmlspecialchars($title) ?></h2>
            <?php if (!empty($item['client']) || !empty($item['year'])): ?>
            <p class="pf3-item-meta">
              <?php if (!empty($item['client'])): ?>
                <span class="pf3-meta-dot"></span>
                <span><?= htmlspecialchars($item['client']) ?></span>
              <?php endif; ?>
              <?php if (!empty($item['year'])): ?>
                <span class="pf3-meta-yr" dir="ltr"><?= (int)$item['year'] ?></span>
              <?php endif; ?>
            </p>
            <?php endif; ?>
            <!-- View hint -->
            <div class="pf3-item-hint">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span><?= $isAr ? 'عرض التفاصيل' : 'View Details' ?></span>
            </div>
          </div>

          <!-- Corner accent -->
          <div class="pf3-corner"></div>
        </div>
      </article>
      <?php endforeach; ?>
    </div>

    <!-- Empty state -->
    <div id="pf3-empty" class="pf3-empty" style="display:none">
      <div class="pf3-empty-icon">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="6" height="6"/><rect x="9" y="3" width="6" height="6"/><rect x="16" y="3" width="6" height="6"/><rect x="2" y="10" width="6" height="6"/><rect x="9" y="10" width="6" height="6"/><rect x="16" y="10" width="6" height="6"/><rect x="2" y="17" width="6" height="6"/><rect x="9" y="17" width="6" height="6"/><rect x="16" y="17" width="6" height="6"/></svg>
      </div>
      <h3><?= $isAr ? 'لا توجد مشاريع في هذه الفئة' : 'No projects in this category' ?></h3>
      <button id="pf3-reset"><?= $isAr ? 'عرض جميع المشاريع' : 'Show All Projects' ?></button>
    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════
     STATS + CTA SECTION
════════════════════════════════════════ -->
<section class="pf3-stats-cta">
  <!-- Dot pattern bg -->
  <div class="pf3-dots-bg" aria-hidden="true">
    <svg width="100%" height="100%"><defs><pattern id="pd" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#pd)"/></svg>
  </div>

  <div class="container pf3-sc-inner">

    <!-- Stats grid -->
    <div class="pf3-stats-grid pf3-anim-in">
      <?php
      $stats = [
        ['+2400', $isAr?'مشروع ناجح':'Successful Projects', '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'],
        ['+11',   $isAr?'سنوات خبرة':'Years Experience',   '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'],
        ['+300',  $isAr?'عميل راضٍ':'Satisfied Clients',  '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>'],
        ['+100',  $isAr?'براند يثق بنا':'Trusted Brands',  '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'],
      ];
      foreach ($stats as $k => [$val, $lbl, $svgInner]): ?>
      <div class="pf3-stat-card" style="animation-delay:<?= $k * 0.1 ?>s">
        <div class="pf3-stat-topline"></div>
        <div class="pf3-stat-icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><?= $svgInner ?></svg>
        </div>
        <p class="pf3-stat-val" dir="ltr"><?= $val ?></p>
        <p class="pf3-stat-lbl"><?= $lbl ?></p>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- CTA block -->
    <div class="pf3-cta-block pf3-anim-in" style="animation-delay:0.4s">
      <div class="pf3-cta-glow"></div>
      <div class="pf3-cta-grad"></div>
      <div class="pf3-cta-content">
        <div class="pf3-cta-left">
          <p class="pf3-cta-eyebrow"><?= $isAr ? 'ابدأ مشروعك' : 'START YOUR PROJECT' ?></p>
          <h3 class="pf3-cta-h3">
            <?= $isAr
              ? 'هل لديك مشروع <span class="pf3-grad-txt">تريد تنفيذه؟</span>'
              : 'Got a Project in <span class="pf3-grad-txt">Mind?</span>' ?>
          </h3>
          <p class="pf3-cta-desc">
            <?= $isAr
              ? 'دعنا نحوّل رؤيتك إلى واقع. من الفكرة حتى التركيب النهائي — نحن نتولى كل شيء.'
              : 'Let\'s turn your vision into reality. From concept to installation — we handle everything.' ?>
          </p>
        </div>
        <div class="pf3-cta-right">
          <a href="https://wa.me/966563538520" target="_blank" rel="noopener" class="pf3-cta-btn-primary">
            <?= $isAr ? 'ابدأ الآن' : 'Start Now' ?>
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
          </a>
          <a href="/gallery<?= $langSuffix ?>" class="pf3-cta-btn-sec">
            <?= $isAr ? 'معرض الصور' : 'View Gallery' ?>
          </a>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════
     LIGHTBOX (fullscreen modal)
════════════════════════════════════════ -->
<div id="lb3" role="dialog" aria-modal="true">
  <div class="lb3-bg" id="lb3-bg"></div>
  <div class="lb3-overlay" id="lb3-overlay"></div>

  <!-- Close -->
  <button class="lb3-btn lb3-close" id="lb3-close" aria-label="<?= $isAr?'إغلاق':'Close' ?>">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>

  <!-- Counter -->
  <div class="lb3-counter" id="lb3-counter" dir="ltr">
    <span id="lb3-gcur">1</span> / <span id="lb3-gtotal">1</span>
  </div>

  <!-- Arrows -->
  <button class="lb3-btn lb3-arrow lb3-prev" id="lb3-prev">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <button class="lb3-btn lb3-arrow lb3-next" id="lb3-next">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
  </button>

  <!-- Stage -->
  <div class="lb3-stage">
    <div class="lb3-img-wrap" id="lb3-img-wrap">
      <img id="lb3-img" src="" alt="" />
    </div>
    <div class="lb3-info" id="lb3-info">
      <div class="lb3-info-line"></div>
      <span class="lb3-cat" id="lb3-cat"></span>
      <h2 class="lb3-title" id="lb3-title"></h2>
      <div class="lb3-meta" id="lb3-meta"></div>
      <p class="lb3-desc" id="lb3-desc"></p>
      <div class="lb3-meta-grid">
        <div class="lb3-meta-cell">
          <p class="lb3-meta-lbl"><?= $isAr ? 'التصنيف' : 'Category' ?></p>
          <p class="lb3-meta-val" id="lb3-cat2"></p>
        </div>
        <div class="lb3-meta-cell" id="lb3-year-cell">
          <p class="lb3-meta-lbl"><?= $isAr ? 'السنة' : 'Year' ?></p>
          <p class="lb3-meta-val lb3-meta-dir" id="lb3-year"></p>
        </div>
      </div>
      <a href="https://wa.me/966563538520" target="_blank" rel="noopener" class="lb3-cta">
        <?= $isAr ? 'اطلب مشروعاً مماثلاً' : 'Request Similar Project' ?>
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg>
      </a>
      <!-- Prev/Next inside modal -->
      <div class="lb3-nav">
        <button class="lb3-nav-btn" id="lb3-prev2">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          <?= $isAr ? 'السابق' : 'Prev' ?>
        </button>
        <span id="lb3-nav-counter" dir="ltr" class="lb3-nav-ctr"></span>
        <button class="lb3-nav-btn" id="lb3-next2">
          <?= $isAr ? 'التالي' : 'Next' ?>
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  </div>
</div>

<script>
/* ════════════════════════
   FILTER
════════════════════════ */
(function(){
  var btns  = document.querySelectorAll('.pf3-fbtn');
  var cards = document.querySelectorAll('.pf3-item');
  var empty = document.getElementById('pf3-empty');
  var cur   = 'all';

  function applyFilter(){
    var vis = 0;
    cards.forEach(function(c){
      var show = cur==='all' || c.dataset.cat===cur;
      c.style.display = show ? '' : 'none';
      if (show) vis++;
    });
    if (empty) empty.style.display = vis===0 ? 'flex' : 'none';
  }

  btns.forEach(function(btn){
    btn.addEventListener('click', function(){
      btns.forEach(function(b){ b.classList.remove('pf3-fbtn--active'); });
      btn.classList.add('pf3-fbtn--active');
      cur = btn.dataset.cat;
      applyFilter();
    });
  });

  document.getElementById('pf3-reset')?.addEventListener('click', function(){
    cur='all';
    btns.forEach(function(b){ b.classList.toggle('pf3-fbtn--active', b.dataset.cat==='all'); });
    applyFilter();
  });
})();

/* ════════════════════════
   SCROLL-IN
════════════════════════ */
(function(){
  var els = document.querySelectorAll('.pf3-in, .pf3-anim-in');
  if (!window.IntersectionObserver){ els.forEach(function(e){ e.classList.add('pf3-in--vis'); }); return; }
  var io = new IntersectionObserver(function(ent){
    ent.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('pf3-in--vis'); io.unobserve(e.target); } });
  },{threshold:.07});
  els.forEach(function(e){ io.observe(e); });
})();

/* ════════════════════════
   3D TILT
════════════════════════ */
(function(){
  document.querySelectorAll('[data-tilt]').forEach(function(card){
    var inner = card.querySelector('.pf3-item-inner');
    var glare = card.querySelector('.pf3-item-glare');
    var img   = card.querySelector('.pf3-item-img');
    if (!inner) return;
    inner.style.transition = 'transform .1s ease';
    img && (img.style.transition = 'transform .35s ease');

    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      inner.style.transform = 'perspective(900px) rotateY('+( x*10)+'deg) rotateX('+(-y*8)+'deg) scale3d(1.03,1.03,1.03)';
      if (img) img.style.transform = 'scale(1.08)';
      if (glare) {
        glare.style.background = 'radial-gradient(circle at '+((x+0.5)*100)+'% '+((y+0.5)*100)+'%, rgba(240,90,40,0.55) 0%, transparent 65%)';
        glare.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', function(){
      inner.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
      inner.style.transform  = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
      if (img){ img.style.transition='transform .5s ease'; img.style.transform='scale(1)'; }
      if (glare){ glare.style.opacity='0'; }
    });
  });
})();

/* ════════════════════════
   HERO chip float
════════════════════════ */
(function(){
  var chips = document.querySelectorAll('.pf3-chip');
  chips.forEach(function(c,i){
    c.style.animation = 'pf3-float '+(3.5+i*0.7)+'s ease-in-out infinite alternate';
    c.style.animationDelay = (i*0.4)+'s';
  });
})();

/* ════════════════════════
   LIGHTBOX
════════════════════════ */
var LB_DATA  = <?= json_encode($lbData, JSON_UNESCAPED_UNICODE) ?>;
var LB_TOTAL = <?= $lbTotal ?>;
var LB_IDX   = 0;
var LB_OPEN  = false;
var IS_AR    = <?= $isAr ? 'true' : 'false' ?>;
var LB_PROJECT_IDX = 0;    /* index in portfolio[] */
var LB_PROJECT_TOTAL = <?= $totalPf ?>;

/* Map flat lb index → project index */
var CARD_STARTS = <?= json_encode(array_values($cardStart)) ?>;

function lbGetProjectIdx(flatIdx){
  var pi = 0;
  for (var i=0; i<CARD_STARTS.length; i++){
    if (CARD_STARTS[i] <= flatIdx) pi=i; else break;
  }
  return pi;
}

document.querySelectorAll('.pf3-item').forEach(function(card){
  card.addEventListener('click', function(){ lbOpen(parseInt(card.dataset.idx)); });
});

var lb3     = document.getElementById('lb3');
var lb3Img  = document.getElementById('lb3-img');
var lb3Bg   = document.getElementById('lb3-bg');
var lb3Wrap = document.getElementById('lb3-img-wrap');

function lbOpen(idx){
  LB_IDX = ((idx % LB_TOTAL) + LB_TOTAL) % LB_TOTAL;
  LB_PROJECT_IDX = lbGetProjectIdx(LB_IDX);
  lb3.classList.add('lb3--open');
  document.body.style.overflow='hidden';
  LB_OPEN=true;
  lbRender(true);
}
function lbClose(){
  lb3.classList.remove('lb3--open');
  document.body.style.overflow='';
  LB_OPEN=false;
  setTimeout(function(){ lb3Img.src=''; if(lb3Bg) lb3Bg.style.backgroundImage=''; }, 300);
}
/* Navigate within current project's gallery */
function lbGoGallery(dir){
  lb3Wrap.classList.add('lb3--fade');
  LB_IDX = ((LB_IDX + dir) % LB_TOTAL + LB_TOTAL) % LB_TOTAL;
  LB_PROJECT_IDX = lbGetProjectIdx(LB_IDX);
  setTimeout(function(){ lbRender(false); lb3Wrap.classList.remove('lb3--fade'); }, 200);
}
/* Navigate to prev/next project */
function lbGoProject(dir){
  lb3Wrap.classList.add('lb3--fade');
  var newPi = ((LB_PROJECT_IDX + dir) % LB_PROJECT_TOTAL + LB_PROJECT_TOTAL) % LB_PROJECT_TOTAL;
  LB_IDX = CARD_STARTS[newPi];
  LB_PROJECT_IDX = newPi;
  setTimeout(function(){ lbRender(false); lb3Wrap.classList.remove('lb3--fade'); }, 200);
}

function lbRender(fast){
  var d = LB_DATA[LB_IDX];
  if (!d) return;
  if (lb3Bg) lb3Bg.style.backgroundImage='url('+d.img+')';
  if (!fast) lb3Img.style.opacity='0';
  lb3Img.src=d.img; lb3Img.alt=d.title;
  lb3Img.onload=function(){ lb3Img.style.transition='opacity .35s'; lb3Img.style.opacity='1'; };
  if (fast) lb3Img.style.opacity='';

  var el=function(id){ return document.getElementById(id); };
  var gcur=el('lb3-gcur'), gtot=el('lb3-gtotal');
  if(gcur) gcur.textContent=d.gidx;
  if(gtot) gtot.textContent=d.gtotal;

  var cat=el('lb3-cat'), cat2=el('lb3-cat2'), ttl=el('lb3-title');
  var meta=el('lb3-meta'), desc=el('lb3-desc');
  var yr=el('lb3-year'), yrCell=el('lb3-year-cell');
  var navCtr=el('lb3-nav-counter');

  if(cat)  cat.textContent=d.cat;
  if(cat2) cat2.textContent=d.cat;
  if(ttl)  ttl.textContent=d.title;
  if(yr)   yr.textContent=d.year||'';
  if(yrCell) yrCell.style.display=d.year?'':'none';
  if(meta){
    var m=[]; if(d.client) m.push(d.client); if(d.year) m.push(d.year);
    meta.textContent=m.join(' · '); meta.style.display=m.length?'':'none';
  }
  if(desc){ desc.textContent=d.desc; desc.style.display=d.desc?'':'none'; }
  if(navCtr) navCtr.textContent=(LB_PROJECT_IDX+1)+' / '+LB_PROJECT_TOTAL;
}

document.getElementById('lb3-close')?.addEventListener('click', lbClose);
document.getElementById('lb3-overlay')?.addEventListener('click', lbClose);
document.getElementById('lb3-prev')?.addEventListener('click', function(e){ e.stopPropagation(); lbGoGallery(IS_AR?1:-1); });
document.getElementById('lb3-next')?.addEventListener('click', function(e){ e.stopPropagation(); lbGoGallery(IS_AR?-1:1); });
document.getElementById('lb3-prev2')?.addEventListener('click', function(e){ e.stopPropagation(); lbGoProject(IS_AR?1:-1); });
document.getElementById('lb3-next2')?.addEventListener('click', function(e){ e.stopPropagation(); lbGoProject(IS_AR?-1:1); });

document.addEventListener('keydown', function(e){
  if (!LB_OPEN) return;
  if (e.key==='Escape')     lbClose();
  if (e.key==='ArrowLeft')  lbGoGallery(IS_AR?1:-1);
  if (e.key==='ArrowRight') lbGoGallery(IS_AR?-1:1);
  if (e.key==='ArrowUp')    lbGoProject(-1);
  if (e.key==='ArrowDown')  lbGoProject(1);
});
var _sx=0;
lb3?.addEventListener('touchstart',function(e){_sx=e.touches[0].clientX;},{passive:true});
lb3?.addEventListener('touchend',  function(e){var dx=e.changedTouches[0].clientX-_sx;if(Math.abs(dx)>44)lbGoGallery(dx<0?1:-1);},{passive:true});
</script>

<style>
/* ═══════════════════════════════════════════════
   PF3 — Portfolio 3D Design
═══════════════════════════════════════════════ */

/* ── Hero ── */
.pf3-hero {
  position: relative;
  min-height: 72vh;
  display: flex;
  align-items: flex-end;
  padding: 10rem 0 5rem;
  overflow: hidden;
  background: #030303;
}
.pf3-hero-bg {
  position: absolute; inset: 0; pointer-events: none; overflow: hidden;
}
.pf3-grid-svg {
  position: absolute; inset: 0; width: 100%; height: 100%;
  opacity: .04;
}
.pf3-glow-top {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 900px; height: 600px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(232,40,30,.08) 0%, transparent 70%);
  filter: blur(60px);
}
.pf3-glow-br {
  position: absolute; bottom: 0; right: 0;
  width: 500px; height: 400px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(240,90,40,.05) 0%, transparent 70%);
  filter: blur(80px);
}

/* Floating stat chips */
.pf3-chip {
  position: absolute; display: none;
  align-items: center; gap: 10px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  padding: 10px 16px;
  backdrop-filter: blur(8px);
}
@media (min-width: 1024px){ .pf3-chip { display: flex; } }
.pf3-chip--tr { right: 4%; }
.pf3-chip--tl { left: 4%; }
.pf3-chip--1  { top: 28%; }
.pf3-chip--2  { top: 22%; }
.pf3-chip--3  { top: 35%; }
.pf3-chip--4  { top: 42%; }
.pf3-chip-icon {
  width: 28px; height: 28px; flex-shrink: 0;
  background: linear-gradient(135deg,#E8281E,#F05A28);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}
.pf3-chip-val  { font-size: .85rem; font-weight: 900; color: #fff; line-height: 1; font-family: 'Poppins',sans-serif; }
.pf3-chip-lbl  { font-size: .6rem; color: rgba(255,255,255,.4); font-weight: 600; margin-top: 2px; }

@keyframes pf3-float {
  from { transform: translateY(0); }
  to   { transform: translateY(-8px); }
}

/* Hero body */
.pf3-hero-body { position: relative; z-index: 2; max-width: 900px; }

.pf3-badge {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(232,40,30,.3);
  background: rgba(232,40,30,.1);
  padding: 6px 14px; margin-bottom: 1.75rem;
}
.pf3-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #E8281E; animation: pulse 2s infinite;
}
.pf3-badge-txt {
  font-size: .65rem; font-weight: 900; letter-spacing: .2em;
  text-transform: uppercase; color: #E8281E;
}
@keyframes pulse {
  0%,100%{ opacity:1; transform:scale(1); }
  50%{ opacity:.5; transform:scale(1.4); }
}

.pf3-h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900; color: #fff;
  line-height: 1.0; margin: 0 0 1.5rem;
  letter-spacing: -.02em;
}
.pf3-h1-grad {
  display: inline-block; position: relative;
  background: linear-gradient(120deg, #E8281E 0%, #F05A28 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.pf3-h1-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg,#E8281E,#F05A28);
  animation: pf3-linein .6s .8s cubic-bezier(.22,1,.36,1) both;
  transform-origin: right;
}
[dir="rtl"] .pf3-h1-line { transform-origin: left; }
@keyframes pf3-linein { from{transform:scaleX(0)} to{transform:scaleX(1)} }

.pf3-hero-desc {
  font-size: clamp(1rem,1.4vw,1.2rem); color: rgba(255,255,255,.45);
  line-height: 1.75; max-width: 600px; margin-bottom: 2.5rem;
}

.pf3-scroll-hint {
  display: flex; align-items: center; gap: 12px;
}
.pf3-scroll-line { display: block; width: 32px; height: 1px; background: rgba(232,40,30,.5); }
.pf3-scroll-txt  { font-size: .6rem; font-weight: 900; letter-spacing: .3em; text-transform: uppercase; color: rgba(255,255,255,.25); }

/* ── Sticky Filter Bar ── */
.pf3-filter-bar {
  position: sticky; top: 68px; z-index: 50;
  background: rgba(3,3,3,.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.pf3-filter-inner {
  display: flex; align-items: center; gap: 4px;
  overflow-x: auto; padding: 10px 0;
  scrollbar-width: none;
}
.pf3-filter-inner::-webkit-scrollbar { display: none; }
.pf3-fdivider {
  width: 1px; height: 20px; background: rgba(255,255,255,.1);
  flex-shrink: 0; margin: 0 4px;
}

.pf3-fbtn {
  position: relative; flex-shrink: 0;
  padding: 7px 16px;
  background: transparent; border: none; cursor: pointer;
  font-family: inherit; font-size: .72rem; font-weight: 900;
  letter-spacing: .15em; text-transform: uppercase;
  color: rgba(255,255,255,.35);
  transition: color .25s;
}
.pf3-fbtn:hover { color: rgba(255,255,255,.65); }
.pf3-fbtn--active { color: #fff; }
.pf3-fbtn-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg,#E8281E,#F05A28);
  opacity: 0; transition: opacity .25s;
}
.pf3-fbtn--active .pf3-fbtn-bg { opacity: 1; }
.pf3-fbtn-inner { position: relative; z-index: 1; display: flex; align-items: center; gap: 6px; }
.pf3-fbtn-count { font-size: .6rem; color: rgba(255,255,255,.4); font-weight: 600; }
.pf3-fbtn--active .pf3-fbtn-count { color: rgba(255,255,255,.7); }

/* ── Portfolio Grid ── */
.pf3-works { padding: 3rem 0 5rem; background: #030303; }

.pf3-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 280px;
  gap: .75rem;
}
@media (min-width: 640px){
  .pf3-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
}

.pf3-span-wide   { grid-column: span 1; grid-row: span 1; }
.pf3-span-tall   { grid-column: span 1; grid-row: span 1; }
.pf3-span-normal { grid-column: span 1; grid-row: span 1; }

@media (min-width: 640px){
  .pf3-span-wide   { grid-column: span 2; grid-row: span 1; }
  .pf3-span-tall   { grid-column: span 1; grid-row: span 2; }
}

/* Card */
.pf3-item { position: relative; cursor: pointer; }
.pf3-item-inner {
  position: relative; width: 100%; height: 100%;
  overflow: hidden;
  background: #080808;
  border: 1px solid rgba(255,255,255,.05);
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color .5s;
}
.pf3-item:hover .pf3-item-inner {
  border-color: rgba(232,40,30,.35);
}

.pf3-item-img-wrap {
  position: absolute; inset: 0; overflow: hidden;
}
.pf3-item-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .65s cubic-bezier(.25,.46,.45,.94);
  display: block;
}

.pf3-item-veil {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.25) 45%, rgba(0,0,0,.05) 100%);
  opacity: .6; transition: opacity .5s;
}
.pf3-item:hover .pf3-item-veil { opacity: .9; }

.pf3-item-glare {
  position: absolute; inset: 0;
  opacity: 0; pointer-events: none;
  transition: opacity .3s;
}

.pf3-item-topline {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg,#E8281E,#F05A28);
  transform: scaleX(0); transform-origin: right;
  transition: transform .5s cubic-bezier(.22,1,.36,1);
}
[dir="rtl"] .pf3-item-topline { transform-origin: left; }
.pf3-item:hover .pf3-item-topline { transform: scaleX(1); }

.pf3-item-cat-chip {
  position: absolute; top: 14px; right: 14px;
  font-size: .58rem; font-weight: 900; letter-spacing: .18em;
  text-transform: uppercase;
  background: rgba(232,40,30,.9);
  backdrop-filter: blur(6px);
  color: #fff; padding: 4px 10px;
  transform: none;
}
[dir="rtl"] .pf3-item-cat-chip { right: auto; left: 14px; }

.pf3-item-idx {
  position: absolute; top: 14px; left: 14px;
  font-size: .58rem; font-weight: 700; font-family: 'Poppins',monospace;
  color: rgba(255,255,255,.2);
  opacity: 0; transition: opacity .35s;
}
[dir="rtl"] .pf3-item-idx { left: auto; right: 14px; }
.pf3-item:hover .pf3-item-idx { opacity: 1; }

.pf3-item-body {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 18px 20px;
  transform: translateY(8px);
  transition: transform .4s cubic-bezier(.22,1,.36,1);
}
.pf3-item:hover .pf3-item-body { transform: translateY(0); }

.pf3-item-title {
  font-size: clamp(.85rem, 1.1vw, 1rem); font-weight: 900; color: #fff;
  line-height: 1.3; margin: 0 0 6px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.pf3-span-wide .pf3-item-title { font-size: clamp(1rem, 1.4vw, 1.2rem); }

.pf3-item-meta {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  font-size: .65rem; color: rgba(255,255,255,.45); font-weight: 600;
  margin: 0;
}
.pf3-meta-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: #E8281E; flex-shrink: 0;
}
.pf3-meta-yr { opacity: .6; }

.pf3-item-hint {
  display: flex; align-items: center; gap: 6px;
  margin-top: 10px;
  opacity: 0; transition: opacity .3s;
  color: #E8281E; font-size: .6rem; font-weight: 900;
  letter-spacing: .15em; text-transform: uppercase;
}
.pf3-item:hover .pf3-item-hint { opacity: 1; }

.pf3-corner {
  position: absolute; bottom: 0; left: 0;
  width: 0; height: 0;
  border-left: 36px solid rgba(232,40,30,.2);
  border-top: 36px solid transparent;
  opacity: 0; transition: opacity .3s;
}
[dir="rtl"] .pf3-corner { left: auto; right: 0; border-left: none; border-right: 36px solid rgba(232,40,30,.2); }
.pf3-item:hover .pf3-corner { opacity: 1; }

/* Scroll-in */
.pf3-in { opacity: 0; transform: translateY(40px) scale(.97); transition: opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
.pf3-in--vis { opacity: 1; transform: none; }
.pf3-grid .pf3-item:nth-child(2)  { transition-delay: .06s; }
.pf3-grid .pf3-item:nth-child(3)  { transition-delay: .12s; }
.pf3-grid .pf3-item:nth-child(4)  { transition-delay: .16s; }
.pf3-grid .pf3-item:nth-child(5)  { transition-delay: .2s; }
.pf3-grid .pf3-item:nth-child(n+6){ transition-delay: .24s; }

/* Empty */
.pf3-empty {
  display: none; flex-direction: column; align-items: center; justify-content: center;
  padding: 6rem 2rem; text-align: center; gap: 1.25rem;
}
.pf3-empty-icon {
  width: 80px; height: 80px; border: 1px solid rgba(255,255,255,.08);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.2);
}
.pf3-empty h3 { font-size: 1.4rem; font-weight: 900; color: #fff; margin: 0; }
.pf3-empty button {
  padding: 10px 24px;
  background: linear-gradient(135deg,#E8281E,#F05A28);
  border: none; color: #fff; font-family: inherit;
  font-size: .75rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase;
  cursor: pointer; margin-top: 8px;
}

/* ── Stats + CTA ── */
.pf3-stats-cta {
  position: relative; overflow: hidden;
  background: #030303;
  padding: 5rem 0 6rem;
}
.pf3-dots-bg {
  position: absolute; inset: 0; opacity: .03; pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(232,40,30,.03), transparent);
}
.pf3-sc-inner { position: relative; z-index: 1; }

.pf3-stats-grid {
  display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (min-width: 1024px){ .pf3-stats-grid { grid-template-columns: repeat(4,1fr); } }

.pf3-stat-card {
  position: relative; overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.02);
  padding: 24px; group: '';
  transition: background .3s, border-color .3s;
}
.pf3-stat-card:hover {
  background: rgba(255,255,255,.05);
  border-color: rgba(232,40,30,.3);
}
.pf3-stat-topline {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg,#E8281E,#F05A28);
  transform: scaleX(0); transform-origin: right;
  transition: transform .5s cubic-bezier(.22,1,.36,1);
}
[dir="rtl"] .pf3-stat-topline { transform-origin: left; }
.pf3-stat-card:hover .pf3-stat-topline { transform: scaleX(1); }
.pf3-stat-icon {
  width: 40px; height: 40px; margin-bottom: 14px;
  background: rgba(232,40,30,.1); border: 1px solid rgba(232,40,30,.2);
  display: flex; align-items: center; justify-content: center;
  color: #E8281E;
}
.pf3-stat-val {
  font-size: 1.9rem; font-weight: 900; margin: 0 0 4px;
  background: linear-gradient(120deg,#E8281E,#F05A28);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  font-family: 'Poppins',sans-serif;
}
.pf3-stat-lbl { font-size: .7rem; color: rgba(255,255,255,.4); font-weight: 600; margin: 0; }

/* Stats + CTA scroll-in */
.pf3-anim-in { opacity: 0; transform: translateY(30px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
.pf3-anim-in.pf3-in--vis { opacity: 1; transform: none; }

/* CTA block */
.pf3-cta-block {
  position: relative; overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.02);
  padding: 2.5rem 2.5rem;
}
@media (min-width: 640px){ .pf3-cta-block { padding: 3.5rem 4rem; } }
.pf3-cta-glow {
  position: absolute; top: 0; right: 0;
  width: 250px; height: 250px; border-radius: 50%;
  background: radial-gradient(circle, rgba(232,40,30,.12) 0%, transparent 70%);
  filter: blur(40px); pointer-events: none;
}
.pf3-cta-grad {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(232,40,30,.04), transparent, rgba(240,90,40,.04));
  pointer-events: none;
}
.pf3-cta-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; gap: 2rem;
}
@media (min-width: 1024px){
  .pf3-cta-content { flex-direction: row; align-items: center; justify-content: space-between; }
}
.pf3-cta-left { max-width: 580px; }
.pf3-cta-eyebrow {
  font-size: .6rem; font-weight: 900; letter-spacing: .3em;
  text-transform: uppercase; color: #E8281E; margin: 0 0 10px;
}
.pf3-cta-h3 {
  font-size: clamp(1.6rem,3vw,2.4rem); font-weight: 900; color: #fff;
  line-height: 1.2; margin: 0 0 12px;
}
.pf3-grad-txt {
  background: linear-gradient(120deg,#E8281E,#F05A28);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pf3-cta-desc { font-size: .95rem; color: rgba(255,255,255,.4); line-height: 1.75; margin: 0; }
.pf3-cta-right { display: flex; flex-direction: column; gap: .75rem; flex-shrink: 0; }
@media (min-width: 480px){ .pf3-cta-right { flex-direction: row; } }

.pf3-cta-btn-primary {
  display: inline-flex; align-items: center; gap: 8px; justify-content: center;
  padding: 14px 32px;
  background: linear-gradient(135deg,#E8281E,#F05A28);
  color: #fff; font-weight: 900; font-size: .8rem;
  letter-spacing: .05em; text-decoration: none;
  transition: opacity .25s;
}
.pf3-cta-btn-primary:hover { opacity: .88; }
.pf3-cta-btn-sec {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 14px 32px;
  border: 1px solid rgba(255,255,255,.15); color: #fff;
  font-weight: 900; font-size: .8rem; text-decoration: none;
  transition: background .25s, border-color .25s;
}
.pf3-cta-btn-sec:hover { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.3); }

/* ════ LIGHTBOX ════ */
#lb3 {
  display: none; position: fixed; inset: 0; z-index: 9000;
  flex-direction: column; align-items: center; justify-content: center;
}
#lb3.lb3--open { display: flex; animation: lb3-in .28s ease; }
@keyframes lb3-in { from{opacity:0} to{opacity:1} }

.lb3-bg {
  position: absolute; inset: -30px; z-index: 0;
  background-size: cover; background-position: center;
  filter: blur(55px) brightness(.1) saturate(1.5);
}
.lb3-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: rgba(0,0,0,.6); cursor: pointer;
}

.lb3-btn {
  background: rgba(255,255,255,.07); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.6);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .22s;
}
.lb3-btn:hover { background: rgba(255,255,255,.15); color: #fff; }

.lb3-close {
  position: absolute; top: 1.4rem; inset-inline-start: 1.4rem; z-index: 30;
  width: 40px; height: 40px;
}
.lb3-close:hover { background: #E8281E; border-color: #E8281E; color: #fff; }

.lb3-counter {
  position: absolute; top: 1.55rem; inset-inline-end: 1.4rem; z-index: 30;
  font-size: .75rem; font-family: 'Poppins',monospace; color: rgba(255,255,255,.35);
}

.lb3-arrow {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 30;
  width: 48px; height: 48px;
}
.lb3-prev { inset-inline-start: 1.4rem; }
.lb3-next { inset-inline-end: 1.4rem; }
@media (max-width: 640px){ .lb3-arrow { display: none; } }

.lb3-stage {
  position: relative; z-index: 10;
  display: flex; align-items: center; gap: 2.5rem;
  max-width: 1100px; width: 100%; padding: 0 5rem;
}
@media (max-width: 900px){ .lb3-stage { flex-direction: column; padding: 0 1rem; gap: 1.25rem; } }

.lb3-img-wrap {
  flex: 1; display: flex; align-items: center; justify-content: center;
  max-height: 72vh;
}
.lb3-img-wrap.lb3--fade { opacity: 0; transition: opacity .2s; }
#lb3-img {
  max-width: 100%; max-height: 72vh; object-fit: contain;
  box-shadow: 0 40px 120px rgba(0,0,0,.9); display: block;
}

.lb3-info { width: 260px; flex-shrink: 0; }
@media (max-width: 900px){ .lb3-info { width: 100%; max-width: 540px; } }

.lb3-info-line { width: 32px; height: 2px; background: linear-gradient(90deg,#E8281E,#F05A28); margin-bottom: 18px; }

.lb3-cat {
  display: block; font-size: .58rem; font-weight: 900; letter-spacing: .18em;
  text-transform: uppercase;
  background: linear-gradient(120deg,#E8281E,#F05A28);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 8px;
}
.lb3-title {
  font-size: clamp(.95rem,2vw,1.3rem); font-weight: 900;
  color: #fff; margin: 0 0 10px; line-height: 1.3;
}
.lb3-meta {
  font-size: .72rem; color: rgba(255,255,255,.35);
  margin-bottom: 10px; letter-spacing: .02em;
}
.lb3-desc {
  font-size: .78rem; color: rgba(255,255,255,.3);
  line-height: 1.75; margin-bottom: 1rem;
}

.lb3-meta-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-bottom: 1.2rem;
}
.lb3-meta-cell {
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); padding: 10px 12px;
}
.lb3-meta-lbl { font-size: .58rem; color: rgba(255,255,255,.3); font-weight: 900; letter-spacing: .15em; text-transform: uppercase; margin: 0 0 3px; }
.lb3-meta-val { font-size: .82rem; font-weight: 700; color: #fff; margin: 0; }

.lb3-cta {
  display: inline-flex; align-items: center; gap: 8px; width: 100%; justify-content: center;
  padding: 13px; margin-bottom: 1rem;
  background: linear-gradient(135deg,#E8281E,#F05A28);
  color: #fff; font-size: .8rem; font-weight: 900; text-decoration: none;
  transition: opacity .25s;
}
.lb3-cta:hover { opacity: .88; }

.lb3-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 12px; border-top: 1px solid rgba(255,255,255,.07);
}
.lb3-nav-btn {
  display: flex; align-items: center; gap: 5px;
  background: none; border: none; color: rgba(255,255,255,.35);
  font-size: .7rem; font-weight: 700; cursor: pointer; font-family: inherit;
  transition: color .2s;
}
.lb3-nav-btn:hover { color: #fff; }
.lb3-nav-ctr { font-size: .65rem; font-family: 'Poppins',monospace; color: rgba(255,255,255,.2); }
</style>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
