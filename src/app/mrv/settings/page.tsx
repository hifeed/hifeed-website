'use client';

import React from 'react';
import { Settings, Construction } from 'lucide-react';

export default function SettingsPage() {
  return (
    <>
      <div className="bg-white border-b border-gray-100 px-6 lg:px-10 py-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Platform configuration, IoT sensor integration, and account management.</p>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Module Under Development</h2>
        <p className="mt-2 text-gray-500 max-w-md">
          The MRV platform settings module, including IoT sensor integration and partner management tools, is currently under development.
        </p>
      </div>
    </>
  );
}
