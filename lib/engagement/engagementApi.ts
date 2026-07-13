"use server";
import { getToken } from "../api/token";
import { getBaseUrl } from "../api/baseUrl";

// Like / Unlike post
const likePostMutation = async (postId: string) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/posts/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to like post");
  }

  return res.json();
};

const likeUserPostQuery = async (postId: string) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/posts/${postId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch likes");
  }

  return res.json();
};

// comment
const getAllCommentsQuery = async (
  postId?: string,
  query?: string | number,
) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(
    `${baseUrl}/engagement/posts/${postId}/comments?${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch comments");
  }

  return res.json();
};

const createCommentMutation = async ({
  text,
  postId,
}: {
  text: string;
  postId: string;
}) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to create comment");
  }

  return res.json();
};

const likeCommentMutation = async (commentId: string) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/comments/${commentId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to like comment");
  }

  return res.json();
};

const likeUserCommentQuery = async (commentId: string) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/comments/${commentId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch likes");
  }

  return res.json();
};

// replies
const createCommentReplyMutation = async ({
  text,
  commentId,
}: {
  text: string;
  commentId: string;
}) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(
    `${baseUrl}/engagement/comments/${commentId}/replies`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ text }),
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to create comment");
  }

  return res.json();
};

const getAllCommentsReplyQuery = async (
  commentId?: string,
  query?: string | number,
) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(
    `${baseUrl}/engagement/comments/${commentId}/replies?${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch comments");
  }

  return res.json();
};

const likeReplyMutation = async (replyId: string) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/replies/${replyId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to like reply");
  }

  return res.json();
};

const likeUserReplyQuery = async (replyId: string) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/replies/${replyId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch likes");
  }

  return res.json();
};

export {
  likePostMutation,
  likeUserPostQuery,
  getAllCommentsQuery,
  createCommentMutation,
  likeCommentMutation,
  likeUserCommentQuery,
  getAllCommentsReplyQuery,
  createCommentReplyMutation,
  likeReplyMutation,
  likeUserReplyQuery,
};
