'use client';

import { X } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { BRAND_CONFIG } from '@/lib/config';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'legal';
  lang: Language;
  onClose: () => void;
}

export default function LegalModal({ isOpen, type, lang, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-[#1D1D19]/10 text-[#1D1D19]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#64645E] hover:text-[#1D1D19] hover:bg-[#F2EBDD] transition-colors"
          aria-label="Fermer / Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 id="modal-title" className="text-xl sm:text-2xl font-bold mb-4">
          {isPrivacy
            ? lang === 'fr'
              ? 'Politique de confidentialité (RGPD)'
              : 'Privacy Policy (GDPR)'
            : lang === 'fr'
            ? 'Mentions Légales'
            : 'Legal Mentions'}
        </h3>

        <div className="text-sm text-[#64645E] space-y-4 leading-relaxed">
          {isPrivacy ? (
            lang === 'fr' ? (
              <>
                <p>
                  <strong>1. Responsable du traitement :</strong> {BRAND_CONFIG.name}, domicilié au{' '}
                  {BRAND_CONFIG.address}. Contact : {BRAND_CONFIG.email}.
                </p>
                <p>
                  <strong>2. Données collectées :</strong> Dans le cadre des demandes de devis traiteur,
                  nous collectons uniquement les données transmises volontairement : nom, numéro de
                  téléphone, adresse e-mail, type et date d'événement, nombre d'invités estimé et
                  souhaits culinaires.
                </p>
                <p>
                  <strong>3. Finalités :</strong> Vos données sont traitées exclusivement pour élaborer
                  votre devis traiteur et répondre à vos questions. Aucune donnée n'est commercialisée
                  ou cédée à des tiers.
                </p>
                <p>
                  <strong>4. Vos droits :</strong> Conformément au RGPD et à la loi Informatique et
                  Libertés, vous disposez d'un droit d'accès, de rectification et d'effacement de vos
                  données en nous écrivant à {BRAND_CONFIG.email}.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>1. Data Controller:</strong> {BRAND_CONFIG.name}, located at{' '}
                  {BRAND_CONFIG.address}. Contact: {BRAND_CONFIG.email}.
                </p>
                <p>
                  <strong>2. Collected Data:</strong> In connection with catering quotation requests,
                  we collect only information submitted voluntarily: full name, telephone, email
                  address, event type and date, guest count, and culinary requirements.
                </p>
                <p>
                  <strong>3. Purpose:</strong> Your information is processed exclusively to prepare
                  your catering proposal and communicate regarding your occasion. We never sell or
                  distribute your data to third parties.
                </p>
                <p>
                  <strong>4. Your Rights:</strong> In compliance with the GDPR, you retain the right
                  to access, rectify, or request deletion of your personal records at any time by
                  contacting {BRAND_CONFIG.email}.
                </p>
              </>
            )
          ) : lang === 'fr' ? (
            <>
              <p>
                <strong>Éditeur du site :</strong> {BRAND_CONFIG.name} — Restaurant Indien.
                <br />
                Adresse : {BRAND_CONFIG.address}.
                <br />
                Téléphone : {BRAND_CONFIG.phoneDisplay}.
                <br />
                E-mail : {BRAND_CONFIG.email}.
              </p>
              <p>
                <strong>Activité :</strong> Restauration traditionnelle indienne et service traiteur
                sur commande à Paris et région Île-de-France.
              </p>
              <p>
                <strong>Propriété intellectuelle :</strong> Le logo et les photographies officielles
                sont la propriété exclusive de Best of India. Toute reproduction sans accord préalable
                est interdite.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Publisher:</strong> {BRAND_CONFIG.name} — Indian Restaurant.
                <br />
                Address: {BRAND_CONFIG.address}.
                <br />
                Telephone: {BRAND_CONFIG.phoneDisplay}.
                <br />
                Email: {BRAND_CONFIG.email}.
              </p>
              <p>
                <strong>Activity:</strong> Authentic Indian restaurant and catering service upon
                request in Paris and Île-de-France.
              </p>
              <p>
                <strong>Intellectual Property:</strong> The official Best of India logo and photography
                are protected. Any reproduction without prior consent is prohibited.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#1D1D19]/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#4D5720] text-white text-xs font-bold hover:bg-[#3b4318] transition-colors"
          >
            {lang === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}

