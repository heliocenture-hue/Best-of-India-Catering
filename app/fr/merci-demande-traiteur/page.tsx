import type { Metadata } from 'next';
import ThankYouView from '@/components/ThankYouView';

export const metadata: Metadata = {
  title: 'Merci pour votre demande traiteur | Best of India Paris',
  description: 'Votre demande de devis traiteur indien a bien été transmise à notre équipe.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FrenchThankYouPage() {
  return <ThankYouView lang="fr" />;
}

