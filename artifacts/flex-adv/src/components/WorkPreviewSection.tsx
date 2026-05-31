import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const IMAGES = [
  `${BASE}/images/portfolio/khayallah_facade_night_1.jpeg`,
  `${BASE}/images/portfolio/khayallah_facade_night_2.jpeg`,
  `${BASE}/images/portfolio/khayallah_facade_night_3.jpeg`,
  `${BASE}/images/portfolio/papillon_facade.jpeg`,
  `${BASE}/images/portfolio/image_restaurant_gold_1.jpeg`,
  `${BASE}/images/portfolio/image_restaurant_gold_2.jpeg`,
  `${BASE}/images/portfolio/express_motors_1.jpeg`,
  `${BASE}/images/portfolio/express_motors_4.jpeg`,
  `${BASE}/images/portfolio/express_motors_8.jpeg`,
  `${BASE}/images/portfolio/pepsi_music_1.jpeg`,
  `${BASE}/images/portfolio/pepsi_music_2.jpeg`,
  `${BASE}/images/portfolio/pepsi_music_3.jpeg`,
  `${BASE}/images/portfolio/life_spirit_facade.jpeg`,
  `${BASE}/images/portfolio/alawad_facade.jpeg`,
  `${BASE}/images/portfolio/medical_center_1.jpeg`,
  `${BASE}/images/portfolio/savvy_dental_1.jpeg`,
  `${BASE}/images/portfolio/business_yard_1.jpeg`,
  `${BASE}/images/portfolio/inmar_facade.jpeg`,
  `${BASE}/images/portfolio/protein_up_1.jpeg`,
  `${BASE}/images/portfolio/theroof_1.jpeg`,
  `${BASE}/images/portfolio/theroof_2.jpeg`,
  `${BASE}/images/portfolio/ice_creamaa_1.jpeg`,
  `${BASE}/images/portfolio/drive7_1.jpeg`,
  `${BASE}/images/portfolio/enterprise_1.jpeg`,
  `${BASE}/images/portfolio/fuchsia_truck_1.jpeg`,
  `${BASE}/images/portfolio/clinic_signs_1.jpeg`,
  `${BASE}/images/portfolio/facade_sign_marble.jpeg`,
  `${BASE}/images/portfolio/khayallah_totem_lit_1.jpeg`,
  `${BASE}/images/portfolio/khayallah_totem_yellow.jpeg`,
  `${BASE}/images/portfolio/khayallah_2.jpeg`,
];

export function WorkPreviewSection() {
  const { lang } = useLang();
  const isEn = lang === "en";

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Drag/swipe state
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent((idx + IMAGES.length) % IMAGES.length);
  }, []);

  const next = useCallback(() => {
    goTo(current + 1, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1, -1);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length);
      setDirection(1);
    }, 2000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  // Handle manual navigation — restart auto timer
  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prev(); resetTimer(); };

  // Touch/mouse drag
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) { handleNext(); } else { handlePrev(); }
    }
  };
  const onPointerCancel = () => { isDragging.current = false; };

  // Wheel scroll
  const wheelLock = useRef(false);
  const onWheel = (e: React.WheelEvent) => {
    if (wheelLock.current) return;
    wheelLock.current = true;
    setTimeout(() => { wheelLock.current = false; }, 800);
    if (e.deltaX > 30 || e.deltaY > 30) { handleNext(); }
    else if (e.deltaX < -30 || e.deltaY < -30) { handlePrev(); }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="bg-[#040404] py-20">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-16" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-5">
              <Images className="w-3.5 h-3.5" />
              {isEn ? "Real Executed Projects" : "مشاريع منفذة حقيقية"}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] m-0">
              {isEn ? "Some of " : "بعض "}
              <span className="brand-gradient-text">{isEn ? "Our Work" : "أعمالنا"}</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex-shrink-0 flex items-center gap-2 text-white hover:text-primary font-black text-base transition-colors group"
          >
            {isEn ? "Browse Full Gallery" : "استعرض كل الأعمال"}
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        {/* Main Slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden cursor-pointer select-none"
          style={{ height: "clamp(260px, 55vw, 620px)" }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerCancel}
          onPointerCancel={onPointerCancel}
          onWheel={onWheel}
          onClick={() => { window.location.href = `${BASE}/gallery`; }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={IMAGES[current]}
              alt=""
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </AnimatePresence>

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Click hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm px-6 py-3">
              <Images className="w-5 h-5 text-white" />
              <span className="text-white font-black text-base">
                {isEn ? "View Full Gallery" : "استعرض الألبوم كاملاً"}
              </span>
            </div>
          </div>

          {/* Counter bottom-left */}
          <div className="absolute bottom-4 start-4 flex items-center gap-2 pointer-events-none">
            <span className="text-white font-black text-lg tabular-nums">
              {String(current + 1).padStart(2, "0")}
            </span>
            <div className="w-8 h-px bg-white/40" />
            <span className="text-white/50 text-sm tabular-nums">
              {String(IMAGES.length).padStart(2, "0")}
            </span>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 start-0 end-0 flex justify-center gap-1.5 pointer-events-none">
            {IMAGES.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  background: i === current ? "#dc2626" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Nav arrows */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 border border-white/20 bg-white/5 hover:bg-primary hover:border-primary text-white flex items-center justify-center transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 border border-white/20 bg-white/5 hover:bg-primary hover:border-primary text-white flex items-center justify-center transition-all duration-200"
              aria-label="Next"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Scroll hint */}
          <p className="text-white/40 text-xs font-medium hidden sm:block">
            {isEn ? "Scroll or drag to browse" : "مرر أو اسحب لاستعراض الصور"}
          </p>

          {/* CTA */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-black text-sm hover:bg-primary/90 transition-colors group"
            onClick={(e) => e.stopPropagation()}
          >
            <Images className="w-4 h-4" />
            {isEn ? "Full Gallery" : "ألبوم الصور"}
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-16" />
    </section>
  );
}
