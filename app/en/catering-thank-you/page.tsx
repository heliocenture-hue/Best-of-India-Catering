import type { Metadata } from 'next';
import ThankYouView from '@/components/ThankYouView';

export const metadata: Metadata = {
  title: 'Thank You for Your Catering Enquiry | Best of India Paris',
  description: 'Your Indian catering quotation enquiry has been submitted successfully.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function EnglishThankYouPage() {
  return <ThankYouView lang="en" />;
}

