"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const config = { start: "top 88%", once: true };

      gsap.utils.toArray<HTMLElement>("[data-gsap='fade-up']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, ...config } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='fade-left']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, ...config } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='fade-right']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, ...config } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='scale']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, ...config } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='stagger']").forEach((container) => {
        gsap.fromTo(
          Array.from(container.children),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: container, start: "top 85%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='stagger-left']").forEach((container) => {
        gsap.fromTo(
          Array.from(container.children),
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: container, start: "top 85%", once: true },
          }
        );
      });

      // Parallax hero background
      const heroBg = document.querySelector<HTMLElement>("[data-gsap='parallax']");
      if (heroBg) {
        gsap.to(heroBg, {
          y: "25%",
          ease: "none",
          scrollTrigger: {
            trigger: heroBg.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
