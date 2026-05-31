import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const CLIENTS = [
  { img: `${BASE}/images/logos/aramco.png`, name: "Saudi Aramco" },
  { img: `${BASE}/images/logos/alrajhi_bank.png`, name: "Al Rajhi Bank" },
  { img: `${BASE}/images/logos/sabic.png`, name: "SABIC" },
  { img: `${BASE}/images/logos/almarai.png`, name: "Almarai" },
  { img: `${BASE}/images/logos/pepsi.png`, name: "Pepsi" },
  { img: `${BASE}/images/logos/coca_cola.png`, name: "Coca-Cola" },
  { img: `${BASE}/images/logos/ikea.png`, name: "IKEA" },
  { img: `${BASE}/images/logos/panda.png`, name: "Panda" },
  { img: `${BASE}/images/logos/riyad_bank.png`, name: "Riyad Bank" },
  { img: `${BASE}/images/logos/alinma_bank.png`, name: "Alinma Bank" },
  { img: `${BASE}/images/logos/albaik.png`, name: "Al Baik" },
  { img: `${BASE}/images/logos/dominos.png`, name: "Domino's" },
  { img: `${BASE}/images/logos/indomie.png`, name: "Indomie" },
  { img: `${BASE}/images/logos/petromin.png`, name: "Petromin" },
  { img: `${BASE}/images/logos/sipchem.png`, name: "Sipchem" },
  { img: `${BASE}/images/logos/maaden.png`, name: "Maaden" },
  { img: `${BASE}/images/logos/riyadh_season.png`, name: "Riyadh Season" },
  { img: `${BASE}/images/logos/gea.png`, name: "General Entertainment Authority" },
  { img: `${BASE}/images/logos/sela.png`, name: "Sela" },
  { img: `${BASE}/images/logos/cenomi.png`, name: "Cenomi" },
  { img: `${BASE}/images/logos/othaim.png`, name: "Othaim" },
  { img: `${BASE}/images/logos/extra.png`, name: "Extra" },
  { img: `${BASE}/images/logos/dunkin.png`, name: "Dunkin" },
  { img: `${BASE}/images/logos/hardees.png`, name: "Hardee's" },
  { img: `${BASE}/images/logos/little_caesars.png`, name: "Little Caesars" },
  { img: `${BASE}/images/logos/kudu.png`, name: "KUDU" },
  { img: `${BASE}/images/logos/altazaj.png`, name: "Al Tazaj" },
  { img: `${BASE}/images/logos/barns.png`, name: "Barn's" },
  { img: `${BASE}/images/logos/lipton.png`, name: "Lipton" },
  { img: `${BASE}/images/logos/aquafina.png`, name: "Aquafina" },
  { img: `${BASE}/images/logos/nadec.png`, name: "Nadec" },
  { img: `${BASE}/images/logos/alromansiah.png`, name: "الرومانسية" },
  { img: `${BASE}/images/logos/nova_water.png`, name: "Nova Water" },
  { img: `${BASE}/images/logos/etaam.png`, name: "Etaam" },
  { img: `${BASE}/images/logos/baja.png`, name: "Baja" },
  { img: `${BASE}/images/logos/safa.png`, name: "Safa" },
  { img: `${BASE}/images/logos/tania.png`, name: "Tania" },
  { img: `${BASE}/images/logos/louzin.png`, name: "Louzin" },
  { img: `${BASE}/images/logos/alwatania_poultry.png`, name: "Al Watania Poultry" },
  { img: `${BASE}/images/logos/nahdi_pharmacy.png`, name: "Nahdi Pharmacy" },
  { img: `${BASE}/images/logos/aramex.png`, name: "Aramex" },
  { img: `${BASE}/images/logos/sasco.png`, name: "SASCO" },
  { img: `${BASE}/images/logos/mada.png`, name: "Mada" },
  { img: `${BASE}/images/logos/maestro.png`, name: "Maestro" },
  { img: `${BASE}/images/logos/yelo.png`, name: "Yelo" },
  { img: `${BASE}/images/logos/urpay.png`, name: "Urpay" },
  { img: `${BASE}/images/logos/bidaya_finance.png`, name: "Bidaya Finance" },
  { img: `${BASE}/images/logos/emkan_finance.png`, name: "Emkan Finance" },
  { img: `${BASE}/images/logos/aljazeera_capital.png`, name: "AlJazeera Capital" },
  { img: `${BASE}/images/logos/bsf.png`, name: "BSF" },
  { img: `${BASE}/images/logos/alramz.png`, name: "Al Ramz" },
  { img: `${BASE}/images/logos/sar_railway.png`, name: "SAR Railway" },
  { img: `${BASE}/images/logos/theeb.png`, name: "Theeb" },
  { img: `${BASE}/images/logos/modon.png`, name: "Modon" },
  { img: `${BASE}/images/logos/retal.png`, name: "Retal" },
  { img: `${BASE}/images/logos/almajdiah.png`, name: "Al Majdiah Residence" },
  { img: `${BASE}/images/logos/wukkan.png`, name: "Wukkan" },
  { img: `${BASE}/images/logos/aljumeih.png`, name: "Al Jumeih" },
  { img: `${BASE}/images/logos/hankook.png`, name: "Hankook" },
  { img: `${BASE}/images/logos/saudi_ceramics.png`, name: "Saudi Ceramics" },
  { img: `${BASE}/images/logos/ithra.png`, name: "Ithra" },
  { img: `${BASE}/images/logos/salam_mobile.png`, name: "Salam Mobile" },
  { img: `${BASE}/images/logos/kabi.png`, name: "KABI" },
  { img: `${BASE}/images/logos/alasala.png`, name: "Al Asala" },
  { img: `${BASE}/images/logos/deemah.png`, name: "Deemah" },
  { img: `${BASE}/images/logos/kinza.png`, name: "Kinza" },
  { img: `${BASE}/images/logos/masdar_tech.png`, name: "Masdar" },
  { img: `${BASE}/images/logos/ades.png`, name: "Ades" },
  { img: `${BASE}/images/logos/almajdawi.png`, name: "Al Majdawi" },
  { img: `${BASE}/images/logos/daraa.png`, name: "Daraa" },
  { img: `${BASE}/images/logos/arabiya_oud.png`, name: "Arabiya Oud" },
  { img: `${BASE}/images/logos/basamat_dental.png`, name: "Basamat Dental" },
  { img: `${BASE}/images/logos/indomie.png`, name: "Indomie" },
];

