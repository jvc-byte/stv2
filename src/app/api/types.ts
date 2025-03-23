export type formDataType = {
    escrowTitle: string;
    role: string;
    currency: string;
    inspectionPeriod: number;
    itemName: string;
    price: number;
    itemCategory: string;
    itemDescription: string;
    shippingMethod: string;
    shippingFeePaidBy: string;
}


export interface Escrow {
    escrow_id: string;
    initiator: string;
    transaction_title: string;
    role: string;
    currency: string;
    inspection_period: string;
    item_name: string;
    price: string;
    item_category: string;
    item_description: string;
    shipping_method: string;
    shipping_fee_paid_by: string;
    escrow_status: string;
    created_on: string;
}

// Define the type for transaction details
export interface TransactionDetailsType {
    transaction_id: string;
    item_name: string;
    item_price: number;
    escrow_title: string;
    initiator_role: string;
    currency: string;
    inspection_period: string;
    shipping_method: string;
    shipping_fee_paid_by: string;
    item_category: string;
    item_description: string;
    transaction_hash: string;
    block_explorer_url: string;
    chain_id: string;
    chain_name: string;
    transaction_status: string;
    block_number: string;
    timestamp: string;
    method: string;
    initiator_address: string;
    client_id: string;
}