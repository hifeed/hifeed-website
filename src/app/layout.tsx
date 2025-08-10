import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "../i18n/LocaleProvider";
import { headers, cookies } from "next/headers";

export const metadata: Metadata = {
  title: "HiFeed - Sustainable Cattle Farming Revolution",
  description:
    "Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Baca preferensi dari cookie (jika ada) atau deteksi negara dari header Vercel.
  const cookieStore = await cookies();
  const saved = cookieStore.get("locale")?.value as "en" | "id" | undefined;
  const h = await headers();
  const country = (h.get("x-vercel-ip-country") || h.get("x-country") || "").toUpperCase();
  const initialLocale: "en" | "id" = saved ?? (country === "ID" ? "id" : "en");

  return (
    <html lang={initialLocale} className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="bg-white text-gray-800 font-sans overflow-x-hidden">
        <LocaleProvider initialLocale={initialLocale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
