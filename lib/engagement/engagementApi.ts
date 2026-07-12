"use server";
import { getToken } from "../api/token";
import { getBaseUrl } from "../api/baseUrl";

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
  formData,
  postId,
}: {
  formData: FormData;
  postId: string;
}) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/engagement/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to create comment");
  }

  return res.json();
};

export { getAllCommentsQuery, createCommentMutation };
