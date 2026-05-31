import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Award, Sparkles, Building2, Zap } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const showcaseProjects = {
  ar: [
    {
      id: 1,
      image: `${BASE}/images/portfolio/image_restaurant_2.jpeg`,
      client: "IMAGE Restaurant",
      tag: "هوية بصرية",
      tagline: "حروف ذهبية على رخام أبيض",
      desc: "شعار ثلاثي الأبعاد مُذهّب بدقة متناهية — يتحدث قبل أن يتحدث أحد.",
    },
    {
      id: 2,
      image: `${BASE}/images/portfolio/khayallah_2.jpeg`,
      client: "خيالة",
      tag: "لافتات مضيئة",
      tagline: "لافتة تُضيء الشارع",
      desc: "إضاءة ذهبية تحوّل الواجهة إلى معلم لا يُنسى في قلب المدينة.",
    },
    {
      id: 3,
      image: `${BASE}/images/portfolio/express_motors_8.jpeg`,
      client: "إكسبرس موتورز",
      tag: "برندينج داخلي",
      tagline: "صالة عرض بهوية تليق بالعلامة",
      desc: "من الحرف الأول إلى آخر شعاع ضوء — حضور يصنع الانطباع الأول.",
    },
  ],
  en: [
    {
      id: 1,
      image: `${BASE}/images/portfolio/image_restaurant_2.jpeg`,
      client: "IMAGE Restaurant",
      tag: "Brand Identity",
      tagline: "Gold Letters on White Marble",
      desc: "A precision-gilded 3D logo — it speaks before anyone does.",
    },
    {
      id: 2,
      image: `${BASE}/images/portfolio/khayallah_2.jpeg`,
      client: "Khayallah",
      tag: "Illuminated Signs",
      tagline: "A Sign That Lights Up the Street",
      desc: "Golden illumination transforms the facade into an unforgettable city landmark.",
    },
    {
      id: 3,
      image: `${BASE}/images/portfolio/express_motors_8.jpeg`,
      client: "Express Motors",
      tag: "Interior Branding",
      tagline: "A Showroom Identity That Matches the Brand",
      desc: "From the first letter to the last beam of light — presence that creates the first impression.",
    },
  ],
};

export function ProjectShowcaseSection() {
  const { lang } = useLang();
  const isEn = lang === "en";
  const [active, setActive] = useState(0);

  const projects = isEn ? showcaseProjects.en : showcaseProjects.ar;
  const project = projects[active];

  const stats = isEn ? [
    { icon: Building2, value: "+2400", label: "Successful Projects" },
    { icon: Award,     value: "+11",   label: "Years Experience" },
    { icon: Sparkles,  value: "100%",  label: "Quality Commitment" },
    { icon: Zap,       value: "48h",  label: "Response Time" },
  ] : [
    { icon: Building2, value: "+2400", label: "مشروع ناجح" },
    { icon: Award,     value: "+11",   label: "سنوات خبرة" },
    { icon: Sparkles,  value: "100%",  label: "التزام بالجودة" },
    { icon: Zap,       value: "48h",  label: "وقت استجابة" },
  ];

  const txt = {
    badge:     isEn ? "Work That Speaks for Itself"     : "أعمال تتحدث عن نفسها",
    headline1: isEn ? "Your Brand "                     : "علامتك التجارية ",
    headlineHL:isEn ? "Deserves"                        : "تستحق",
    headline2: isEn ? " to Be Seen Clearly"             : " أن تُرى بوضوح",
    sub:       isEn
      ? "We transform identities into signs that stay in memory — from the first design line to the final installation moment. Quality is non-negotiable."
      : "نحوّل الهويات إلى لافتات تُعلَق في الذاكرة — من أولى الخطوط التصميمية حتى لحظة التركيب النهائي. جودة لا تُساوَم.",
    cta1:      isEn ? "View All Our Work"      : "شاهد كل أعمالنا",
    cta2:      isEn ? "Start Your Project Now" : "ابدأ مشروعك الآن",
  };

  return (
    <section className="relative py-0 overflow-hidden bg-[#040404]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">

        {/* Left: Image panel */}
        <div className="relative overflow-hidden min-h-[55vw] lg:min-h-0">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="absolute inset-0"
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <img src={p.image} alt={p.client} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#040404] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040404]/80 via-transparent to-transparent" />
            </motion.div>
          ))}

          {/* Project thumbnails */}
          <div className="absolute bottom-6 right-6 flex gap-3 z-10">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`w-16 h-12 overflow-hidden border-2 transition-all duration-300 ${
                  i === active ? "border-primary scale-110" : "border-white/20 hover:border-white/50 opacity-60"
                }`}
              >
                <img src={p.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Client badge */}
          <motion.div
            key={`badge-${active}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-6 right-6 z-10"
          >
            <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest">
              {project.tag}
            </span>
          </motion.div>
        </div>

        {/* Right: Copy panel */}
        <div className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-20 lg:py-0">
          <div className="w-12 h-0.5 brand-gradient mb-8" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/10 text-primary text-xs font-black tracking-widest uppercase w-fit mb-6"
          >
            <Sparkles className="w-3 h-3" />
            {txt.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6"
          >
            {txt.headline1}
            <span className="brand-gradient-text">{txt.headlineHL}</span>
            <br />{txt.headline2}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md"
          >
            {txt.sub}
          </motion.p>

          {/* Active project card */}
          <motion.div
            key={`card-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border/60 bg-white/[0.03] p-6 mb-10"
          >
            <p className="text-xs font-black tracking-widest text-primary uppercase mb-2">{project.client}</p>
            <h3 className="text-xl font-black text-white mb-2">{project.tagline}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-black text-base hover:bg-primary/90 transition-colors group"
            >
              {txt.cta1}
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            </Link>
            <a
              href="https://wa.me/966563538520"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-black text-base hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              {txt.cta2}
            </a>
          </motion.div>

          <div className="w-12 h-0.5 brand-gradient mt-10 opacity-40" />
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-border/40 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-border/30 rtl:divide-x-reverse">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 py-7 px-6 border-b md:border-b-0 border-border/30"
              >
                <div className="w-10 h-10 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white leading-none mb-0.5" dir="ltr">{value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </section>
  );
}
