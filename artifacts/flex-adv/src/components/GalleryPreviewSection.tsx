import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Camera } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const previewImages = [
  { src: `${BASE}/images/portfolio/pepsi_music_2.jpeg`,    tall: true },
  { src: `${BASE}/images/portfolio/express_motors_1.jpeg`, tall: false },
  { src: `${BASE}/images/portfolio/protein_up_1.jpeg`,     tall: false },
  { src: `${BASE}/images/portfolio/medical_center_1.jpeg`, tall: true },
  { src: `${BASE}/images/portfolio/business_yard_1.jpeg`,  tall: false },
  { src: `${BASE}/images/portfolio/savvy_dental_1.jpeg`,   tall: false },
  { src: `${BASE}/images/portfolio/express_motors_4.jpeg`, tall: true },
  { src: `${BASE}/images/portfolio/ice_creamaa_1.jpeg`,    tall: false },
  { src: `${BASE}/images/portfolio/pepsi_music_3.jpeg`,    tall: false },
];

export function GalleryPreviewSection() {
  const { lang } = useLang();
  const isEn = lang === "en";

  const txt = {
    badge:     isEn ? "Project Gallery"                          : "ألبوم المشاريع",
    title1:    isEn ? "Real Photos from "                        : "صور حقيقية من ",
    titleHL:   isEn ? "Our Work"                                 : "أعمالنا",
    desc:      isEn
      ? "Over 190 real photos from our executed projects — printing, manufacturing, events, identities, and more."
      : "أكثر من 190 صورة حقيقية من مشاريعنا المنفذة — طباعة، تصنيع، فعاليات، هويات وأكثر.",
    browse:    isEn ? "Explore Full Gallery"   : "استكشف الألبوم الكامل",
    viewAll:   isEn ? "View Full Gallery"      : "شاهد الألبوم الكامل",
  };

  return (
    <section className="py-32 bg-[#050505] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
              <Camera className="w-3.5 h-3.5" />
              {txt.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              {txt.title1}
              <span className="text-primary">{txt.titleHL}</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">{txt.desc}</p>
          </div>
          <Link
            href="/gallery"
            className="flex-shrink-0 flex items-center gap-2 text-white hover:text-primary font-bold text-lg transition-colors group"
            data-testid="link-gallery-preview-all"
          >
            {txt.browse}
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" style={{ gridAutoRows: "180px" }}>
          {previewImages.map((img, i) => (
            <motion.div
              key={i}
              className={`relative group cursor-pointer ${
                img.tall ? "row-span-2" : "row-span-1"
              } ${i === 0 ? "md:col-span-1" : ""}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onClick={() => window.location.href = "/gallery"}
              style={{ padding: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Corner brackets */}
              {/* Top-left */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary z-10 transition-all duration-300 group-hover:w-7 group-hover:h-7" />
              {/* Top-right */}
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary z-10 transition-all duration-300 group-hover:w-7 group-hover:h-7" />
              {/* Bottom-left */}
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary z-10 transition-all duration-300 group-hover:w-7 group-hover:h-7" />
              {/* Bottom-right */}
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary z-10 transition-all duration-300 group-hover:w-7 group-hover:h-7" />

              {/* Image */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={img.src}
                  alt={`project ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 bg-black/50 backdrop-blur-sm flex items-center justify-center border border-primary/60">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors group"
            data-testid="link-open-gallery"
          >
            <Camera className="w-5 h-5" />
            {txt.viewAll}
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
