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
$lbData    = [];   /* flat array of all slides          */
$cardStart = [];   /* cardStart[project_index] = flat lb index */

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
            'gidx'  => $gi + 1,   /* 1-based position within project */
            'gtotal'=> $total,     /* total images in project         */
        ];
    }
}
$lbTotal = count($lbData);
?>

<!-- ═══ HERO ═══ -->
<?php
$heroBgs = [
  '/images/portfolio/khayallah_facade_night_1.jpeg',
  '/images/portfolio/express_motors_1.jpeg',
  '/images/portfolio/inmar_facade.jpeg',
  '/images/portfolio/enterprise_1.jpeg',
  '/images/portfolio/theroof_1.jpeg',
];
?>
<section class="pf-hero">
  <div class="pf-hero-visual" id="pf-hero-visual">
    <?php foreach ($heroBgs as $bi => $bg): ?>
    <div class="pf-hero-slide<?= $bi === 0 ? ' active' : '' ?>">
      <img src="<?= imgUrl($bg, 1600, 900, 68) ?>"
           alt="" aria-hidden="true"
           loading="<?= $bi === 0 ? 'eager' : 'lazy' ?>" />
    </div>
    <?php endforeach; ?>
    <div class="pf-hero-veil"></div>
    <!-- dot indicators -->
    <div class="pf-hero-dots">
      <?php foreach ($heroBgs as $bi => $_): ?>
      <span class="pf-hdot<?= $bi === 0 ? ' on' : '' ?>"></span>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="container pf-hero-body">
    <p class="pf-hero-eyebrow">
      <span class="pf-hero-line"></span>
      <?= $isAr ? 'معرض أعمالنا' : 'Our Portfolio' ?>
    </p>
    <h1 class="pf-hero-h1">
      <?php if ($isAr): ?>
        كل مشروع<br><em>قصة نجاح</em>
      <?php else: ?>
        Every project<br><em>a success story</em>
      <?php endif; ?>
    </h1>
    <div class="pf-hero-foot">
      <div class="pf-hero-stats">
        <?php foreach([['+2400',$isAr?'مشروع':'Projects'],['+11',$isAr?'سنة':'Years'],['+300',$isAr?'عميل':'Clients']] as [$n,$l]): ?>
        <div class="pf-stat">
          <span class="pf-stat-n" dir="ltr"><?= $n ?></span>
          <span class="pf-stat-l"><?= $l ?></span>
        </div>
        <?php endforeach; ?>
      </div>
      <a href="#pf-works" class="pf-hero-scroll">
        <span><?= $isAr ? 'استعرض الأعمال' : 'Browse Work' ?></span>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- ═══ WORKS ═══ -->
