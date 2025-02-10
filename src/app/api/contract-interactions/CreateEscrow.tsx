// import { client } from "@/lib/client";
// import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
// import { getContract, prepareContractCall } from "thirdweb";
// import { useSendTransaction } from "thirdweb/react";
// import { baseSepolia } from "thirdweb/chains";

// export default function CreateEscrow({ escrowData }) {
//     const { mutate: sendTransaction, isPending, isError, error } = useSendTransaction();

//     const onClick = () => {
//         // Destructure the escrowData props
//         const {
//             title,
//             role,
//             currency,
//             inspectionPeriod,
//             itemName,
//             price,
//             itemCategory,
//             itemDescription,
//             shippingMethod,
//             shippingFeePaidBy,
//         } = escrowData;

//         // Get the contract instance
//         const contract = getContract({ client: client, chain: baseSepolia, address: CREATE_ESCROW_CONTRACT_ADDRESS })

//         // Prepare the contract call
//         const createEscrow = prepareContractCall({
//             contract, // Ensure this is defined and imported
//             method: "function createEscrow(string _title, string _role, string _currency, uint256 _inspection_period, string _item_name, uint256 _price, string _item_category, string _item_description, string _shipping_method, string _shipping_fee_paid_by) returns (uint256)",
//             params: [
//                 title,
//                 role,
//                 currency,
//                 inspectionPeriod,
//                 itemName,
//                 price,
//                 itemCategory,
//                 itemDescription,
//                 shippingMethod,
//                 shippingFeePaidBy,
//             ],
//         });

//         // Log the structured data for debugging
//         console.log('Escrow Data:', escrowData);
//         console.log('Escrow Data (formatted):', JSON.stringify(escrowData, null, 2));

//         // Send the transaction
//         sendTransaction(createEscrow, {
//             onSuccess: (receipt) => {
//                 console.log("Transaction successful! Receipt:", receipt);
//             },
//             onError: (error) => {
//                 console.error("Transaction failed:", error);
//             },
//         });
//     };

//     return (
//         <div>
//             <button onClick={onClick} disabled={isPending}>
//                 {isPending ? "Creating Escrow..." : "Create Escrow"}
//             </button>
//             {isError && <p style={{ color: "red" }}>Error: {error.message}</p>}
//         </div>
//     );
// }