"use server";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "../../../lib/client";
import { cookies } from "next/headers";

// Validate environment variables
const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY;
const authDomain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN;
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || "jwt";

if (!privateKey || !authDomain) {
  throw new Error("Missing required environment variables in .env file.");
}

// Initialize thirdweb auth
const thirdwebAuth = createAuth({
  domain: authDomain,
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client,
});

export const generatePayload = thirdwebAuth.generatePayload;

/**
 * Verifies the login payload and sets a JWT cookie if valid.
 * @param payload - The login payload to verify.
 * @returns {Error} If the login process fails.
 */
export async function login(payload: VerifyLoginPayloadParams) {
  try {
    const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
    console.log(verifiedPayload);
    if (verifiedPayload.valid) {
      const jwt = await thirdwebAuth.generateJWT({
        payload: verifiedPayload.payload,
      });
      (await cookies()).set(JWT_COOKIE_NAME, jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1,
        path: "/",
      });
      
      // Redirect to dashboard
      return {
        success: true,
        redirectUrl: "/dashboard"
      };
    }
    return {
      success: false,
      error: "Invalid login payload."
    }

  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      error: "Invalid login payload."
    }
  }
}

/**
 * Checks if the user is logged in by verifying the JWT cookie.
 * @returns {Promise<boolean>} True if the user is logged in, false otherwise.
 */
export async function isLoggedIn(): Promise<boolean> {
  try {
    const jwt = (await cookies()).get(JWT_COOKIE_NAME);
    console.log(jwt);
    if (!jwt?.value) {
      return false;
    }

    const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
    return authResult.valid;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return false;
  }
}

/**
 * Logs out the user by deleting the JWT cookie.
 */
export async function logout(): Promise<void> {
  (await cookies()).delete(JWT_COOKIE_NAME);
}