<section class="pf-works" id="pf-works">
  <div class="container">

    <!-- Filter bar -->
    <nav class="pf-nav" id="pf-nav" aria-label="<?= $isAr?'تصفية':'Filter' ?>">
      <button class="pf-nav-btn active" data-cat="all">
        <?= $isAr ? 'الكل' : 'All' ?>
        <span class="pf-nav-count"><?= $totalPf ?></span>
      </button>
      <?php foreach ($catCounts as $arCat => $info): ?>
      <button class="pf-nav-btn" data-cat="<?= htmlspecialchars($arCat) ?>">
        <?= htmlspecialchars($isAr ? $arCat : $info['en']) ?>
        <span class="pf-nav-count"><?= $info['cnt'] ?></span>
      </button>
      <?php endforeach; ?>
    </nav>

    <!-- Grid -->
    <div class="pf-grid" id="pf-grid">
      <?php foreach ($portfolio as $i => $item):
        $title   = $isAr ? $item['title'] : ($item['title_en'] ?: $item['title']);
        $cat     = $isAr ? $item['category'] : ($item['category_en'] ?: $item['category']);
        $gallery = json_decode($item['gallery'] ?? '[]', true) ?: [];
        $imgCount = count($gallery) + 1;   /* cover + gallery */
        $isFeat   = ($i % 7 === 0);
        $flatIdx  = $cardStart[$i];        /* starting index in flat lb array */
      ?>
      <article class="pf-item<?= $isFeat ? ' pf-item--feat' : '' ?> pf-in"
               data-cat="<?= htmlspecialchars($item['category']) ?>"
               data-idx="<?= $flatIdx ?>">

        <div class="pf-item-img">
          <img src="<?= imgUrl($item['image_url'], $isFeat ? 900 : 600, $isFeat ? 600 : 450, 82) ?>"
               alt="<?= htmlspecialchars($title) ?>"
               loading="<?= $i < 8 ? 'eager' : 'lazy' ?>"
               onerror="this.parentElement.style.background='#1a1a1a';this.style.display='none'" />
          <?php if ($imgCount > 1): ?>
          <span class="pf-img-count">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:inline-block;vertical-align:middle;margin-<?= $isAr?'left':'right' ?>:3px"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            <?= $imgCount ?>
          </span>
          <?php endif; ?>
        </div>

        <div class="pf-item-layer">
          <div class="pf-item-body">
            <span class="pf-item-cat"><?= htmlspecialchars($cat) ?></span>
            <h2 class="pf-item-title"><?= htmlspecialchars($title) ?></h2>
            <div class="pf-item-meta">
              <?php if (!empty($item['client'])): ?><span><?= htmlspecialchars($item['client']) ?></span><?php endif; ?>
              <?php if (!empty($item['year'])): ?><span class="pf-meta-sep">·</span><span dir="ltr"><?= (int)$item['year'] ?></span><?php endif; ?>
            </div>
          </div>
          <div class="pf-item-icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <polyline points="<?= $isAr ? '15 18 9 12 15 6' : '9 18 15 12 9 6' ?>"/>
            </svg>
          </div>
        </div>

        <span class="pf-item-idx" dir="ltr"><?= str_pad($i+1,2,'0',STR_PAD_LEFT) ?></span>
      </article>
      <?php endforeach; ?>
    </div>

    <!-- Empty -->
    <div id="pf-empty" class="pf-empty" style="display:none">
      <p><?= $isAr ? 'لا توجد مشاريع في هذه الفئة' : 'No projects in this category' ?></p>
      <button id="pf-reset"><?= $isAr ? 'عرض الكل' : 'Show All' ?></button>
    </div>

  </div>
</section>

<!-- ═══ LIGHTBOX ═══ -->
<div id="lb" role="dialog" aria-modal="true">
  <div class="lb-bg" id="lb-bg"></div>
  <div class="lb-overlay" id="lb-overlay"></div>

  <button class="lb-btn lb-close" id="lb-close">
    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>

  <div class="lb-counter" id="lb-counter" dir="ltr">
    <span id="lb-gcur">1</span> / <span id="lb-gtotal">1</span>
  </div>

  <button class="lb-btn lb-arrow lb-prev" id="lb-prev">
    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <button class="lb-btn lb-arrow lb-next" id="lb-next">
    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
  </button>

  <div class="lb-stage">
    <div class="lb-img-wrap" id="lb-img-wrap">
      <img id="lb-img" src="" alt="" />
    </div>
    <div class="lb-info" id="lb-info">
      <span class="lb-cat" id="lb-cat"></span>
      <h2 class="lb-title" id="lb-title"></h2>
      <div class="lb-meta" id="lb-meta"></div>
      <p class="lb-desc" id="lb-desc"></p>
      <a href="/contact<?= $langSuffix ?>" class="lb-cta">
        <?= $isAr ? 'اطلب مشروعاً مماثلاً ←' : 'Request Similar →' ?>
      </a>
    </div>
  </div>
</div>

