import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const SIZE = 58;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 48 48" width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 4C12.954 4 4 12.954 4 24c0 3.552.942 6.888 2.594 9.773L4 44l10.516-2.554A19.9 19.9 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4Z"
        fill="white"
        fillOpacity="0.15"
      />
      <path
        d="M34.507 29.13c-.494-.248-2.922-1.44-3.374-1.604-.452-.163-.782-.247-1.111.248-.33.494-1.277 1.604-1.565 1.934-.288.33-.576.371-1.07.124-.494-.248-2.085-.769-3.972-2.452-1.467-1.31-2.457-2.927-2.745-3.421-.288-.495-.03-.762.216-1.009.223-.22.495-.576.742-.864.247-.288.33-.494.495-.824.165-.33.082-.618-.041-.865-.124-.247-1.112-2.68-1.523-3.67-.4-.963-.807-.832-1.11-.848l-.947-.016c-.33 0-.865.124-1.317.619-.453.494-1.729 1.687-1.729 4.12 0 2.432 1.77 4.78 2.017 5.11.247.33 3.484 5.32 8.443 7.462 1.18.51 2.1.813 2.817 1.04 1.184.376 2.262.323 3.115.196 .95-.141 2.922-1.194 3.333-2.347.412-1.152.412-2.14.289-2.346-.124-.207-.453-.33-.947-.578Z"
        fill="white"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" width={26} height={26} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.227 6.5h-4.5C8.507 6.5 7 8.007 7 9.727c0 17.261 13.993 31.273 31.273 31.273 1.72 0 3.227-1.507 3.227-3.227v-4.48a3.227 3.227 0 0 0-2.22-3.073l-5.756-1.918a3.227 3.227 0 0 0-3.34.806l-2.148 2.148a24.26 24.26 0 0 1-10.093-10.093l2.148-2.148a3.227 3.227 0 0 0 .806-3.34L18.98 9.72A3.227 3.227 0 0 0 15.9 7.5a1.7 1.7 0 0 0-.1-.006l-.573.006Z"
        fill="white"
      />
    </svg>
  );
}

function Tooltip({ visible, isEn, type }: { visible: boolean; isEn: boolean; type: "call" | "wa" }) {
  const bg = type === "wa" ? "linear-gradient(135deg,#075E54,#128C7E)" : "linear-gradient(135deg,#1e3a5f,#1565c0)";
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.88 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-full mb-3 rounded-2xl px-4 py-2.5 shadow-2xl whitespace-nowrap pointer-events-none"
          style={{ background: bg, border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <div className="text-white font-black text-[13px] leading-tight">
            {type === "wa"
              ? (isEn ? "Chat on WhatsApp" : "واتساب")
              : (isEn ? "Call Us Now" : "اتصل بنا الآن")}
          </div>
          <div className="text-white/70 font-mono text-[11px] mt-0.5" dir="ltr">
            +966 563 538 520
          </div>
          {/* Arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2"
            style={{
              width: 0, height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `6px solid ${type === "wa" ? "#075E54" : "#1565c0"}`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingButtons() {
  const [hoveredCall, setHoveredCall] = useState(false);
  const [hoveredWa, setHoveredWa] = useState(false);
  const { lang } = useLang();
  const isEn = lang === "en";

  return (
    <motion.div
      className="fixed bottom-7 left-7 z-50 flex flex-col-reverse items-center gap-4"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 180, damping: 18 }}
    >
      {/* ── CALL BUTTON ── */}
      <div className="relative flex flex-col items-center">
        <Tooltip visible={hoveredCall} isEn={isEn} type="call" />

        <motion.a
          href="tel:+966563538520"
          data-testid="button-call-float"
          className="relative flex items-center justify-center flex-shrink-0"
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #e53935, #b71c1c)",
            boxShadow: "0 4px 20px rgba(183,28,28,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
          onHoverStart={() => setHoveredCall(true)}
          onHoverEnd={() => setHoveredCall(false)}
          whileHover={{ scale: 1.13, boxShadow: "0 8px 30px rgba(183,28,28,0.7), inset 0 1px 0 rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Subtle ring */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: "50%" }}
          />
          <motion.div
            animate={{ rotate: [0, -12, 14, -8, 9, -4, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", repeatDelay: 2 }}
          >
            <PhoneIcon />
          </motion.div>
        </motion.a>
      </div>

      {/* ── WHATSAPP BUTTON ── */}
      <div className="relative flex flex-col items-center">
        {/* Pulse rings */}
        {[0, 0.65].map((delay, i) => (
          <span
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: SIZE,
              height: SIZE,
              borderRadius: "50%",
              background: i === 0 ? "rgba(37,211,102,0.3)" : "rgba(37,211,102,0.15)",
              animation: `float-ping 2.2s ease-out infinite ${delay}s`,
            }}
          />
        ))}

        <Tooltip visible={hoveredWa} isEn={isEn} type="wa" />

        <motion.a
          href="https://wa.me/966563538520"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-whatsapp-float"
          className="relative flex items-center justify-center flex-shrink-0"
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #25d366, #128c7e)",
            boxShadow: "0 4px 20px rgba(18,140,126,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
          onHoverStart={() => setHoveredWa(true)}
          onHoverEnd={() => setHoveredWa(false)}
          whileHover={{ scale: 1.13, boxShadow: "0 8px 30px rgba(18,140,126,0.8), inset 0 1px 0 rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.92 }}
        >
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(255,255,255,0.22)", borderRadius: "50%" }}
          />
          <WhatsAppIcon />
        </motion.a>
      </div>

      <style>{`
        @keyframes float-ping {
          0%   { transform: scale(1);    opacity: 0.75; }
          75%  { transform: scale(2.1);  opacity: 0; }
          100% { transform: scale(2.1);  opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
