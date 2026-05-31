import { Link, useLocation } from "wouter";
import { Logo } from "@/components/Logo";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, toggleLang } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location === "/";
  const solidBg = scrolled || !isHomePage;

  const links = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/services", label: t.services },
    { href: "/gallery", label: t.gallery },
    { href: "/portfolio", label: t.portfolio },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? "bg-[#080808] border-b border-white/10 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  location === link.href
                    ? "text-primary"
                    : "text-white/80 hover:text-white"
                }`}
                data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleLang}
              data-testid="button-lang-toggle"
              className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white transition-colors border border-white/20 px-3 py-1.5 hover:border-white/50"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "ar" ? "EN" : "عر"}
            </button>

            <Link
              href="/contact"
              className="px-6 py-2 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
              data-testid="button-nav-contact"
            >
              {t.startProject}
            </Link>
          </nav>

          {/* Mobile: lang + menu */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              data-testid="button-lang-toggle-mobile"
              className="text-white text-xs font-bold border border-white/30 px-2 py-1"
            >
              {lang === "ar" ? "EN" : "عر"}
            </button>
            <button
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
              data-testid="button-mobile-menu-open"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#080808] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <Logo />
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-mobile-menu-close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-bold transition-colors ${
                    location === link.href
                      ? "text-primary"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 text-center bg-primary text-primary-foreground font-bold text-lg"
                >
                  {t.startProject}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
