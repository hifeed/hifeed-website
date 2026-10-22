import { defineArrayMember, defineField, defineType } from 'sanity';

// Data MRV yang dipakai dashboard /mrv. Rumus perhitungan ada di src/lib/mrv/carbon.ts;
// di sini hanya input & parameter. Field yang dikosongkan memakai nilai workbook.

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;
const monthField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'string',
    description: description ?? 'Format YYYY-MM, mis. 2026-07.',
    validation: (rule) => rule.required().regex(MONTH, { name: 'YYYY-MM' }),
  });
const num = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'number', description, validation: (rule) => rule.min(0) });

export const carbonAccounting = defineType({
  name: 'carbonAccounting',
  title: 'Carbon accounting',
  type: 'document',
  groups: [
    { name: 'enteric', title: 'Enteric fermentation', default: true },
    { name: 'rawMaterial', title: 'Raw material offtake' },
    { name: 'carbonBank', title: 'Carbon banks' },
    { name: 'general', title: 'General & credits' },
  ],
  fields: [
    // ── 1. Enteric ─────────────────────────────────────────────
    defineField({
      name: 'feedDistribution',
      title: 'Feed distribution per month (kg)',
      description: 'Satu baris per bulan. Kosongkan produk yang tidak didistribusikan.',
      type: 'array',
      group: 'enteric',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feedMonth',
          fields: [
            monthField('month', 'Month'),
            num('indigofera', 'Indigofera silage / hay / mesh (kg)'),
            num('greenConcentrate', 'Green Concentrate (kg)'),
            num('completeFeedPellets', 'Complete Feed Pellets (kg)'),
          ],
          preview: {
            select: { month: 'month', a: 'indigofera', b: 'greenConcentrate', c: 'completeFeedPellets' },
            prepare: ({ month, a, b, c }: Record<string, number | string | undefined>) => ({
              title: String(month ?? '—'),
              subtitle: `Indigofera ${a ?? 0} · GC ${b ?? 0} · Pellets ${c ?? 0} kg`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'entericParams',
      title: 'Enteric parameters',
      type: 'object',
      group: 'enteric',
      options: { collapsible: true, collapsed: true },
      fields: [
        num('bodyWeightKg', 'Reference body weight (kg)'),
        num('dmiIndigofera', 'DMI Indigofera (fraction of BW/day)', 'mis. 0.03 = 3%'),
        num('dmiGreenConcentrate', 'DMI Green Concentrate (fraction of BW/day)', 'mis. 0.01 = 1%'),
        num('dmiCompleteFeedPellets', 'DMI Complete Feed Pellets (fraction of BW/day)', 'mis. 0.025 = 2.5%'),
        num('baselineEfTPerCattleYear', 'Baseline EF (tCO₂e/cattle/year)', 'FAO GLEAM SE Asia: 1.01'),
        num('projectEfTPerCattleYear', 'Project EF (tCO₂e/cattle/year)', 'Formula pakan saat ini: 0.597'),
      ],
    }),

    // ── 2. Raw material offtake ────────────────────────────────
    defineField({
      name: 'offtakeProcurement',
      title: 'Indigofera offtake procurement',
      type: 'array',
      group: 'rawMaterial',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'offtakeEntry',
          fields: [
            defineField({ name: 'periodLabel', title: 'Period', type: 'string', description: 'mis. "Jan 2025"' }),
            num('kg', 'Offtake (kg)'),
          ],
          preview: {
            select: { title: 'periodLabel', kg: 'kg' },
            prepare: ({ title, kg }: { title?: string; kg?: number }) => ({ title: title ?? '—', subtitle: `${kg ?? 0} kg` }),
          },
        }),
      ],
    }),
    monthField('offtakeRecognitionMonth', 'Recognition month', 'Bulan sekuestrasi offtake dibukukan (YYYY-MM).'),
    defineField({
      name: 'rawMaterialParams',
      title: 'Raw material parameters',
      type: 'object',
      group: 'rawMaterial',
      options: { collapsible: true, collapsed: true },
      fields: [
        num('freshYieldTPerHarvest', 'Fresh yield per harvest (t)'),
        num('harvestsPerYear', 'Harvests per year'),
        num('dryMatterFraction', 'Dry matter fraction', 'mis. 0.33'),
        num('dryingSpoilageFraction', 'Drying spoilage fraction', 'mis. 0.14'),
        num('plantationSeqTPerHaYear', 'Plantation sequestration (tCO₂e/ha/year)'),
      ],
    }),

    // ── 3. Carbon banks ────────────────────────────────────────
    defineField({
      name: 'carbonBankStations',
      title: 'Carbon bank stations',
      description: 'Sekuestrasi = selisih stok antar pengukuran berurutan, dibukukan di bulan pengukuran berikutnya.',
      type: 'array',
      group: 'carbonBank',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'carbonBankStation',
          fields: [
            defineField({ name: 'code', title: 'Station code', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            num('areaHa', 'Area (ha)'),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({
              name: 'measurements',
              title: 'Measurements',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'stockMeasurement',
                  fields: [
                    monthField('month', 'Month'),
                    num('stockT', 'Total carbon stock (tCO₂e)'),
                    defineField({ name: 'note', title: 'Note', type: 'string' }),
                  ],
                  preview: {
                    select: { month: 'month', stockT: 'stockT', note: 'note' },
                    prepare: ({ month, stockT, note }: Record<string, string | number | undefined>) => ({
                      title: `${month ?? '—'} · ${stockT ?? 0} tCO₂e`,
                      subtitle: note ? String(note) : undefined,
                    }),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { code: 'code', name: 'name', areaHa: 'areaHa' },
            prepare: ({ code, name, areaHa }: Record<string, string | number | undefined>) => ({
              title: [code, name !== code ? name : undefined].filter(Boolean).join(' · '),
              subtitle: `${areaHa ?? 0} ha`,
            }),
          },
        }),
      ],
    }),

    // ── General ────────────────────────────────────────────────
    defineField({ name: 'sourceLabel', title: 'Data source', type: 'string', group: 'general', description: 'mis. nama file workbook.' }),
    defineField({ name: 'updatedLabel', title: 'Last updated (label)', type: 'string', group: 'general', description: 'Ditampilkan di banner & sidebar, mis. "July 2026".' }),
    num('vcmPriceUsdPerT', 'Carbon price (USD per tCO₂e)', 'Untuk estimasi nilai. Workbook: 3.66 (Indonesia VCM 2024 avg).'),
    defineField({
      name: 'creditStatus',
      title: 'Credit status (tCO₂e)',
      description: 'Kosongkan bila belum ada — ditampilkan sebagai "Not yet recorded".',
      type: 'object',
      group: 'general',
      fields: [num('verifiedT', 'Verified'), num('pendingT', 'Pending audit'), num('retiredT', 'Sold / retired')],
    }),
  ].map((field) =>
    field.name === 'offtakeRecognitionMonth' ? { ...field, group: 'rawMaterial' }
    : field.name === 'vcmPriceUsdPerT' ? { ...field, group: 'general' }
    : field,
  ),
  preview: { prepare: () => ({ title: 'Carbon accounting' }) },
});
