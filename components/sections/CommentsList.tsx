"use client";

import { useState } from "react";
import type { Comment } from "@/lib/useComments";

type CommentsListProps = {
  comments: Comment[];
  initialVisible?: number;
};

export default function CommentsList({
  comments,
  initialVisible = 3,
}: CommentsListProps) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? comments : comments.slice(0, initialVisible);
  const hasMore = comments.length > initialVisible;

  return (
    <div className="space-y-6">
      {visible.map((comment) => (
        <div
          key={comment.id}
          className="p-6 bg-ink/50 border border-bone/10 rounded"
        >
          {/* Header: Name + Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <h3 className="font-semibold text-bone">{comment.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(comment.rating)].map((_, i) => (
                <span key={i} className="text-gold text-sm">
                  ★
                </span>
              ))}
              <span className="text-xs text-bone/60 ml-2">
                {comment.rating}/5
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="text-bone text-sm leading-relaxed mb-3">
            {comment.message}
          </p>

          {/* Date */}
          <p className="text-xs text-bone/40">
            {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
      ))}

      {/* Show more / less */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 text-sm uppercase tracking-widest text-gold border border-gold/30 rounded hover:bg-gold/10 transition-colors"
        >
          {showAll
            ? "Voir moins"
            : `Voir tous les commentaires (${comments.length})`}
        </button>
      )}
    </div>
  );
}
