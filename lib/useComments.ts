import { useEffect, useState } from "react";

export type Comment = {
  id: string;
  name: string;
  message: string;
  rating: number;
  approved: boolean;
  createdAt: string;
};

const STORAGE_KEY = "mentou_comments";

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: "default-1",
    name: "Marie L.",
    message: "En quelques mois, mon fils a complètement changé. Il ose s'exprimer, il s'intéresse à de nouvelles choses, il a trouvé sa place.",
    rating: 5,
    approved: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "default-2",
    name: "Karim D.",
    message: "L'approche est rigoureuse mais profondément humaine. Mes deux ados y vont avec plaisir et reviennent grandis chaque semaine.",
    rating: 5,
    approved: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "default-3",
    name: "Sophia",
    message: "Avant Groupe Mentou, je n'osais pas prendre la parole en classe. Maintenant, je dirige un projet étudiant. Les exercices de sketch m'ont vraiment débloqué.",
    rating: 4,
    approved: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setComments(JSON.parse(stored));
    } else {
      // Initialize with defaults on first load
      setComments(DEFAULT_COMMENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMMENTS));
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever comments change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    }
  }, [comments, mounted]);

  const addComment = (name: string, message: string, rating: number) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name,
      message,
      rating,
      approved: false,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const toggleApprove = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, approved: !c.approved } : c
      )
    );
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const approvedComments = comments.filter((c) => c.approved);
  const pendingComments = comments.filter((c) => !c.approved);

  return {
    comments,
    approvedComments,
    pendingComments,
    addComment,
    toggleApprove,
    deleteComment,
    mounted,
  };
}
