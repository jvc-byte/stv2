import { createThirdwebClient } from "thirdweb";
import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const secretKey = process.env.THIRDWEB_SECRET_KEY;
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;

export const viemPublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.RPC_URL!),
});
console.log(`Viem Public Client: ${viemPublicClient}`);

export const viemWalletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(process.env.RPC_URL!),
});
console.log(`Viem Wallet Client: ${viemWalletClient}`);

// Instead of top-level await, provide an async function to get addresses
export async function getWalletAddresses() {
  const addresses = await viemWalletClient.getAddresses();
  // console.log(addresses);
  return addresses;
}

console.log(`Local Wallet Addresses: ${getWalletAddresses()}`);


if (!clientId) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set");
}

export const client = createThirdwebClient(
  secretKey ? { secretKey } : { clientId }
);
console.log(`ThirdWeb Client: ${client}`);