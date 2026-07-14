const API_BASE = "/api/v1";

interface AuthData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const userSignupMutation = async (data: AuthData) => {
  const res = await fetch(`${API_BASE}/user/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    if (result?.errors && Array.isArray(result.errors)) {
      const messages = result.errors.map((e: { message: string }) => e.message);
      throw new Error(messages.join("\n"));
    }
    throw new Error(result?.message || "Failed to signup");
  }

  return result;
};

const userLoggedIn = async (data: AuthData) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.message || "Failed to login");
  }

  return result;
};

const refreshAccessToken = async (): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
};

const userLogout = async () => {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {}

  return { success: true };
};

export {
  userSignupMutation,
  userLoggedIn,
  userLogout,
  refreshAccessToken,
};
