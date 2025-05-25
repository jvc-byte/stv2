import { NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

// Configure the email transporter
const transporter = createTransport({
  service: 'gmail', // or your specific email service
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
    try {
        const { to, subject, body } = await request.json();

        if (!to || !subject || !body) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || 'SealedTrust <noreply@sealedtrust.com>',
            to,
            subject,
            text: body.replace(/<[^>]*>?/gm, ''),
            html: body
        });

        console.log('Message sent: %s', info.messageId);
        return NextResponse.json({
            success: true,
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
