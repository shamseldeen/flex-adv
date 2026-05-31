import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, MapPin, Layers, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const khayallahGallery = {
  ar: [
    { src: `${BASE}/images/portfolio/khayallah_facade_night_1.jpeg`, caption: "الواجهة الرئيسية — إضاءة ذهبية" },
    { src: `${BASE}/images/portfolio/khayallah_facade_night_2.jpeg`, caption: "اللافتة المضيئة تُضيء الليل" },
    { src: `${BASE}/images/portfolio/khayallah_facade_night_3.jpeg`, caption: "هوية واجهة متكاملة" },
    { src: `${BASE}/images/portfolio/khayallah_facade_day_1.jpeg`,   caption: "الواجهة نهاراً — نظافة وأناقة" },
    { src: `${BASE}/images/portfolio/khayallah_totem_yellow.jpeg`,   caption: "برج الإرشاد المضيء بالأصفر" },
    { src: `${BASE}/images/portfolio/khayallah_totem_lit_1.jpeg`,    caption: "برج الإرشاد بإضاءة ذهبية" },
    { src: `${BASE}/images/portfolio/khayallah_totem_dark.jpeg`,     caption: "البرج الإرشادي — لوحة داكنة" },
    { src: `${BASE}/images/portfolio/khayallah_parking_sign_1.jpeg`, caption: "لافتة مواقف معلقة — تصميم راقٍ" },
    { src: `${BASE}/images/portfolio/khayallah_parking_sign_2.jpeg`, caption: "لافتة مواقف معلقة — زاوية ثانية" },
    { src: `${BASE}/images/portfolio/khayallah_parking_wall.jpeg`,   caption: "لوحة جدارية للمواقف — ذهبي داكن" },
    { src: `${BASE}/images/portfolio/khayallah_elevator_sign.jpeg`,  caption: "لافتة مصاعد الركاب — أكريليك شفاف" },
    { src: `${BASE}/images/portfolio/khayallah_install_1.jpeg`,      caption: "لحظة التركيب — دقة ميدانية" },
  ],
  en: [
    { src: `${BASE}/images/portfolio/khayallah_facade_night_1.jpeg`, caption: "Main Facade — Golden Illumination" },
    { src: `${BASE}/images/portfolio/khayallah_facade_night_2.jpeg`, caption: "Illuminated Sign Lights Up the Night" },
    { src: `${BASE}/images/portfolio/khayallah_facade_night_3.jpeg`, caption: "Integrated Facade Identity" },
    { src: `${BASE}/images/portfolio/khayallah_facade_day_1.jpeg`,   caption: "Daytime Facade — Clean & Elegant" },
    { src: `${BASE}/images/portfolio/khayallah_totem_yellow.jpeg`,   caption: "Illuminated Yellow Wayfinding Totem" },
    { src: `${BASE}/images/portfolio/khayallah_totem_lit_1.jpeg`,    caption: "Wayfinding Totem — Golden Light" },
    { src: `${BASE}/images/portfolio/khayallah_totem_dark.jpeg`,     caption: "Wayfinding Totem — Dark Panel" },
    { src: `${BASE}/images/portfolio/khayallah_parking_sign_1.jpeg`, caption: "Suspended Parking Sign — Premium Design" },
    { src: `${BASE}/images/portfolio/khayallah_parking_sign_2.jpeg`, caption: "Suspended Parking Sign — Second Angle" },
    { src: `${BASE}/images/portfolio/khayallah_parking_wall.jpeg`,   caption: "Parking Wall Sign — Dark Gold" },
    { src: `${BASE}/images/portfolio/khayallah_elevator_sign.jpeg`,  caption: "Elevator Sign — Transparent Acrylic" },
    { src: `${BASE}/images/portfolio/khayallah_install_1.jpeg`,      caption: "Installation Moment — Field Precision" },
  ],
};

const imageRestaurantGallery = {
  ar: [
    { src: `${BASE}/images/portfolio/image_restaurant_gold_1.jpeg`, caption: "حروف ثلاثية الأبعاد بخلفية رخامية" },
    { src: `${BASE}/images/portfolio/image_restaurant_gold_2.jpeg`, caption: "الإضاءة الخلفية تُبرز الذهب" },
    { src: `${BASE}/images/portfolio/image_restaurant_2.jpeg`,      caption: "الشعار في بيئته النهائية" },
  ],
  en: [
    { src: `${BASE}/images/portfolio/image_restaurant_gold_1.jpeg`, caption: "3D Letters on Marble Background" },
    { src: `${BASE}/images/portfolio/image_restaurant_gold_2.jpeg`, caption: "Back-lighting Highlights the Gold" },
    { src: `${BASE}/images/portfolio/image_restaurant_2.jpeg`,      caption: "Logo in Its Final Environment" },
  ],
};

