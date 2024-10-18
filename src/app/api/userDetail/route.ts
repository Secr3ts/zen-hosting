// /src/app/api/userDetail/route.ts

import { customInitApp } from "@/lib/firebase-admin-config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { auth, firestore } from "firebase-admin";
import logger from "@/lib/logger";
import { UserInterface } from "@/lib/interfaces";

customInitApp();

export async function GET() {
    try {
        const session = cookies().get("session")?.value || "";

        if (!session) {
            return NextResponse.json({ userDetail: null }, { status: 401 });
        }

        const decodedClaims = await auth().verifySessionCookie(session, true).catch((reason) => console.log(reason.code));

        let userRef = firestore().collection('users').doc(decodedClaims!.uid);
        let userDoc = await userRef.get();
        let userData = userDoc.data() as UserInterface;

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        logger.error("Data retrieval failed " + error);
    }
}