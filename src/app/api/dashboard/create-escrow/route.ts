import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Adjust the import path as needed

export async function POST(request: Request) {
    try {
        const { email, transactionDetails } = await request.json();

        if (!email || !transactionDetails) {
            return NextResponse.json(
                { success: false, message: 'Email and transaction details are required' },
                { status: 400 }
            );
        }

        // Check if the transaction already exists
        const checkQuery = `
            SELECT * FROM transaction_details WHERE transaction_hash = $1;
        `;
        const checkResult = await pool.query(checkQuery, [transactionDetails.transaction_hash]);

        if (checkResult.rows.length > 0) {
            return NextResponse.json(
                { success: false, message: 'Transaction already exists' },
                { status: 409 } // 409 Conflict
            );
        }

        // Insert transaction details into the database
        const insertQuery = `
            INSERT INTO transaction_details (
                transaction_hash, item_name, item_price, escrow_title, initiator_role,
                currency, inspection_period, shipping_method, shipping_fee_paid_by,
                item_category, item_description, block_explorer_url, chain_id, chain_name,
                transaction_status, block_number, timestamp, method, initiator_address, client_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            RETURNING *;
        `;

        const values = [
            transactionDetails.transaction_hash,
            transactionDetails.item_name,
            transactionDetails.item_price,
            transactionDetails.escrow_title,
            transactionDetails.initiator_role,
            transactionDetails.currency,
            transactionDetails.inspection_period,
            transactionDetails.shipping_method,
            transactionDetails.shipping_fee_paid_by,
            transactionDetails.item_category,
            transactionDetails.item_description,
            transactionDetails.block_explorer_url,
            transactionDetails.chain_id,
            transactionDetails.chain_name,
            transactionDetails.transaction_status,
            transactionDetails.block_number,
            transactionDetails.timestamp,
            transactionDetails.method,
            transactionDetails.initiator_address,
            transactionDetails.client_id,
        ];

        // Execute the insert query
        const result = await pool.query(insertQuery, values);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Failed to insert transaction details' },
                { status: 500 }
            );
        }

        // If you need to send an email, do it here
        // This is now a direct function call, not a self-referencing API call
        // Example: await sendEmailToUser(email, transactionDetails);

        return NextResponse.json(
            { success: true, message: 'Transaction details saved successfully', data: result.rows[0] },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error saving transaction details:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error', 
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}