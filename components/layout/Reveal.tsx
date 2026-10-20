"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Animations d'apparition au défilement, sans librairie.
 * Les éléments marqués `data-reveal` (up, left, right, zoom, stagger) apparaissent
 * quand ils entrent dans l'écran. Le CSS est dans globals.css (.reveal-ready).
 * Rien n'est masqué si JavaScript est désactivé ou si l'utilisateur réduit les animations.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
      if (el.dataset.reveal === "stagger") {
        Array.from(el.children).forEach((child, i) =>
          (child as HTMLElement).style.setProperty("--i", String(Math.min(i, 8)))
        );
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