<!-- ═══ CTA STRIP ═══ -->
<section class="pf-cta">
  <div class="container pf-cta-inner">
    <h2><?= $isAr ? 'هل لديك مشروع؟' : 'Have a project?' ?></h2>
    <p><?= $isAr ? 'دعنا نحوّله إلى واقع' : 'Let us bring it to life' ?></p>
    <div class="pf-cta-btns">
      <a href="/contact<?= $langSuffix ?>" class="btn-primary"><?= $isAr ? 'ابدأ الآن' : 'Get Started' ?></a>
      <a href="https://wa.me/966563538520" target="_blank" class="pf-cta-wa">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.984 0C5.374 0 0 5.373 0 11.984c0 2.093.544 4.056 1.491 5.764L0 24l6.375-1.471C8.032 23.471 9.975 24 11.984 24 18.594 24 18.627 24 24 12.016 24 5.373 18.594 0 11.984 0zm0 21.818c-1.878 0-3.637-.508-5.145-1.388l-.371-.222-3.786.871.891-3.682-.24-.38a9.793 9.793 0 01-1.498-5.233c0-5.411 4.405-9.816 9.816-9.816 5.412 0 9.817 4.405 9.817 9.816 0 5.41-4.405 9.834-9.484 9.834z"/></svg>
        واتساب
      </a>
    </div>
  </div>
</section>

<script>
/* ── Hero slideshow ── */
(function(){
  var slides = document.querySelectorAll('.pf-hero-slide');
  var dots   = document.querySelectorAll('.pf-hdot');
  var n = slides.length, cur = 0;
  if (n < 2) return;
  setInterval(function(){
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('on');
    cur = (cur + 1) % n;
    slides[cur].classList.add('active');
    dots[cur].classList.add('on');
    /* restart drift animation */
    var img = slides[cur].querySelector('img');
    if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
  }, 5000);
})();

var LB_DATA  = <?= json_encode($lbData, JSON_UNESCAPED_UNICODE) ?>;
var LB_TOTAL = <?= $lbTotal ?>;
var LB_IDX   = 0;
var LB_OPEN  = false;
var IS_AR    = <?= $isAr ? 'true' : 'false' ?>;

/* ── Scroll-in animation ── */
(function(){
  var els = document.querySelectorAll('.pf-in');
  if (!window.IntersectionObserver) { els.forEach(function(e){ e.classList.add('pf-in--vis'); }); return; }
  var io = new IntersectionObserver(function(ent){
    ent.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('pf-in--vis'); io.unobserve(e.target); } });
  }, {threshold:.07});
  els.forEach(function(e){ io.observe(e); });
})();

/* ── Card click → lightbox ── */
document.querySelectorAll('.pf-item').forEach(function(card){
  card.addEventListener('click', function(){ lbOpen(parseInt(card.dataset.idx)); });
});

/* ── LIGHTBOX ── */
var lb    = document.getElementById('lb');
var lbImg = document.getElementById('lb-img');
var lbBg  = document.getElementById('lb-bg');
var lbWrap= document.getElementById('lb-img-wrap');
var lbCur = document.getElementById('lb-cur');

function lbOpen(idx){
  LB_IDX = (idx % LB_TOTAL + LB_TOTAL) % LB_TOTAL;
  lb.classList.add('lb--open');
  document.body.style.overflow = 'hidden';
  LB_OPEN = true;
  lbRender(true);
}
function lbClose(){
  lb.classList.remove('lb--open');
  document.body.style.overflow = '';
  LB_OPEN = false;
  setTimeout(function(){ lbImg.src=''; if(lbBg) lbBg.style.backgroundImage=''; }, 300);
}
function lbGo(dir){
  lbWrap.classList.add('lb--fade');
  LB_IDX = ((LB_IDX + dir) % LB_TOTAL + LB_TOTAL) % LB_TOTAL;
  setTimeout(function(){ lbRender(false); lbWrap.classList.remove('lb--fade'); }, 200);
}
function lbRender(fast){
  var d = LB_DATA[LB_IDX];
  if (!d) return;
  if (lbBg) lbBg.style.backgroundImage = 'url('+d.img+')';
  if (!fast){ lbImg.style.opacity='0'; }
  lbImg.src = d.img; lbImg.alt = d.title;
  lbImg.onload = function(){ lbImg.style.transition='opacity .35s'; lbImg.style.opacity='1'; };
  if (fast) lbImg.style.opacity='';
  var gcur   = document.getElementById('lb-gcur');
  var gtotal = document.getElementById('lb-gtotal');
  if (gcur)   gcur.textContent   = d.gidx;
  if (gtotal) gtotal.textContent = d.gtotal;
  var cat  = document.getElementById('lb-cat');
  var ttl  = document.getElementById('lb-title');
  var meta = document.getElementById('lb-meta');
  var desc = document.getElementById('lb-desc');
  if (cat)  cat.textContent  = d.cat;
  if (ttl)  ttl.textContent  = d.title;
  if (meta) {
    var m = [];
    if (d.client) m.push(d.client);
    if (d.year)   m.push(d.year);
    meta.textContent = m.join('  ·  ');
    meta.style.display = m.length ? '' : 'none';
  }
  if (desc) { desc.textContent = d.desc; desc.style.display = d.desc ? '' : 'none'; }
}

