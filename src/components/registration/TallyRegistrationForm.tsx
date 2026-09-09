"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    Tally: {
      loadEmbeds: () => void;
    };
  }
}

interface TallyRegistrationFormProps {
  accessCode: string;
}

export default function TallyRegistrationForm({ accessCode }: TallyRegistrationFormProps) {
  useEffect(() => {
    // Load Tally script if not already loaded
    const loadTallyScript = () => {
      if (typeof window !== 'undefined' && !document.querySelector('script[src*="tally.so/widgets/embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = () => {
          if (window.Tally) {
            window.Tally.loadEmbeds();
          }
        };
        document.head.appendChild(script);
      } else if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    // Load script after component mounts
    const timer = setTimeout(loadTallyScript, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
      <div className="text-start mb-8">
        <h2 className="text-3xl font-bold text-lisma-text">
          <span className="block">Pendaftaran Anggota Baru</span>
          <span className="block mt-2 text-2xl font-semibold text-lisma">LISMA UNPAS 2026</span>
        </h2>
      </div>

      <div >
        <iframe
          data-tally-src={`https://tally.so/embed/woqJyM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&kode=${encodeURIComponent(accessCode)}`}
          loading="lazy"
          width="100%"
          height="1086"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="PENDAFTARAN ANGGOTA LISMA UNPAS"
          className="w-full"
        />
      </div>
    </div>
  );
}
