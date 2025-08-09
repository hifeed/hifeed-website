import Link from 'next/link';
export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#16a34a' }}>
      <span>404 - Page Not Found</span>
        <Link href="/" style={{ marginTop: '1rem', color: '#2563eb', textDecoration: 'underline' }}>Kembali ke Beranda</Link>
    </div>
  );
}
