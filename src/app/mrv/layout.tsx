import React from 'react';
import type { Metadata } from 'next';
import { TriangleAlert } from 'lucide-react';
import Sidebar from '@/components/mrv/Sidebar';
import Analytics from '@/components/Analytics';
import { siteUrl } from '@/i18n/config';
import { CarbonProvider } from '@/components/mrv/CarbonProvider';
import { getCarbonData } from '@/sanity/content';

export const metadata: Metadata = {
  title: 'MRV System | HiFeed',
  description: 'Measurement, Reporting, and Verification system for HiFeed',
  metadataBase: new URL(siteUrl),
  // Data masih prototype: jangan diindeks mesin pencari.
  robots: { index: false, follow: false },
};

export default async function MRVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const carbonData = await getCarbonData();
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-800 font-sans">
        <Analytics />
        <CarbonProvider data={carbonData}>
        <div className="flex h-screen bg-gray-50/50 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <div
              role="note"
              className="flex items-start gap-2 bg-amber-50 border-b border-amber-200 px-6 lg:px-10 py-2.5 text-xs sm:text-sm text-amber-900"
            >
              <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
              <p>
                <span className="font-semibold">Prototype.</span>{' '}
                Carbon abatement figures come from HiFeed&apos;s internal carbon accounting ({carbonData.source.updated}) and have not been verified by a third party.
                Farm partner, supply chain and report figures are still illustrative.
              </p>
            </div>
            {children}
          </main>
        </div>
        </CarbonProvider>
      </body>
    </html>
  );
}
