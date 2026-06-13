"use client";

import { useState } from "react";
import { useComments } from "@/lib/useComments";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

type CommentsSectionProps = {
  eyebrow: string;
  title: string;
};

export default function CommentsSection({
  eyebrow,
  title,
}: CommentsSectionProps) {
  const { approvedComments, addComment, mounted } = useComments();
  const [formOpen, setFormOpen] = useState(false);

  if (!mounted) return null;

  return (
    <section
      className="border-t border-bone/10 py-16 md:py-20 lg:py-24"
      data-gsap="fade-up"
    >
      <div className="container flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-12 text-center max-w-2xl px-4">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-gold" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="block h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-bone">
            {title}
          </h2>
        </div>

        {/* Toggle form button (mobile-first CTA) */}
        <button
          type="button"
          onClick={() => setFormOpen(!formOpen)}
          className="mb-10 px-6 py-3 bg-gold text-ink font-semibold rounded transition-all hover:bg-gold/90 lg:hidden"
        >
          {formOpen ? "Fermer le formulaire" : "Laisser un avis"}
        </button>

        {/* Grid: Form + List */}
        <div className="w-full max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form — collapsible on mobile, always visible on desktop */}
          <div className={`${formOpen ? "block" : "hidden"} lg:block`}>
            <h3 className="hidden lg:block font-display text-2xl text-bone mb-6">
              Laissez votre avis
            </h3>
            <CommentForm onSubmit={addComment} />
          </div>

          {/* Comments List */}
          <div>
            <h3 className="font-display text-2xl text-bone mb-6">
              Expériences partagées ({approvedComments.length})
            </h3>
            <CommentsList comments={approvedComments} />
          </div>
        </div>
      </div>
    </section>
  );
}
