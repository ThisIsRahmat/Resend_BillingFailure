import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import BillingFailure from '../../components/email/BillingFailure';  // Updated path

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, amount, invoiceId, dueDate, paymentLink, toEmail } = await request.json();

    // Validate required fields
    if (!name || !amount || !invoiceId || !dueDate || !paymentLink || !toEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Billing Failure Email Resend Challenge <billing@thisisrahmat.com>',
      to: [toEmail],
      subject: `Payment Failed - Invoice #${invoiceId}`,
      react: BillingFailure({
        name,
        amount,
        invoiceId,
        dueDate,
        paymentLink,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}