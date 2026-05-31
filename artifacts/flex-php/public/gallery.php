<?php
require_once __DIR__ . '/../includes/lang.php';
$currentPage = 'gallery';
$pageTitle   = $isAr ? 'ألبوم الصور | فلكس للدعاية والإعلان' : 'Gallery | Flex for Advertising';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/header.php';

// ─── Fetch from DB ───
$gallery    = dbQuery("SELECT id, image_url, title, category, service FROM gallery ORDER BY sort_order, id");
$catRows    = dbQuery("SELECT category, COUNT(*) AS cnt FROM gallery GROUP BY category ORDER BY COUNT(*) DESC");

// Arabic → English category translation map
$catMapEn = [
    'لافتات وواجهات'        => 'Signage & Facades',
    'واجهات ومشاريع كبرى'   => 'Large-Scale Projects',
    'طباعة رقمية'            => 'Digital Printing',
    'فعاليات ومعارض'         => 'Events & Exhibitions',
    'ورشة تصنيع'             => 'Manufacturing Workshop',
    'مشاريع'                 => 'Projects',
    'هوية مؤسسية'            => 'Corporate Identity',
    'تصميم ثلاثي الأبعاد'   => '3D Design',
    'ماكينات ليزر'           => 'Laser Machines',
    'استيكر وتلمينيش'        => 'Stickers & Lamination',
    'استيكر سيارات'          => 'Vehicle Wrapping',
    'هدايا ترويجية'          => 'Promotional Gifts',
    'هوية بصرية'             => 'Visual Identity',
    'ديكور داخلي'            => 'Interior Decor',
    'ستاندات وتوتيم'         => 'Stands & Totems',
    'استيكر وتغليف'          => 'Stickers & Wrapping',
    'أعمالنا'                => 'Our Work',
];

// Build category list with counts
$categories = [];
foreach ($catRows as $cr) {
    if ($cr['category']) $categories[$cr['category']] = (int)$cr['cnt'];
}

// Fallback: filesystem scan if DB empty
if (empty($gallery)) {
    $baseDir = __DIR__ . '/images/';
    $subfolders = ['portfolio', 'gallery'];
    foreach ($subfolders as $sub) {
        $dir = $baseDir . $sub;
        if (!is_dir($dir)) continue;
        $files = glob($dir . '/*.{jpg,jpeg,png,webp}', GLOB_BRACE);
        foreach ((array)$files as $f) {
            $cat = $isAr ? 'أعمالنا' : 'Our Work';
            $gallery[] = [
                'id'       => 0,
                'image_url'=> '/images/' . $sub . '/' . basename($f),
                'title'    => '',
                'category' => $cat,
            ];
            $categories[$cat] = ($categories[$cat] ?? 0) + 1;
        }
    }
}

$total = count($gallery);
$allLabel = $isAr ? 'الكل' : 'All';
?>

<!-- ─── GALLERY HERO ─── -->
<style>
.gal-hero { position:relative; height:min(90vh,680px); min-height:420px; display:flex; align-items:center; overflow:hidden; }
.gal-hero-bg { position:absolute; inset:0; z-index:0; }
.gal-bg-slide { position:absolute; inset:0; opacity:0; transition:opacity 1.2s ease; }
.gal-bg-slide.active { opacity:1; }
.gal-bg-slide img { width:100%; height:100%; object-fit:cover; object-position:center; transform-origin:center center; }
.gal-bg-slide.active img.kb-zoom-in  { animation:kb-zoom-in  14s ease-in-out forwards; }
.gal-bg-slide.active img.kb-zoom-out { animation:kb-zoom-out 14s ease-in-out forwards; }
.gal-bg-slide.active img.kb-pan-r    { animation:kb-pan-r    14s ease-in-out forwards; }
.gal-bg-slide.active img.kb-pan-l    { animation:kb-pan-l    14s ease-in-out forwards; }
.gal-bg-slide.active img.kb-pan-u    { animation:kb-pan-u    14s ease-in-out forwards; }
.gal-hero-mask { position:absolute; inset:0; background:linear-gradient(to bottom, rgba(5,5,5,.95) 0%, rgba(5,5,5,.88) 40%, rgba(5,5,5,.96) 80%, rgba(5,5,5,1) 100%); z-index:1; }
.gal-hero-feather { position:absolute; bottom:0; left:0; right:0; height:120px; background:linear-gradient(to bottom, transparent, var(--bg)); z-index:2; pointer-events:none; }
.gal-hero-content { position:relative; z-index:3; width:100%; padding-top:6rem; }

