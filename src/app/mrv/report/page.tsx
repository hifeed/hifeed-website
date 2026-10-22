import ReportPageClient from './ReportPageClient';

export const metadata = {
  title: 'Carbon Abatement Report | HiFeed MRV',
  description: 'Download HiFeed’s carbon abatement report — enteric fermentation reduction, raw material offtake and carbon bank sequestration — as a PDF.',
};

export default function ExtractReportPage() {
  return <ReportPageClient />;
}
