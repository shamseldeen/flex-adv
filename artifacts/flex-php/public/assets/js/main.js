// ─── Language Switch (smooth fade) ───
function flexSwitchLang(lang) {
  if (document.documentElement.dataset.switching) return;
  document.documentElement.dataset.switching = '1';

  /* Fade out the page */
  document.documentElement.classList.add('lang-switching');

  setTimeout(function () {
    /* Navigate to same path with ?lang= param — lang.php sets session + cookie */
    var path = window.location.pathname;
    window.location.href = path + '?lang=' + lang;
  }, 220);
}

// ─── Unified rAF-batched Scroll Handler ───
// All scroll-triggered UI updates run in one requestAnimationFrame tick
// to avoid layout thrashing and multiple style recalculations per frame.
const scrollBar = document.getElementById('scroll-progress');
const navbar    = document.getElementById('navbar');
const backTop   = document.getElementById('back-to-top');
const isHome    = document.body.dataset.page === 'home';

let _scrollRafId = null;
function _onScrollFrame() {
  const sy = window.scrollY;
  const h  = document.documentElement;

  // Progress bar
  if (scrollBar) {
    const pct = (sy / (h.scrollHeight - h.clientHeight)) * 100;
    scrollBar.style.width = pct + '%';
  }
  // Navbar transparency
  if (navbar) {
    if (!isHome || sy > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  // Back-to-top button
  if (backTop) {
    backTop.classList.toggle('visible', sy > 400);
  }

  _scrollRafId = null;
}
window.addEventListener('scroll', () => {
  if (!_scrollRafId) _scrollRafId = requestAnimationFrame(_onScrollFrame);
}, { passive: true });
// Run once on load to set initial state
_onScrollFrame();

// ─── Navbar Scroll (alias — used above) ───
if (navbar && !isHome) navbar.classList.add('scrolled');

// ─── Mobile Menu ───
(function () {
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop   = document.getElementById('mobile-menu-backdrop');
  const openBtn    = document.getElementById('mobile-menu-open');
  const closeBtn   = document.getElementById('mobile-menu-close');

  if (!mobileMenu || !openBtn) return;

  function menuOpen() {
    mobileMenu.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
  }
  function menuClose() {
    mobileMenu.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
  }

  openBtn.addEventListener('click', menuOpen);
  if (closeBtn)  closeBtn.addEventListener('click', menuClose);
  if (backdrop)  backdrop.addEventListener('click', menuClose);

  // Close when a nav link is tapped
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', menuClose));

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) menuClose();
  });

  // Swipe to close (RTL: swipe right, LTR: swipe left)
  let _tx = 0;
  mobileMenu.addEventListener('touchstart', e => { _tx = e.touches[0].clientX; }, { passive: true });
  mobileMenu.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - _tx;
    const rtl = document.documentElement.dir === 'rtl';
    if ((rtl && dx > 60) || (!rtl && dx < -60)) menuClose();
  }, { passive: true });
}());

// ─── Hero Slider ───
const heroSection = document.querySelector('.hero');
const slides      = document.querySelectorAll('.hero-slide');
const dots        = document.querySelectorAll('.hero-dot');
const heroContent = document.querySelector('.hero-content');
let current = 0, timer = null, isAnimating = false;

function lazyLoadSlide(slide) {
  var inner = slide.querySelector('.hero-slide-inner');
  if (inner && inner.dataset.bg && !inner.style.backgroundImage) {
    inner.style.backgroundImage = inner.dataset.bg;
  }
}

function goTo(n, dir) {
  if (isAnimating || slides.length < 2) return;
  isAnimating = true;

  slides[current].classList.remove('active');
  dots[current]?.classList.remove('active');

  // Animate text out
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(12px)';
  }

  current = (n + slides.length) % slides.length;
  lazyLoadSlide(slides[current]); // load background on demand
  slides[current].classList.add('active');
  dots[current]?.classList.add('active');

  // Call text update hook (defined in index.php)
  if (typeof window.onHeroSlideChange === 'function') {
    window.onHeroSlideChange(current);
  }

  // Animate text in
  setTimeout(() => {
    if (heroContent) {
      heroContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }
    isAnimating = false;
  }, 150);

  // Reset progress bar animation
  updateHeroProgress();
}

