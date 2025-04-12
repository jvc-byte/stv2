import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { tx_id, status, message } = await request.json();

        if (!tx_id || !status) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Update transaction status in database
        const updateResult = await pool.query(
            'UPDATE transaction_details SET status = $1, status_message = $2 WHERE transaction_hash = $3 RETURNING *',
            [status, message || null, tx_id]
        );

        if (updateResult.rowCount === 0) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            transaction: updateResult.rows[0]
        });
    } catch (error) {
        console.error('Error updating transaction status:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
