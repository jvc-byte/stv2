import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { POST as sendNotification } from '@/app/api/email/send-notification/route';

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

        // Send notification if status is one of the ones we care about
        if (['2', '11', '16'].includes(status)) {
            // Get the current host from the request URL
            const url = new URL(request.url);
            const baseUrl = new URL('/api/email/send-notification', url);

            const notificationRequest = new Request(baseUrl.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tx_id,
                    status
                }),
            });

            await sendNotification(notificationRequest);
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