const INTERVAL = 2200;

export function ClientsMarquee() {
  const { lang } = useLang();
  const isEn = lang === "en";
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % CLIENTS.length;
        setVisible(false);
        setTimeout(() => {
          setCurrent(next);
          setVisible(true);
        }, 300);
        return prev;
      });
    }, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    advance(i);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % CLIENTS.length;
        setVisible(false);
        setTimeout(() => { setCurrent(next); setVisible(true); }, 300);
        return prev;
      });
    }, INTERVAL);
  };

  const client = CLIENTS[current];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#07070b" }}>
      {/* Kingdom Tower — very subtle */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${BASE}/images/landmarks/kingdom_tower.jpg)`,
          backgroundPosition: "center 30%",
          opacity: 0.1,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #07070b 0%, transparent 18%, transparent 82%, #07070b 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 brand-gradient" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-gray-500 uppercase">
              {isEn ? "Partners of Success" : "شركاء النجاح"}
            </span>
            <div className="h-px w-10 brand-gradient" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            {isEn ? "Our Clients " : "عملاؤنا "}
            <span className="brand-gradient-text">
              {isEn ? "Trust Us" : "يثقون بنا"}
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
            {isEn
              ? "+100 major brands trust Flex as their advertising partner"
              : "+100 علامة تجارية كبرى تثق بفلكس شريكاً إعلانياً"}
          </p>
        </div>

        {/* Single logo display */}
        <div className="flex flex-col items-center">

          {/* Logo card */}
          <div
            className="flex items-center justify-center rounded-2xl mb-8"
            style={{
              width: 260,
              height: 160,
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.2) inset",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <img
              key={current}
              src={client.img}
              alt={client.name}
              className="object-contain"
              style={{
                maxWidth: 200,
                maxHeight: 120,
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.92)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement;
                if (parent) {
                  parent.innerHTML = `<span style="font-size:16px;font-weight:800;color:#222;text-align:center;padding:0 16px">${client.name}</span>`;
                }
              }}
            />
          </div>

          {/* Client name label */}
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              marginBottom: 28,
              minHeight: 20,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {client.name}
          </p>

          {/* Dot navigation */}
          <div className="flex flex-wrap justify-center gap-1.5" style={{ maxWidth: 420 }}>
            {CLIENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === current ? 20 : 7,
                  height: 7,
                  background: i === current
                    ? "linear-gradient(90deg, #e63946, #c1121f)"
                    : "rgba(255,255,255,0.18)",
                  border: "none",
                  padding: 0,
                }}
                aria-label={CLIENTS[i].name}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-5 mt-8">
            <button
              onClick={() => goTo((current - 1 + CLIENTS.length) % CLIENTS.length)}
              className="flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{
                width: 44,
                height: 44,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              aria-label="Previous"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <polyline points={isEn ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
              </svg>
            </button>
            <button
              onClick={() => goTo((current + 1) % CLIENTS.length)}
              className="flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{
                width: 44,
                height: 44,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              aria-label="Next"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <polyline points={isEn ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 sm:gap-16 mt-14">
          {[
            { num: "+100",  label: isEn ? "Trusted Brands"      : "براند يثق بنا" },
            { num: "+11",   label: isEn ? "Years Experience"    : "سنوات خبرة" },
            { num: "+2400", label: isEn ? "Successful Projects" : "مشروع ناجح" },
            { num: "+300",  label: isEn ? "Satisfied Clients"   : "عميل راضٍ" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black brand-gradient-text" dir="ltr">{s.num}</div>
              <div className="text-xs text-gray-600 mt-1 font-medium tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
