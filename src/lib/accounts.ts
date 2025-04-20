import { createPublicClient, formatEther, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

// Check if private key exists
const privateKey = process.env.GEN_PRIVATE_KEY;
if (!privateKey) {
    console.error("ERROR: GEN_PRIVATE_KEY environment variable is not set!");
    process.exit(1);
}

// Now we can safely use the private key
const account = privateKeyToAccount(privateKey as `0x${string}`);

(async () => {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        console.error("ERROR: RPC_URL environment variable is not set!");
        process.exit(1);
    }

    const client = createPublicClient({
        chain: baseSepolia,
        transport: http(rpcUrl)
    });

    try {
        const balance = await client.getBalance({
            address: account.address
        });
        console.log(`Account: ${account.address}`);
        console.log(`Balance: ${formatEther(balance)} ETH`);

        const nonce = await client.getTransactionCount({
            address: account.address
        });
        console.log(`Nonce: ${nonce}`);
    } catch (error) {
        console.error("Error fetching account information:", error);
    }
})();