import { useListPortfolio, useListPortfolioCategories, getListPortfolioQueryKey, getListPortfolioCategoriesQueryKey } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ChevronLeft, ChevronRight, ZoomIn, Layers } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function resolveImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE}${url}`;
}

const CATEGORY_EN: Record<string, string> = {
  "لافتات وواجهات": "Signage & Facades",
  "هوية بصرية": "Visual Identity",
  "استيكر وتغليف": "Wrap & Sticker",
  "فعاليات ومعارض": "Events & Exhibitions",
  "مطبوعات": "Print Media",
  "دعاية وإعلان": "Advertising",
};

export default function Portfolio() {
  const { t, lang } = useLang();
  const isEn = lang === "en";
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: categories, isLoading: isCategoriesLoading } = useListPortfolioCategories({
    query: { queryKey: getListPortfolioCategoriesQueryKey() }
  });

  const { data: portfolio, isLoading: isPortfolioLoading } = useListPortfolio(
    { category: activeCategory },
    { query: { queryKey: getListPortfolioQueryKey({ category: activeCategory }) } }
  );

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex(i => i === null || i === 0 ? (portfolio?.length ?? 1) - 1 : i - 1),
    [portfolio?.length]
  );
  const nextImage = useCallback(() =>
    setLightboxIndex(i => i === null ? 0 : (i + 1) % (portfolio?.length ?? 1)),
    [portfolio?.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prevImage, nextImage, closeLightbox]);

  const catLabel = (ar: string, en?: string) => isEn ? (en || CATEGORY_EN[ar] || ar) : ar;

  return (
    <div className="w-full min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          className="max-w-4xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t.portfolioBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            {t.portfolioPageTitle}{" "}
            <span className="brand-gradient-text">{t.portfolioPageHighlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.portfolioPageDesc}
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-14">
          <button
            onClick={() => setActiveCategory(undefined)}
            className={`px-5 py-2 font-bold text-sm transition-all border ${
              activeCategory === undefined
                ? "brand-gradient text-white border-transparent"
                : "bg-transparent border-border text-muted-foreground hover:border-white hover:text-white"
            }`}
          >
            {isEn ? "All Projects" : "جميع المشاريع"}
          </button>
          {isCategoriesLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-28 bg-secondary/50 rounded-none" />
              ))
            : categories?.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-5 py-2 font-bold text-sm transition-all border flex items-center gap-2 ${
                    activeCategory === cat.name
                      ? "brand-gradient text-white border-transparent"
                      : "bg-transparent border-border text-muted-foreground hover:border-white hover:text-white"
                  }`}
                >
                  {catLabel(cat.name)}
                  <span className="text-xs opacity-50" dir="ltr">({cat.count})</span>
                </button>
              ))}
        </div>

        {/* Portfolio Grid */}
        {isPortfolioLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className={`w-full bg-secondary/40 rounded-none ${i < 2 ? "aspect-video" : "aspect-[4/5]"}`} />
            ))}
          </div>
        ) : portfolio?.length === 0 ? (
          <div className="py-32 text-center border border-border/50 bg-secondary/20 flex flex-col items-center justify-center">
            <Layers className="w-16 h-16 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">{t.noProjects}</h3>
            <p className="text-muted-foreground">{t.noProjectsDesc}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            layout
          >
            {portfolio?.map((item, index) => {
              const imageSrc = resolveImageUrl(item.imageUrl);
              const isFeatured = index === 0 || index === 1;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35) }}
                  className={`group relative overflow-hidden bg-card cursor-pointer ${
                    isFeatured ? "sm:col-span-1 lg:col-span-1" : ""
                  }`}
                  style={{ aspectRatio: isFeatured ? "16/10" : "4/5" }}
                  onClick={() => openLightbox(index)}
                  data-testid={`card-portfolio-${item.id}`}
                >
                  {/* Image */}
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: "scale(1)", transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] brand-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                  {/* Zoom icon */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-black tracking-widest uppercase bg-primary/90 text-white px-2 py-1">
                      {catLabel(item.category, item.category_en)}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="text-lg font-black text-white leading-snug mb-1">
                      {isEn && item.title_en ? item.title_en : item.title}
                    </h3>
                    {item.client && (
                      <p className="text-white/60 text-xs font-semibold flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                        {item.client}
                        {item.year && <span className="opacity-60 mr-2" dir="ltr">· {item.year}</span>}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Stats bar */}
        {!isPortfolioLoading && portfolio && portfolio.length > 0 && (
          <motion.div
            className="mt-20 pt-12 border-t border-border/40 flex flex-wrap justify-center gap-12 sm:gap-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { n: "+2400", label: isEn ? "Successful Projects" : "مشروع ناجح" },
              { n: "+11",   label: isEn ? "Years Experience"    : "سنوات خبرة" },
              { n: "+300",  label: isEn ? "Satisfied Clients"   : "عميل راضٍ" },
              { n: "+100",  label: isEn ? "Trusted Brands"      : "براند يثق بنا" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black brand-gradient-text mb-1">{s.n}</div>
                <div className="text-xs text-gray-600 font-semibold tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && portfolio && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-5 left-5 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/50 transition-all z-10 bg-black/50"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-sm px-4 py-2 text-white/70 text-xs font-mono z-10">
              {lightboxIndex + 1} / {portfolio.length}
            </div>

            {/* Prev */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/50 transition-all z-10 bg-black/50"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/50 transition-all z-10 bg-black/50"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main image */}
            <motion.div
              key={lightboxIndex}
              className="relative w-full max-w-5xl mx-16"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={resolveImageUrl(portfolio[lightboxIndex]?.imageUrl || "")}
                alt={portfolio[lightboxIndex]?.title || ""}
                className="w-full max-h-[75vh] object-contain"
              />

              {/* Caption */}
              <div className="mt-5 flex flex-col items-center gap-2 text-center px-4">
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  <span className="text-[11px] font-black tracking-widest brand-gradient-text uppercase">
                    {catLabel(
                      portfolio[lightboxIndex]?.category ?? "",
                      portfolio[lightboxIndex]?.category_en ?? ""
                    )}
                  </span>
                  {portfolio[lightboxIndex]?.year && (
                    <>
                      <span className="text-white/20">·</span>
                      <span className="text-white/40 text-xs font-mono">{portfolio[lightboxIndex]?.year}</span>
                    </>
                  )}
                </div>
                <h3 className="text-white font-black text-lg leading-snug">
                  {isEn && portfolio[lightboxIndex]?.title_en
                    ? portfolio[lightboxIndex]?.title_en
                    : portfolio[lightboxIndex]?.title}
                </h3>
                {portfolio[lightboxIndex]?.client && (
                  <p className="text-white/50 text-sm">
                    {isEn ? "Client: " : "العميل: "}{portfolio[lightboxIndex]?.client}
                  </p>
                )}
                {(isEn ? portfolio[lightboxIndex]?.description_en : portfolio[lightboxIndex]?.description) && (
                  <p className="text-white/40 text-xs max-w-xl leading-relaxed mt-1">
                    {isEn ? portfolio[lightboxIndex]?.description_en : portfolio[lightboxIndex]?.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
