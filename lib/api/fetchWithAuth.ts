import { getBaseUrl } from "./baseUrl";
import { refreshAccessToken } from "../auth/authApi";

let isRefreshing = false;

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401 && !isRefreshing) {
    isRefreshing = true;
    const ok = await refreshAccessToken();
    isRefreshing = false;

    if (ok) {
      return fetch(`${baseUrl}${url}`, {
        ...options,
        credentials: "include",
      });
    }
  }

  return res;
}
