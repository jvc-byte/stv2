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

        // Get transaction details including buyer's and seller's emails
        const transactionResult = await pool.query(
            'SELECT item_name, initiator_email, seller_email FROM transaction_details WHERE transaction_hash = $1',
            [tx_id]
        );

        if (transactionResult.rowCount === 0) {
            return NextResponse.json(
                { error: 'Transaction not found' },
                { status: 404 }
            );
        }

        const transaction = transactionResult.rows[0];
        const { item_name: itemName, initiator_email, seller_email } = transaction;

        // Determine recipient: seller for status 5, buyer for others
        let email;
        if (status === '5') {
            email = seller_email;
            if (!email) {
                return NextResponse.json(
                    { error: 'Seller email not found' },
                    { status: 400 }
                );
            }
        } else {
            email = initiator_email;
            if (!email) {
                return NextResponse.json(
                    { error: 'Buyer email not found' },
                    { status: 400 }
                );
            }
        }

        let subject, body;

        // Email templates with improved styling and formatting
        switch (status) {
            case '2': // Seller Approved
                subject = 'Transaction Approved - Make Payment';
                body = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; }
                            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
                            .content { padding: 20px; background-color: #f9f9f9; border: 1px solid #dddddd; }
                            .transaction-details { background-color: #ffffff; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0; }
                            .footer { font-size: 12px; text-align: center; padding: 10px; color: #666666; }
                            .button { background-color: #4CAF50; color: white; padding: 12px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px; margin: 20px 0; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>Transaction Approved</h2>
                        </div>
                        <div class="content">
                            <p>Dear Customer,</p>
                            
                            <p>Great news! The seller has approved your transaction for <strong>"${itemName}"</strong>.</p>
                            
                            <p>Your transaction is now ready for the next step. Please proceed to make the payment through our secure escrow system to continue with this transaction.</p>
                            
                            <div class="transaction-details">
                                <p><strong>Transaction ID:</strong> ${tx_id}</p>
                                <p><strong>Item:</strong> ${itemName}</p>
                            </div>
                            
                            <center>
                                <a href="https://stv2.vercel.app/dashboard/escrow-deposit?tx_id=${tx_id}" class="button">Make Payment Now</a>
                            </center>
                            
                            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                            
                            <p>Thank you for using SealedTrust!</p>
                            
                            <p>Best regards,<br>The SealedTrust Team</p>
                        </div>
                        <div class="footer">
                            <p> 2025 SealedTrust. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </body>
                    </html>
                `;
                break;

            case '11': // Seller Declined
                subject = 'Transaction Declined - Start New Escrow';
                body = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; }
                            .header { background-color: #f44336; color: white; padding: 20px; text-align: center; }
                            .content { padding: 20px; background-color: #f9f9f9; border: 1px solid #dddddd; }
                            .transaction-details { background-color: #ffffff; border-left: 4px solid #f44336; padding: 15px; margin: 20px 0; }
                            .footer { font-size: 12px; text-align: center; padding: 10px; color: #666666; }
                            .button { background-color: #2196F3; color: white; padding: 12px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px; margin: 20px 0; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>Transaction Declined</h2>
                        </div>
                        <div class="content">
                            <p>Dear Customer,</p>
                            
                            <p>We regret to inform you that the seller has declined your transaction for <strong>"${itemName}"</strong>.</p>
                            
                            <div class="transaction-details">
                                <p><strong>Transaction ID:</strong> ${tx_id}</p>
                                <p><strong>Item:</strong> ${itemName}</p>
                            </div>
                            
                            <p>If you still wish to proceed with this purchase, you may start a new escrow transaction with revised terms that might be more acceptable to the seller.</p>
                            
                            <center>
                                <a href="https://stv2.vercel.app/dashboard/create-escrow" class="button">Start New Escrow</a>
                            </center>
                            
                            <p>Our support team is available if you need any assistance or have questions about this decline.</p>
                            
                            <p>Thank you for your understanding and for choosing SealedTrust.</p>
                            
                            <p>Best regards,<br>The SealedTrust Team</p>
                        </div>
                        <div class="footer">
                            <p> 2025 SealedTrust. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </body>
                    </html>
                `;
                break;

            case '16': // Awaiting Modification
                subject = 'Transaction Modifications Required';
                body = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; }
                            .header { background-color: #FF9800; color: white; padding: 20px; text-align: center; }
                            .content { padding: 20px; background-color: #f9f9f9; border: 1px solid #dddddd; }
                            .transaction-details { background-color: #ffffff; border-left: 4px solid #FF9800; padding: 15px; margin: 20px 0; }
                            .footer { font-size: 12px; text-align: center; padding: 10px; color: #666666; }
                            .button { color: #666666; }
                            .button { background-color: #FF9800; color: white; padding: 12px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px; margin: 20px 0; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>Transaction Modifications Required</h2>
                        </div>
                        <div class="content">
                            <p>Dear Customer,</p>
                            
                            <p>The seller has requested some modifications for your transaction for <strong>"${itemName}"</strong>.</p>
                            
                            <p>Please review the transaction details and make the necessary adjustments to proceed with this escrow.</p>
                            
                            <div class="transaction-details">
                                <p><strong>Transaction ID:</strong> ${tx_id}</p>
                                <p><strong>Item:</strong> ${itemName}</p>
                            </div>
                            
                            <center>
                                <a href="https://stv2.vercel.app/dashboard/create-escrow" class="button">Review and Modify</a>
                            </center>
                            
                            <p>If you have any questions about the requested modifications, you can contact the seller through our messaging system or reach out to our support team for assistance.</p>
                            
                            <p>Thank you for your prompt attention to this matter.</p>
                            
                            <p>Best regards,<br>The SealedTrust Team</p>
                        </div>
                        <div class="footer">
                            <p> 2025 SealedTrust. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </body>
                    </html>
                `;
                break;

            case '5': // Payment Completed
                subject = 'Payment Completed - Please Deliver Product';
                body = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; }
                            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
                            .content { padding: 20px; background-color: #f9f9f9; border: 1px solid #dddddd; }
                            .transaction-details { background-color: #ffffff; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0; }
                            .footer { font-size: 12px; text-align: center; padding: 10px; color: #666666; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>Payment Completed</h2>
                        </div>
                        <div class="content">
                            <p>Dear Seller,</p>
                            <p>The buyer has successfully deposited funds into escrow for transaction <strong>${tx_id}</strong>.</p>
                            <p>Please proceed to deliver the product as soon as possible.</p>
                            <div class="transaction-details">
                                <p><strong>Transaction ID:</strong> ${tx_id}</p>
                            </div>
                            <p>If you have any questions, please contact support.</p>
                            <center>
                                <a href="https://stv2.vercel.app/dashboard/update-delivery-status?tx_id=${tx_id}" style="display:inline-block;background-color:#4CAF50;color:white;padding:12px 20px;text-decoration:none;border-radius:4px;margin:20px 0;font-weight:bold;">Update Delivery Status</a>
                            </center>
                            <p>Thank you for using SealedTrust!</p>
                            <p>Best regards,<br>The SealedTrust Team</p>
                        </div>
                        <div class="footer">
                            <p> 2025 SealedTrust. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </body>
                    </html>
                `;
                break;
        }

        // Send email using fetch
        try {
            const emailResponse = await fetch(new URL('/api/email/emailTxStatus', request.url).toString(), {
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