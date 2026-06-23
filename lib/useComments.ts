"use client";

import { useEffect, useState, useCallback } from "react";

export type Comment = {
  id: string;
  name: string;
  message: string;
  rating: number;
  approved: boolean;
  createdAt: string;
};

export function useComments() {
  const [approvedComments, setApprovedComments] = useState<Comment[]>([]);
  const [mounted, setMounted] = useState(false);

  const fetchApproved = useCallback(async () => {
    const res = await fetch("/api/comments");
    if (res.ok) setApprovedComments(await res.json());
  }, []);

  useEffect(() => {
    fetchApproved().finally(() => setMounted(true));
  }, [fetchApproved]);

  const addComment = async (name: string, message: string, rating: number) => {
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, rating }),
    });
  };

  return { approvedComments, addComment, mounted };
}
