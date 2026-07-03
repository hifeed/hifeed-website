import React from 'react';
import Sidebar from '@/components/mrv/Sidebar';

export const metadata = {
  title: 'MRV System | HiFeed',
  description: 'Measurement, Reporting, and Verification system for HiFeed',
};

export default function MRVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
