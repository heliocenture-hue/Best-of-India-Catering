'use client';

import { useState } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { BRAND_CONFIG } from '@/lib/config';

interface LocationMapProps {
  lang: Language;
}

export default function LocationMap({ lang }: LocationMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#1D1D19]/10 flex flex-col">
      {/* Map header info */}
      <div className="p-4 sm:p-5 border-b border-[#1D1D19]/10 bg-[#F8F4EC] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#4D5720] text-[#FFC451] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1D1D19] leading-tight">
              Best of India — Paris 10e
            </h4>
            <p className="text-xs text-[#64645E]">
              170 Rue du Faubourg Saint-Denis, 75010 Paris
            </p>
          </div>
        </div>

        <a
          href={BRAND_CONFIG.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4D5720] text-white text-xs font-semibold hover:bg-[#3b4318] transition-colors shrink-0"
        >
          <Navigation className="w-3.5 h-3.5 text-[#FFC451]" />
          <span>{lang === 'fr' ? 'Itinéraire' : 'Directions'}</span>
          <ExternalLink className="w-3 h-3 text-white/70" />
        </a>
      </div>

      {/* Interactive Google Map iframe */}
      <div className="relative w-full h-[320px] sm:h-[360px] bg-[#E3DDD0]">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F2EBDD] text-[#64645E] text-xs">
            <span>{lang === 'fr' ? 'Chargement du plan...' : 'Loading map...'}</span>
          </div>
        )}
        <iframe
          src={BRAND_CONFIG.mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map — Best of India Paris"
          onLoad={() => setMapLoaded(true)}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

