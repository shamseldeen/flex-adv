<?php
$langSuffix = !$isAr ? '?lang=en' : '';
$navLinks = [
    ['href' => '/'           . $langSuffix, 'key' => 'home'],
    ['href' => '/about'      . $langSuffix, 'key' => 'about'],
    ['href' => '/services'   . $langSuffix, 'key' => 'services'],
    ['href' => '/gallery'    . $langSuffix, 'key' => 'gallery'],
    ['href' => '/portfolio'  . $langSuffix, 'key' => 'portfolio'],
    ['href' => '/contact'    . $langSuffix, 'key' => 'contact'],
];
$services = ['fs1','fs2','fs3','fs4','fs5','fs6','fs7','fs8'];
?>
<footer>
  <div class="container">
    <div class="footer-grid">

      <div>
        <div style="margin-bottom:1.5rem">
          <a href="/" style="display:inline-block">
            <img src="<?= imgUrl($isAr ? '/assets/images/logo-ar-main.png' : '/assets/images/logo-en-main.png', 360, 0, 85) ?>"
                 alt="<?= SITE_NAME_AR ?>"
                 height="56"
                 loading="lazy"
                 style="height:56px;width:auto;max-width:210px;object-fit:contain;display:block" />
          </a>
        </div>
        <p class="footer-bio"><?= t('footerBio') ?></p>
        <div class="social-links">
          <!-- Facebook -->
          <a href="https://www.facebook.com/flexadv" target="_blank" rel="noopener" class="social-link-sq" title="Facebook" data-testid="link-social-facebook">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <!-- YouTube -->
          <a href="https://www.youtube.com/@flexadv" target="_blank" rel="noopener" class="social-link-sq" title="YouTube" data-testid="link-social-youtube">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
          </a>
          <!-- WhatsApp -->
          <a href="https://wa.me/<?= WHATSAPP ?>" target="_blank" rel="noopener" class="social-link-sq" title="WhatsApp" data-testid="link-social-whatsapp">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 32 32"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.504 1.13 6.752 3.056 9.388L1.056 31.04l5.84-1.872A15.906 15.906 0 0016.004 32C24.828 32 32 24.822 32 16S24.828 0 16.004 0zm9.284 22.596c-.384 1.08-1.908 1.978-3.126 2.24-.832.176-1.918.316-5.572-1.198-4.676-1.926-7.692-6.676-7.928-6.986-.228-.308-1.912-2.548-1.912-4.862s1.192-3.444 1.664-3.926a1.74 1.74 0 011.258-.518c.314 0 .628.006.902.018.29.014.678-.11.062 1.684-.38 1.086-.88 2.496-.958 2.682a.694.694 0 00.064.664c.104.204.354.518.676.834.316.32.648.708.934.952.322.272.66.562.284 1.102-.374.536-1.626 2.04-1.978 2.424-.352.382-.376.598-.252.852.12.25 1.058 1.748 2.25 2.832 1.546 1.378 2.852 1.808 3.254 2.002.4.192.632.16.866-.096.232-.26.994-1.158 1.26-1.556.262-.398.526-.33.888-.198s2.302 1.086 2.696 1.282c.392.196.654.294.75.458.094.162.094.936-.29 2.014z"/></svg>
          </a>
        </div>
      </div>

      <div>
        <h4><?= t('footerQuickLinks') ?></h4>
        <ul class="footer-links">
          <?php foreach ($navLinks as $link): ?>
          <li>
            <a href="<?= $link['href'] ?>">
              <span class="dash"></span><?= t($link['key']) ?>
            </a>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div>
        <h4><?= t('footerServicesTitle') ?></h4>
        <ul class="footer-links">
          <?php foreach ($services as $s): ?>
          <li>
            <a href="/services<?= $langSuffix ?>">
              <span class="dash"></span><?= t($s) ?>
            </a>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div>
        <h4><?= t('footerContactTitle') ?></h4>
        <div class="footer-contact-item">
          <div class="footer-contact-icon">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <strong><?= t('contactDammam') ?></strong>
            <p><?= t('contactDammamRegion') ?></p>
            <strong style="margin-top:.5rem;display:block"><?= t('contactRiyadh') ?></strong>
            <p><?= t('contactRiyadhRegion') ?></p>
          </div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>
          <div>
            <strong><?= $isAr ? 'الهاتف' : 'Phone' ?></strong>
            <a href="tel:<?= PHONE ?>" dir="ltr"><?= PHONE ?></a><br>
            <a href="tel:<?= PHONE2 ?>" dir="ltr" style="margin-top:.3rem;display:inline-block"><?= PHONE2 ?></a>
          </div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <strong><?= $isAr ? 'البريد الإلكتروني' : 'Email' ?></strong>
            <a href="mailto:<?= EMAIL ?>"><?= EMAIL ?></a>
          </div>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; <?= date('Y') ?> <?= t('footerCopyright') ?></p>
      <a href="https://www.flex-adv.com" dir="ltr">www.flex-adv.com</a>
    </div>
  </div>
</footer>