// Hero progress line
const heroProgressEl = document.getElementById('hero-progress-fill');
let progressInterval = null;
function updateHeroProgress() {
  if (!heroProgressEl) return;
  heroProgressEl.style.transition = 'none';
  heroProgressEl.style.width = '0%';
  clearInterval(progressInterval);
  setTimeout(() => {
    heroProgressEl.style.transition = 'width 5s linear';
    heroProgressEl.style.width = '100%';
  }, 20);
}

function startSlider() {
  if (slides.length < 2) return;
  clearInterval(timer);
  updateHeroProgress();
  timer = setInterval(() => goTo(current + 1), 5000);
}

dots.forEach((dot, i) => dot.addEventListener('click', () => {
  clearInterval(timer);
  goTo(i);
  startSlider();
}));

// Hero arrows
document.getElementById('hero-prev')?.addEventListener('click', () => { clearInterval(timer); goTo(current - 1); startSlider(); });
document.getElementById('hero-next')?.addEventListener('click', () => { clearInterval(timer); goTo(current + 1); startSlider(); });

// Touch / Swipe support
if (heroSection) {
  let touchStartX = 0, touchStartY = 0;
  heroSection.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  heroSection.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      clearInterval(timer);
      goTo(dx < 0 ? current + 1 : current - 1);
      startSlider();
    }
  }, { passive: true });
}

// Keyboard navigation for hero
document.addEventListener('keydown', e => {
  if (document.querySelector('.hero')) {
    if (e.key === 'ArrowLeft')  { clearInterval(timer); goTo(current - 1); startSlider(); }
    if (e.key === 'ArrowRight') { clearInterval(timer); goTo(current + 1); startSlider(); }
  }
});

if (slides.length) {
  // active class already set in PHP for first slide — just ensure content is visible
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }
  startSlider();
}

// ─── Scroll-wheel Hero Navigation — REMOVED ───
// The non-passive wheel handler was blocking the browser's scroll thread
// (passive:false + preventDefault prevented GPU-composited scrolling).
// Slide navigation is still available via: arrows, dot indicators, swipe, keyboard.

// ─── Section Dots Navigation ───
const sectionDotBtns = document.querySelectorAll('.section-dot-btn');
if (sectionDotBtns.length) {
  // Click to scroll
  sectionDotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.section;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Track active section with IntersectionObserver
  const sectionIds = [...sectionDotBtns].map(b => b.dataset.section);
  const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if (sectionEls.length) {
    const dotObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sectionDotBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === entry.target.id);
          });
        }
      });
    }, { threshold: 0.4 });
    sectionEls.forEach(el => dotObs.observe(el));
  }
}

// ─── Animated Counters ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur = 2200, step = 16;
  const increment = target / (dur / step);
  let val = 0;
  const tick = () => {
    val = Math.min(val + increment, target);
    el.textContent = '+' + Math.round(val);
    if (val < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counterEls.forEach(el => obs.observe(el));
}

// ─── Fade-In on Scroll ───
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), idx * 80);
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  fadeEls.forEach(el => fadeObs.observe(el));
}

// ─── Gallery / Portfolio Lightbox ───
(function () {
  var lightbox  = document.getElementById('lightbox');
  var lbImg     = document.getElementById('lightbox-img');
  var lbClose   = document.getElementById('lightbox-close');
  var lbPrev    = document.getElementById('lightbox-prev');
  var lbNext    = document.getElementById('lightbox-next');
  var lbCaption = document.getElementById('lightbox-caption');
  var lbItems = [], lbIndex = 0, lbCaptions = [];

  // Only init if this page actually has the generic lightbox element
  if (!lightbox) return;

  function openLightbox(items, index, captions) {
    lbItems = items; lbIndex = index; lbCaptions = captions || [];
    if (lbImg) { lbImg.src = lbItems[lbIndex]; }
    if (lbCaption) lbCaption.textContent = lbCaptions[lbIndex] || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { if (lbImg) lbImg.src = ''; }, 300);
  }
  function lbGo(dir) {
    lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
    if (!lbImg) return;
    lbImg.style.opacity = '0';
    setTimeout(function () {
      lbImg.src = lbItems[lbIndex];
      if (lbCaption) lbCaption.textContent = lbCaptions[lbIndex] || '';
      lbImg.style.opacity = '1';
    }, 150);
  }

  if (lbImg) lbImg.style.transition = 'opacity 0.15s ease';
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click',  function () { lbGo(-1); });
  if (lbNext)  lbNext.addEventListener('click',  function () { lbGo(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbGo(-1);
    if (e.key === 'ArrowRight') lbGo(1);
  });

  // Swipe
  var lbTouchX = 0;
  lightbox.addEventListener('touchstart', function (e) { lbTouchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - lbTouchX;
    if (Math.abs(dx) > 50) lbGo(dx < 0 ? 1 : -1);
  }, { passive: true });

  // Expose globally for pages that call openLightbox() from inline HTML
  window.openLightbox  = openLightbox;
  window.closeLightbox = closeLightbox;
  window.lbGo          = lbGo;
}());