/* Thumbnail strip */
.gal-thumb-strip { display:flex; gap:.5rem; margin-top:1.75rem; flex-wrap:nowrap; overflow:hidden; }
.gal-thumb { width:54px; height:36px; border-radius:4px; overflow:hidden; cursor:pointer; opacity:.45; border:2px solid transparent; transition:opacity .3s, border-color .3s, transform .3s; flex-shrink:0; }
.gal-thumb:hover { opacity:.75; transform:scale(1.08); }
.gal-thumb.active { opacity:1; border-color:var(--primary); transform:scale(1.12); }
.gal-thumb img { width:100%; height:100%; object-fit:cover; }

/* Dot indicators */
.gal-hero-dots { display:flex; gap:.5rem; margin-top:1rem; }
.gal-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.3); cursor:pointer; transition:background .3s, transform .3s; }
.gal-dot.active { background:var(--primary); transform:scale(1.3); }
</style>

<section class="gal-hero">
  <div class="gal-hero-bg" id="gal-hero-bg">
    <?php
    $galHeroBgs = [
      ['src'=>'/images/portfolio/wa_119.jpg', 'kb'=>'kb-zoom-in'],
      ['src'=>'/images/portfolio/wa_100.jpg', 'kb'=>'kb-pan-r'],
      ['src'=>'/images/portfolio/wa_021.jpg', 'kb'=>'kb-zoom-out'],
      ['src'=>'/images/portfolio/wa_180.jpg', 'kb'=>'kb-pan-l'],
      ['src'=>'/images/portfolio/wa_220.jpg', 'kb'=>'kb-pan-u'],
    ];
    foreach ($galHeroBgs as $gi => $gs):
    ?>
    <div class="gal-bg-slide <?= $gi===0?'active':'' ?>" data-gi="<?= $gi ?>">
      <img src="<?= imgUrl($gs['src'], 1600, 900, 65) ?>"
           alt="" aria-hidden="true"
           loading="<?= $gi===0?'eager':'lazy' ?>"
           class="<?= $gs['kb'] ?>" />
    </div>
    <?php endforeach; ?>
    <div class="gal-hero-mask"></div>
    <div class="gal-hero-feather"></div>
  </div>

  <div class="container gal-hero-content">
    <div class="inline-badge-pill">
      <span class="inline-badge-dot"></span>
      <?= $total ?><?= $isAr ? '+ صورة حقيقية من مشاريعنا' : '+ real photos from our projects' ?>
    </div>
    <h1 style="font-size:clamp(2rem,3.75vw,3.375rem);font-weight:900;color:#fff;margin:1rem 0 1.25rem;line-height:1.1">
      <?= t('galleryPageTitle') ?> <span class="brand-gradient-text"><?= t('galleryPageHighlight') ?></span>
    </h1>
    <p style="font-size:1.1rem;color:rgba(230,230,230,.8);max-width:580px;line-height:1.8"><?= t('galleryPageDesc') ?></p>

    <!-- Thumbnail strip -->
    <div class="gal-thumb-strip" id="gal-thumbs">
      <?php foreach ($galHeroBgs as $gi => $gs): ?>
      <div class="gal-thumb <?= $gi===0?'active':'' ?>" data-gi="<?= $gi ?>">
        <img src="<?= imgUrl($gs['src'], 120, 80, 60) ?>" alt="" loading="lazy" />
      </div>
      <?php endforeach; ?>
    </div>
    <div class="gal-hero-dots" id="gal-dots">
      <?php foreach ($galHeroBgs as $gi => $gs): ?>
      <div class="gal-dot <?= $gi===0?'active':'' ?>" data-gi="<?= $gi ?>"></div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<script>
