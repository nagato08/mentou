"use client";

import { useComments } from "@/lib/useComments";

export default function CommentsModeration() {
  const { comments, pendingComments, approvedComments, toggleApprove, deleteComment, mounted } =
    useComments();

  if (!mounted) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-ink text-bone p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-4xl mb-12">Modération des commentaires</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="p-4 bg-ink/50 border border-bone/10 rounded">
            <p className="text-bone/60 text-sm">Total</p>
            <p className="font-display text-3xl text-bone">{comments.length}</p>
          </div>
          <div className="p-4 bg-ink/50 border border-bone/10 rounded">
            <p className="text-bone/60 text-sm">En attente</p>
            <p className="font-display text-3xl text-gold">{pendingComments.length}</p>
          </div>
          <div className="p-4 bg-ink/50 border border-bone/10 rounded">
            <p className="text-bone/60 text-sm">Approuvés</p>
            <p className="font-display text-3xl text-gold">{approvedComments.length}</p>
          </div>
        </div>

        {/* Pending Comments */}
        <div className="mb-12">
          <h2 className="font-display text-2xl mb-6 text-gold">
            En attente d'approbation ({pendingComments.length})
          </h2>
          {pendingComments.length === 0 ? (
            <p className="text-bone/60">Aucun commentaire en attente</p>
          ) : (
            <div className="space-y-4">
              {pendingComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-ink/50 border-l-4 border-gold rounded"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-bone">{comment.name}</h3>
                      <p className="text-sm text-bone/60">
                        {comment.rating}★ •{" "}
                        {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                  <p className="text-bone mb-4">{comment.message}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleApprove(comment.id)}
                      className="px-4 py-2 bg-gold text-ink font-semibold rounded hover:bg-gold/90 transition-colors"
                    >
                      ✓ Approuver
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="px-4 py-2 bg-burgundy text-bone font-semibold rounded hover:bg-burgundy/90 transition-colors"
                    >
                      ✕ Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approved Comments */}
        <div>
          <h2 className="font-display text-2xl mb-6 text-bone">
            Commentaires approuvés ({approvedComments.length})
          </h2>
          {approvedComments.length === 0 ? (
            <p className="text-bone/60">Aucun commentaire approuvé</p>
          ) : (
            <div className="space-y-4">
              {approvedComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-ink/50 border border-bone/10 rounded"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-bone">{comment.name}</h3>
                      <p className="text-sm text-bone/60">
                        {comment.rating}★ •{" "}
                        {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                  <p className="text-bone mb-4">{comment.message}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleApprove(comment.id)}
                      className="px-4 py-2 bg-bone/20 text-bone font-semibold rounded hover:bg-bone/30 transition-colors"
                    >
                      ↩ Dépublier
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="px-4 py-2 bg-burgundy text-bone font-semibold rounded hover:bg-burgundy/90 transition-colors"
                    >
                      ✕ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
