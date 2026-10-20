"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

export type CommentLabels = {
  leave: string;
  close: string;
  formTitle: string;
  listTitle: string;
  name: string;
  namePh: string;
  rating: string;
  message: string;
  messagePh: string;
  submit: string;
  success: string;
  moderation: string;
  more: string;
  less: string;
  outOf: string;
};

type CommentFormProps = {
  onSubmit: (name: string, message: string, rating: number) => void | Promise<void>;
  labels: CommentLabels;
};

const INPUT =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

export default function CommentForm({ onSubmit, labels }: CommentFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    await onSubmit(name, message, rating);
    setName("");
    setMessage("");
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {submitted && (
        <p role="status" className="flex items-center gap-2 rounded-xl bg-success/10 px-4 py-3 text-sm font-semibold text-success">
          <Icon name="check" className="h-4 w-4" strokeWidth={3} />
          {labels.success}
        </p>
      )}

      <div>
        <label htmlFor="comment-name" className="mb-1.5 block text-sm font-semibold text-ink">
          {labels.name}
        </label>
        <input
          id="comment-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={labels.namePh}
          className={INPUT}
          required
          maxLength={80}
        />
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-ink">{labels.rating}</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`${star} ${labels.outOf}`}
              aria-pressed={rating === star}
              className={`grid h-11 w-11 place-items-center rounded-lg transition-colors hover:bg-accent-soft ${
                star <= rating ? "text-accent" : "text-line"
              }`}
            >
              <Icon name="star" className="h-7 w-7" filled strokeWidth={1} />
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="comment-message" className="mb-1.5 block text-sm font-semibold text-ink">
          {labels.message}
        </label>
        <textarea
          id="comment-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={labels.messagePh}
          rows={4}
          className={`${INPUT} resize-none`}
          required
          maxLength={1000}
        />
      </div>

      <button
        type="submit"
        disabled={!name.trim() || !message.trim()}
        className="min-h-12 rounded-full bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {labels.submit}
      </button>
      <p className="text-xs text-muted">{labels.moderation}</p>
    </form>
  );
}
