'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Language } from '@/lib/i18n/types';
import { trackEvent } from '@/lib/analytics';

interface LanguageSwitcherProps {
  currentLang: Language;
  variant?: 'header' | 'footer' | 'mobile';
}

export default function LanguageSwitcher({ currentLang, variant = 'header' }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageSwitch = (targetLang: Language) => {
    if (targetLang === currentLang) return;

    trackEvent('language_switch', {
      from: currentLang,
      to: targetLang,
    });

    // Determine target route
    const isThankYou = pathname.includes('merci') || pathname.includes('thank-you');
    let targetPath = '';

    if (targetLang === 'fr') {
      targetPath = isThankYou ? '/fr/merci-demande-traiteur' : '/fr/traiteur-indien-paris';
    } else {
      targetPath = isThankYou ? '/en/catering-thank-you' : '/en/indian-catering-paris';
    }

    // Preserve query parameters safely in client click handler
    const queryString = typeof window !== 'undefined' ? window.location.search : '';
    const fullUrl = queryString ? `${targetPath}${queryString}` : targetPath;

    // Set cookie preference for future visits
    document.cookie = `boi_lang=${targetLang}; path=/; max-age=31536000; SameSite=Lax`;

    router.push(fullUrl);
  };

  const isDark = variant === 'footer';

  return (
    <div
      className={`inline-flex items-center rounded-full p-1 border text-xs font-semibold tracking-wider transition-colors ${
        isDark
          ? 'bg-[#2B2B24] border-white/20 text-white'
          : 'bg-[#F2EBDD] border-[#1D1D19]/15 text-[#1D1D19]'
      }`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => handleLanguageSwitch('fr')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          currentLang === 'fr'
            ? 'bg-[#F15A34] text-white shadow-sm font-bold'
            : isDark
            ? 'text-white/70 hover:text-white'
            : 'text-[#64645E] hover:text-[#1D1D19]'
        }`}
        aria-pressed={currentLang === 'fr'}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => handleLanguageSwitch('en')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          currentLang === 'en'
            ? 'bg-[#F15A34] text-white shadow-sm font-bold'
            : isDark
            ? 'text-white/70 hover:text-white'
            : 'text-[#64645E] hover:text-[#1D1D19]'
        }`}
        aria-pressed={currentLang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
