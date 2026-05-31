<?php
require_once __DIR__ . '/../includes/lang.php';
$currentPage = 'contact';
$pageTitle   = $isAr ? 'تواصل معنا | فلكس للدعاية والإعلان' : 'Contact Us | Flex for Advertising';
require_once __DIR__ . '/../includes/header.php';

$stripImgs = [
  'images/portfolio/khayallah_facade_night_1.jpeg',
  'images/portfolio/papillon_facade.jpeg',
  'images/portfolio/image_restaurant_gold_2.jpeg',
  'images/portfolio/pepsi_music_2.jpeg',
  'images/portfolio/alawad_facade.jpeg',
  'images/portfolio/inmar_install_2.jpeg',
];
?>

<section class="page-hero">
  <div class="page-hero-glow"></div>
  <div class="container">
    <div class="section-badge"><span></span><?= t('contactBadge') ?></div>
    <h1 style="font-size:clamp(2rem,3.75vw,3.375rem);font-weight:900;color:#fff;margin:1rem 0 1.5rem;line-height:1.1">
      <?= t('contactHero1') ?><span class="brand-gradient-text"> <?= t('contactHero2') ?></span>
    </h1>
    <p style="font-size:1.125rem;color:var(--muted);max-width:600px;line-height:1.8"><?= t('contactHeroDesc') ?></p>
  </div>
</section>

<!-- Work Strip -->
<div class="contact-work-strip">
  <?php foreach ($stripImgs as $img): ?>
  <div class="contact-strip-item">
    <img src="<?= imgUrl('/'.$img, 500, 400, 80) ?>" alt=""
         width="500" height="400"
         loading="lazy" decoding="async"
         onerror="this.closest('.contact-strip-item').style.background='#111';this.style.display='none'" />
  </div>
  <?php endforeach; ?>
</div>

<section>
  <div class="container">
    <div class="contact-grid">

      <!-- Info -->
      <div>
        <h2 style="font-size:1.75rem;font-weight:900;color:#fff;margin-bottom:2rem"><?= t('contactInfoTitle') ?></h2>

        <div class="info-card">
          <div class="info-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <h4><?= $isAr ? 'مكاتبنا' : 'Our Offices' ?></h4>
            <p><strong style="color:#fff"><?= t('contactDammam') ?></strong><br><?= t('contactDammamRegion') ?></p>
            <p style="margin-top:.5rem"><strong style="color:#fff"><?= t('contactRiyadh') ?></strong><br><?= t('contactRiyadhRegion') ?></p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div>
            <h4><?= $isAr ? 'الهاتف' : 'Phone' ?></h4>
            <a href="tel:<?= PHONE ?>" dir="ltr"><?= PHONE ?></a><br>
            <a href="tel:<?= PHONE2 ?>" dir="ltr" style="margin-top:.35rem;display:inline-block"><?= PHONE2 ?></a>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <h4><?= $isAr ? 'البريد الإلكتروني' : 'Email' ?></h4>
            <a href="mailto:<?= EMAIL ?>"><?= EMAIL ?></a>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 32 32"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.504 1.13 6.752 3.056 9.388L1.056 31.04l5.84-1.872A15.906 15.906 0 0016.004 32C24.828 32 32 24.822 32 16S24.828 0 16.004 0zm9.284 22.596c-.384 1.08-1.908 1.978-3.126 2.24-.832.176-1.918.316-5.572-1.198-4.676-1.926-7.692-6.676-7.928-6.986-.228-.308-1.912-2.548-1.912-4.862s1.192-3.444 1.664-3.926a1.74 1.74 0 011.258-.518c.314 0 .628.006.902.018.29.014.678-.11.062 1.684-.38 1.086-.88 2.496-.958 2.682a.694.694 0 00.064.664c.104.204.354.518.676.834.316.32.648.708.934.952.322.272.66.562.284 1.102-.374.536-1.626 2.04-1.978 2.424-.352.382-.376.598-.252.852.12.25 1.058 1.748 2.25 2.832 1.546 1.378 2.852 1.808 3.254 2.002.4.192.632.16.866-.096.232-.26.994-1.158 1.26-1.556.262-.398.526-.33.888-.198s2.302 1.086 2.696 1.282c.392.196.654.294.75.458.094.162.094.936-.29 2.014z"/></svg>
          </div>
          <div>
            <h4>WhatsApp</h4>
            <a href="https://wa.me/<?= WHATSAPP ?>" target="_blank" dir="ltr"><?= PHONE ?></a>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <h4><?= $isAr ? 'ساعات العمل' : 'Working Hours' ?></h4>
            <p><?= t('contactHoursDays') ?></p>
            <p><?= t('contactHoursTime') ?></p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div>
        <div class="contact-form">
          <h3 style="font-size:1.5rem;font-weight:900;color:#fff;margin-bottom:2rem"><?= t('formTitle') ?></h3>

          <div id="form-success" style="display:none;text-align:center;padding:2.5rem;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:#4ade80">
            <svg width="48" height="48" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24" style="margin:0 auto 1rem;display:block"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <p style="font-size:1.1rem;font-weight:700"><?= t('formSuccess') ?></p>
            <button id="send-another" style="margin-top:1rem;background:none;border:1px solid #4ade80;color:#4ade80;padding:.5rem 1.25rem;cursor:pointer;font-family:inherit;font-size:.9rem">
              <?= t('sendAnother') ?>
            </button>
          </div>

          <?php
            if (empty($_SESSION['csrf_token'])) {
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            }
          ?>
          <form id="contact-form" data-csrf="<?= $_SESSION['csrf_token'] ?>">
            <div class="form-group">
              <label><?= t('formName') ?></label>
              <input type="text" name="name" placeholder="<?= t('formNamePh') ?>" required />
            </div>
            <div class="form-group">
              <label><?= t('formPhone') ?></label>
              <input type="tel" name="phone" placeholder="05xxxxxxxx" required dir="ltr" />
            </div>
            <div class="form-group">
              <label><?= t('formEmail') ?> <span style="color:var(--muted);font-weight:400"><?= t('formOptional') ?></span></label>
              <input type="email" name="email" dir="ltr" />
            </div>
            <div class="form-group">
              <label><?= t('formMessage') ?></label>
              <textarea name="message" placeholder="<?= t('formMsgPh') ?>" required></textarea>
            </div>
            <p class="form-error-msg" id="form-error" style="display:none;color:#f87171;margin-bottom:1rem"></p>
            <button type="submit" class="btn-primary btn-primary-lg" style="width:100%"
              data-submit="<?= t('formSubmit') ?>"
              data-sending="<?= t('formSending') ?>"
              data-error="<?= t('formError') ?>">
              <?= t('formSubmit') ?>
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</section>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
