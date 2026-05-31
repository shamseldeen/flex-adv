import { useGetSiteStats, useListServices, useListPortfolio } from "@workspace/api-client-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Play, TrendingUp, Users, Award, MonitorPlay, Zap, CheckCircle, Lightbulb, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { GalleryPreviewSection } from "@/components/GalleryPreviewSection";
import { WorkPreviewSection } from "@/components/WorkPreviewSection";
import { useLang } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const heroSlideImages = [
  `${BASE}/images/landmarks/alula_ancient.jpg`,
  `${BASE}/images/landmarks/kingdom_tower.jpg`,
  `${BASE}/images/landmarks/king_fahad_road.jpg`,
  `${BASE}/images/landmarks/kaaba_aerial.jpg`,
  `${BASE}/images/landmarks/alula.jpg`,
  `${BASE}/images/landmarks/diriyah.jpg`,
  `${BASE}/images/landmarks/riyadh_sunset.jpg`,
  `${BASE}/images/landmarks/neom_line.jpg`,
];

function AnimatedCounter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLHeadingElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [started, value, count]);

  return (
    <h3 ref={ref} className="text-5xl font-black text-white mb-2" dir="ltr">
      {suffix}<motion.span>{rounded}</motion.span>
    </h3>
  );
}

const HERO_SLIDES = [
  {
    ar: {
      badge: "من عمق التاريخ إلى ذروة الإبداع",
      title1: "جذورنا في التراث",
      title2: "وأثرنا في الغد",
      subtitle: "كما نقشت حضارات الجزيرة العربية اسمها في الصخر، نحن ننقش علامتك في ذاكرة جمهورك إلى الأبد.",
    },
    en: {
      badge: "From Ancient Roots to Modern Impact",
      title1: "Rooted in Heritage",
      title2: "Defining Tomorrow",
      subtitle: "Just as Arabian civilizations carved their names into stone, we carve your brand into the memory of your audience — forever.",
    },
  },
  {
    ar: {
      badge: "طموح بلا سقف",
      title1: "نبني علامتك",
      title2: "حتى تلامس السحاب",
      subtitle: "ليس كل من ارتفع وصل — لكن من يملك الرؤية والشريك الصح يصل دائماً. نحن شريكك نحو القمة.",
    },
    en: {
      badge: "Ambition Without Limits",
      title1: "We Build Your Brand",
      title2: "Until It Touches the Sky",
      subtitle: "Not everyone who rises, reaches — but those with the right vision and the right partner always do. We are that partner.",
    },
  },
  {
    ar: {
      badge: "في قلب الحركة التجارية",
      title1: "علامتك في كل مكان",
      title2: "ولا مكان تختفي فيه",
      subtitle: "السوق لا يرحم الغائبين — نجعل علامتك حاضرة بقوة في كل منعطف، كل شاشة، وكل قرار شراء.",
    },
    en: {
      badge: "At the Heart of Commerce",
      title1: "Your Brand Everywhere",
      title2: "Impossible to Ignore",
      subtitle: "The market is merciless to the absent — we make your brand impossible to miss, at every turn, every screen, every buying decision.",
    },
  },
  {
    ar: {
      badge: "قوة تتجاوز الحدود",
      title1: "نصنع الحضور",
      title2: "الذي يجمع القلوب",
      subtitle: "العلامات العظيمة لا تبيع فقط — تُلهم وتجمع. نبني لك هوية تتجاوز المنتج وتصبح جزءاً من حياة الناس.",
    },
    en: {
      badge: "Power Beyond Borders",
      title1: "We Build Presence",
      title2: "That Moves People",
      subtitle: "Great brands don't just sell — they inspire and unite. We build you an identity that transcends the product and becomes part of people's lives.",
    },
  },
  {
    ar: {
      badge: "حيث الجمال يصبح علامة",
      title1: "الإعلان فن",
      title2: "ونحن نتقن هذا الفن",
      subtitle: "كما أن العلا تسحر كل من يراها بصمت ومهابة، إعلاناتنا تأسر الجمهور قبل أن ينطق بكلمة.",
    },
    en: {
      badge: "Where Beauty Becomes Brand",
      title1: "Advertising Is an Art",
      title2: "And We've Mastered It",
      subtitle: "Just as AlUla captivates all who see it in silent awe, our campaigns captivate audiences before a single word is spoken.",
    },
  },
  {
    ar: {
      badge: "أصالة تُقاوم الزمن",
      title1: "هويتك التجارية",
      title2: "إرث يدوم للأجيال",
      subtitle: "الدرعية بنت مجدها على الأصالة والإرادة — نبني علامتك على نفس الأسس لتبقى شامخة جيلاً بعد جيل.",
    },
    en: {
      badge: "Authenticity That Withstands Time",
      title1: "Your Brand Identity",
      title2: "A Legacy Built to Last",
      subtitle: "Diriyah built its glory on authenticity and will — we build your brand on the same foundations, standing tall for generations to come.",
    },
  },
  {
    ar: {
      badge: "كل غروب بداية جديدة",
      title1: "مع فلكس",
      title2: "علامتك في صعود مستمر",
      subtitle: "المدن التي لا تنام تبنيها الأحلام — نمنح علامتك الطاقة التي تجعلها تتألق في كل شروق جديد.",
    },
    en: {
      badge: "Every Sunset, A New Beginning",
      title1: "With Flex",
      title2: "Your Brand Always Rising",
      subtitle: "The cities that never sleep are built on dreams — we give your brand the energy to shine brighter with every new dawn.",
    },
  },
  {
    ar: {
      badge: "نحو مستقبل لم يُبنَ بعد",
      title1: "نصنع المستحيل",
      title2: "ونترك أثراً لا يُنسى",
      subtitle: "المستقبل لا ينتظر — وأنت لا يجب أن تنتظر. فلكس تقودك نحو غدٍ يُحسدك عليه منافسوك.",
    },
    en: {
      badge: "Towards an Unbuilt Future",
      title1: "We Create the Impossible",
      title2: "And Leave a Lasting Legacy",
      subtitle: "The future doesn't wait — and neither should you. Flex for Advertising leads you toward a tomorrow your competitors will envy.",
    },
  },
];