document.getElementById('lb-close')?.addEventListener('click', lbClose);
document.getElementById('lb-overlay')?.addEventListener('click', lbClose);
document.getElementById('lb-prev')?.addEventListener('click', function(e){ e.stopPropagation(); lbGo(-1); });
document.getElementById('lb-next')?.addEventListener('click', function(e){ e.stopPropagation(); lbGo(1); });
document.addEventListener('keydown', function(e){
  if (!LB_OPEN) return;
  if (e.key==='Escape')    lbClose();
  if (e.key==='ArrowLeft') lbGo(IS_AR ? 1 : -1);
  if (e.key==='ArrowRight')lbGo(IS_AR ? -1 : 1);
});
var _sx=0;
lb?.addEventListener('touchstart',function(e){_sx=e.touches[0].clientX;},{passive:true});
lb?.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-_sx;if(Math.abs(dx)>44)lbGo(dx<0?1:-1);},{passive:true});

/* ── FILTER ── */
var navBtns = document.querySelectorAll('.pf-nav-btn');
var cards   = document.querySelectorAll('.pf-item');
var empty   = document.getElementById('pf-empty');
var curCat  = 'all';

function applyFilter(){
  var vis = 0;
  cards.forEach(function(c){
    var show = curCat === 'all' || c.dataset.cat === curCat;
    c.style.display = show ? '' : 'none';
    if (show) vis++;
  });
  if (empty) empty.style.display = vis===0 ? 'block' : 'none';
}
navBtns.forEach(function(btn){
  btn.addEventListener('click', function(){
    navBtns.forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    curCat = btn.dataset.cat;
    applyFilter();
  });
});
document.getElementById('pf-reset')?.addEventListener('click', function(){
  curCat='all';
  navBtns.forEach(function(b){ b.classList.toggle('active', b.dataset.cat==='all'); });
  applyFilter();
});
</script>

<style>
/* ════════════════════════════════
   PORTFOLIO v2 — Clean & Professional
════════════════════════════════ */

/* ── Hero ── */
.pf-hero {
  position: relative;
  height: clamp(560px, 85vh, 900px);
  display: flex; align-items: flex-end;
  overflow: hidden;
}
.pf-hero-visual {
  position: absolute; inset: 0;
}

