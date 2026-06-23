"use client";

import { useState } from "react";
import type { Comment } from "@/lib/useComments";

const PAGE_SIZE = 3;

type CommentsListProps = {
  comments: Comment[];
};

export default function CommentsList({ comments }: CommentsListProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const displayed = comments.slice(0, visible);
  const hasMore = visible < comments.length;
  const canCollapse = visible > PAGE_SIZE;

  return (
    <div className="space-y-6">
      {displayed.map((comment) => (
        <div
          key={comment.id}
          className="p-6 bg-ink/50 border border-bone/10 rounded"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <h3 className="font-semibold text-bone">{comment.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(comment.rating)].map((_, i) => (
                <span key={i} className="text-gold text-sm">★</span>
              ))}
              <span className="text-xs text-bone/60 ml-2">{comment.rating}/5</span>
            </div>
          </div>
          <p className="text-bone text-sm leading-relaxed mb-3">{comment.message}</p>
          <p className="text-xs text-bone/40">
            {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        {hasMore && (
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, comments.length))}
            className="w-full py-3 text-sm uppercase tracking-widest text-gold border border-gold/30 rounded hover:bg-gold/10 transition-colors"
          >
            Charger plus ({comments.length - visible} restant{comments.length - visible > 1 ? "s" : ""})
          </button>
        )}
        {canCollapse && (
          <button
            type="button"
            onClick={() => setVisible(PAGE_SIZE)}
            className="w-full py-2 text-xs uppercase tracking-widest text-bone/40 hover:text-bone/60 transition-colors"
          >
            Voir moins
          </button>
        )}
      </div>
    </div>
  );
}
