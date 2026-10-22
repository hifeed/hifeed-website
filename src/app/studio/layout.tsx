import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HiFeed CMS',
  robots: { index: false, follow: false },
};

// Root layout sendiri (root app/layout.tsx hanya pass-through).
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
