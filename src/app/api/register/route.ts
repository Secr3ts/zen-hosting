import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase-client-config";
import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { UserInterface } from "@/lib/interfaces";

// Function to register a new user using Firebase Authentication
export async function registerUser(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;
        console.log("User registered:", user);

        // You can perform additional actions after successful registration, if needed.

        createUserInFirestore(user);

        return { success: true, user };
    } catch (error: any) {
        console.error("Error during registration:", error);

        if (error.code === "auth/email-already-in-use") {
            return { success: false, error: "Compte déjà existant" }    
        }
 
        return { success: false, error: error.code }
    }
}

async function createUserInFirestore(user: User) {
    try {
        const userDocRef = doc(db, "users");
        const userDoc: UserInterface = {
            email: user.email!,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            isActive: true,
        };

        setDoc(userDocRef, userDoc, {merge: true});
        console.log("document creation success for " + user.uid);
    } catch (error: any) {
        console.log(error.code);
    }
}

// POST request handler
export async function POST(request: NextRequest) {
    try {
        // Extract email and password from the request body
        const { email, password } = await request?.json();

        console.log(email);
        // Check if email and password are provided
        if (!email || !password) {
            return NextResponse.json(
                { error: "Une addresse email et un mot de passe sont requis." },
                { status: 400 }
            );
        }

        // Register the user
        const registrationResult = await registerUser(email, password);

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
        console.error("Error during registration:", error);
        return NextResponse.json(
            { error: "Erreur interne." },
            { status: 500 }
        );
    }
}