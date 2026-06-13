"use client";

import { useState } from "react";

type CommentFormProps = {
  onSubmit: (name: string, message: string, rating: number) => void;
  isLoading?: boolean;
};

export default function CommentForm({
  onSubmit,
  isLoading = false,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onSubmit(name, message, rating);
    setName("");
    setMessage("");
    setRating(5);
    setSubmitted(true);

    // Hide success message after 3s
    setTimeout(() => setSubmitted(false), 3000);
  };

  const ratingOptions = [2, 3, 4, 5];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {/* Success Message */}
      {submitted && (
        <div className="mb-6 p-4 bg-gold/20 border border-gold/50 rounded text-bone text-sm">
          ✓ Votre commentaire a été reçu. Il sera affiché après modération.
        </div>
      )}

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm uppercase tracking-widest text-bone/60 mb-2"
          >
            Votre nom
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Prénom Nom"
            className="w-full px-4 py-3 bg-ink/50 border border-bone/10 rounded text-bone placeholder:text-bone/40 focus:outline-none focus:border-gold/50 transition-colors"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm uppercase tracking-widest text-bone/60 mb-3">
            Votre évaluation
          </label>
          <div className="flex gap-3">
            {ratingOptions.map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`px-4 py-2 rounded border transition-all ${
                  rating === star
                    ? "bg-gold text-ink border-gold"
                    : "bg-ink/50 text-bone/60 border-bone/10 hover:border-gold/50"
                }`}
              >
                <span className="font-semibold">{star}</span>
                <span className="text-xs ml-1">★</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm uppercase tracking-widest text-bone/60 mb-2"
          >
            Votre commentaire
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Partagez votre expérience avec Mentou..."
            rows={4}
            className="w-full px-4 py-3 bg-ink/50 border border-bone/10 rounded text-bone placeholder:text-bone/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !name.trim() || !message.trim()}
          className="w-full md:w-auto px-6 py-3 bg-gold text-ink font-semibold rounded transition-all hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Envoyer mon commentaire
        </button>
      </div>

      <p className="mt-4 text-xs text-bone/40">
        Les commentaires sont modérés avant publication.
      </p>
    </form>
  );
}
