"use client";

import type { Comment } from "@/lib/useComments";

type CommentsListProps = {
  comments: Comment[];
};

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
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
    </div>
  );
}
