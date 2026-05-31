import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();
  const isEn = lang === "en";

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      style={{ flexDirection: isEn ? "row" : "row-reverse" }}
    >
      {/* Pulsing rings */}
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 56,
          height: 56,
          background: "rgba(37,211,102,0.25)",
          animation: "wa-ping 2s ease-out infinite",
        }}
      />
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 56,
          height: 56,
          background: "rgba(37,211,102,0.15)",
          animation: "wa-ping 2s ease-out infinite 0.5s",
        }}
      />

      {/* Label tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: isEn ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isEn ? -10 : 10, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl px-4 py-2 text-white text-sm font-bold shadow-xl whitespace-nowrap"
            style={{
              background: "#075E54",
              marginLeft: isEn ? 0 : 12,
              marginRight: isEn ? 12 : 0,
              direction: "ltr",
            }}
          >
            <div className="font-black" style={{ fontSize: 13 }}>
              {isEn ? "Chat on WhatsApp" : "تواصل عبر واتساب"}
            </div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 1 }} dir="ltr">
              +966 563 538 520
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href="https://wa.me/966563538520"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-whatsapp-float"
        className="relative flex-shrink-0 rounded-full overflow-hidden"
        style={{
          width: 66,
          height: 66,
          filter: "drop-shadow(0 8px 28px rgba(37,211,102,0.6))",
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
      >
        <img
          src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/images/whatsapp-icon.png`}
          alt="WhatsApp"
          style={{ width: 66, height: 66, objectFit: "cover", display: "block" }}
        />
      </motion.a>

      <style>{`
        @keyframes wa-ping {
          0%   { transform: scale(1);   opacity: 0.7; }
          80%  { transform: scale(1.9); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
