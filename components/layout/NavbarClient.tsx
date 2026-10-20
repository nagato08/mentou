"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import Container from "./Container";
import LangSwitcher from "./LangSwitcher";
import Logo from "./Logo";
import Icon from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
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
  // Sous-menu desktop ouvert (href de l'entrée parente), ou null.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Changement de page : on referme tout (motif « état dérivé » de React).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMenuOpen(false);
  }
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

  // Sous-menu desktop : fermeture au clic extérieur et à Échap.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const close = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };
  const isActive = (href: string) => href !== base && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy text-white">
        <Container size="wide" className="flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-xs font-medium sm:text-sm">
          <Icon name="laptop" className="hidden h-4 w-4 shrink-0 sm:block" />
          <span>{announcement}</span>
          <Link
            href={ctaHref}
            className="hidden shrink-0 font-bold text-accent underline-offset-2 hover:underline sm:inline"
          >
            {labels.cta} →
          </Link>
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

          <nav ref={navRef} aria-label="Principale" className="hidden items-center gap-0.5 xl:flex">
            {items.map((item) => {
              const linkClass = `inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                isActive(item.href) ? "text-primary" : "text-slate hover:bg-sky hover:text-primary"
              }`;
              if (!item.children) {
                return (
                  <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={linkClass}>
                    {item.label}
                  </Link>
                );
              }
              // Sous-menu : survol à la souris, clic au toucher ou au clavier.
              const open = openMenu === item.href;
              const menuId = `menu-${item.href.split("/").pop()}`;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOpenMenu(item.href)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={menuId}
                    onClick={() => setOpenMenu(open ? null : item.href)}
                    className={linkClass}
                  >
                    {item.label}
                    <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    id={menuId}
                    className={`absolute left-0 top-full z-50 pt-2 transition-all duration-150 ${
                      open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <ul className="min-w-60 rounded-2xl border border-line bg-white p-2 shadow-lift">
                      {item.children.map((child, i) => (
                        <li key={`${child.href}-${i}`}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className={`block rounded-xl px-3.5 py-2.5 text-sm transition-colors hover:bg-sky hover:text-primary ${
                              i === item.children!.length - 1 ? "mt-1 border-t border-line font-semibold text-primary" : "font-medium text-ink"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LangSwitcher currentLang={lang} />
            </div>
            <a
              href={tel}
              className="hidden items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary 2xl:inline-flex"
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
              className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-sky xl:hidden"
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
        className="absolute inset-x-0 top-full z-40 h-dvh overflow-y-auto border-t border-line bg-white pb-40 xl:hidden"
      >
        <Container className="flex flex-col gap-6 py-6">
          <nav aria-label="Menu mobile" className="flex flex-col">
            {items.map((item) =>
              item.children ? (
                <details key={item.href} className="group border-b border-line">
                  <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-semibold text-ink">
                    {item.label}
                    <Icon name="chevronDown" className="h-5 w-5 text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="flex flex-col pb-3 pl-3">
                    {item.children.map((child, i) => (
                      <li key={`${child.href}-${i}`}>
                        <Link href={child.href} onClick={close} className="block py-2.5 text-base text-slate hover:text-primary">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between border-b border-line py-4 text-lg font-semibold text-ink"
                >
                  {item.label}
                  <Icon name="arrow" className="h-5 w-5 text-primary" />
                </Link>
              )
            )}
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
