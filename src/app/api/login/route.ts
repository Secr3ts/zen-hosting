// src/app/api/login/route.js
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { customInitApp } from "@/lib/firebase-admin-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as authConfig } from "@/lib/firebase-client-config";
import logger from '@/lib/logger'; 

// Init the Firebase SDK every time the server is called
customInitApp();

async function handleBearerToken(authorization: string | null) {
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 30 * 60 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
      return NextResponse.json({}, { status: 200 });
    }
  }
}

async function handleEmailAndPassword(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      authConfig,
      email,
      password
    );

    const user = userCredential.user;
    const authorization = await user.getIdToken();

    if (authorization) {
      const idToken = authorization;
      const decodedToken = await auth().verifyIdToken(idToken);

      if (decodedToken) {
        const expiresIn = 30 * 60 * 1000;
        const sessionCookie = await auth().createSessionCookie(idToken, {
          expiresIn,
        });
        const options = {
          name: "session",
          value: sessionCookie,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        cookies().set(options);
        return NextResponse.json({ options }, { status: 200 });
      }
    }
  } catch (error: any) {
    console.error("Authentication error:", error.code);

    
    let errorMessage = "Authentification echouée.";

    // Check Firebase authentication error codes and handle them accordingly
    if (error.code === "auth/wrong-password") {
      errorMessage = "Mot de passe non valide.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "Cet utilisateur n\'existe pas.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Addresse Email invalide.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      const authorization = headers().get("Authorization");
      return await handleBearerToken(authorization);
    } else {
      return await handleEmailAndPassword(email, password);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  
  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true).catch((reason) => console.log(reason.code));

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}