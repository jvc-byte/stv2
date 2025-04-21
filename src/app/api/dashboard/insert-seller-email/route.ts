import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { transactionHash, sellerEmail } = await request.json();

        if (!transactionHash || !sellerEmail) {
            return NextResponse.json(
                { success: false, message: 'transactionHash and sellerEmail are required' },
                { status: 400 }
            );
        }

        // Update the seller_email for the given transaction
        const updateQuery = `
            UPDATE transaction_details
            SET seller_email = $1
            WHERE transaction_hash = $2
            RETURNING *;
        `;
        const result = await pool.query(updateQuery, [sellerEmail, transactionHash]);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Transaction not found or update failed' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Seller email updated successfully', data: result.rows[0] },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating seller email:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error', error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
