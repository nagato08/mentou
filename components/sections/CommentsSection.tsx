"use client";

import { useComments } from "@/lib/useComments";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

type TestimonialsProps = {
  eyebrow: string;
  title: string;
};

export default function Testimonials({ eyebrow, title }: TestimonialsProps) {
  const { approvedComments, addComment, mounted } = useComments();

  if (!mounted) return null;

  return (
    <section
      className="border-t border-bone/10 py-16 md:py-20 lg:py-24"
      data-gsap="fade-up"
    >
      <div className="container flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16 text-center max-w-2xl px-4">
          <div className="flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-gold" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="block h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-bone">
            {title}
          </h2>
        </div>

        {/* Grid: Form + List */}
        <div className="w-full max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Form */}
          <div>
            <h3 className="font-display text-2xl text-bone mb-6">
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
