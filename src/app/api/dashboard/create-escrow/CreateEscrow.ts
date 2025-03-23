import { client } from "@/lib/client";
import { getContract, prepareContractCall } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
import { formDataType } from "../../types";

export const createEscrowTransaction = async (formData: formDataType) => {
    const contract = getContract({
        client: client,
        chain: baseSepolia,
        address: CREATE_ESCROW_CONTRACT_ADDRESS,
    });

    const createEscrow = prepareContractCall({
        contract,
        method: "function createEscrow(string _title, string _role, string _currency, uint256 _inspection_period, string _item_name, uint256 _price, string _item_category, string _item_description, string _shipping_method, string _shipping_fee_paid_by) returns (uint256)",
        params: [
            formData.escrowTitle,
            formData.role,
            formData.currency,
            BigInt(formData.inspectionPeriod),
            formData.itemName,
            BigInt(formData.price),
            formData.itemCategory,
            formData.itemDescription,
            formData.shippingMethod,
            formData.shippingFeePaidBy,
        ],
    });

    return createEscrow;
};