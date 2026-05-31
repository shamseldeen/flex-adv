import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

export function CallButton() {
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();
  const isEn = lang === "en";

  return (
    <motion.div
      className="fixed bottom-24 left-6 z-50 flex items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      style={{ flexDirection: isEn ? "row" : "row-reverse" }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: isEn ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isEn ? -10 : 10, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl px-4 py-2 text-white text-sm font-bold shadow-xl whitespace-nowrap"
            style={{
              background: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
              marginLeft: isEn ? 0 : 12,
              marginRight: isEn ? 12 : 0,
            }}
          >
            <div className="font-black" style={{ fontSize: 13 }}>
              {isEn ? "Call Us Now" : "اتصل بنا الآن"}
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 1 }} dir="ltr">
              +966 563 538 520
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href="tel:+966563538520"
        data-testid="button-call-float"
        className="relative flex items-center justify-center rounded-full shadow-2xl flex-shrink-0"
        style={{
          width: 56,
          height: 56,
          background: "linear-gradient(135deg, #e63946, #c1121f)",
          boxShadow: "0 8px 32px rgba(230,57,70,0.45)",
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
      >
        {/* Ringing animation wrapper */}
        <motion.div
          animate={{ rotate: [0, -15, 15, -10, 10, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1.5 }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
        </motion.div>
      </motion.a>
    </motion.div>
  );
}
