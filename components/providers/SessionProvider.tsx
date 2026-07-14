"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { refreshAccessToken } from "@/lib/auth/authApi";

const REFRESH_INTERVAL_MS = 45 * 1000;

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async () => {
    const ok = await refreshAccessToken();
    if (!ok) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    refresh();
    intervalRef.current = setInterval(refresh, REFRESH_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refresh]);

  return <>{children}</>;
}
