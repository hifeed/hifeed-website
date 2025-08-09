import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "../i18n/LocaleProvider";

export const metadata: Metadata = {
  title: "HiFeed - Sustainable Cattle Farming Revolution",
  description:
    "Transform your cattle operation with HiFeed's revolutionary complete feed pellets. Reduce emissions by 50%, cut costs by 30%, and lead the sustainable farming revolution.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Default to English; we will let client code switch to ID based on IP.
  const initialLocale = "en" as const;
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="bg-white text-gray-800 font-sans">
        <LocaleProvider initialLocale={initialLocale}>
          {/* Simple client-side IP-based locale detection */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (async function(){
                  try {
                    if (localStorage.getItem('locale')) return; // honor saved choice
                    const res = await fetch('https://ipapi.co/json/');
                    const data = await res.json();
                    const country = (data && data.country) || '';
                    const isID = country === 'ID';
                    const html = document.documentElement;
                    if (isID) {
                      localStorage.setItem('locale','id');
                      html.lang = 'id';
                    } else {
                      localStorage.setItem('locale','en');
                      html.lang = 'en';
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
