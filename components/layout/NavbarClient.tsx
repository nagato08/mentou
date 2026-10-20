"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import Container from "./Container";
import LangSwitcher from "./LangSwitcher";
import Logo from "./Logo";
import Icon from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";

type NavItem = {
  href: string;
  label: string;
};

type NavbarClientProps = {
  lang: Locale;
  items: NavItem[];
  announcement: string;
  labels: {
    cta: string;
    phone: string;
    menuOpen: string;
    menuClose: string;
    siteName: string;
  };
};

export default function NavbarClient({
  lang,
  items,
  announcement,
  labels,
}: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const base = `/${lang}`;
  const tel = `tel:${labels.phone.replace(/[^\d+]/g, "")}`;
  const ctaHref = `${base}/demander-un-tuteur`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le défilement de la page quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy text-white">
        <Container size="wide" className="flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-xs font-medium sm:text-sm">
          <Icon name="laptop" className="hidden h-4 w-4 shrink-0 sm:block" />
          {announcement}
        </Container>
      </div>

      <div
        className={`border-b bg-white/95 backdrop-blur transition-shadow duration-200 ${
          scrolled ? "border-line shadow-card" : "border-transparent"
        }`}
      >
        <Container size="wide" className="flex h-18 items-center justify-between gap-6">
          <Link href={base} onClick={close} className="shrink-0" aria-label={labels.siteName}>
            <Logo name={labels.siteName} />
          </Link>

          <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-slate hover:bg-sky hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LangSwitcher currentLang={lang} />
            </div>
            <a
              href={tel}
              className="hidden items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary xl:inline-flex"
            >
              <Icon name="phone" className="h-4 w-4 text-primary" />
              {labels.phone}
            </a>
            <Link href={ctaHref} className={buttonClass("primary", "md", "max-sm:hidden")}>
              {labels.cta}
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? labels.menuClose : labels.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-sky lg:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full z-40 h-dvh overflow-y-auto border-t border-line bg-white pb-40 lg:hidden"
      >
        <Container className="flex flex-col gap-6 py-6">
          <nav aria-label="Menu mobile" className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-center justify-between border-b border-line py-4 text-lg font-semibold text-ink"
              >
                {item.label}
                <Icon name="arrow" className="h-5 w-5 text-primary" />
              </Link>
            ))}
          </nav>
          <LangSwitcher currentLang={lang} />
          <div className="flex flex-col gap-3">
            <a href={tel} onClick={close} className={buttonClass("secondary", "lg")}>
              <Icon name="phone" className="h-5 w-5" />
              {labels.phone}
            </a>
            <Link href={ctaHref} onClick={close} className={buttonClass("primary", "lg")}>
              {labels.cta}
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
