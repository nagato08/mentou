/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";
import Container from "./Container";
import LangSwitcher from "./LangSwitcher";

type NavItem = {
  href: string;
  label: string;
};

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
  const [mounted, setMounted] = useState(false); // ← Évite les différences d'hydratation

  const pathname = usePathname();

  // Montage côté client uniquement
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll vertical quand menu ouvert
  useEffect(() => {
    const overflow = menuOpen ? "hidden" : "";
    document.body.style.overflow = overflow;
    document.documentElement.style.overflow = overflow;
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // ← Supprime toute scrollbar horizontale (cause du débordement)
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const close = () => setMenuOpen(false);
  const base = `/${lang}`;

  // Évite le rendu serveur qui pourrait causer un décalage
  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full overflow-x-clip transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-ink/95 backdrop-blur-md border-b border-bone/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Container
          size="wide"
          as="div"
          className="relative flex h-20 w-full max-w-full items-center justify-between overflow-x-hidden"
        >
          {/* Logo */}
          <Link
            href={base}
            onClick={close}
            className="shrink-0 font-display text-lg tracking-wide text-bone transition-colors hover:text-gold sm:text-xl md:text-2xl"
          >
            {siteName}
            <span className="ml-2 text-gold">·</span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Principale"
            className="hidden items-center gap-8 md:flex"
          >
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== base && pathname.startsWith(item.href));
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

          {/* Right actions : min-w-0 permet de réduire si nécessaire */}
          <div className="flex shrink-0 min-w-0 items-center gap-4">
            <div className="hidden md:flex">
              <LangSwitcher currentLang={lang} />
            </div>

            <a
              href={`tel:${phoneLabel.replace(/[^\d+]/g, "")}`}
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone/70 transition-colors hover:text-gold lg:inline-flex"
            >
              <span aria-hidden>☎</span>
              {phoneLabel}
            </a>

            <Link
              href={admissionHref}
              className="hidden items-center border border-gold px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink md:inline-flex"
            >
              {ctaLabel}
            </Link>

            {/* Hamburger - toujours visible sans débordement */}
            <button
              type="button"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1 md:hidden"
            >
              <span
                className={`block h-px w-6 bg-bone transition-all duration-300 origin-center ${
                  menuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px bg-bone transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-6"
                }`}
              />
              <span
                className={`block h-px w-6 bg-bone transition-all duration-300 origin-center ${
                  menuOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu (inchangé, fonctionne correctement) */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-20 transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Menu mobile"
          className="flex flex-col gap-0 border-t border-bone/10 px-4 py-6 sm:px-6 sm:py-10"
        >
          {items.map((item, i) => {
            const isActive =
              pathname === item.href ||
              (item.href !== base && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between border-b border-bone/10 py-4 font-display text-lg transition-colors duration-300 sm:py-5 sm:text-2xl ${
                  isActive ? "text-gold" : "text-bone hover:text-gold"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {item.label}
                <span className={`text-lg ${isActive ? "text-gold" : "text-gold/50"}`}>→</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 px-4 pb-8 sm:gap-5 sm:px-6 sm:pb-12">
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
                    loc === lang
                      ? "font-medium text-gold"
                      : "text-bone/50 hover:text-bone"
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
            className="flex w-full items-center justify-center gap-3 py-3 text-sm uppercase tracking-[0.3em] text-bone/70 transition-colors hover:text-gold"
          >
            <span aria-hidden>☎</span> {phoneLabel}
          </a>

          <a
            href="https://wa.me/14383427730"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex w-full items-center justify-center gap-3 py-3 text-sm uppercase tracking-[0.3em] text-bone/70 transition-colors hover:text-gold"
          >
            <span aria-hidden>💬</span> {whatsappLabel}
          </a>

          <Link
            href={admissionHref}
            onClick={close}
            className="flex w-full items-center justify-between border border-gold bg-gold px-7 py-5 text-xs font-medium uppercase tracking-[0.3em] text-ink transition-colors hover:bg-gold-soft"
          >
            {ctaLabel} <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}