"use server";
import { getToken } from "../api/token";
import { getBaseUrl } from "../api/baseUrl";
import { getDecodedUserFromCookie } from "@/hook/useDecodedUserFromCookie";

const getAllUserQuery = async (query?: string | number) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/user?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch users");
  }

  return res.json();
};

const getSingleUser = async (email: string) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/user/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const updateUser = async ({
  email,
  formData,
}: {
  email: string;
  formData: FormData;
}) => {
  const token = await getToken();
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/user/${email}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to update user");
  }

  return res.json();
};

const getCurrentUser = async () => {
  const decoded = await getDecodedUserFromCookie();
  if (!decoded || typeof decoded === "string" || !decoded.email) return null;
  return getSingleUser(decoded.email);
};

export { getAllUserQuery, getSingleUser, updateUser, getCurrentUser };