function ImageGallery({ images }: { images: { src: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 2500);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  const next = () => { setCurrent((p) => (p + 1) % images.length); resetTimer(); };
  const prev = () => { setCurrent((p) => (p - 1 + images.length) % images.length); resetTimer(); };

  return (
    <div className="relative group">
      <div className="relative overflow-hidden aspect-[4/3] bg-black">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img.src}
            alt={img.caption}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <p className="absolute bottom-4 right-4 left-4 text-sm text-white/90 font-medium text-right">
          {images[current].caption}
        </p>
        <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/80"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/80"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white/70 text-xs px-2 py-1 font-mono">
        {current + 1} / {images.length}
      </span>
    </div>
  );
}

export function CaseStudySection() {
  const { lang } = useLang();
  const isEn = lang === "en";

  const kGallery = isEn ? khayallahGallery.en : khayallahGallery.ar;
  const iGallery = isEn ? imageRestaurantGallery.en : imageRestaurantGallery.ar;

  const content = {
    sectionBadge:   isEn ? "Real Case Studies"                      : "دراسات حالة حقيقية",
    sectionTitle:   isEn ? "From Concept to "                        : "من الفكرة إلى ",
    sectionTitleHL: isEn ? "the Final Sign"                          : "اللافتة الأخيرة",
    sectionDesc:    isEn
      ? "Not just design — a complete visual identity system covering every corner, every corridor, every facade. These aren't hypothetical examples; these are delivered projects that are working right now."
      : "ليس مجرد تصميم — بل منظومة هوية بصرية متكاملة تُغطي كل زاوية، كل ممر، كل واجهة. هذه ليست أمثلة وهمية، هذه مشاريع سلّمناها وهي تعمل الآن.",

    k_badge:   isEn ? "Full Project — Riyadh"                 : "مشروع متكامل — الرياض",
    k_title:   isEn ? "Khayallah — Visual Identity & Wayfinding System" : "خيالة — نظام الهوية البصرية والإرشاد",
    k_tags:    isEn
      ? ["External Facades", "Wayfinding System", "Illuminated Signs", "Field Installation"]
      : ["واجهات خارجية", "نظام إرشاد", "لافتات مضيئة", "تركيب ميداني"],
    k_headline: isEn
      ? "Every person who enters the building knows "
      : "كل شخص يدخل المبنى يعرف ",
    k_headlineHL: isEn ? "where to go"    : "أين يذهب",
    k_headlineEnd: isEn ? " — because we built the way."  : " — لأننا صنعنا له الطريق.",
    k_desc: isEn
      ? "The Khayallah project was not just a facade sign. It was a complete system: the illuminated exterior facade, floor wayfinding totems, suspended parking signs, wall panels — every piece designed to speak one language."
      : "مشروع خيالة لم يكن مجرد لافتة على الواجهة. كان منظومة كاملة: الواجهة الخارجية المضيئة، أبراج الإرشاد بالطوابق، لافتات المواقف المعلقة، اللوحات الجدارية — كل قطعة مدروسة لتتحدث بلغة واحدة.",
    k_services: isEn ? [
      { icon: Layers,   label: "Integrated Wayfinding System", desc: "Wayfinding Totems · Floor Signs · Emergency Instructions" },
      { icon: MapPin,   label: "External Facade Signs",        desc: "Illuminated Letters · Calculated Size · LED Lighting" },
      { icon: Lightbulb,label: "Design & Execution in One Hand", desc: "From Blueprint to the Final Bolt" },
    ] : [
      { icon: Layers,   label: "نظام إرشاد متكامل",              desc: "برج الإرشاد · لافتات الطوابق · تعليمات الطوارئ" },
      { icon: MapPin,   label: "لافتات واجهات خارجية",           desc: "حروف مضيئة · حجم مدروس · إضاءة LED" },
      { icon: Lightbulb,label: "تصميم وتنفيذ في يد واحدة",      desc: "من المخطط حتى المسمار الأخير" },
    ],
    k_quote: isEn
      ? '"Visual identity does not end at the logo — it begins on the street and extends all the way to the elevator."'
      : '"الهوية البصرية لا تنتهي عند الشعار — تبدأ من الشارع وتمتد حتى المصعد."',

    i_badge:   isEn ? "Visual Identity — Restaurant"  : "هوية بصرية — مطعم",
    i_title1:  isEn ? "IMAGE — When the Logo Becomes " : "IMAGE — حين يصبح الشعار ",
    i_titleHL: isEn ? "an Architectural Masterpiece"   : "تحفة معمارية",
    i_desc:    isEn
      ? "Golden 3D letters on a white marble wall — we didn't make a sign, we made the first thing a visitor sees and the last thing they forget. The back-lighting adds depth; the golden material adds luxury."
      : "حروف ذهبية ثلاثية الأبعاد على جدار رخامي أبيض — لم نصنع لافتة، صنعنا أول شيء يراه الزائر ويبقى في ذاكرته. الإضاءة الخلفية تمنح العمق، والمادة الذهبية تمنح الفخامة.",
    i_specs: isEn ? [
      { v: "3D Letters",       l: "Chrome Gold" },
      { v: "Marble Background",l: "Pure White" },
      { v: "Back Lighting",    l: "Warm LED" },
      { v: "Precise Install",  l: "Spirit-Level Accurate" },
    ] : [
      { v: "حروف 3D",      l: "ذهب كروم" },
      { v: "خلفية رخامية", l: "بيضاء ناصعة" },
      { v: "إضاءة خلفية",  l: "LED دافئة" },
      { v: "تركيب دقيق",   l: "بمستوى الميزان" },
    ],
    i_cta:   isEn ? "See More of Our Work"  : "شاهد المزيد من أعمالنا",

    ctaTitle:   isEn ? "Your Next Project Deserves This Level" : "مشروعك التالي يستحق هذا المستوى",
    ctaDesc:    isEn
      ? "Contact us today — we start by understanding your identity, and finish with a project you're proud of on the ground."
      : "تواصل معنا اليوم — نبدأ بفهم هويتك، وننتهي بمشروع تفخر به على أرض الواقع.",
    ctaBtn1:    isEn ? "Start Your Project Now" : "ابدأ مشروعك الآن",
    ctaBtn2:    isEn ? "Browse All Our Work"    : "تصفح كل أعمالنا",
  };

  return (
    <section className="bg-[#060606] py-20 overflow-hidden">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-6">
            {content.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-5">
            {content.sectionTitle}
            <span className="brand-gradient-text">{content.sectionTitleHL}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {content.sectionDesc}
          </p>
        </motion.div>

        {/* PROJECT 1 — KHAYALLAH */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-border/30">
            <div>
              <p className="text-primary text-xs font-black tracking-widest uppercase mb-2">{content.k_badge}</p>
              <h3 className="text-3xl sm:text-4xl font-black text-white">{content.k_title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.k_tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-border/40 text-white/60 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              <ImageGallery images={kGallery} />
            </div>
            <div className="lg:col-span-2 flex flex-col justify-center gap-8">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white leading-snug mb-4">
                  {content.k_headline}
                  <span className="brand-gradient-text">{content.k_headlineHL}</span>
                  {content.k_headlineEnd}
                </p>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{content.k_desc}</p>
              </div>

              <div className="space-y-4">
                {content.k_services.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-white/[0.03] border border-border/30">
                    <div className="w-9 h-9 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-black text-sm mb-0.5">{label}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="border-r-2 border-primary pr-4">
                <p className="text-white/80 italic text-sm leading-relaxed">{content.k_quote}</p>
              </blockquote>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-6 gap-2">
            {kGallery.slice(0, 6).map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* PROJECT 2 — IMAGE Restaurant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-primary text-xs font-black tracking-widest uppercase mb-3">{content.i_badge}</p>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-snug">
                {content.i_title1}
                <span className="brand-gradient-text">{content.i_titleHL}</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">{content.i_desc}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {content.i_specs.map(({ v, l }) => (
                  <div key={v} className="p-3 bg-white/[0.03] border border-border/30">
                    <p className="text-white font-black text-sm">{v}</p>
                    <p className="text-muted-foreground text-xs">{l}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-black text-sm hover:bg-primary hover:text-white transition-colors group"
              >
                {content.i_cta}
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <ImageGallery images={iGallery} />
            </div>
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-primary/30 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 p-10 sm:p-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)/8%_0%,_transparent_70%)]" />
          <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 relative z-10">{content.ctaTitle}</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10 text-[15px]">{content.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a
              href="https://wa.me/966563538520"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-black text-base hover:bg-primary/90 transition-colors"
            >
              {content.ctaBtn1}
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-black text-base hover:bg-white/5 transition-colors group"
            >
              {content.ctaBtn2}
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-20" />
    </section>
  );
}
