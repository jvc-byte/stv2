import { MULTISIG_WALLET_CONTRACT_ADDRESS, MULTISIG_WALLET_CONTRACT_ABI } from "@/lib/contracts";
import { createTxDataType } from "@/app/api/types";
import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { parseEther } from "viem/utils";
// import dotenv from "dotenv";

// dotenv.config();
// dotenv.config({ path: '.env.local', override: true });
// const privateKey = process.env.GEN_PRIVATE_KEY;
// if (!privateKey) {
//   throw new Error("GEN_PRIVATE_KEY is not set in environment variables");
// }

const rpcUrl = "https://84532.rpc.thirdweb.com/184b4b84b53c73f73c3abb20320f9a28";
const privateKey = "0x75c9c54404eeddabebca2a79b272903b013b4b1204de1e66b6e3910298e2d269";
const account = privateKeyToAccount(privateKey);

// Create transaction function
export async function createTransactions(formData: createTxDataType) {
    if (!formData.sellerAddress.startsWith("0x")) {
        throw new Error("Seller address must start with 0x");
    }
    if (!formData.tx_id.toString().startsWith("0x")) {
        throw new Error("Transaction ID must start with 0x");
    }
    const client = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(rpcUrl)
    }).extend(publicActions);

    // Convert price (ETH string/float) to wei (BigInt)
    const amountInWei = parseEther(formData.price.toString());

    const createTransaction = await client.writeContract({
        address: MULTISIG_WALLET_CONTRACT_ADDRESS,
        abi: MULTISIG_WALLET_CONTRACT_ABI,
        functionName: "createTransaction",
        args: [
            formData.tx_id as `0x${string}`,
            formData.sellerAddress as `0x${string}`,
            amountInWei,
        ],
        chain: baseSepolia,
        account: account
    });

    console.log("Transaction created:", createTransaction);

    return createTransaction;
}

// Deposit function
export async function deposit(formData: { tx_id: string; amount: string }) {

    const client = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(rpcUrl)
    }).extend(publicActions);

    // Convert amount to wei (1 ETH = 10^18 wei)
    const amountInWei = parseEther(formData.amount.toString());

    const txHash = await client.writeContract({
        address: MULTISIG_WALLET_CONTRACT_ADDRESS,
        abi: MULTISIG_WALLET_CONTRACT_ABI,
        functionName: "deposit",
        args: [formData.tx_id as `0x${string}`],
        value: amountInWei, // This sends the ETH with the transaction
        chain: baseSepolia,
        account: account
    });

    return txHash;
}