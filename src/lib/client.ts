import { createThirdwebClient } from "thirdweb";

const secretKey = process.env.THIRDWEB_SECRET_KEY;
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;

if (!clientId) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set");
}

if (!secretKey) {
  throw new Error("THIRDWEB_SECRET_KEY is not set");
}

export const client = createThirdwebClient(
  secretKey
    ? { secretKey }
    : {
        clientId,
      }
);