/* Slides */
.pf-hero-slide {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 1.6s ease;
}
.pf-hero-slide.active { opacity: 1; }
.pf-hero-slide img {
  width: 100%; height: 100%; object-fit: cover;
  transform: scale(1.06);
  animation: pf-drift 18s ease-in-out alternate infinite;
}
@keyframes pf-drift {
  from { transform: scale(1.06) translateX(0); }
  to   { transform: scale(1.06) translateX(-2%); }
}
.pf-hero-veil {
  position: absolute; inset: 0; z-index: 2;
  background:
    linear-gradient(to top,  #040404 0%, rgba(4,4,4,1) 28%, rgba(4,4,4,.82) 52%, rgba(4,4,4,.5) 75%, rgba(4,4,4,.18) 100%),
    linear-gradient(to right, rgba(4,4,4,.85) 0%, rgba(4,4,4,.35) 55%, transparent 100%);
}
.pf-hero-slide img { filter: brightness(.42); }

/* Dot indicators */
.pf-hero-dots {
  position: absolute; bottom: 1.6rem; inset-inline-end: 1.75rem;
  z-index: 3; display: flex; align-items: center; gap: .45rem;
}
.pf-hdot {
  width: 5px; height: 5px; border-radius: 99px;
  background: rgba(255,255,255,.28); transition: all .45s ease;
  cursor: default;
}
.pf-hdot.on { width: 24px; background: var(--primary); }
.pf-hero-body {
  position: relative; z-index: 3;
  padding-bottom: clamp(3rem, 7vh, 6rem);
  max-width: 780px;
}
.pf-hero-eyebrow {
  display: flex; align-items: center; gap: .75rem;
  font-size: .7rem; font-weight: 700; letter-spacing: .2em;
  text-transform: uppercase; color: rgba(255,255,255,.45);
  margin: 0 0 1.5rem;
}
.pf-hero-line {
  display: block; width: 36px; height: 1px;
  background: var(--primary);
}
.pf-hero-h1 {
  font-size: clamp(2.8rem, 7vw, 6rem);
  font-weight: 900; color: #fff;
  line-height: 1.1; margin: 0 0 3rem;
  letter-spacing: -.02em;
}
.pf-hero-h1 em {
  font-style: normal;
  background: linear-gradient(120deg, #fff 30%, var(--primary) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.pf-hero-foot {
  display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap; gap: 2rem;
}
.pf-hero-stats { display: flex; gap: 2.5rem; }
.pf-stat { display: flex; flex-direction: column; gap: .15rem; }
.pf-stat-n {
  font-size: 1.5rem; font-weight: 900; color: #fff;
  font-family: 'Poppins', sans-serif; line-height: 1;
}
.pf-stat-l {
  font-size: .62rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: rgba(255,255,255,.3);
}
.pf-hero-scroll {
  display: inline-flex; align-items: center; gap: .55rem;
  font-size: .78rem; font-weight: 700; color: rgba(255,255,255,.5);
  text-decoration: none; letter-spacing: .04em;
  transition: color .25s, gap .25s;
}
.pf-hero-scroll:hover { color: #fff; gap: .8rem; }

/* ── Works section ── */
.pf-works { padding: 5rem 0 7rem; }

/* Filter nav */
.pf-nav {
  display: flex; flex-wrap: wrap; gap: .35rem;
  margin-bottom: 3.5rem;
  border-bottom: 1px solid rgba(255,255,255,.07);
  padding-bottom: 1.5rem;
}
.pf-nav-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .38rem .9rem;
  background: transparent; border: 1px solid transparent;
  color: rgba(255,255,255,.35); font-size: .8rem; font-weight: 700;
  cursor: pointer; border-radius: 9999px; transition: all .22s;
  font-family: inherit; white-space: nowrap;
}
.pf-nav-btn:hover { color: rgba(255,255,255,.7); border-color: rgba(255,255,255,.15); }
.pf-nav-btn.active {
  color: #fff; border-color: var(--primary);
  background: rgba(232,40,30,.1);
}
.pf-nav-count {
  font-size: .65rem; font-family: 'Poppins', monospace;
  color: rgba(255,255,255,.25); font-weight: 600;
}
.pf-nav-btn.active .pf-nav-count { color: rgba(255,255,255,.5); }

/* Grid */
.pf-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .75rem;
}
@media (min-width: 768px)  { .pf-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; } }
@media (min-width: 1200px) { .pf-grid { grid-template-columns: repeat(4, 1fr); gap: 1.25rem; } }

/* Items */
.pf-item {
  position: relative; overflow: hidden;
  border-radius: 10px; cursor: pointer;
  background: #111; aspect-ratio: 3/4;
  transition: transform .4s cubic-bezier(.25,.46,.45,.94);
}
.pf-item--feat {
  grid-column: span 2;
  aspect-ratio: 16/9;
}
@media (max-width: 767px) {
  .pf-item--feat { grid-column: span 2; aspect-ratio: 4/3; }
}
.pf-item:hover { transform: translateY(-4px); }

/* Image */
.pf-item-img {
  position: absolute; inset: 0;
  overflow: hidden;
}
.pf-item-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .65s cubic-bezier(.25,.46,.45,.94);
}
.pf-item:hover .pf-item-img img { transform: scale(1.06); }

