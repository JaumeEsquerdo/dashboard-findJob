import type { Metadata } from "next";
import { Ubuntu, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular y Bold
  variable: "--font-ubuntu",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"], // Normalmente monospace no necesita bold
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "App Dashboard de búsqueda de empleo tech",
  description: "App para encontrar empleos y ver las métricas principales del sector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${ubuntu.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
