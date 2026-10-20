"use client";

import { useState } from "react";
import { useComments } from "@/lib/useComments";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CommentForm, { type CommentLabels } from "./CommentForm";
import CommentsList from "./CommentsList";

type CommentsSectionProps = {
  eyebrow: string;
  title: string;
  labels: CommentLabels;
  dateLocale: string;
};

export default function CommentsSection({
  eyebrow,
  title,
  labels,
  dateLocale,
}: CommentsSectionProps) {
  const { approvedComments, addComment, mounted } = useComments();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="section">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className="mt-6 flex justify-center lg:hidden">
          <button
            type="button"
            onClick={() => setFormOpen((v) => !v)}
            aria-expanded={formOpen}
            className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold text-primary transition-colors hover:border-primary"
          >
            {formOpen ? labels.close : labels.leave}
          </button>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="mb-5 text-lg font-bold text-ink">
              {labels.listTitle}
              {mounted && ` (${approvedComments.length})`}
            </h3>
            {mounted ? (
              <CommentsList comments={approvedComments} labels={labels} dateLocale={dateLocale} />
            ) : (
              <div className="h-64 animate-pulse rounded-2xl bg-paper" aria-hidden />
            )}
          </div>

          <div className={`${formOpen ? "block" : "hidden"} lg:block`}>
            <div className="rounded-2xl border border-line bg-paper p-6 md:p-7">
              <h3 className="mb-5 text-lg font-bold text-ink">{labels.formTitle}</h3>
              <CommentForm onSubmit={addComment} labels={labels} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
