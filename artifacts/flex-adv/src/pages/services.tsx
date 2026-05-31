import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Printer, Layers, BookOpen, Building2, Zap, Box,
  CalendarDays, Gift, Car, Factory, MonitorPlay,
} from "lucide-react";
import { Link } from "wouter";
import { type ReactNode } from "react";
import { useLang } from "@/contexts/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const S = `${BASE}/images/services`;

const serviceImageMap: Array<{ keywords: string[]; imgs: [string, string] }> = [
  { keywords: ["طباعة الرقمية", "رقمية", "مطبوعات", "print"],          imgs: [`${S}/digital_printing_1.jpg`,   `${S}/digital_printing_2.jpg`] },
  { keywords: ["أوفست", "أوفسيت"],                                      imgs: [`${S}/offset_printing_1.jpg`,    `${S}/digital_printing_1.jpg`] },
  { keywords: ["استيكر", "تلمين", "فينيل"],                             imgs: [`${S}/vehicle_wrap_1.jpg`,       `${S}/vehicle_wrap_2.jpg`] },
  { keywords: ["هوية", "مؤسسية", "براند", "بصرية", "identity"],        imgs: [`${S}/branding_1.jpg`,           `${S}/branding_2.jpg`] },
  { keywords: ["ليزر"],                                                  imgs: [`${S}/laser_1.jpg`,              `${S}/laser_2.jpg`] },
  { keywords: ["ثلاثي", "3d", "أبعاد"],                                 imgs: [`${S}/3d_signage_1.jpg`,         `${S}/3d_signage_2.jpg`] },
  { keywords: ["فعالية", "معارض", "مؤتمر", "دعاية", "advertising"],    imgs: [`${S}/events_1.jpg`,             `${S}/events_2.jpg`] },
  { keywords: ["هدايا", "ترويج"],                                        imgs: [`${S}/promo_gifts_1.jpg`,        `${S}/promo_gifts_2.jpg`] },
  { keywords: ["سيار", "موتورز", "مركبة"],                              imgs: [`${S}/vehicle_wrap_1.jpg`,       `${S}/vehicle_wrap_2.jpg`] },
  { keywords: ["ورشة", "تصنيع", "إنتاج"],                              imgs: [`${S}/workshop_1.jpg`,           `${S}/workshop_2.jpg`] },
  { keywords: ["لافتة", "إضاءة", "نيون"],                              imgs: [`${S}/neon_1.jpg`,               `${S}/neon_2.jpg`] },
  { keywords: ["تصميم", "جرافيك", "فيديو", "موشن", "design", "video"], imgs: [`${S}/graphic_design_1.jpg`,     `${S}/graphic_design_2.jpg`] },
  { keywords: ["تسويق", "استشار", "marketing"],                         imgs: [`${S}/branding_1.jpg`,           `${S}/graphic_design_2.jpg`] },
];

function getServiceImages(title: string): [string, string] {
  const lower = title.toLowerCase();
  const match = serviceImageMap.find(({ keywords }) =>
    keywords.some((kw) => title.includes(kw) || lower.includes(kw.toLowerCase()))
  );
  return match?.imgs ?? [`${S}/events_1.jpg`, `${S}/branding_1.jpg`];
}

const iconMap: Record<string, ReactNode> = {
  Printer:      <Printer className="w-10 h-10" />,
  Layers:       <Layers className="w-10 h-10" />,
  BookOpen:     <BookOpen className="w-10 h-10" />,
  Building2:    <Building2 className="w-10 h-10" />,
  Zap:          <Zap className="w-10 h-10" />,
  Box:          <Box className="w-10 h-10" />,
  CalendarDays: <CalendarDays className="w-10 h-10" />,
  Gift:         <Gift className="w-10 h-10" />,
  Car:          <Car className="w-10 h-10" />,
  Factory:      <Factory className="w-10 h-10" />,
};

const getIcon = (name: string): ReactNode =>
  iconMap[name] ?? <MonitorPlay className="w-10 h-10" />;

export default function Services() {
  const { data: services, isLoading } = useListServices({
    query: { queryKey: getListServicesQueryKey() },
  });
  const { t, lang } = useLang();

  const workshopItems = [
    t.workshop1, t.workshop2, t.workshop3,
    t.workshop4, t.workshop5, t.workshop6,
  ];

  return (
    <div className="w-full min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="max-w-4xl mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.servicesBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              {t.servicesPageTitle} <span className="text-primary">{t.servicesPageHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t.servicesPageDesc}
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full bg-secondary/30 border border-border" />
            ))
          ) : (
            services?.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative bg-card border border-border hover:border-primary/50 transition-all overflow-hidden flex flex-col md:flex-row"
                data-testid={`card-service-${service.id}`}
              >
                {/* Image strip */}
                <div className="md:w-48 lg:w-64 flex-shrink-0 relative overflow-hidden min-h-[140px]">
                  {getServiceImages(service.title).map((imgSrc, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={imgSrc}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        imgIdx === 0 ? "opacity-100 group-hover:opacity-0" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-l from-card via-card/20 to-transparent z-10" />
                </div>
                {/* Content */}
                <div className="relative flex-1 p-8 md:p-12">
                  <div
                    className="absolute top-0 left-0 p-8 text-[7rem] leading-none font-black text-white/[0.03] group-hover:text-primary/[0.06] transition-colors select-none pointer-events-none"
                    dir="ltr"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="bg-background border border-border p-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      {getIcon(service.icon)}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                        {lang === "ar" ? service.title : (service.title_en || service.title)}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                        {lang === "ar" ? service.description : (service.description_en || service.description)}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Manufacturing Workshop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 md:p-16 bg-card border border-border/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-xs font-black tracking-widest border border-primary/30 px-3 py-1 mb-6">
                MANUFACTURING WORKSHOP
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6">
                {t.workshopTitle} <span className="text-primary">{t.workshopHighlight}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {t.workshopDesc}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                {t.workshopBtn}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {workshopItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-background border border-border hover:border-primary/30 transition-colors"
                  data-testid={`workshop-item-${i}`}
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-white text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 p-12 md:p-20 brand-gradient brand-glow text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">{t.servicesCtaTitle}</h2>
            <p className="text-xl text-white/90 mb-10">{t.servicesCtaDesc}</p>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-background text-foreground font-black text-xl hover:bg-white hover:text-black transition-colors"
              data-testid="link-services-cta"
            >
              {t.servicesCtaBtn}
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
