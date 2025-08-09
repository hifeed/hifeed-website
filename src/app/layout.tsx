import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HiFeed - Sustainable Cattle Farming Revolution",
  description: "Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-800 font-sans">
        {children}
      </body>
    </html>
  );
}
