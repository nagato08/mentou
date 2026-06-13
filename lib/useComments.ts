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

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setComments(stored ? JSON.parse(stored) : []);
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
    setComments([newComment, ...comments]);
  };

  const toggleApprove = (id: string) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, approved: !c.approved } : c
      )
    );
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
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
