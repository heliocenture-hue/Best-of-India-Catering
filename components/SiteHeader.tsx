'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';
import LanguageSwitcher from './LanguageSwitcher';
import { trackEvent } from '@/lib/analytics';

interface SiteHeaderProps {
  lang: Language;
}

export default function SiteHeader({ lang }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.about, href: '#about' },
    { label: t.occasions, href: '#occasions' },
    { label: t.menu, href: '#menu' },
    { label: t.whyUs, href: '#why-us' },
    { label: t.contact, href: '#contact' },
  ];

  const handleCtaClick = () => {
    trackEvent('cta_get_quote', {
      cta_location: 'header',
      language: lang,
    });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-[#F8F4EC]/95 backdrop-blur-md shadow-sm border-b border-[#1D1D19]/10 py-3'
          : 'bg-[#F8F4EC] border-b border-[#1D1D19]/5 py-4'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Brand Logo */}
          <Link
            href={BRAND_CONFIG.routes[lang].landing}
            className="flex items-center shrink-0 group focus:outline-none focus:ring-2 focus:ring-[#F15A34] rounded-md p-1"
            aria-label={`${BRAND_CONFIG.name} - Home`}
          >
            <div
              className="relative h-11 w-36 sm:h-12 sm:w-44 md:h-14 md:w-52 transition-transform duration-200 group-hover:scale-[1.02]"
              style={{ position: 'relative', height: '56px', width: '208px', maxWidth: '100%' }}
            >
              <Image
                src="/images/boi-logo.png"
                alt="Best of India — Restaurant Indien & Traiteur Paris"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Desktop Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#1D1D19] hover:text-[#F15A34] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#F15A34] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions: Language Switcher & Quote CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <LanguageSwitcher currentLang={lang} variant="header" />

            <a
              href="#hero-form"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#F15A34] text-white text-sm font-semibold tracking-wide shadow-sm hover:bg-[#d84520] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              {t.ctaQuote}
            </a>
          </div>

          {/* Mobile Right Controls: Lang toggle + Hamburger */}
          <div className="flex sm:hidden items-center space-x-2">
            <LanguageSwitcher currentLang={lang} variant="header" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1D1D19] hover:bg-[#F2EBDD] focus:outline-none focus:ring-2 focus:ring-[#F15A34]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? t.closeMenuAria : t.openMenuAria}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[65px] bg-[#F8F4EC] border-b border-[#1D1D19]/15 shadow-xl px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200 z-40">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1D1D19] py-2 border-b border-[#1D1D19]/5 hover:text-[#F15A34] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="#hero-form"
                onClick={handleCtaClick}
                className="w-full flex items-center justify-center px-5 py-3 rounded-lg bg-[#F15A34] text-white font-semibold text-center shadow-md hover:bg-[#d84520]"
              >
                {t.ctaQuote}
              </a>
              <a
                href={`tel:${BRAND_CONFIG.phoneTel}`}
                onClick={() => trackEvent('click_to_call', { source_location: 'mobile_nav' })}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#4D5720] text-white font-medium text-center"
              >
                <Phone className="w-4 h-4 text-[#FFC451]" />
                <span>{BRAND_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