(function(){
  var slides  = Array.from(document.querySelectorAll('.gal-bg-slide'));
  var thumbs  = Array.from(document.querySelectorAll('#gal-thumbs .gal-thumb'));
  var dots    = Array.from(document.querySelectorAll('#gal-dots .gal-dot'));
  var cur = 0, timer;
  var kbClasses = ['kb-zoom-in','kb-zoom-out','kb-pan-r','kb-pan-l','kb-pan-u'];

  function goTo(n) {
    slides[cur].classList.remove('active');
    thumbs[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    var slide = slides[cur];
    var img   = slide.querySelector('img');
    // reset Ken Burns by cloning img node
    var fresh = img.cloneNode(true);
    img.parentNode.replaceChild(fresh, img);
    slide.classList.add('active');
    thumbs[cur].classList.add('active');
    dots[cur].classList.add('active');
    clearInterval(timer);
    timer = setInterval(function(){ goTo(cur + 1); }, 7000);
  }

  thumbs.forEach(function(t){ t.addEventListener('click', function(){ goTo(+t.dataset.gi); }); });
  dots.forEach(function(d){   d.addEventListener('click', function(){ goTo(+d.dataset.gi); }); });
  timer = setInterval(function(){ goTo(cur + 1); }, 7000);
})();
</script>

<section>
  <div class="container">

    <!-- Controls row: header (label + toggle) then wrapped filters -->
    <div class="gallery-controls-row">

      <!-- Header: label + view toggle -->
      <div class="gcr-header">
        <span class="gcr-label">
          <?= $isAr ? 'تصفية حسب الفئة' : 'Filter by Category' ?>
        </span>
        <div class="view-toggle" id="view-toggle">
          <button class="view-btn active" id="btn-grid" title="<?= $isAr?'شبكة':'Grid' ?>">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </button>
          <button class="view-btn" id="btn-masonry" title="<?= $isAr?'شلالي':'Masonry' ?>">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="13"/><rect x="14" y="3" width="7" height="8"/><rect x="3" y="18" width="7" height="3"/><rect x="14" y="13" width="7" height="8"/></svg>
          </button>
        </div>
      </div>

      <!-- Category filters — wrap all visible, no scroll -->
      <div class="category-filters" id="gallery-filters">
        <button class="filter-btn active" data-cat="all" data-testid="filter-<?= htmlspecialchars($allLabel) ?>">
          <?= $allLabel ?>
        </button>
        <?php foreach ($categories as $cat => $cnt):
          $catLabel = $isAr ? $cat : ($catMapEn[$cat] ?? $cat);
        ?>
        <button class="filter-btn" data-cat="<?= htmlspecialchars($cat) ?>" data-testid="filter-<?= htmlspecialchars($cat) ?>">
          <?= htmlspecialchars($catLabel) ?>
          <span class="filter-count"><?= $cnt ?></span>
        </button>
        <?php endforeach; ?>
      </div>

    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid" id="gallery-grid">
      <?php foreach ($gallery as $i => $item): ?>
      <div class="gallery-item fade-in<?= $i>=24?' gi-hidden':'' ?>"
           data-cat="<?= htmlspecialchars($item['category']) ?>"
           data-caption="<?= htmlspecialchars($item['title']) ?>"
           data-src="<?= htmlspecialchars($item['image_url']) ?>"
           data-lb-src="<?= htmlspecialchars(imgUrl($item['image_url'], 1200, 0, 85)) ?>"
           data-testid="gallery-item-<?= $i ?>">
        <?php
          $gTitle = $isAr
            ? ($item['title'] ?? '')
            : ($catMapEn[$item['category']] ?? $item['category'] ?? '');
          $gAlt = $gTitle ?: ($isAr ? 'صورة' : 'Image');
        ?>
        <img src="<?= imgUrl($item['image_url'], 480, 320, 70) ?>"
             alt="<?= htmlspecialchars($gAlt) ?>"
             width="480" height="320"
             loading="<?= $i<8?'eager':'lazy' ?>"
             decoding="<?= $i<8 ? 'auto' : 'async' ?>"
             onerror="this.closest('.gallery-item').style.display='none'" />
        <div class="gallery-item-overlay">
          <?php if ($gTitle): ?>
          <span class="gallery-item-caption"><?= htmlspecialchars($gTitle) ?></span>
          <?php endif; ?>
          <div class="gallery-zoom-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <!-- Load More -->
    <?php if (count($gallery) > 24): ?>
    <div id="load-more-wrap" style="text-align:center;margin-top:2.5rem">
      <button id="load-more-btn" class="btn-primary btn-primary-lg">
        <?= $isAr ? 'عرض المزيد' : 'Load More' ?>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="margin-<?= $isAr?'right':'left' ?>:.5rem"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <p id="load-more-count" style="color:rgba(255,255,255,.4);font-size:.8rem;margin-top:.75rem">
        <?= $isAr ? 'يعرض 24 من ' . count($gallery) : 'Showing 24 of ' . count($gallery) ?>
      </p>
    </div>
    <?php endif; ?>

  </div>
</section>

<!-- Lightbox -->
<div id="lightbox">
  <button id="lightbox-close">&times;</button>
  <button id="lightbox-prev">&#8249;</button>
  <img id="lightbox-img" src="" alt="" />
  <div id="lightbox-caption"></div>
  <div id="lightbox-counter"></div>
  <button id="lightbox-next">&#8250;</button>
</div>

<script>
(function(){
  var items   = Array.from(document.querySelectorAll('.gallery-item:not([style*="display:none"])'));
  var lb      = document.getElementById('lightbox');
  var lbImg   = document.getElementById('lightbox-img');
  var lbCap   = document.getElementById('lightbox-caption');
  var lbCtr   = document.getElementById('lightbox-counter');
  var lbClose = document.getElementById('lightbox-close');
  var lbPrev  = document.getElementById('lightbox-prev');
  var lbNext  = document.getElementById('lightbox-next');
  var cur     = 0;

  function fullUrl(item) {
    var src = item.dataset.src || '';
    return src ? '/img.php?src=' + encodeURIComponent(src) + '&w=1600&q=88' : (item.querySelector('img') || {}).src || '';
  }

  function open(i) {
    var visItems = Array.from(document.querySelectorAll('.gallery-item:not(.gi-hidden):not([style*="display:none"])'));
    items = visItems;
    cur = Math.max(0, Math.min(i, items.length - 1));
    lbImg.style.transform = 'scale(0.92)';
    lbImg.style.opacity   = '0';
    lbImg.src = fullUrl(items[cur]);
    lbImg.alt = items[cur].dataset.caption || '';
    lbCap.textContent = items[cur].dataset.caption || '';
    if (lbCtr) lbCtr.textContent = (cur + 1) + ' / ' + items.length;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){
      lbImg.style.transform = 'scale(1)';
      lbImg.style.opacity   = '1';
    }, 30);
  }

  function go(dir) {
    cur = (cur + dir + items.length) % items.length;
    lbImg.style.transform = 'scale(0.92)';
    lbImg.style.opacity   = '0';
    setTimeout(function(){
      lbImg.src = fullUrl(items[cur]);
      lbImg.alt = items[cur].dataset.caption || '';
      lbCap.textContent = items[cur].dataset.caption || '';
      if (lbCtr) lbCtr.textContent = (cur + 1) + ' / ' + items.length;
      lbImg.style.transform = 'scale(1)';
      lbImg.style.opacity   = '1';
    }, 120);
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach(function(el, i){
    el.addEventListener('click', function(){ open(i); });
  });

  if (lbClose) lbClose.addEventListener('click', close);
  if (lbPrev)  lbPrev.addEventListener('click',  function(){ go(-1); });
  if (lbNext)  lbNext.addEventListener('click',  function(){ go(1); });
  if (lb) lb.addEventListener('click', function(e){ if (e.target === lb) close(); });

  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   go(document.documentElement.dir==='rtl' ? 1 : -1);
    if (e.key === 'ArrowRight')  go(document.documentElement.dir==='rtl' ? -1 : 1);
  });
})();
</script>

