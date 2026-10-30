'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';

interface BackToTopProps {
  lang: Language;
}

export default function BackToTop({ lang }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const t = translations[lang].backToTop;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t.ariaLabel}
      className="fixed bottom-20 md:bottom-8 left-5 z-40 w-11 h-11 rounded-full bg-[#1D1D19]/80 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-[#1D1D19] active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F15A34]"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

