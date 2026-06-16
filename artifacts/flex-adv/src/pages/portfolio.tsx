import {
  useListPortfolio,
  useListPortfolioCategories,
  getListPortfolioQueryKey,
  getListPortfolioCategoriesQueryKey,
} from "@workspace/api-client-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Layers,
  ExternalLink,
  Award,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";

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
  مطبوعات: "Print Media",
  "دعاية وإعلان": "Advertising",
};

/* ─── 3D tilt card ───────────────────────────────────────────── */
interface CardProps {
  item: {
    id: number;
    title: string;
    title_en?: string | null;
    imageUrl: string;
    category: string;
    category_en?: string | null;
    client?: string | null;
    year?: string | null;
    description?: string | null;
    description_en?: string | null;
  };
  index: number;
  isEn: boolean;
  onClick: () => void;
  spanClass?: string;
}

function TiltCard({ item, index, isEn, onClick, spanClass = "" }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  const imgScale = useSpring(useTransform(scale, [1, 1.03], [1, 1.08]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseEnter() {
    scale.set(1.03);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  const catLabel = isEn
    ? item.category_en || CATEGORY_EN[item.category] || item.category
    : item.category;
  const title = isEn && item.title_en ? item.title_en : item.title;

  return (
    <motion.div
      ref={ref}
      className={`relative cursor-pointer group ${spanClass}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale,
        zIndex: 1,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.07, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-testid={`card-portfolio-${item.id}`}
    >
      {/* Card shell */}
      <div className="relative overflow-hidden w-full h-full bg-[#080808] border border-white/5 group-hover:border-primary/40 transition-colors duration-500">
        {/* Image */}
        <div className="relative w-full h-full overflow-hidden">
          <motion.img
            src={resolveImageUrl(item.imageUrl)}
            alt={title}
            className="w-full h-full object-cover"
            style={{ scale: imgScale }}
          />
        </div>

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/5 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Mouse glare effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(240,90,40,0.8) 0%, transparent 60%)`,
          }}
        />

        {/* Brand top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] brand-gradient origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        {/* Category chip — top */}
        <motion.div
          className="absolute top-4 right-4"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[9px] font-black tracking-[0.2em] uppercase bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 block">
            {catLabel}
          </span>
        </motion.div>

        {/* Index number — 3D depth */}
        <div className="absolute top-4 left-4 text-[10px] font-mono text-white/20 font-bold">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
          <h3 className="text-base sm:text-lg font-black text-white leading-snug mb-1.5 line-clamp-2">
            {title}
          </h3>
          {(item.client || item.year) && (
            <p className="text-white/50 text-xs font-semibold flex items-center gap-2 flex-wrap">
              {item.client && (
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                  {item.client}
                </span>
              )}
              {item.year && (
                <span className="opacity-60" dir="ltr">
                  {item.year}
                </span>
              )}
            </p>
          )}
          {/* Expand hint */}
          <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-3 h-3 text-primary" />
            <span className="text-[10px] text-primary font-black tracking-widest uppercase">
              {isEn ? "View Details" : "عرض التفاصيل"}
            </span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[40px] border-b-[40px] border-l-primary/20 border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

/* ─── Project Modal ──────────────────────────────────────────── */
interface ModalItem {
  id: number;
  title: string;
  title_en?: string | null;
  imageUrl: string;
  category: string;
  category_en?: string | null;
  client?: string | null;
  year?: string | null;
  description?: string | null;
  description_en?: string | null;
  gallery?: string[] | null;
}

function ProjectModal({
  item,
  onClose,
  onPrev,
  onNext,
  index,
  total,
  isEn,
}: {
  item: ModalItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
  isEn: boolean;
}) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const allImages = [item.imageUrl, ...(item.gallery || [])].filter(Boolean);
  const catLabel = isEn
    ? item.category_en || CATEGORY_EN[item.category] || item.category
    : item.category;
  const title = isEn && item.title_en ? item.title_en : item.title;
  const desc = isEn ? item.description_en : item.description;

  useEffect(() => {
    setGalleryIdx(0);
  }, [item.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") isEn ? onNext() : onPrev();
      if (e.key === "ArrowRight") isEn ? onPrev() : onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, isEn]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl"
        style={{ maxHeight: "90vh" }}
        initial={{ scale: 0.85, rotateX: 8, opacity: 0, y: 40 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black tracking-[0.25em] uppercase brand-gradient-text">
              {catLabel}
            </span>
            {item.year && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-white/40 text-xs font-mono" dir="ltr">
                  {item.year}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-xs font-mono" dir="ltr">
              {index + 1} / {total}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_420px] overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 52px)" }}
        >
          {/* Image section */}
          <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${item.id}-${galleryIdx}`}
                src={resolveImageUrl(allImages[galleryIdx] || item.imageUrl)}
                alt={title}
                className="w-full h-full object-contain"
                style={{ maxHeight: "60vh" }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>

            {/* Gallery nav */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setGalleryIdx((i) => (i === 0 ? allImages.length - 1 : i - 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/15 hover:border-primary/50 text-white/70 hover:text-white transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setGalleryIdx((i) => (i + 1) % allImages.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/15 hover:border-primary/50 text-white/70 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Thumbnail strip */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-xs overflow-x-auto px-2">
                  {allImages.slice(0, 8).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIdx(i)}
                      className={`w-10 h-7 flex-shrink-0 overflow-hidden border transition-all duration-200 ${
                        i === galleryIdx
                          ? "border-primary scale-110"
                          : "border-white/15 opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={resolveImageUrl(img)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  {allImages.length > 8 && (
                    <div className="w-10 h-7 flex-shrink-0 bg-white/10 border border-white/15 flex items-center justify-center text-[9px] text-white/50 font-bold">
                      +{allImages.length - 8}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Details panel */}
          <div className="flex flex-col p-7 border-t lg:border-t-0 lg:border-r border-white/8">
            <div className="w-8 h-[2px] brand-gradient mb-5" />

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
              {title}
            </h2>

            {item.client && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                  {isEn ? "Client" : "العميل"}
                </span>
                <span className="w-full h-px bg-white/8" />
                <span className="text-sm text-white/80 font-semibold whitespace-nowrap">
                  {item.client}
                </span>
              </div>
            )}

            {desc && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {desc}
              </p>
            )}

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/[0.03] border border-white/8 p-3">
                <p className="text-[9px] text-muted-foreground font-black tracking-widest uppercase mb-1">
                  {isEn ? "Category" : "التصنيف"}
                </p>
                <p className="text-sm font-bold text-white">{catLabel}</p>
              </div>
              {item.year && (
                <div className="bg-white/[0.03] border border-white/8 p-3">
                  <p className="text-[9px] text-muted-foreground font-black tracking-widest uppercase mb-1">
                    {isEn ? "Year" : "السنة"}
                  </p>
                  <p className="text-sm font-bold text-white" dir="ltr">
                    {item.year}
                  </p>
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/966563538520"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 brand-gradient text-white font-black text-sm text-center tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isEn ? "Request Similar Project" : "اطلب مشروعاً مماثلاً"}
              <ArrowLeft className="w-4 h-4" />
            </a>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/8">
              <button
                onClick={onPrev}
                className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
                {isEn ? "Prev" : "السابق"}
              </button>
              <span className="text-white/20 text-xs font-mono">
                {index + 1} / {total}
              </span>
              <button
                onClick={onNext}
                className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
              >
                {isEn ? "Next" : "التالي"}
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function Portfolio() {
  const { t, lang } = useLang();
  const isEn = lang === "en";
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const { data: categories, isLoading: isCategoriesLoading } =
    useListPortfolioCategories({
      query: { queryKey: getListPortfolioCategoriesQueryKey() },
    });

  const { data: portfolio, isLoading: isPortfolioLoading } = useListPortfolio(
    { category: activeCategory },
    { query: { queryKey: getListPortfolioQueryKey({ category: activeCategory }) } }
  );

  const openModal = useCallback((idx: number) => setModalIndex(idx), []);
  const closeModal = useCallback(() => setModalIndex(null), []);
  const prevModal = useCallback(
    () => setModalIndex((i) => (i === null || i === 0 ? (portfolio?.length ?? 1) - 1 : i - 1)),
    [portfolio?.length]
  );
  const nextModal = useCallback(
    () => setModalIndex((i) => (i === null ? 0 : (i + 1) % (portfolio?.length ?? 1))),
    [portfolio?.length]
  );

  const catLabel = (ar: string, en?: string | null) =>
    isEn ? en || CATEGORY_EN[ar] || ar : ar;

  const stats = [
    { icon: TrendingUp, value: "+2400", label: isEn ? "Successful Projects" : "مشروع ناجح" },
    { icon: Award,     value: "+11",   label: isEn ? "Years Experience"    : "سنوات خبرة" },
    { icon: Users,     value: "+300",  label: isEn ? "Satisfied Clients"   : "عميل راضٍ" },
    { icon: Zap,       value: "+100",  label: isEn ? "Trusted Brands"      : "براند يثق بنا" },
  ];

  /* ── Layout helper: assign grid span classes ── */
  function getSpanClass(index: number): string {
    // Pattern: [wide, tall, normal, normal, normal, wide, normal, tall, normal, normal, ...]
    const pattern = [
      "col-span-1 sm:col-span-2 row-span-1",   // 0 – wide
      "col-span-1 row-span-2",                  // 1 – tall
      "col-span-1 row-span-1",                  // 2 – normal
      "col-span-1 row-span-1",                  // 3 – normal
      "col-span-1 row-span-1",                  // 4 – normal
      "col-span-1 sm:col-span-2 row-span-1",   // 5 – wide
      "col-span-1 row-span-2",                  // 6 – tall
      "col-span-1 row-span-1",                  // 7 – normal
      "col-span-1 row-span-1",                  // 8 – normal
    ];
    return pattern[index % pattern.length];
  }

  function getAspectStyle(index: number): string {
    const mod = index % 9;
    if (mod === 0 || mod === 5) return "aspect-[21/9] sm:aspect-[16/7]";
    if (mod === 1 || mod === 6) return "aspect-[4/5] sm:aspect-auto";
    return "aspect-[4/5]";
  }

  return (
    <div className="w-full min-h-screen bg-[#030303] overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION — Cinematic 3D Header
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-40 overflow-hidden">

        {/* Perspective grid background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-orange-600/5 blur-[100px]" />
        </div>

        {/* Floating stat chips */}
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:flex items-center gap-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/8 px-4 py-2.5 text-white"
            style={{
              top: `${[28, 35, 22, 42][i]}%`,
              right: i % 2 === 0 ? `${[4, 7][Math.floor(i / 2)]}%` : undefined,
              left: i % 2 !== 0 ? `${[4, 6][Math.floor(i / 2)]}%` : undefined,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-7 h-7 brand-gradient flex items-center justify-center flex-shrink-0">
              <Icon className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white leading-none" dir="ltr">{value}</p>
              <p className="text-[10px] text-white/50 font-medium mt-0.5">{label}</p>
            </div>
          </motion.div>
        ))}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-black tracking-[0.2em] uppercase">
                {t.portfolioBadge}
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.0] mb-6 max-w-4xl">
              {t.portfolioPageTitle}{" "}
              <span className="brand-gradient-text relative inline-block">
                {t.portfolioPageHighlight}
                {/* 3D underline effect */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 brand-gradient"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t.portfolioPageDesc}
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex items-center gap-3 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="w-8 h-[1px] bg-primary/60" />
            <span className="text-[10px] text-white/30 font-black tracking-[0.3em] uppercase">
              {isEn ? "Scroll to explore" : "تمرر لاستكشاف"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORY FILTERS
      ══════════════════════════════════════════════════════════ */}
      <div className="sticky top-16 z-40 bg-[#030303]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={filterRef}
            className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar"
          >
            {/* All button */}
            <motion.button
              onClick={() => setActiveCategory(undefined)}
              className={`relative flex-shrink-0 px-4 py-2 text-xs font-black tracking-widest uppercase transition-all duration-300 ${
                activeCategory === undefined
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {activeCategory === undefined && (
                <motion.span
                  className="absolute inset-0 brand-gradient"
                  layoutId="active-filter"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {isEn ? "All" : "الكل"}
                {portfolio && !isPortfolioLoading && (
                  <span className={`text-[9px] ${activeCategory === undefined ? "text-white/70" : "text-white/30"}`}>
                    ({portfolio.length})
                  </span>
                )}
              </span>
            </motion.button>

            {/* Separator */}
            <div className="w-px h-5 bg-white/10 flex-shrink-0 mx-1" />

            {/* Category buttons */}
            {isCategoriesLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-28 bg-white/5 flex-shrink-0" />
                ))
              : categories?.map((cat) => (
                  <motion.button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`relative flex-shrink-0 px-4 py-2 text-xs font-black tracking-widest uppercase transition-all duration-300 ${
                      activeCategory === cat.name
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                    }`}
                    whileTap={{ scale: 0.96 }}
                  >
                    {activeCategory === cat.name && (
                      <motion.span
                        className="absolute inset-0 brand-gradient"
                        layoutId="active-filter"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {catLabel(cat.name)}
                      <span className={`text-[9px] ${activeCategory === cat.name ? "text-white/70" : "text-white/30"}`}>
                        ({cat.count})
                      </span>
                    </span>
                  </motion.button>
                ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PORTFOLIO GRID — 3D Editorial Layout
      ══════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {isPortfolioLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[280px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`bg-white/[0.04] ${getSpanClass(i)}`}
              />
            ))}
          </div>
        ) : portfolio?.length === 0 ? (
          <motion.div
            className="py-40 text-center border border-white/8 bg-white/[0.02] flex flex-col items-center justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 border border-white/10 flex items-center justify-center">
              <Layers className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-2xl font-black text-white">{t.noProjects}</h3>
            <p className="text-muted-foreground text-sm">{t.noProjectsDesc}</p>
            <button
              onClick={() => setActiveCategory(undefined)}
              className="px-6 py-2.5 brand-gradient text-white text-xs font-black tracking-widest uppercase mt-2"
            >
              {isEn ? "Show All Projects" : "عرض جميع المشاريع"}
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory ?? "all"}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[280px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {portfolio?.map((item, index) => (
                <div
                  key={item.id}
                  className={`${getSpanClass(index)} ${getAspectStyle(index)}`}
                >
                  <TiltCard
                    item={item}
                    index={index}
                    isEn={isEn}
                    onClick={() => openModal(index)}
                    spanClass="w-full h-full"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS + CTA SECTION
      ══════════════════════════════════════════════════════════ */}
      {!isPortfolioLoading && portfolio && portfolio.length > 0 && (
        <section className="relative overflow-hidden mt-8 mb-0">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={i}
                  className="relative group border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] p-6 transition-all duration-300 hover:border-primary/30 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] brand-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-black text-white mb-1 brand-gradient-text" dir="ltr">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground font-semibold">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Block */}
            <motion.div
              className="relative border border-white/8 bg-white/[0.02] p-8 sm:p-12 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-orange-600/5" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-xl">
                  <div className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-3">
                    {isEn ? "START YOUR PROJECT" : "ابدأ مشروعك"}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
                    {isEn ? (
                      <>Got a Project in <span className="brand-gradient-text">Mind?</span></>
                    ) : (
                      <>هل لديك مشروع <span className="brand-gradient-text">تريد تنفيذه؟</span></>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {isEn
                      ? "Let's turn your vision into reality. From concept to installation — we handle everything."
                      : "دعنا نحوّل رؤيتك إلى واقع. من الفكرة حتى التركيب النهائي — نحن نتولى كل شيء."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <a
                    href="https://wa.me/966563538520"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 brand-gradient text-white font-black text-sm hover:opacity-90 transition-opacity group"
                  >
                    {isEn ? "Start Now" : "ابدأ الآن"}
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </a>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-white/15 text-white font-black text-sm hover:bg-white/5 hover:border-white/30 transition-all"
                  >
                    {t.viewGallery}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          PROJECT DETAIL MODAL
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {modalIndex !== null && portfolio && portfolio[modalIndex] && (
          <ProjectModal
            item={portfolio[modalIndex] as ModalItem}
            onClose={closeModal}
            onPrev={prevModal}
            onNext={nextModal}
            index={modalIndex}
            total={portfolio.length}
            isEn={isEn}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
