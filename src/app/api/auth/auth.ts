"use server";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "../../../lib/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || "";

if (!privateKey) {
  throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.");
}

const thirdwebAuth = createAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams, returnUrl?: string) {
    const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
    if (verifiedPayload.valid) {
      const jwt = await thirdwebAuth.generateJWT({
        payload: verifiedPayload.payload,
      });
      (await cookies()).set("jwt", jwt);
      
      // Redirect to the return URL if provided, otherwise to dashboard
      return redirect(returnUrl || "/dashboard");
    }
    return redirect("/");
  }

  export async function isLoggedIn() {
    try {
      const jwt = (await cookies()).get("jwt");
      if (!jwt?.value) {
        return false;
      }
    
      const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
      if (!authResult.valid) {
        // If JWT is invalid, remove it
        (await cookies()).delete("jwt");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Auth verification error:", error);
      return false;
    }
  }
  
  export async function logout() {
    (await cookies()).delete("jwt");
    return redirect("/");
  }

export async function requireAuth() {
    const isAuthenticated = await isLoggedIn();
    if (!isAuthenticated) {
      const headersList = headers();
      const currentPath = (await headersList).get("x-invoke-path") || "/";
      const searchParams = (await headersList).get("x-invoke-query") || "";
      const returnUrl = searchParams ? `${currentPath}?${searchParams}` : currentPath;
      
      return redirect(`/?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }
  