"use server";
import { cookies } from "next/headers";
import { getBaseUrl } from "../api/baseUrl";

interface AuthData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

// User signup
const userSignupMutation = async (data: AuthData) => {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || "Failed to signup");
  }

  if (result?.data) {
    (await cookies()).set({
      name: "auth",
      value: result?.data,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return result;
};

// User and seller login
const userLoggedIn = async (data: AuthData) => {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || "Failed to login");
  }

  if (result?.data) {
    (await cookies()).set({
      name: "auth",
      value: result?.data,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return result;
};

// user logout
const userLogout = async () => {
  try {
    (await cookies()).set({
      name: "auth",
      value: "",
      path: "/",
      expires: new Date(0),
    });

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export { userSignupMutation, userLoggedIn, userLogout };