export default function Home() {
  const { data: stats, isLoading: isStatsLoading } = useGetSiteStats();
  const { data: services, isLoading: isServicesLoading } = useListServices();
  const { data: portfolio, isLoading: isPortfolioLoading } = useListPortfolio();
  const { t, lang } = useLang();
  const whyUsFeatures = [
    { icon: Star,        title: t.whyFeature1Title, desc: t.whyFeature1Desc },
    { icon: Lightbulb,   title: t.whyFeature2Title, desc: t.whyFeature2Desc },
    { icon: Clock,       title: t.whyFeature3Title, desc: t.whyFeature3Desc },
    { icon: CheckCircle, title: t.whyFeature4Title, desc: t.whyFeature4Desc },
    { icon: Users,       title: t.whyFeature5Title, desc: t.whyFeature5Desc },
    { icon: TrendingUp,  title: t.whyFeature6Title, desc: t.whyFeature6Desc },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const isScrollingHero = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlideImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlideImages.length) % heroSlideImages.length);

  // Scroll-wheel navigation inside hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (isScrollingHero.current) return;
      const delta = e.deltaY;
      if (Math.abs(delta) < 30) return;
      e.preventDefault();
      isScrollingHero.current = true;
      if (delta > 0) nextSlide(); else prevSlide();
      setTimeout(() => { isScrollingHero.current = false; }, 900);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch swipe navigation inside hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 40) return;
      if (dx < 0) nextSlide(); else prevSlide();
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Section with Slider */}
      <section ref={heroRef} id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {heroSlideImages.map((image, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ opacity: i === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/72 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-[8000ms] ease-linear"
              style={{
                backgroundImage: `url("${image}")`,
                transform: i === currentSlide ? "scale(1.05)" : "scale(1)",
              }}
            />
          </motion.div>
        ))}

        {/* Slide dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroSlideImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              data-testid={`button-hero-dot-${i}`}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20">
          <div className="max-w-4xl">
            {(() => {
              const slide = HERO_SLIDES[currentSlide];
              const s = lang === "ar" ? slide.ar : slide.en;
              return (
                <>
                  <motion.div
                    key={`badge-${currentSlide}-${lang}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {s.badge}
                    </div>
                  </motion.div>

                  <motion.h1
                    key={`title-${currentSlide}-${lang}`}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {s.title1} <br />
                    <span className="brand-gradient-text">
                      {s.title2}
                    </span>
                  </motion.h1>

                  <motion.p
                    key={`sub-${currentSlide}-${lang}`}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {s.subtitle}
                  </motion.p>
                </>
              );
            })()}

            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
                data-testid="link-hero-portfolio"
              >
                {t.exploreWork}
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                data-testid="link-hero-contact"
              >
                <Play className="w-5 h-5" />
                {t.contactUs}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Some of Our Work */}
      <WorkPreviewSection />

      {/* Gallery Preview */}
      <GalleryPreviewSection />

      {/* Stats Section */}
      <section id="stats" className="py-20 border-y border-border/50 bg-background/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {isStatsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="w-20 h-16 mb-4 bg-white/5" />
                  <Skeleton className="w-32 h-6 bg-white/5" />
                </div>
              ))
            ) : (
              <>
                {[
                  { value: stats?.projectsCount || 2400, icon: TrendingUp, label: t.statsProjects },
                  { value: stats?.clientsCount || 300, icon: Users, label: t.statsClients },
                  { value: stats?.yearsExperience || 11, icon: Award, label: t.statsYears },
                  { value: stats?.teamSize || 100, icon: Zap, label: t.statsTeam },
                ].map(({ value, icon: Icon, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col items-center text-center group"
                    data-testid={`stat-item-${i}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <AnimatedCounter value={value} />
                    <p className="text-muted-foreground font-bold text-lg">{label}</p>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {t.servicesTitle.split("؟")[0]}
                <span className="text-primary">؟</span>
              </h2>
              <p className="text-xl text-muted-foreground">{t.servicesSubtitle}</p>
            </div>
            <Link
              href="/services"
              className="text-white hover:text-primary font-bold text-lg flex items-center gap-2 transition-colors group"
            >
              {t.viewAll}
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isServicesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full bg-secondary/50 rounded-none" />
              ))
            ) : (
              services?.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border p-10 hover:border-primary/50 transition-all group cursor-pointer hover:bg-card/80"
                  data-testid={`card-service-${service.id}`}
                >
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                    <MonitorPlay className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {lang === "ar" ? service.title : (service.title_en || service.title)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {lang === "ar" ? service.description : (service.description_en || service.description)}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Clients Marquee */}
      <div id="clients">
        <ClientsMarquee />
      </div>

      {/* Why Us Section */}
      <section id="why-us" className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.competitiveBadge}
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t.whyUsTitle}
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t.whyUsSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsFeatures.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex gap-5 p-8 border border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all group"
                data-testid={`card-why-us-${i}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 relative overflow-hidden brand-gradient brand-glow">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.ctaTitle}
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.ctaSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-background text-foreground font-black text-xl hover:bg-white hover:text-black transition-colors shadow-2xl"
              data-testid="link-cta-start"
            >
              {t.startNow}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