<!-- Floating Buttons -->
<div class="floating-btns">
  <a href="https://wa.me/<?= WHATSAPP ?>" target="_blank" rel="noopener" class="float-btn float-btn-whatsapp" title="WhatsApp">
    <span class="float-pulse"></span>
    <svg viewBox="0 0 32 32"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.504 1.13 6.752 3.056 9.388L1.056 31.04l5.84-1.872A15.906 15.906 0 0016.004 32C24.828 32 32 24.822 32 16S24.828 0 16.004 0zm9.284 22.596c-.384 1.08-1.908 1.978-3.126 2.24-.832.176-1.918.316-5.572-1.198-4.676-1.926-7.692-6.676-7.928-6.986-.228-.308-1.912-2.548-1.912-4.862s1.192-3.444 1.664-3.926a1.74 1.74 0 011.258-.518c.314 0 .628.006.902.018.29.014.678-.11.062 1.684-.38 1.086-.88 2.496-.958 2.682a.694.694 0 00.064.664c.104.204.354.518.676.834.316.32.648.708.934.952.322.272.66.562.284 1.102-.374.536-1.626 2.04-1.978 2.424-.352.382-.376.598-.252.852.12.25 1.058 1.748 2.25 2.832 1.546 1.378 2.852 1.808 3.254 2.002.4.192.632.16.866-.096.232-.26.994-1.158 1.26-1.556.262-.398.526-.33.888-.198s2.302 1.086 2.696 1.282c.392.196.654.294.75.458.094.162.094.936-.29 2.014z"/></svg>
  </a>
  <button class="float-btn float-btn-call" id="float-call-btn" title="<?= $isAr ? 'اتصل بنا' : 'Call Us' ?>" aria-expanded="false">
    <span class="float-pulse"></span>
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
  </button>
</div>

<!-- Call modal — outside floating-btns so position:fixed centers correctly on viewport -->
<div class="float-call-backdrop" id="float-call-backdrop"></div>
<div class="float-call-popup" id="float-call-popup">
  <p style="font-size:.8rem;color:var(--muted);text-align:center;margin-bottom:.25rem;padding:0 .5rem"><?= $isAr ? 'اختر رقماً للاتصال' : 'Choose a number to call' ?></p>
  <a href="tel:<?= PHONE ?>" dir="ltr" class="float-call-option">
    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    <?= PHONE ?>
  </a>
  <a href="tel:<?= PHONE2 ?>" dir="ltr" class="float-call-option">
    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    <?= PHONE2 ?>
  </a>
</div>

<style>
/* Backdrop */
.float-call-backdrop {
  display:none;
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.55);
  z-index:10000;
  backdrop-filter:blur(3px);
  -webkit-backdrop-filter:blur(3px);
}
.float-call-backdrop.open { display:block; }
.float-call-popup {
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%) scale(.92);
  background:#141414;
  border:1px solid rgba(255,255,255,.12);
  border-radius:18px;
  padding:1.25rem 1rem;
  display:flex;
  flex-direction:column;
  gap:.5rem;
  min-width:240px;
  box-shadow:0 20px 60px rgba(0,0,0,.8);
  opacity:0;
  pointer-events:none;
  transition:opacity .25s ease, transform .25s ease;
  z-index:10002;
}
.float-call-popup.open {
  opacity:1;
  transform:translate(-50%,-50%) scale(1);
  pointer-events:auto;
}
.float-call-option {
  display:flex;
  align-items:center;
  gap:.6rem;
  padding:.6rem .9rem;
  border-radius:8px;
  color:#e6e6e6;
  font-size:.88rem;
  font-weight:600;
  letter-spacing:.02em;
  text-decoration:none;
  white-space:nowrap;
  transition:background .18s, color .18s;
}
.float-call-option:hover { background:rgba(232,40,30,.15); color:#fff; }
.float-call-option svg { flex-shrink:0; color:#E8281E; }
</style>
<script>
(function(){
  var btn      = document.getElementById('float-call-btn');
  var popup    = document.getElementById('float-call-popup');
  var backdrop = document.getElementById('float-call-backdrop');
  if (!btn || !popup) return;

  function openPopup() {
    popup.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closePopup() {
    popup.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    popup.classList.contains('open') ? closePopup() : openPopup();
  });
  if (backdrop) backdrop.addEventListener('click', closePopup);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closePopup();
  });
})();
</script>

<!-- Section Dots Navigation -->
<nav id="section-dots" aria-label="<?= $isAr ? 'تنقل بين الأقسام' : 'Navigate sections' ?>">
  <?php
  $dots = $isAr
    ? [['hero','الرئيسية'],['stats','الإنجازات'],['services','الخدمات'],['portfolio','الأعمال'],['clients','العملاء'],['why-us','لماذا فلكس'],['cta','ابدأ الآن']]
    : [['hero','Home'],['stats','Stats'],['services','Services'],['portfolio','Portfolio'],['clients','Clients'],['why-us','Why Flex'],['cta','Start Now']];
  // Only show if on homepage
  if ($currentPage === 'home'):
    foreach ($dots as [$id, $label]):
  ?>
  <button class="section-dot-btn <?= $id==='hero'?'active':'' ?>" data-section="<?= $id ?>">
    <span class="section-dot-label"><?= htmlspecialchars($label) ?></span>
    <span class="section-dot"></span>
  </button>
  <?php endforeach; endif; ?>
</nav>

<!-- Back to Top -->
<button id="back-to-top" aria-label="<?= $isAr ? 'الرجوع للأعلى' : 'Back to top' ?>">
  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<script src="/assets/js/main.js?v=<?= filemtime(__DIR__ . '/../public/assets/js/main.js') ?>"></script>
</body>
</html>
