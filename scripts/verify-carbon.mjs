// Verifikasi src/lib/mrv/carbon.ts terhadap nilai di workbook (sheet "Graph", kolom K–O).
// Jalankan: node scripts/verify-carbon.mjs   (Node ≥ 22.18 / 24, type stripping bawaan)
import assert from 'node:assert/strict';
import {
  MONTHLY_ABATEMENT,
  abatementTotals,
  ENTERIC_REDUCTION_T_PER_CATTLE_DAY,
  OFFTAKE_SEQ_T_PER_KG,
} from '../src/lib/mrv/carbon.ts';

const EPS = 1e-6;
const close = (actual, expected, what) =>
  assert.ok(Math.abs(actual - expected) < EPS, `${what}: got ${actual}, expected ${expected}`);

// Parameter turunan
close(ENTERIC_REDUCTION_T_PER_CATTLE_DAY, 0.001131506849, 'ER per cattle-day (EF 25!C11)');
close(OFFTAKE_SEQ_T_PER_KG, 0.001174536058, 'Seq per kg offtake (RM Offtake C-Seq!C13)');

// Sheet "Graph" K4:N16 — [enteric, rawMaterial, carbonBank]
const graph = {
  '2025-06': [0, 0, 178.3953016],
  '2025-07': [0, 0, 0],
  '2025-08': [0.2608751902587519, 0, 0],
  '2025-09': [0.9800106544901066, 0, 0],
  '2025-10': [0.13955251141552513, 0, 1.67],
  '2025-11': [3.4624109589041097, 0, 0],
  '2025-12': [3.055068493150685, 0, 0],
  '2026-01': [3.0456392694063927, 0, 0],
  '2026-02': [0.20744292237442924, 0, 0],
  '2026-03': [3.0644977168949774, 0, 0],
  '2026-04': [5.921552511, 0, 0],
  '2026-05': [0, 29.53958187, 0],
  '2026-06': [0, 0, 33.24409843],
};

for (const [month, [enteric, rawMaterial, carbonBank]] of Object.entries(graph)) {
  const row = MONTHLY_ABATEMENT.find((r) => r.month === month);
  assert.ok(row, `missing month ${month}`);
  close(row.enteric, enteric, `${month} enteric`);
  close(row.rawMaterial, rawMaterial, `${month} rawMaterial`);
  close(row.carbonBank, carbonBank, `${month} carbonBank`);
}

const graphTotals = abatementTotals('2026-06');
close(graphTotals.enteric, 20.13705023, 'Graph!L17 enteric total');
close(graphTotals.rawMaterial, 29.53958187, 'Graph!M17 raw material total');
close(graphTotals.carbonBank, 213.3094, 'Graph!N17 carbon bank total');
close(graphTotals.total, 262.9860321, 'Graph!O16 total abatement');

const all = abatementTotals();
console.log('OK — matches workbook "Graph" sheet through 2026-06.');
console.log(
  `All data (${all.fromMonth} → ${all.toMonth}): enteric ${all.enteric.toFixed(3)} + raw material ${all.rawMaterial.toFixed(3)} + carbon bank ${all.carbonBank.toFixed(3)} = ${all.total.toFixed(3)} tCO2e (USD ${all.valueUsd.toFixed(2)})`,
);
