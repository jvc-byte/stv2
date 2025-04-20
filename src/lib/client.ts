import { createThirdwebClient } from "thirdweb";
import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

const secretKey = process.env.THIRDWEB_SECRET_KEY;
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;

export const viemPublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.RPC_URL!),
});

export const viemWalletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(process.env.RPC_URL!),
});

// Instead of top-level await, provide an async function to get addresses
export async function getWalletAddresses() {
  return viemWalletClient.getAddresses();
}


if (!clientId) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set");
}

export const client = createThirdwebClient(
  secretKey ? { secretKey } : { clientId }
);