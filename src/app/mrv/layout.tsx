import React from 'react';
import type { Metadata } from 'next';
import Sidebar from '@/components/mrv/Sidebar';
import Analytics from '@/components/Analytics';
import { siteUrl } from '@/i18n/config';
import { CarbonProvider } from '@/components/mrv/CarbonProvider';
import { getCarbonData } from '@/sanity/content';

export const metadata: Metadata = {
  title: 'MRV System | HiFeed',
  description: 'Measurement, Reporting, and Verification system for HiFeed',
  metadataBase: new URL(siteUrl),
  // Dashboard internal/investor: tidak untuk diindeks mesin pencari.
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
            {children}
            <footer className="px-6 lg:px-10 py-6 text-[11px] text-gray-400 border-t border-gray-100">
              Source: HiFeed carbon accounting ({carbonData.source.label}, updated {carbonData.source.updated}).
              Figures have not yet been verified by a third party.
            </footer>
          </main>
        </div>
        </CarbonProvider>
      </body>
    </html>
  );
}
