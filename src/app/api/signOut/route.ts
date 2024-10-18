// /src/app/api/signOut/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import logger from "@/lib/logger";

export async function POST() {
  //Remove the value and expire the cookie
  
  const cookie = cookies().get("session")?.name;

  logger.info("Logout Attempt from " + cookie);

  const options = {
    name: "session",
    value: "",
    maxAge: -1,
  };

  cookies().set(options);
  
  logger.info("Logout Succeeded from " + cookie);
  
  return NextResponse.json({}, { status: 200 });
}