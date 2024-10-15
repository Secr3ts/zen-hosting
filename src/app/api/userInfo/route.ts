import { customInitApp } from "@/lib/firebase-admin-config";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

customInitApp();

export async function GET() {
    const session = cookies().get("session")?.value || "";

    if (!session) {
        return NextResponse.json({ userInfo: null }, { status: 401 });
    }

    try {
        const decodedClaims = await auth().verifySessionCookie(session, true).catch((reason) => console.log(reason.code));

        const userInfo = {
            email: decodedClaims!.email,
            picture: decodedClaims!.picture || "",
            uid: decodedClaims!.uid
        };

        return NextResponse.json(userInfo, { status: 200 });
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return NextResponse.json({ status: 401 });
    }
}