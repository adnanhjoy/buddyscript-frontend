"use server";
import { getToken } from "../api/token";
import { getBaseUrl } from "../api/baseUrl";

const getAllPostsQuery = async (query?: string | number) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/posts?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch posts");
  }

  return res.json();
};

const createPostMutation = async ({ formData }: { formData: FormData }) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to create post");
  }

  return res.json();
};

export { getAllPostsQuery, createPostMutation };
