import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/lib/firebase-client-config";
import { customInitApp } from "@/lib/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";
import { UserInterface } from "@/lib/interfaces";
import logger from "@/lib/logger";
import { firestore } from 'firebase-admin';
import Stripe from 'stripe';

// initialize custom app everytime the server is called
customInitApp();

// initialize stripe app
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// Function to register a new user using Firebase Authentication
export async function registerUser(email: string, password: string, name: string) {
    try {

        logger.info(`Register attempt from ${email}`);

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        // You can perform additional actions after successful registration, if needed.
        // ajuster regles firebase ou utiliser le sdk admin
        const customerId = await createUserInStripe(user, name);
        createUserInFirestore(user, customerId, name);

        return { success: true, user };
    } catch (error: any) {
        logger.error(`Register attempt failed from ${email}`);

        if (error.code === "auth/email-already-in-use") {
            return { success: false, error: "Compte déjà existant" }    
        }
 
        return { success: false, error: error.code }
    }
}

async function createUserInStripe(user: User, name: string) {
    try {
        const customer = await stripe.customers.create({
            name: name,
            email: user.email!,
            metadata: {
                uid: user.uid
            }
        });

        logger.info(`Stripe customer success for ${user.uid}`);
        return customer.id
    } catch (error) {
        logger.error('Register customer stripe attempt failed for ' + user.uid);
        throw new Error();
    }
}

async function createUserInFirestore(user: User, customerId: string, name: string) {
    try {
        const userDocRef = firestore().collection("users").doc(user.uid);
        const userDoc: UserInterface = {
            email: user.email!,
            name: name,
            createdAt: firestore.Timestamp.now(),
            updatedAt: firestore.Timestamp.now(),
            isActive: true,
            customerId: customerId,
        };

        userDocRef.set(userDoc, { merge: true });
        logger.info("Document creation success for " + user.uid);
    } catch (error) {
        logger.error("error " + error);
    }
}

// POST request handler
export async function POST(request: NextRequest) {
    try {
        // Extract email and password from the request body
        const { email, password, name } = await request?.json();
        // Check if email and password are provided
        if (!email || !password) {
            return NextResponse.json(
                { error: "Une addresse email et un mot de passe sont requis." },
                { status: 400 }
            );
        }

        // Register the user
        const registrationResult = await registerUser(email, password, name);

        if (registrationResult.success) {
            // Registration successful
            return NextResponse.json({
                message: "Inscription réussie.",
                user: registrationResult.user,
            });
        } else {
            // Registration failed, return an error response
            return NextResponse.json(
                { error: registrationResult.error },
                { status: 500 }
            );
        }
    } catch (error) {
        // Handle unexpected errors
        logger.error(`Error during registration ${error}`);
        return NextResponse.json(
            { error: "Erreur interne." },
            { status: 500 }
        );
    }
}