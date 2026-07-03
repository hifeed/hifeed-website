'use client';

import React from 'react';
import { Users } from 'lucide-react';
import FarmPartnersTable from '@/components/mrv/FarmPartnersTable';

export default function PartnersPage() {
  return (
    <>
      <div className="bg-white border-b border-gray-100 px-6 lg:px-10 py-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Farm Partners</h1>
            <p className="mt-1 text-sm text-gray-500">Track feed distribution volumes and estimated CO₂e reductions across your partner network.</p>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8">
        <FarmPartnersTable />
      </div>
    </>
  );
}
