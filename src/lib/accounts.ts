import { createPublicClient, formatEther, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import "viem/window";
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
export const exportedAccount = account;
export const exportedRpcUrl = process.env.RPC_URL;

// Async function to get browser account/address
export async function getBrowserAccount(): Promise<`0x${string}` | null> {
    if (typeof window === 'undefined' || !('ethereum' in window)) {
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethereum = (window as any).ethereum;
    if (typeof ethereum.request !== 'function') {
        return null;
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts && accounts.length > 0 && accounts[0] && accounts[0].startsWith('0x')) {
        return accounts[0] as `0x${string}`;
    }
    return null;
}

(async () => {
    // Initialize address with the private key address as default
    let address: `0x${string}` = account.address as `0x${string}`;
    
    // Explicitly check for browser environment
    const isBrowser = typeof window !== 'undefined';
    console.log(`Is browser environment: ${isBrowser}`);
    
    // Check for ethereum provider
    const hasEthereum = isBrowser && 'ethereum' in window;
    console.log(`Has ethereum provider: ${hasEthereum}`);
    
    // Try to connect to MetaMask with retry
    if (hasEthereum) {
        let connected = false;
        // Number of retry attempts
        const maxRetries = 3;
        let retryCount = 0;
        
        console.log("MetaMask detected. Attempting to connect...");
        
        while (!connected && retryCount < maxRetries) {
            try {
                console.log(`Attempt ${retryCount + 1} to connect to MetaMask...`);
                // Bypass strict typing with any
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const ethereum = window.ethereum as any;
                
                // Check if the request method exists
                if (typeof ethereum.request !== 'function') {
                    console.error("ethereum.request is not a function");
                    break;
                }
                
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                console.log("Received accounts:", accounts);
                
                if (accounts && accounts.length > 0 && accounts[0] && accounts[0].startsWith('0x')) {
                    address = accounts[0] as `0x${string}`;
                    connected = true;
                    console.log(`Successfully connected to MetaMask on attempt ${retryCount + 1}`);
                } else {
                    console.warn("MetaMask returned an invalid or empty address");
                    retryCount++;
                    // Add a small delay before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (error) {
                console.error(`Error connecting to MetaMask (attempt ${retryCount + 1}):`, error);
                retryCount++;
                // Add a small delay before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        // If all retries failed, we keep using the default address (already set)
        if (!connected) {
            console.warn(`Failed to connect to MetaMask after ${maxRetries} attempts. Using private key address instead.`);
        }
    } else {
        // Already using the account from private key (set above)
        console.log("Not in browser or no ethereum provider detected. Using private key address.");
    }

    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) {
        console.error("ERROR: RPC_URL environment variable is not set!");
        process.exit(1);
    }

    const client = createPublicClient({
        chain: baseSepolia,
        transport: http(rpcUrl)
    });
    console.log(`Client connected to: ${rpcUrl}`);

    try {
        const balance = await client.getBalance({
            address: address
        });
        console.log(`Account: ${address}`);
        console.log(`Balance: ${formatEther(balance)} ETH`);

        const nonce = await client.getTransactionCount({
            address: address
        });
        console.log(`Nonce: ${nonce}`);
    } catch (error) {
        console.error("Error fetching account information:", error);
    }
})();