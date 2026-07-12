"use server";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;
  if (!token) {
    console.log("Token not found");
  }
  return token;
}
