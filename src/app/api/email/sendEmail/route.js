// src/app/api/email/sendEmail/route.js
import { NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';
import template from '../templates/transaction-email.js'; // Import the precompiled template

// Configure the email transporter
const transporter = createTransport({
  service: 'gmail', // or your specific email service
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_APP_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { email, transactionDetails } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Render the email template with transaction data
    const htmlContent = template(transactionDetails);

    // Set up email options
    const mailOptions = {
      from: `"SealedTrust" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: `Urgent: Please Confirm Transaction For ${transactionDetails.escrowTitle || 'New Escrow'}`,
      html: htmlContent,
      // You can add attachments here if needed
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}