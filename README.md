# Billing Failure Email with React Email and Resend

This tutorial guides you through creating and sending automated billing failure emails using React Email and Resend. 

## Prerequisites

Before starting, ensure you have:
- Node.js installed (v16 or later)
- A Resend account ([Sign up here](https://resend.com))
- A verified domain in Resend
- Basic knowledge of React and Next.js

## Quick Start

1. Create a new Next.js project:
```bash
npx create-next-app@latest email-templates
cd email-templates
```

2. Install dependencies:
```bash
npm install resend @react-email/components
```

3. Set up environment variables:
```
# Create .env.local file
echo "RESEND_API_KEY=your_api_key_here" > .env
```

### 1. Create the Email Template

Create a BillingFailure component specifically for billing failure emails in  `components/email/BillingFailure.tsx`:

```
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface BillingFailureProps {
  name: string;
  amount: string;
  invoiceId: string;
  dueDate: string;
  paymentLink: string;
}

export const BillingFailure: React.FC<Readonly<BillingFailureProps>> = ({
  name,
  amount,
  invoiceId,
  dueDate,
  paymentLink,
}) => (
  <Html>
    <Head />
    <Preview>Action Required: Your payment of {amount} failed</Preview>
    <Body className="bg-gray-50 font-sans">
      <Container className="bg-white mx-auto p-8 max-w-xl rounded-lg shadow-sm">
        <Heading className="text-red-600 text-2xl font-bold mb-6">
          Payment Failed
        </Heading>
        <Text className="text-gray-700 text-base mb-4">
          Dear {name},
        </Text>
        <Text className="text-gray-700 text-base mb-6">
          We were unable to process your payment of {amount} for invoice #{invoiceId}. 
          To ensure uninterrupted service, please update your payment method before {dueDate}.
        </Text>
        <Link 
          href={paymentLink}
          className="bg-red-600 text-white py-3 px-6 rounded-md font-medium text-center block w-full hover:bg-red-700"
        >
          Update Payment Method
        </Link>
        <Hr className="border-t border-gray-200 my-6" />
        <Text className="text-gray-500 text-sm">
          If you believe this is an error or need assistance, please contact our support 
          team at support@example.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default BillingFailure;
```

### 2. Create the API Route

Create a `app/api/send/route.ts`and import the billing failure email you previously created and use the Resend SDK to send it:

```
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import BillingFailure from '../../components/email/BillingFailure';  

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    
    const { name, amount, invoiceId, dueDate, paymentLink, toEmail } = await request.json();

    
    if (!name || !amount || !invoiceId || !dueDate || !paymentLink || !toEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Billing Failure Challenge <hello@example.com>',
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
```



## Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT