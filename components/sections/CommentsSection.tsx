"use client";

import { useRef } from "react";
import { useComments } from "@/lib/useComments";
import { GOOGLE_PROFILE } from "@/lib/contact";
import Container from "@/components/layout/Container";
import Icon from "@/components/ui/Icon";
import CommentForm, { type CommentLabels } from "./CommentForm";

type CommentsSectionProps = {
  eyebrow: string;
  title: string;
  labels: CommentLabels;
  dateLocale: string;
};

/**
 * Avis des familles : une seule rangée qui défile (flèches ou doigt),
 * formulaire dans une fenêtre pour garder la section compacte.
 */
export default function CommentsSection({ eyebrow, title, labels, dateLocale }: CommentsSectionProps) {
  const { approvedComments, addComment, mounted } = useComments();
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const count = approvedComments.length;
  const avg = count ? approvedComments.reduce((s, c) => s + c.rating, 0) / count : 0;
  const fmt = (n: number) => n.toLocaleString(dateLocale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <section id="avis" className="section overflow-hidden">
      <Container size="wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal="up">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="text-3xl font-extrabold leading-tight text-ink md:text-4xl">{title}</h2>
            {mounted && count > 0 && (
              <p className="flex items-center gap-2 text-slate">
                <Icon name="star" filled strokeWidth={1} className="h-5 w-5 text-accent" />
                <strong className="text-ink">{fmt(avg)}/5</strong>
                {labels.summary}, {count} {labels.listTitle.toLowerCase()}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Icon name="chat" className="h-4 w-4" />
              {labels.leave}
            </button>
            {GOOGLE_PROFILE.url && (
              <a
                href={GOOGLE_PROFILE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
              >
                {labels.seeGoogle}
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            )}
            <div className="ml-1 hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label={labels.prev}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name="arrow" className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label={labels.next}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name="arrow" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {mounted ? (
          <ul
            ref={trackRef}
            className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-4 scrollbar-none md:-mx-10 md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {approvedComments.map((c) => (
              <li
                key={c.id}
                className="flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-card sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
              >
                <div className="flex gap-0.5 text-accent" aria-label={`${c.rating} ${labels.outOf}`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon key={i} name="star" filled strokeWidth={1} className={`h-4 w-4 ${i < c.rating ? "" : "text-line"}`} />
                  ))}
                </div>
                <p className="line-clamp-5 flex-1 leading-relaxed text-ink">« {c.message} »</p>
                <div className="flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sky text-sm font-bold text-primary">
                    {c.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-ink">{c.name}</p>
                    <p className="text-xs text-muted">
                      {new Date(c.createdAt).toLocaleDateString(dateLocale, { month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 h-56 animate-pulse rounded-2xl bg-paper" aria-hidden />
        )}
      </Container>

      <dialog
        ref={dialogRef}
        aria-labelledby="avis-form-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-line bg-white p-0 shadow-lift backdrop:bg-ink/50"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div className="p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 id="avis-form-title" className="text-xl font-extrabold text-ink">{labels.formTitle}</h3>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={labels.close}
              className="grid h-10 w-10 place-items-center rounded-full text-slate hover:bg-sky hover:text-primary"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          <CommentForm onSubmit={addComment} labels={labels} />
        </div>
      </dialog>
    </section>
  );
}