// ─── Gallery Filter ───
const filterBtns   = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-card');
function rebindGalleryLightbox() {
  const visible = [...document.querySelectorAll('.gallery-item:not([style*="none"]):not(.hidden-cat)')];
  const srcs    = visible.map(el => el.dataset.lbSrc || el.querySelector('img')?.src).filter(Boolean);
  const caps    = visible.map(el => el.dataset.caption || '');
  visible.forEach((item, i) => {
    item.onclick = () => openLightbox(srcs, i, caps);
  });
}
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    galleryItems.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) item.classList.remove('hidden-cat');
      else item.classList.add('hidden-cat');
    });
    // Hook into pagination — show first page of filtered items
    if (typeof window.paginationReset === 'function') {
      const matched = [...galleryItems].filter(item =>
        cat === 'all' || item.dataset.cat === cat
      );
      window.paginationReset(matched);
    }
    rebindGalleryLightbox();
  });
});

// ─── Init Gallery Lightbox ───
const galleryImgs = document.querySelectorAll('.gallery-item img');
if (galleryImgs.length) {
  const allSrcs = [...galleryImgs].map(i => i.src);
  const allCaps = [...document.querySelectorAll('.gallery-item')].map(el => el.dataset.caption || '');
  galleryImgs.forEach((img, i) => {
    img.closest('.gallery-item').addEventListener('click', () => openLightbox(allSrcs, i, allCaps));
  });
}

// ─── Portfolio Lightbox ───
const portCards = document.querySelectorAll('.portfolio-card');
if (portCards.length) {
  const portSrcs = [...portCards].map(c => c.querySelector('img')?.src).filter(Boolean);
  const portCaps = [...portCards].map(c => c.querySelector('.portfolio-title')?.textContent || '');
  portCards.forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(portSrcs, i, portCaps));
  });
}

// ─── Contact Form ───
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn       = contactForm.querySelector('[type="submit"]');
    const successEl = document.getElementById('form-success');
    const errorEl   = document.getElementById('form-error');
    btn.disabled = true;
    btn.textContent = btn.dataset.sending || '...';
    errorEl && (errorEl.style.display = 'none');
    const data = Object.fromEntries(new FormData(contactForm));
    data.csrf_token = contactForm.dataset.csrf || '';
    try {
      const res  = await fetch('/api/contact.php', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
      const json = await res.json();
      if (json.ok) {
        // Rotate CSRF token for next submission
        if (json.csrf_token) contactForm.dataset.csrf = json.csrf_token;
        contactForm.style.display = 'none';
        successEl && (successEl.style.display = 'block');
      } else {
        if (errorEl) { errorEl.style.display = 'block'; errorEl.textContent = json.error || btn.dataset.error; }
        btn.disabled = false;
        btn.textContent = btn.dataset.submit;
      }
    } catch {
      if (errorEl) { errorEl.style.display = 'block'; errorEl.textContent = btn.dataset.error; }
      btn.disabled = false;
      btn.textContent = btn.dataset.submit;
    }
  });
}
document.getElementById('send-another')?.addEventListener('click', () => {
  document.getElementById('contact-form').style.display = '';
  document.getElementById('form-success').style.display = 'none';
  document.getElementById('contact-form').reset();
});

// ─── Back to Top ───
// Visibility toggle is handled in the unified rAF scroll handler above.
if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── Hidden-cat CSS injection (gallery filter) ───
const style = document.createElement('style');
style.textContent = '.hidden-cat { display:none !important; }';
document.head.appendChild(style);
