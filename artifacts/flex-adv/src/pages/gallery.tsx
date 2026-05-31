import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useListGallery,
  useListGalleryCategories,
  getListGalleryQueryKey,
  getListGalleryCategoriesQueryKey,
} from "@workspace/api-client-react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Grid3X3, LayoutGrid } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function Gallery() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>(t.filterAll);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [gridMode, setGridMode] = useState<"masonry" | "grid">("grid");

  const { data: categories = [] } = useListGalleryCategories({
    query: { queryKey: getListGalleryCategoriesQueryKey() },
  });

  const isAll = activeCategory === t.filterAll;
  const { data: allImages = [], isLoading } = useListGallery(
    !isAll ? { category: activeCategory } : undefined,
    { query: { queryKey: getListGalleryQueryKey(!isAll ? { category: activeCategory } : undefined) } }
  );

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i === null || i === 0 ? allImages.length - 1 : i - 1)), [allImages.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => (i === null ? 0 : (i + 1) % allImages.length)), [allImages.length]);

  const allCategories = [t.filterAll, ...categories.map(c => c.name)];
  const currentImage = lightboxIndex !== null ? allImages[lightboxIndex] : null;

  return (
    <div className="w-full min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-4xl mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {allImages.length}{t.galleryBadgeSuffix}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              {t.galleryPageTitle} <span className="text-primary">{t.galleryPageHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t.galleryPageDesc}
            </p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat}`}
                className={`px-4 py-2 text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-white"
                }`}
              >
                {cat}
                {cat !== t.filterAll && (
                  <span className="mr-2 text-xs opacity-70">
                    ({categories.find(c => c.name === cat)?.count ?? 0})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Grid mode toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setGridMode("grid")}
              data-testid="toggle-grid"
              className={`p-2.5 border transition-colors ${gridMode === "grid" ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-white/30"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridMode("masonry")}
              data-testid="toggle-masonry"
              className={`p-2.5 border transition-colors ${gridMode === "masonry" ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-white/30"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square bg-card border border-border animate-pulse" />
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + gridMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                gridMode === "masonry"
                  ? "columns-2 md:columns-3 lg:columns-4 gap-3 space-y-0"
                  : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              }
            >
              {allImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`group relative overflow-hidden cursor-pointer bg-card border border-border hover:border-primary/40 transition-colors ${
                    gridMode === "masonry" ? "break-inside-avoid mb-3" : "aspect-square"
                  }`}
                  onClick={() => openLightbox(index)}
                  data-testid={`gallery-item-${img.id}`}
                >
                  <img
                    src={`${BASE}${img.imageUrl}`}
                    alt={img.title ?? "مشروع فلكس"}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      gridMode === "grid" ? "h-full" : "h-auto"
                    }`}
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    {img.title && (
                      <p className="text-white text-sm font-bold text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity px-3">
                        {img.title}
                      </p>
                    )}
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-0.5">
                      {img.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && allImages.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">{t.noImages}</div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-20 p-12 md:p-16 brand-gradient brand-glow text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4">{t.galleryCTATitle}</h2>
            <p className="text-lg text-white/90 mb-8">{t.galleryCTADesc}</p>
            <Link href="/contact" className="inline-block px-10 py-4 bg-background text-foreground font-black text-lg hover:bg-white hover:text-black transition-colors">
              {t.galleryCTABtn}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            data-testid="lightbox-overlay"
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              onClick={closeLightbox}
              data-testid="lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm px-4 py-1.5 font-bold" dir="ltr">
              {lightboxIndex + 1} / {allImages.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-primary text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              data-testid="lightbox-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-primary text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              data-testid="lightbox-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl max-h-[85vh] w-full px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`${BASE}${currentImage.imageUrl}`}
                alt={currentImage.title ?? "مشروع فلكس"}
                className="w-full h-full object-contain max-h-[75vh]"
              />
              {currentImage.title && (
                <div className="mt-4 text-center">
                  <p className="text-white font-bold text-lg">{currentImage.title}</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {currentImage.category} {currentImage.year && `— ${currentImage.year}`}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
