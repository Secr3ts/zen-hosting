// /src/app/api/plans/route.ts

import { customInitApp } from "@/lib/firebase-admin-config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { auth, firestore } from "firebase-admin";
import logger from "@/lib/logger";
import { SubscriptionPlanInterface, UserInterface } from "@/lib/interfaces";

customInitApp();

export async function GET() {
    try {
        let plansRef = firestore().collection('plans');
        let plansCollection = await plansRef.get();
        
        let plans: SubscriptionPlanInterface[] = plansCollection.docs.map(doc => doc.data() as SubscriptionPlanInterface);

        return NextResponse.json(plans, { status: 200 });
    } catch (error) {
        logger.error("Plans data retrieval failed " + error);
    }
}