/* Gallery count badge */
.pf-img-count {
  position: absolute; top: .7rem; inset-inline-end: .7rem;
  background: rgba(0,0,0,.6); backdrop-filter: blur(6px);
  color: #fff; font-size: .72rem; font-weight: 600;
  padding: .2rem .5rem; border-radius: 20px;
  letter-spacing: .03em; line-height: 1.6;
  display: flex; align-items: center; gap: 3px;
  pointer-events: none; z-index: 2;
}

/* Overlay layer */
.pf-item-layer {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.35) 45%, transparent 72%);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 1.2rem;
  opacity: .85; transition: opacity .3s;
}
.pf-item:hover .pf-item-layer { opacity: 1; }

.pf-item-body { }
.pf-item-cat {
  display: block;
  font-size: .6rem; font-weight: 900; letter-spacing: .14em;
  text-transform: uppercase; color: var(--primary);
  margin-bottom: .35rem;
  transform: translateY(4px); opacity: 0;
  transition: transform .3s, opacity .3s;
}
.pf-item:hover .pf-item-cat { transform: translateY(0); opacity: 1; }

.pf-item-title {
  font-size: .9rem; font-weight: 900; color: #fff;
  line-height: 1.3; margin: 0 0 .3rem;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.pf-item--feat .pf-item-title { font-size: 1.15rem; }

.pf-item-meta {
  display: flex; align-items: center; gap: .4rem;
  font-size: .7rem; color: rgba(255,255,255,.4);
  transform: translateY(4px); opacity: 0;
  transition: transform .3s .05s, opacity .3s .05s;
}
.pf-item:hover .pf-item-meta { transform: translateY(0); opacity: 1; }
.pf-meta-sep { opacity: .35; }

/* Arrow icon */
.pf-item-icon {
  position: absolute; top: .9rem; inset-inline-end: .9rem;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.1); backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,.15);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.7);
  opacity: 0; transform: scale(.8);
  transition: opacity .3s, transform .3s;
}
.pf-item:hover .pf-item-icon { opacity: 1; transform: scale(1); }

/* Index number */
.pf-item-idx {
  position: absolute; top: .85rem; inset-inline-start: .85rem;
  font-family: 'Poppins', monospace; font-size: .6rem; font-weight: 700;
  color: rgba(255,255,255,.2);
  opacity: 0; transition: opacity .3s;
}
.pf-item:hover .pf-item-idx { opacity: 1; }

/* Scroll-in */
.pf-in { opacity: 0; transform: translateY(20px); transition: opacity .55s ease, transform .55s ease; }
.pf-in--vis { opacity: 1; transform: translateY(0); }
.pf-grid .pf-item:nth-child(2)  { transition-delay: .05s; }
.pf-grid .pf-item:nth-child(3)  { transition-delay: .10s; }
.pf-grid .pf-item:nth-child(4)  { transition-delay: .15s; }
.pf-grid .pf-item:nth-child(5)  { transition-delay: .20s; }
.pf-grid .pf-item:nth-child(6)  { transition-delay: .24s; }
.pf-grid .pf-item:nth-child(n+7){ transition-delay: .28s; }

/* Empty */
.pf-empty {
  text-align: center; padding: 5rem 0;
  color: rgba(255,255,255,.3);
}
.pf-empty p { font-size: 1rem; margin-bottom: 1.5rem; }
.pf-empty button {
  padding: .5rem 1.4rem; border: 1px solid rgba(255,255,255,.2);
  background: transparent; color: rgba(255,255,255,.5);
  border-radius: 9999px; cursor: pointer; font-size: .8rem;
  font-family: inherit; transition: all .25s;
}
.pf-empty button:hover { border-color: var(--primary); color: #fff; }

/* ════ LIGHTBOX ════ */
#lb {
  display: none; position: fixed; inset: 0; z-index: 9000;
  flex-direction: column; align-items: center; justify-content: center;
}
#lb.lb--open { display: flex; animation: lb-in .28s ease; }
@keyframes lb-in { from{opacity:0} to{opacity:1} }

