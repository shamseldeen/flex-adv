<?php
require_once __DIR__ . '/../includes/lang.php';
$currentPage = 'about';
$pageTitle   = $isAr ? 'من نحن | فلكس للدعاية والإعلان' : 'About Us | Flex for Advertising';
require_once __DIR__ . '/../includes/header.php';

$photos = [
  ['img'=>'images/portfolio/alawad_facade.jpeg',           'cap'=>['ar'=>'العواد — واجهة ذهبية مضيئة',       'en'=>'Al-Awad — Illuminated Gold Facade']],
  ['img'=>'images/portfolio/khayallah_facade_night_1.jpeg','cap'=>['ar'=>'خيالة — واجهة ليلية احترافية',    'en'=>'Khayallah — Professional Night Facade']],
  ['img'=>'images/portfolio/life_spirit_facade.jpeg',      'cap'=>['ar'=>'Life Spirit — هوية داخلية',        'en'=>'Life Spirit — Interior Identity']],
  ['img'=>'images/portfolio/image_restaurant_gold_2.jpeg', 'cap'=>['ar'=>'IMAGE — حروف ذهبية 3D',            'en'=>'IMAGE — Gold 3D Letters']],
  ['img'=>'images/portfolio/inmar_facade.jpeg',            'cap'=>['ar'=>'INMAR — واجهة بناية ضخمة',         'en'=>'INMAR — Large Building Facade']],
];

$values = [
  ['icon'=>'🤝','t'=>'v1T','d'=>'v1D'],
  ['icon'=>'⭐','t'=>'v2T','d'=>'v2D'],
  ['icon'=>'⏰','t'=>'v3T','d'=>'v3D'],
  ['icon'=>'😊','t'=>'v4T','d'=>'v4D'],
  ['icon'=>'💡','t'=>'v5T','d'=>'v5D'],
  ['icon'=>'🗺️','t'=>'v6T','d'=>'v6D'],
];
?>

<section class="page-hero">
  <div class="page-hero-glow"></div>
  <div class="container">
    <div class="section-badge"><span></span><?= t('aboutBadge') ?></div>
    <h1 style="font-size:clamp(2rem,3.75vw,3.375rem);font-weight:900;color:#fff;margin:1rem 0 1.5rem;line-height:1.1">
      <?= t('aboutHero1') ?><br><span class="brand-gradient-text"><?= t('aboutHero2') ?></span>
    </h1>
    <p style="font-size:1.125rem;color:var(--muted);max-width:680px;line-height:1.8"><?= t('aboutHeroDesc') ?></p>
  </div>
</section>

<!-- Story -->
<section style="border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
  <div class="container">
    <div style="display:grid;gap:4rem;align-items:center" class="about-grid">
      <div class="fade-in">
        <h2 style="font-size:clamp(1.75rem,2.25vw,2.25rem);font-weight:900;color:#fff;margin-bottom:2rem">
          <?= t('storyTitle') ?> <span class="text-primary"><?= t('storyHighlight') ?></span>
        </h2>
        <div style="display:flex;flex-direction:column;gap:1.5rem;color:var(--muted);line-height:1.8">
          <p><?= t('storyP1') ?></p>
          <p><?= t('storyP2') ?></p>
          <p><?= t('storyP3') ?></p>
        </div>
      </div>
      <div class="fade-in">
        <div class="about-photo-grid-4">
          <?php foreach (array_slice($photos, 0, 4) as $p): ?>
          <div class="photo-item">
            <img src="<?= imgUrl('/'.$p['img'], 600, 450, 82) ?>"
                 alt="<?= htmlspecialchars($p['cap'][$lang]) ?>"
                 width="600" height="450"
                 loading="lazy" decoding="async"
                 onerror="this.closest('.photo-item').style.background='#111';this.style.display='none'" />
            <div class="photo-caption-overlay"><span><?= htmlspecialchars($p['cap'][$lang]) ?></span></div>
          </div>
          <?php endforeach; ?>
        </div>
        <?php if (!empty($photos[4])): $last = $photos[4]; ?>
        <div class="about-photo-wide">
          <img src="<?= imgUrl('/'.$last['img'], 1200, 0, 80) ?>"
               alt="<?= htmlspecialchars($last['cap'][$lang]) ?>"
               width="1200"
               loading="lazy" decoding="async"
               onerror="this.style.display='none'" />
          <div class="about-photo-wide-caption" dir="<?= $dir ?>"><span><?= htmlspecialchars($last['cap'][$lang]) ?></span></div>
        </div>
        <?php endif; ?>
        <!-- Stat strip (4-column, matches React exactly) -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;padding-top:0.5rem">
          <?php foreach ([['2015',t('statFounded')],['+2400',t('statProjects')],['+300',t('statClients')],['+11',t('statYears')]] as $st): ?>
          <div style="background:var(--card);border:1px solid var(--border);padding:0.75rem;text-align:center">
            <div style="font-size:1.25rem;font-weight:900;color:var(--primary)" dir="ltr"><?= $st[0] ?></div>
            <div style="color:var(--muted);font-size:0.7rem;margin-top:0.2rem;font-weight:600"><?= $st[1] ?></div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Vision & Mission -->
<section>
  <div class="container">
    <div class="vision-mission-grid">
      <div class="vm-card fade-in">
        <div class="vm-label"><?= t('visionLabel') ?></div>
        <h3><?= t('visionTitle') ?></h3>
        <p><?= t('visionText') ?></p>
      </div>
      <div class="vm-card vm-card-mission fade-in">
        <div class="vm-label"><?= t('missionLabel') ?></div>
        <h3><?= t('missionTitle') ?></h3>
        <p><?= t('missionText') ?></p>
      </div>
    </div>
  </div>
</section>

<!-- Values -->
<section style="background:var(--card);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
  <div class="container">
    <div style="text-align:center;margin-bottom:3rem">
      <h2 class="section-title"><?= t('valuesTitle') ?> <span class="brand-gradient-text"><?= t('valuesHighlight') ?></span></h2>
      <p class="text-muted" style="max-width:480px;margin:0.75rem auto 0"><?= t('valuesSubtitle') ?></p>
    </div>
    <div class="values-grid">
      <?php foreach ($values as $v): ?>
      <div class="value-card fade-in">
        <div class="value-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h4><?= t($v['t']) ?></h4>
        <p><?= t($v['d']) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Offices -->
<section>
  <div class="container">
    <div style="text-align:center;margin-bottom:3rem">
      <h2 class="section-title"><?= t('officesTitle') ?> <span class="brand-gradient-text"><?= t('officesHighlight') ?></span></h2>
    </div>
    <div class="offices-grid">
      <div class="office-card fade-in" style="border-color:var(--primary)">
        <span class="office-badge"><?= t('office1Badge') ?></span>
        <div class="office-city"><?= t('office1City') ?></div>
        <p class="office-desc"><?= t('office1Desc') ?></p>
      </div>
      <div class="office-card fade-in">
        <span class="office-badge" style="background:#333"><?= t('office2Badge') ?></span>
        <div class="office-city"><?= t('office2City') ?></div>
        <p class="office-desc"><?= t('office2Desc') ?></p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="container">
    <h2><?= t('aboutCtaTitle') ?></h2>
    <p><?= t('aboutCtaDesc') ?></p>
    <a href="/contact<?= $langSuffix ?>" class="btn-primary btn-primary-lg"><?= t('aboutCtaBtn') ?></a>
  </div>
</section>

<style>@media(min-width:1024px){.about-grid{grid-template-columns:1fr 1fr}}</style>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>
