import ReportPageClient from './ReportPageClient';

export const metadata = {
  title: 'Extract Report | HiFeed MRV',
  description: 'Download a fully-detailed MRV report — methodology, formulas, calculations, results and audit trail — as a PDF for investor review.',
};

export default function ExtractReportPage() {
  return <ReportPageClient />;
}