.lb-bg {
  position: absolute; inset: -30px; z-index: 0;
  background-size: cover; background-position: center;
  filter: blur(55px) brightness(.12) saturate(1.3);
}
.lb-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: rgba(0,0,0,.5); cursor: pointer;
}

/* Buttons */
.lb-btn {
  background: rgba(255,255,255,.08); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.14); color: rgba(255,255,255,.65);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .22s;
}
.lb-btn:hover { background: rgba(255,255,255,.16); color: #fff; }

.lb-close {
  position: absolute; top: 1.5rem; inset-inline-start: 1.5rem; z-index: 30;
  width: 44px; height: 44px; border-radius: 50%;
}
.lb-close:hover { background: var(--primary); border-color: var(--primary); color: #fff; }

.lb-counter {
  position: absolute; top: 1.55rem; inset-inline-end: 1.5rem; z-index: 30;
  font-size: .8rem; font-family: 'Poppins', monospace; color: rgba(255,255,255,.4);
}

.lb-arrow {
  position: absolute; top: 50%; transform: translateY(-50%); z-index: 30;
  width: 50px; height: 50px; border-radius: 50%;
}
.lb-prev { inset-inline-start: 1.5rem; }
.lb-next { inset-inline-end: 1.5rem; }
@media (max-width: 640px) { .lb-arrow { display: none; } }

/* Stage */
.lb-stage {
  position: relative; z-index: 10;
  display: flex; align-items: center; gap: 2.5rem;
  max-width: 1100px; width: 100%;
  padding: 0 5rem;
}
@media (max-width: 900px) { .lb-stage { flex-direction: column; padding: 0 1rem; gap: 1.25rem; } }

.lb-img-wrap {
  flex: 1; display: flex; align-items: center; justify-content: center;
  max-height: 72vh;
}
.lb-img-wrap.lb--fade { opacity: 0; transition: opacity .2s; }
#lb-img {
  max-width: 100%; max-height: 72vh; object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 40px 120px rgba(0,0,0,.9);
  display: block;
}

.lb-info {
  width: 240px; flex-shrink: 0;
}
@media (max-width: 900px) { .lb-info { width: 100%; max-width: 540px; } }

.lb-cat {
  display: block;
  font-size: .62rem; font-weight: 900; letter-spacing: .15em;
  text-transform: uppercase; color: var(--primary); margin-bottom: .6rem;
}
.lb-title {
  font-size: clamp(.95rem, 2vw, 1.3rem); font-weight: 900;
  color: #fff; margin: 0 0 .65rem; line-height: 1.3;
}
.lb-meta {
  font-size: .76rem; color: rgba(255,255,255,.4);
  margin-bottom: .6rem; letter-spacing: .02em;
}
.lb-desc {
  font-size: .78rem; color: rgba(255,255,255,.3);
  line-height: 1.75; margin-bottom: 1.25rem;
}
.lb-cta {
  display: inline-block;
  font-size: .8rem; font-weight: 700; color: var(--primary);
  text-decoration: none; transition: letter-spacing .25s;
}
.lb-cta:hover { letter-spacing: .04em; }

/* ── CTA Strip ── */
.pf-cta {
  border-top: 1px solid rgba(255,255,255,.06);
  padding: 5rem 0 6rem;
}
.pf-cta-inner {
  display: flex; flex-direction: column;
  align-items: center; text-align: center; gap: 1.5rem;
}
.pf-cta-inner h2 {
  font-size: clamp(1.8rem,4vw,2.8rem); font-weight:900; color:#fff; margin:0;
}
.pf-cta-inner p { color:rgba(255,255,255,.4); margin:0; font-size:1rem; }
.pf-cta-btns { display:flex; align-items:center; gap:1rem; flex-wrap:wrap; justify-content:center; }
.pf-cta-wa {
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.65rem 1.4rem; border-radius:9999px;
  border:1px solid rgba(255,255,255,.18); color:rgba(255,255,255,.6);
  font-size:.86rem; font-weight:700; text-decoration:none;
  transition:all .25s;
}
.pf-cta-wa:hover { border-color:rgba(255,255,255,.4); color:#fff; }
</style>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
