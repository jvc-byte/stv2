import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express, { json } from 'express';
import cors from 'cors';
import { createTransport } from 'nodemailer';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars'; // Import Handlebars

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load email template
const emailTemplatePath = join(__dirname, 'templates', 'transaction-email.html');
const emailTemplateSource = readFileSync(emailTemplatePath, 'utf8');
const emailTemplate = Handlebars.compile(emailTemplateSource); // Compile the template using Handlebars

// Configure the email transporter
const transporter = createTransport({
  service: 'gmail', // or your specific email service
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_APP_PASSWORD,
  },
});

const app = express();
app.use(cors());
app.use(json());

app.post('https://stv2.vercel.app/api/email/send-email', async (req, res) => {
  try {
    const { email, transactionDetails } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Render the email template with transaction data
    const htmlContent = emailTemplate(transactionDetails);

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
    
    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

const PORT = process.env.EMAIL_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});