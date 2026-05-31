import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";

export function Logo({ className = "" }: { className?: string }) {
  const { lang } = useLang();

  return (
    <Link
      href="/"
      className={`flex items-center hover:opacity-90 transition-opacity ${className}`}
      data-testid="link-home-logo"
    >
      <img
        src={lang === "ar" ? "/images/logo-ar-white.png" : "/images/logo-en-white.png"}
        alt="Flex for Advertising — فلكس للدعاية والإعلان"
        className="h-12 w-auto object-contain"
        style={{ maxWidth: 160 }}
      />
    </Link>
  );
}
