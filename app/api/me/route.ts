"use server";
import { getDecodedUserFromCookie } from "@/hook/useDecodedUserFromCookie";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getDecodedUserFromCookie();
  return NextResponse.json(user);
};
