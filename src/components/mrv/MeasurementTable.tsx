import React from 'react';

const cattleData = [
  { id: 'HF-001', name: 'Brahman #1', weight: 450, intake: 12, methReduction: 180, maxMeth: 250, sequestration: 45, maxSeq: 70, totalCO2e: 225, status: 'optimal' as const },
  { id: 'HF-002', name: 'Ongole #4', weight: 480, intake: 13, methReduction: 195, maxMeth: 250, sequestration: 48, maxSeq: 70, totalCO2e: 243, status: 'optimal' as const },
  { id: 'HF-003', name: 'Limousin #2', weight: 420, intake: 11, methReduction: 165, maxMeth: 250, sequestration: 41, maxSeq: 70, totalCO2e: 206, status: 'optimal' as const },
  { id: 'HF-004', name: 'Simental #7', weight: 460, intake: 12, methReduction: 0, maxMeth: 250, sequestration: 0, maxSeq: 70, totalCO2e: 0, status: 'transition' as const },
  { id: 'HF-005', name: 'Brahman #3', weight: 495, intake: 14, methReduction: 210, maxMeth: 250, sequestration: 52, maxSeq: 70, totalCO2e: 262, status: 'optimal' as const },
  { id: 'HF-006', name: 'Ongole #9', weight: 430, intake: 11, methReduction: 170, maxMeth: 250, sequestration: 42, maxSeq: 70, totalCO2e: 212, status: 'optimal' as const },
];

const avatarColors: Record<string, string> = {
  'HF-001': 'bg-emerald-500',
  'HF-002': 'bg-blue-500',
  'HF-003': 'bg-violet-500',
  'HF-004': 'bg-amber-500',
  'HF-005': 'bg-rose-500',
  'HF-006': 'bg-teal-500',
};

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-10 text-right">{value}g</span>
    </div>
  );
}

export default function MeasurementTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Data Pengukuran Harian</h3>
          <p className="mt-1 text-sm text-gray-500">
            Pemantauan asupan pakan, reduksi metana enterik, dan sekuestrasi karbon per individu sapi.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-gray-500">Reduksi Metana</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-blue-500" />
            <span className="text-gray-500">Sekuestrasi</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Sapi</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Berat</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Asupan</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Reduksi Metana (CO2e)</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Sekuestrasi (CO2e)</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cattleData.map((cattle) => (
              <tr
                key={cattle.id}
                className={`transition-colors ${
                  cattle.status === 'transition'
                    ? 'bg-amber-50/40 hover:bg-amber-50/70'
                    : 'hover:bg-gray-50/80'
                }`}
              >
                {/* ID + Avatar */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${avatarColors[cattle.id] || 'bg-gray-400'} flex items-center justify-center`}>
                      <span className="text-white text-[10px] font-bold">{cattle.id.slice(-3)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{cattle.name}</p>
                      <p className="text-[11px] text-gray-400">{cattle.id}</p>
                    </div>
                  </div>
                </td>

                {/* Weight */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cattle.weight} kg</td>

                {/* Intake */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cattle.intake} kg/hr</td>

                {/* Methane Reduction with progress bar */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <ProgressBar value={cattle.methReduction} max={cattle.maxMeth} color="bg-emerald-500" />
                </td>

                {/* Sequestration with progress bar */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <ProgressBar value={cattle.sequestration} max={cattle.maxSeq} color="bg-blue-500" />
                </td>

                {/* Total */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-bold ${cattle.totalCO2e > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
                    {cattle.totalCO2e > 0 ? `${cattle.totalCO2e}g` : '—'}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {cattle.status === 'optimal' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      Optimal
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                      Transisi
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
