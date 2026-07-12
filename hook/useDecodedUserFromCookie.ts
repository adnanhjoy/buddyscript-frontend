"use server";
import { getToken } from "@/lib/api/token";
import jwt from "jsonwebtoken";

export const getDecodedUserFromCookie = async () => {
  const token = await getToken();

  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};
