'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '../i18n/LocaleProvider';

export default function InvestorsFloatingButton() {
  const t = useTranslations('nav');
  const label = t('investorsCta') as string;
  return (
    <Link
      href="/mrv/report"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={label}
    >
      <div className="relative">
        <div className="absolute -top-10 right-0 whitespace-nowrap bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          {label}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-gray-900 rotate-45 transform origin-center" />
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-emerald-500/50">
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
      </div>
    </Link>
  );
}
