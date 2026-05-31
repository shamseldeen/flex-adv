<?php
require_once __DIR__ . '/../includes/lang.php';
$currentPage = '404';
$pageTitle   = $isAr ? '٤٠٤ — الصفحة غير موجودة | فلكس' : '404 — Page Not Found | Flex';
require_once __DIR__ . '/../includes/header.php';
?>

<section style="
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background: var(--bg);
">
  <div>
    <!-- 404 Number -->
    <p style="
      font-size: clamp(6rem, 20vw, 12rem);
      font-weight: 900;
      line-height: 1;
      margin: 0 0 1rem;
      background: linear-gradient(135deg, #E8281E 0%, rgba(232,40,30,0.3) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.04em;
    ">404</p>

    <!-- Separator line -->
    <div style="width: 4rem; height: 2px; background: linear-gradient(to right, #E8281E, #ff6b6b); margin: 0 auto 2rem;"></div>

    <!-- Title -->
    <h1 style="font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 900; color: #fff; margin-bottom: 1rem;">
      <?= $isAr ? 'الصفحة غير موجودة' : 'Page Not Found' ?>
    </h1>

    <!-- Description -->
    <p style="color: var(--muted); font-size: 1.125rem; line-height: 1.8; max-width: 32rem; margin: 0 auto 2.5rem;">
      <?= $isAr
        ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. جرّب العودة للرئيسية.'
        : 'Sorry, the page you\'re looking for doesn\'t exist or may have been moved. Try going back to the homepage.' ?>
    </p>

    <!-- CTA Buttons -->
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <a href="/" class="btn-primary" style="padding: .875rem 2rem; font-size: 1rem; text-decoration: none;">
          <?= $isAr ? 'العودة للرئيسية' : 'Back to Home' ?>
        </a>
        <a href="/contact"
           style="display: inline-flex; align-items: center; gap: .5rem; padding: .875rem 2rem; font-size: 1rem; font-weight: 900; border: 1px solid rgba(255,255,255,.2); color: #fff; text-decoration: none; transition: background .2s;"
           onmouseover="this.style.background='rgba(255,255,255,.05)'" onmouseout="this.style.background='transparent'">
          <?= $isAr ? 'تواصل معنا' : 'Contact Us' ?>
        </a>
      </div>
    </div>

    <!-- Quick links -->
    <div style="margin-top: 3rem; display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
      <?php
      $links = [
        '/gallery'   => $isAr ? 'ألبوم الصور'  : 'Gallery',
        '/services'  => $isAr ? 'خدماتنا'      : 'Services',
        '/portfolio' => $isAr ? 'أعمالنا'      : 'Portfolio',
        '/about'     => $isAr ? 'من نحن'        : 'About',
      ];
      foreach ($links as $href => $label):
      ?>
      <a href="<?= $href ?>"
         style="color: var(--muted); font-size: .875rem; font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.15); padding-bottom: .1rem; transition: color .2s, border-color .2s;"
         onmouseover="this.style.color='#E8281E';this.style.borderColor='#E8281E'"
         onmouseout="this.style.color='';this.style.borderColor=''">
        <?= $label ?>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
