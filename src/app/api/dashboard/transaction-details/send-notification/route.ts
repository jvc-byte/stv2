import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { tx_id, status } = await request.json();

        if (!tx_id || !status) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get transaction details including buyer's email
        const transactionResult = await pool.query(
            'SELECT item_name, initiator_email FROM transaction_details WHERE transaction_hash = $1',
            [tx_id]
        );

        if (transactionResult.rowCount === 0) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
            );
        }

        const transaction = transactionResult.rows[0];
        const { item_name: itemName, initiator_email: email } = transaction;

        if (!email) {
            return NextResponse.json(
                { error: 'Buyer email not found' },
                { status: 400 }
            );
        }

        let subject, body;

        switch (status) {
            case '2': // Seller Approved
                subject = 'Transaction Approved - Make Payment';
                body = `
                    Dear Customer,

                    The seller has approved your transaction for "${itemName}". 
                    Please proceed to make the payment through the escrow system.

                    Transaction ID: ${tx_id}
                    Item: ${itemName}

                    Regards,
                    SealedTrust Team
                `;
                break;

            case '11': // Seller Declined
                subject = 'Transaction Declined - Start New Escrow';
                body = `
                    Dear Customer,

                    The seller has declined your transaction for "${itemName}".
                    Please start a new escrow if you wish to continue with this transaction.

                    Transaction ID: ${tx_id}
                    Item: ${itemName}

                    Regards,
                    SealedTrust Team
                `;
                break;

            case '16': // Awaiting Modification
                subject = 'Transaction Modifications Required';
                body = `
                    Dear Customer,

                    The seller has requested modifications for your transaction "${itemName}".
                    Please check the transaction details and make the necessary adjustments.

                    Transaction ID: ${tx_id}
                    Item: ${itemName}

                    Regards,
                    SealedTrust Team
                `;
                break;

            default:
                return NextResponse.json(
                    { error: 'Invalid status for notification' },
                    { status: 400 }
                );
        }

        // Send email using fetch instead of importing the route handler
        try {
            const emailResponse = await fetch(new URL('/api/email/txStatus', request.url).toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject,
                    body
                }),
            });

            if (!emailResponse.ok) {
                const errorData = await emailResponse.json();
                console.error('Email service error:', errorData);
                return NextResponse.json(
                    { error: 'Failed to send email', details: errorData },
                    { status: 500 }
                );
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return NextResponse.json(
                { error: 'Failed to send email', details: emailError },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Notification sent successfully'
        });

    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json(
            { error: 'Failed to send notification' },
            { status: 500 }
        );
    }
}