import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const realWorkPhotos = (isEn: boolean) => [
  { src: `${BASE}/images/portfolio/alawad_facade.jpeg`,          caption: isEn ? "Al-Awad — Illuminated Gold Facade"          : "العواد — واجهة ذهبية مضيئة" },
  { src: `${BASE}/images/portfolio/khayallah_facade_night_1.jpeg`, caption: isEn ? "Khayallah — Professional Night Facade"     : "خيالة — واجهة ليلية احترافية" },
  { src: `${BASE}/images/portfolio/life_spirit_facade.jpeg`,     caption: isEn ? "Life Spirit — Integrated Interior Identity"   : "Life Spirit — هوية داخلية متكاملة" },
  { src: `${BASE}/images/portfolio/image_restaurant_gold_2.jpeg`, caption: isEn ? "IMAGE — Gold 3D Letters"                    : "IMAGE — حروف ذهبية 3D" },
  { src: `${BASE}/images/portfolio/inmar_facade.jpeg`,           caption: isEn ? "INMAR — Large Building Facade"               : "INMAR — واجهة بناية ضخمة" },
  { src: `${BASE}/images/portfolio/papillon_facade.jpeg`,        caption: isEn ? "Papillon — Neon Night Sign"                  : "Papillon — لافتة نيون ليلية" },
];

export default function About() {
  const { t, lang } = useLang();
  const isEn = lang === "en";
  const photos = realWorkPhotos(isEn);

  const values = [
    { title: t.value1Title, desc: t.value1Desc },
    { title: t.value2Title, desc: t.value2Desc },
    { title: t.value3Title, desc: t.value3Desc },
    { title: t.value4Title, desc: t.value4Desc },
    { title: t.value5Title, desc: t.value5Desc },
    { title: t.value6Title, desc: t.value6Desc },
  ];

  return (
    <div className="w-full min-h-screen bg-background">

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.aboutBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
              {t.aboutHero1} <br />
              <span className="brand-gradient-text">{t.aboutHero2}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {t.aboutHeroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 border-y border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
                {t.storyTitle} <span className="text-primary">{t.storyHighlight}</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>{t.storyP1}</p>
                <p>{t.storyP2}</p>
                <p>{t.storyP3}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              {/* Photo mosaic — 3 rows */}
              <div className="grid grid-cols-2 gap-3">
                {photos.slice(0, 4).map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative overflow-hidden group"
                    data-testid={`about-stat-${i}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-white text-xs font-bold">{photo.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Wide bottom photo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="relative overflow-hidden group"
              >
                <img
                  src={photos[4].src}
                  alt={photos[4].caption}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent flex items-center px-4">
                  <p className="text-white text-sm font-black">{photos[4].caption}</p>
                </div>
              </motion.div>
              {/* Stat strip */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { num: "2015",   labelAr: "التأسيس",  labelEn: "Founded" },
                  { num: "+2400", labelAr: "مشروع",    labelEn: "Projects" },
                  { num: "+300",  labelAr: "عميل",     labelEn: "Clients" },
                  { num: "+11",   labelAr: "سنة",      labelEn: "Years" },
                ].map(({ num, labelAr, labelEn }, i) => (
                  <div key={i} className="bg-card border border-border p-3 text-center" data-testid={`about-stat-strip-${i}`}>
                    <div className="text-xl font-black text-primary" dir="ltr">{num}</div>
                    <div className="text-muted-foreground text-xs font-semibold">{lang === "en" ? labelEn : labelAr}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-10 md:p-14 relative overflow-hidden group hover:border-primary/40 transition-colors"
              data-testid="card-vision"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-primary font-black text-sm tracking-widest uppercase mb-6 border border-primary/30 px-3 py-1">
                  {t.visionLabel}
                </div>
                <h3 className="text-3xl font-black text-white mb-6">{t.visionTitle}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{t.visionText}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-primary p-10 md:p-14 relative overflow-hidden"
              data-testid="card-mission"
            >
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-white font-black text-sm tracking-widest uppercase mb-6 border border-white/30 px-3 py-1">
                  {t.missionLabel}
                </div>
                <h3 className="text-3xl font-black text-white mb-6">{t.missionTitle}</h3>
                <p className="text-white/90 leading-relaxed text-lg">{t.missionText}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/20 border-y border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.valuesTitle} <span className="text-primary">{t.valuesHighlight}</span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t.valuesSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 p-8 bg-card border border-border hover:border-primary/30 transition-colors"
                data-testid={`card-value-${i}`}
              >
                <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-white text-lg mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.officesTitle} <span className="text-primary">{t.officesHighlight}</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { city: t.office1City, desc: t.office1Desc, badge: t.office1Badge },
              { city: t.office2City, desc: t.office2Desc, badge: t.office2Badge },
            ].map(({ city, desc, badge }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border p-10 text-center hover:border-primary/40 transition-colors"
                data-testid={`card-office-${i}`}
              >
                <div className="inline-flex items-center gap-2 text-primary text-xs font-bold border border-primary/30 px-3 py-1 mb-5">
                  {badge}
                </div>
                <h3 className="text-3xl font-black text-white mb-3">{city}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">{t.aboutCtaTitle}</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">{t.aboutCtaDesc}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-background text-foreground font-black text-xl hover:bg-white hover:text-black transition-colors"
            data-testid="link-about-cta"
          >
            {t.aboutCtaBtn}
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
