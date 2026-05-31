import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLang();

  const quickLinks = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/services", label: t.services },
    { href: "/gallery", label: t.gallery },
    { href: "/portfolio", label: t.portfolio },
    { href: "/contact", label: t.contact },
  ];

  const servicesList = [
    t.footerService1, t.footerService2, t.footerService3,
    t.footerService4, t.footerService5, t.footerService6,
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t.footerBio}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors"
                data-testid="link-social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors"
                data-testid="link-social-youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/966563538520"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors"
                data-testid="link-social-whatsapp"
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.504 1.13 6.752 3.056 9.388L1.056 31.04l5.84-1.872A15.906 15.906 0 0016.004 32C24.828 32 32 24.822 32 16S24.828 0 16.004 0zm9.284 22.596c-.384 1.08-1.908 1.978-3.126 2.24-.832.176-1.918.316-5.572-1.198-4.676-1.926-7.692-6.676-7.928-6.986-.228-.308-1.912-2.548-1.912-4.862s1.192-3.444 1.664-3.926a1.74 1.74 0 011.258-.518c.314 0 .628.006.902.018.29.014.678-.11.062 1.684-.38 1.086-.88 2.496-.958 2.682a.694.694 0 00.064.664c.104.204.354.518.676.834.316.32.648.708.934.952.322.272.66.562.284 1.102-.374.536-1.626 2.04-1.978 2.424-.352.382-.376.598-.252.852.12.25 1.058 1.748 2.25 2.832 1.546 1.378 2.852 1.808 3.254 2.002.4.192.632.16.866-.096.232-.26.994-1.158 1.26-1.556.262-.398.526-.33.888-.198s2.302 1.086 2.696 1.282c.392.196.654.294.75.458.094.162.094.936-.29 2.014z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-black text-white mb-6 tracking-wide">{t.footerQuickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    data-testid={`footer-link-${href.replace("/", "") || "home"}`}
                  >
                    <span className="w-4 h-px bg-border group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-black text-white mb-6 tracking-wide">{t.footerServicesTitle}</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {servicesList.map((s) => (
                <li key={s} className="hover:text-primary transition-colors cursor-default">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-black text-white mb-6 tracking-wide">{t.footerContactTitle}</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="text-muted-foreground text-sm leading-relaxed">
                  <span className="text-white font-semibold block mb-1">{t.contactDammam}</span>
                  {t.contactDammamRegion}
                  <br />
                  <span className="text-white font-semibold block mt-2 mb-1">{t.contactRiyadh}</span>
                  {t.contactRiyadhRegion}
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a
                  href="tel:+966563538520"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  dir="ltr"
                  data-testid="footer-phone"
                >
                  +966 56 353 85 20
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a
                  href="mailto:a.darag@flex-adv.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  data-testid="footer-email"
                >
                  a.darag@flex-adv.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t.footerCopyright}
          </p>
          <a
            href="https://www.flex-adv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            dir="ltr"
          >
            www.flex-adv.com
          </a>
        </div>
      </div>
    </footer>
  );
}
