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