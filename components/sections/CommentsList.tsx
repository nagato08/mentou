"use client";

import { useState } from "react";
import type { Comment } from "@/lib/useComments";
import Icon from "@/components/ui/Icon";
import type { CommentLabels } from "./CommentForm";

const PAGE_SIZE = 4;

type CommentsListProps = {
  comments: Comment[];
  labels: CommentLabels;
  dateLocale: string;
};

export default function CommentsList({ comments, labels, dateLocale }: CommentsListProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const displayed = comments.slice(0, visible);
  const hasMore = visible < comments.length;

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid gap-4 sm:grid-cols-2">
        {displayed.map((c) => (
          <li key={c.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 shadow-card">
            <div className="flex gap-0.5 text-accent" aria-label={`${c.rating} ${labels.outOf}`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Icon
                  key={i}
                  name="star"
                  filled
                  strokeWidth={1}
                  className={`h-4 w-4 ${i < c.rating ? "" : "text-line"}`}
                />
              ))}
            </div>
            <p className="flex-1 leading-relaxed text-ink">« {c.message} »</p>
            <div className="flex items-center gap-3 border-t border-line pt-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sky text-sm font-bold text-primary">
                {c.name.trim().charAt(0).toUpperCase()}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-ink">{c.name}</p>
                <p className="text-xs text-muted">
                  {new Date(c.createdAt).toLocaleDateString(dateLocale, {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {(hasMore || visible > PAGE_SIZE) && (
        <button
          type="button"
          onClick={() => setVisible(hasMore ? visible + PAGE_SIZE : PAGE_SIZE)}
          className="min-h-11 self-center rounded-full px-5 text-sm font-semibold text-primary transition-colors hover:bg-sky"
        >
          {hasMore ? labels.more : labels.less}
        </button>
      )}
    </div>
  );
}
