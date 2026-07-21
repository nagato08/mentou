"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

type Media = {
  type: "image" | "video";
  src: string;
  portrait: boolean;
};

const BASE = "/event_lancement";
const FEATURED = `${BASE}/video7.mp4`;

// Galerie (hors vidéo vedette). Ordre pensé pour alterner photos / vidéos.
const TILES: Media[] = [
  { type: "image", src: `${BASE}/image1.jpeg`, portrait: false },
  { type: "video", src: `${BASE}/video6.mp4`, portrait: true },
  { type: "image", src: `${BASE}/image4.jpeg`, portrait: true },
  { type: "video", src: `${BASE}/video1.mp4`, portrait: true },
  { type: "image", src: `${BASE}/image2.jpeg`, portrait: false },
  { type: "video", src: `${BASE}/video2.mp4`, portrait: true },
  { type: "image", src: `${BASE}/image5.jpeg`, portrait: true },
  { type: "video", src: `${BASE}/video3.mp4`, portrait: true },
  { type: "image", src: `${BASE}/image3.jpeg`, portrait: false },
  { type: "video", src: `${BASE}/video4.mp4`, portrait: true },
  { type: "image", src: `${BASE}/image6.jpeg`, portrait: true },
  { type: "video", src: `${BASE}/video5.mp4`, portrait: true },
  { type: "video", src: `${BASE}/video.mp4`, portrait: true },
  { type: "video", src: `${BASE}/video_ouverture1.mp4`, portrait: true },
];

function PlayBadge({ big = false }: { big?: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 flex items-center justify-center`}
    >
      <span
        className={`flex items-center justify-center rounded-full bg-ink/55 backdrop-blur-sm ring-1 ring-bone/30 transition-transform duration-300 group-hover:scale-110 ${
          big ? "h-20 w-20" : "h-12 w-12"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`${big ? "h-8 w-8" : "h-5 w-5"} translate-x-[1px] fill-bone`}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}

export default function SoireeLancement({ dict }: Props) {
  const t = dict.events.recap;
  const [playFeatured, setPlayFeatured] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const go = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + TILES.length) % TILES.length
      ),
    []
  );

  // Navigation clavier + verrou du scroll quand la lightbox est ouverte.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close, go]);

  const current = lightbox === null ? null : TILES[lightbox];

  return (
    <section className="relative section-y-home border-b hairline bg-ink overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl" data-gsap="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="block h-px w-8 bg-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
              {t.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-bone">
            {t.title}{" "}
            <em className="not-italic font-italic-display text-gold/90">
              {t.titleAccent}
            </em>
          </h2>
          <p className="mt-6 text-base md:text-lg text-bone/60 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Vidéo vedette */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 border border-bone/10 overflow-hidden mb-6"
          data-gsap="fade-up"
        >
          {/* Lecteur */}
          <div className="relative bg-black flex items-center justify-center min-h-[320px] lg:min-h-[520px]">
            {playFeatured ? (
              <video
                src={FEATURED}
                controls
                autoPlay
                playsInline
                className="h-full max-h-[520px] w-full object-contain"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlayFeatured(true)}
                aria-label={t.play}
                className="group relative h-full w-full"
              >
                <video
                  src={`${FEATURED}#t=0.5`}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full max-h-[520px] w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />
                <PlayBadge big />
              </button>
            )}
          </div>

          {/* Détails */}
          <div className="relative flex flex-col justify-center gap-5 p-8 md:p-10 lg:p-12 bg-night/30">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold/70">
              {t.featuredLabel}
            </span>
            <p className="font-display text-2xl md:text-3xl leading-snug text-bone">
              {t.featuredCaption}
            </p>
            <ul className="flex flex-col gap-2.5 border-t border-bone/10 pt-5">
              {t.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-bone/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Galerie souvenirs */}
        <div className="flex items-center gap-3 mb-6 mt-14" data-gsap="fade-up">
          <span className="block h-px w-8 bg-gold" />
          <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
            {t.galleryLabel}
          </span>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          data-gsap="stagger"
        >
          {TILES.map((m, i) => (
            <button
              key={m.src}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={m.type === "video" ? t.videoAlt : t.photoAlt}
              className="group relative aspect-square overflow-hidden border border-bone/10 bg-night"
            >
              {m.type === "image" ? (
                <Image
                  src={m.src}
                  alt={`${t.photoAlt} ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <>
                  <video
                    src={`${m.src}#t=0.5`}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <PlayBadge />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          {/* Fermer */}
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone/80 hover:border-gold hover:text-bone transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          {/* Précédent */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label={t.prev}
            className="absolute left-3 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone/80 hover:border-gold hover:text-bone transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>

          {/* Suivant */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label={t.next}
            className="absolute right-3 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/25 text-bone/80 hover:border-gold hover:text-bone transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          {/* Média */}
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "image" ? (
              <div className="relative h-[80vh] w-[90vw]">
                <Image
                  src={current.src}
                  alt={t.photoAlt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <video
                src={current.src}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] max-w-[90vw]"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
