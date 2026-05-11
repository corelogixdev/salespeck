import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Salespeck - Modern Desktop Solutions",
  description: "Advanced electron-based desktop features and tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased`}>
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="text-xl font-bold tracking-tight text-primary">SALESPECK</div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#" className="hover:text-primary transition-colors">Features</a>
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </nav>
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
              Download
            </button>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-text-muted">© 2026 Salespeck. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
