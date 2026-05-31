import { useSubmitContact } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const showcaseImages = (isEn: boolean) => [
  { src: `${BASE}/images/portfolio/khayallah_facade_night_1.jpeg`, label: isEn ? "Khayallah" : "خيالة" },
  { src: `${BASE}/images/portfolio/papillon_facade.jpeg`,           label: "Papillon" },
  { src: `${BASE}/images/portfolio/image_restaurant_gold_2.jpeg`,   label: "IMAGE" },
  { src: `${BASE}/images/portfolio/pepsi_music_2.jpeg`,             label: "Pepsi Music" },
  { src: `${BASE}/images/portfolio/alawad_facade.jpeg`,             label: isEn ? "Al-Awad" : "العواد" },
  { src: `${BASE}/images/portfolio/inmar_install_2.jpeg`,           label: "INMAR" },
];

export default function Contact() {
  const { t, lang } = useLang();
  const isEn = lang === "en";
  const submitContact = useSubmitContact();
  const images = showcaseImages(isEn);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const contactSchema = z.object({
    name: z.string().min(2, t.formNameError),
    phone: z.string().min(9, t.formPhoneError),
    email: z.string().email(t.formEmailError).optional().or(z.literal("")),
    message: z.string().min(10, t.formMessageError),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const contactItems = [
    {
      icon: MapPin,
      title: t.contactOfficesTitle,
      content: (
        <div className="text-muted-foreground leading-relaxed text-sm">
          <span className="text-white font-semibold block mb-1">{t.contactDammam}</span>
          {t.contactDammamRegion}
          <br /><br />
          <span className="text-white font-semibold block mb-1">{t.contactRiyadh}</span>
          {t.contactRiyadhRegion}
        </div>
      ),
    },
    {
      icon: Phone,
      title: t.contactPhoneTitle,
      content: (
        <div className="space-y-1">
          <a href="tel:+966563538520" className="text-muted-foreground hover:text-primary transition-colors block text-sm" dir="ltr">
            +966 56 353 85 20
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      title: t.contactEmailTitle,
      content: (
        <a href="mailto:a.darag@flex-adv.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
          a.darag@flex-adv.com
        </a>
      ),
    },
    {
      icon: MessageCircle,
      title: t.contactWhatsappTitle,
      content: (
        <a
          href="https://wa.me/966563538520"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
          dir="ltr"
        >
          +966 56 353 85 20
        </a>
      ),
    },
    {
      icon: Clock,
      title: t.contactHoursTitle,
      content: (
        <div className="text-muted-foreground text-sm leading-relaxed">
          {t.contactHoursDays}<br />
          <span className="text-white font-semibold">{t.contactHoursTime}</span>
        </div>
      ),
    },
  ];

  const onSubmit = (data: ContactFormValues) => {
    setSubmitError(null);
    submitContact.mutate(
      { data },
      {
        onSuccess: (response) => {
          if (response.success) {
            form.reset();
            setSubmitted(true);
          } else {
            setSubmitError(response.message || t.formErrorDesc);
          }
        },
        onError: () => {
          setSubmitError(t.formConnError);
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="max-w-3xl mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.contactBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              {t.contactHero1} <span className="text-primary">{t.contactHero2}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.contactHeroDesc}
            </p>
          </motion.div>
        </div>

        {/* Work Showcase Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground text-sm">{lang === "en" ? "From Our Recent Work" : "من أعمالنا الأخيرة"}</p>
            <Link
              href="/portfolio"
              className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              {lang === "en" ? "Browse All Work" : "استعرض كل الأعمال"} <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="relative overflow-hidden group aspect-square"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-black text-white mb-8">{t.contactInfoTitle}</h2>
            {contactItems.map(({ icon: Icon, title, content }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-5 p-6 bg-card border border-border hover:border-primary/30 transition-colors"
                data-testid={`contact-info-${i}`}
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-2">{title}</h4>
                  {content}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card border border-border p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 brand-gradient" />
              <h2 className="text-3xl font-black text-white mb-8">{t.formTitle}</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 gap-6 text-center"
                    data-testid="contact-success"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-xl font-bold text-white leading-relaxed">
                      {isEn
                        ? "Your message has been sent. We will get in touch with you shortly."
                        : "تم إرسال الرسالة وسيتم التواصل معكم قريباً"}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-primary text-sm font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
                    >
                      {isEn ? "Send another message" : "إرسال رسالة أخرى"}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white font-semibold">{t.formName} *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t.formNamePlaceholder}
                                    className="bg-background border-border h-14 rounded-none focus-visible:ring-primary text-white"
                                    data-testid="input-contact-name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white font-semibold">{t.formPhone} *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="05X XXX XXXX"
                                    className="bg-background border-border h-14 rounded-none focus-visible:ring-primary text-white"
                                    dir="ltr"
                                    data-testid="input-contact-phone"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold">
                                {t.formEmail} <span className="text-muted-foreground font-normal">{t.formEmailOptional}</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="bg-background border-border h-14 rounded-none focus-visible:ring-primary text-white"
                                  dir="ltr"
                                  data-testid="input-contact-email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-semibold">{t.formMessage} *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={t.formMessagePlaceholder}
                                  className="bg-background border-border min-h-[160px] rounded-none focus-visible:ring-primary text-white resize-y"
                                  data-testid="textarea-contact-message"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {submitError && (
                          <p className="text-sm text-destructive font-semibold" data-testid="contact-error">
                            {submitError}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={submitContact.isPending}
                          className="w-full h-14 bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          data-testid="button-contact-submit"
                        >
                          {submitContact.isPending ? t.formSubmitting : t.formSubmit}
                        </button>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