<script>
// ─── Pagination / Load More ───
(function(){
  var PER_PAGE   = 24;
  var shownCount = PER_PAGE;
  var allItems   = Array.from(document.querySelectorAll('.gallery-item'));
  var lmWrap     = document.getElementById('load-more-wrap');
  var lmBtn      = document.getElementById('load-more-btn');
  var lmCount    = document.getElementById('load-more-count');
  var isAr       = document.documentElement.lang === 'ar';

  // CSS class controls visibility
  // .gi-hidden { display:none } — set inline here for instant effect
  function applyHidden() {
    allItems.forEach(function(el, i){
      if (i >= shownCount) el.classList.add('gi-hidden');
      else                 el.classList.remove('gi-hidden');
    });
    updateCounter();
  }

  function updateCounter() {
    var vis = allItems.filter(function(el){ return !el.classList.contains('gi-hidden'); }).length;
    if (lmCount) lmCount.textContent = isAr
      ? 'يعرض ' + vis + ' من ' + allItems.length
      : 'Showing ' + vis + ' of ' + allItems.length;
    if (lmWrap) lmWrap.style.display = shownCount >= allItems.length ? 'none' : '';
  }

  if (lmBtn) {
    lmBtn.addEventListener('click', function(){
      shownCount = Math.min(shownCount + PER_PAGE, allItems.length);
      applyHidden();
    });
  }

  // Expose reset for filter integration
  window.paginationReset = function(filteredItems) {
    // When a filter is active, show first 24 of that filter's items
    allItems = filteredItems || Array.from(document.querySelectorAll('.gallery-item'));
    shownCount = PER_PAGE;
    applyHidden();
  };

  applyHidden();
})();
</script>

<script>
// ─── Grid/Masonry Toggle ───
(function(){
  var grid    = document.getElementById('gallery-grid');
  var btnGrid = document.getElementById('btn-grid');
  var btnMas  = document.getElementById('btn-masonry');
  if (!grid || !btnGrid || !btnMas) return;

  function setGrid() {
    grid.classList.remove('masonry-mode');
    btnGrid.classList.add('active');
    btnMas.classList.remove('active');
    localStorage.setItem('galleryView','grid');
  }
  function setMasonry() {
    grid.classList.add('masonry-mode');
    btnMas.classList.add('active');
    btnGrid.classList.remove('active');
    localStorage.setItem('galleryView','masonry');
  }

  // Restore preference
  if (localStorage.getItem('galleryView') === 'masonry') setMasonry();

  btnGrid.addEventListener('click', setGrid);
  btnMas.addEventListener('click',  setMasonry);
})();
</script>

<section class="cta-section" style="margin-top:2rem">
  <div class="container">
    <h2><?= t('galleryCTATitle') ?></h2>
    <p><?= t('galleryCTADesc') ?></p>
    <a href="/contact<?= $langSuffix ?>" class="btn-primary btn-primary-lg"><?= t('galleryCTABtn') ?></a>
  </div>
</section>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
