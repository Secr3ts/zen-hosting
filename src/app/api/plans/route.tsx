// /src/app/api/plans/route.ts

import { customInitApp } from "@/lib/firebase-admin-config";
import { NextResponse } from "next/server";
import { firestore } from "firebase-admin";
import logger from "@/lib/logger";
import { SubscriptionPlanInterface } from "@/lib/interfaces";

customInitApp();

export async function GET() {
    try {
        const plansRef = firestore().collection('plans');
        const plansCollection = await plansRef.get();
        
        const plans: SubscriptionPlanInterface[] = plansCollection.docs.map(doc => doc.data() as SubscriptionPlanInterface);

        return NextResponse.json(plans, { status: 200 });
    } catch (error) {
        logger.error("Plans data retrieval failed " + error);
    }
}