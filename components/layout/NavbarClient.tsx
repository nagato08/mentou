"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";
import Container from "./Container";
import LangSwitcher from "./LangSwitcher";

type NavItem = { href: string; label: string };

type NavbarClientProps = {
  lang: Locale;
  siteName: string;
  ctaLabel: string;
  phoneLabel: string;
  whatsappLabel: string;
  items: NavItem[];
  admissionHref: string;
};

export default function NavbarClient({
  lang,
  siteName,
  ctaLabel,
  phoneLabel,
  whatsappLabel,
  items,
  admissionHref,
}: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const base = `/${lang}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-ink/95 backdrop-blur-md border-b border-bone/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Container
          size="wide"
          as="div"
          className="flex h-20 items-center justify-between"
        >
          <Link
            href={base}
            onClick={close}
            className="font-display text-lg sm:text-xl md:text-2xl tracking-wide text-bone hover:text-gold transition-colors"
          >
            {siteName}
            <span className="ml-2 text-gold">·</span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Principale"
            className="hidden md:flex items-center gap-8"
          >
            {items.map((item) => {
              const isActive = pathname === item.href || (item.href !== base && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                    isActive
                      ? "text-gold after:w-full"
                      : "text-bone/80 hover:text-gold after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <LangSwitcher currentLang={lang} />
            </div>
            <a
              href={`tel:${phoneLabel.replace(/[^\d+]/g, "")}`}
              className="hidden lg:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone/70 hover:text-gold transition-colors"
            >
              <span aria-hidden>☎</span>
              {phoneLabel}
            </a>
            <Link
              href={admissionHref}
              className="hidden md:inline-flex items-center border border-gold px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-ink transition-colors"
            >
              {ctaLabel}
            </Link>

            {/* Hamburger */}
            <button
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1"
            >
              <span
                className={`block h-px w-6 bg-bone transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block h-px bg-bone transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-6"
                }`}
              />
              <span
                className={`block h-px w-6 bg-bone transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu overlay */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-ink flex flex-col pt-20 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Menu mobile"
          className="flex flex-col px-4 sm:px-6 py-6 sm:py-10 gap-0 border-t border-bone/10"
        >
          {items.map((item, i) => {
            const isActive = pathname === item.href || (item.href !== base && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between py-4 sm:py-5 border-b border-bone/10 font-display text-lg sm:text-2xl transition-colors duration-300 ${isActive ? "text-gold" : "text-bone hover:text-gold"}`}
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {item.label}
                <span className={`text-lg ${isActive ? "text-gold" : "text-gold/50"}`}>→</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 sm:px-6 mt-auto pb-8 sm:pb-12 flex flex-col gap-4 sm:gap-5">
          {/* Lang switcher mobile */}
          <div className="flex items-center gap-3 border-t border-bone/10 pt-6">
            {locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (loc !== lang) {
                      document.cookie = `NEXT_LOCALE=${loc}; path=/; max-age=31536000; samesite=lax`;
                      const segments = window.location.pathname.split("/");
                      segments[1] = loc;
                      window.location.href = segments.join("/") || `/${loc}`;
                    }
                    close();
                  }}
                  className={`text-sm uppercase tracking-[0.3em] transition-colors ${
                    loc === lang ? "text-gold font-medium" : "text-bone/50 hover:text-bone"
                  }`}
                >
                  {loc}
                </button>
                {i < locales.length - 1 && <span className="text-bone/20">/</span>}
              </span>
            ))}
          </div>

          <a
            href={`tel:${phoneLabel.replace(/[^\d+]/g, "")}`}
            onClick={close}
            className="flex items-center justify-center gap-3 w-full text-bone/70 text-sm uppercase tracking-[0.3em] hover:text-gold transition-colors py-3"
          >
            <span aria-hidden>☎</span>
            {phoneLabel}
          </a>
          <a
            href="https://wa.me/14383427730"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center justify-center gap-3 w-full text-bone/70 text-sm uppercase tracking-[0.3em] hover:text-gold transition-colors py-3"
          >
            <span aria-hidden>💬</span>
            {whatsappLabel}
          </a>
          <Link
            href={admissionHref}
            onClick={close}
            className="flex items-center justify-between w-full border border-gold bg-gold text-ink px-7 py-5 text-xs uppercase tracking-[0.3em] font-medium hover:bg-gold-soft transition-colors"
          >
            {ctaLabel}
            <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
