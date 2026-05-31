import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "الرئيسية" },
  { id: "stats", label: "الإنجازات" },
  { id: "services", label: "الخدمات" },
  { id: "clients", label: "العملاء" },
  { id: "portfolio", label: "الأعمال" },
  { id: "why-us", label: "لماذا فلكس" },
  { id: "cta", label: "ابدأ الآن" },
];

export function SectionDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          data-testid={`dot-section-${id}`}
          className="group flex items-center gap-2"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground font-semibold whitespace-nowrap bg-background/80 px-2 py-1 rounded border border-border/30">
            {label}
          </span>
          <motion.div
            animate={{
              scale: active === id ? 1.4 : 1,
              backgroundColor: active === id ? "#D8302F" : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.3 }}
            className="w-2.5 h-2.5 rounded-full border border-white/20"
          />
        </button>
      ))}
    </div>
  );
}
