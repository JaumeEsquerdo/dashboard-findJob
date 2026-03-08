import type { Metadata } from "next";
import { Ubuntu, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { DarkModeProvider } from "../context/DarkModeContext";
import { HelperProvider } from "../context/HelperContext";
import { ScrollProvider } from "../context/ScrollContext";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular y Bold
  variable: "--font-ubuntu",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});


export const metadata: Metadata = {
  title: "App Dashboard de búsqueda de empleo tech",
  description: "App para encontrar empleos y ver las métricas principales del sector.",

  authors: [{ name: "Jaume Esquerdo" }],
  creator: "Jaume",

  keywords: [
    "empleo tech",
    "dashboard empleo",
    "tech jobs",
    "developer jobs",
    "job analytics"
  ],

  openGraph: {
    title: "Dashboard de empleo tech",
    description: "Analiza métricas del mercado laboral tech.",
    type: "website",
    url: 'https://find-job-dashboard.vercel.app/',
    locale: "es_ES",
  },

  icons: {
    icon: "/favicon-findJob.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ubuntu.variable} ${manrope.variable}`}>
      <body
        className={`p-4 flex flex-col h-screen overflow-auto gap-6 bg-background font-sans antialiased lg:flex-row`}
      >
        <HelperProvider>
          <ScrollProvider>
            <DarkModeProvider>
              <Navbar />
              {children}
            </DarkModeProvider>
          </ScrollProvider>
        </HelperProvider>
      </body>
    </html>
  );
}
