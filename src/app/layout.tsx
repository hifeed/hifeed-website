import "./globals.css";

// Root layout sengaja hanya meneruskan children: tag <html>/<body> dirender oleh
// app/[locale]/layout.tsx (situs publik, lang per bahasa) dan app/mrv/layout.tsx.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
