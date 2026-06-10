import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thavin G P | Software Developer & AI Engineering Student",
  description:
    "Premium personal portfolio of Thavin G P, a Software Developer and AI Engineering Student based in Tamil Nadu, India. Specializing in high-performance web applications and intelligent interfaces.",
  keywords: [
    "Thavin G P",
    "Thavin",
    "Portfolio",
    "AI Engineering",
    "Software Developer",
    "Tamil Nadu",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Thavin G P" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var systemPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var el = document.documentElement;
      el.classList.add('scroll-smooth');
      if (theme === 'light' || (!theme && !systemPrefers)) {
        el.classList.add('light');
        el.classList.remove('dark');
        el.style.colorScheme = 'light';
      } else {
        el.classList.add('dark');
        el.classList.remove('light');
        el.style.colorScheme = 'dark';
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <SmoothScrollProvider>
          <Navbar />
          <CustomCursor />
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
