import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Salespeck - Premium POS Software in Pakistan",
  description: "Smart business growth with the best POS software in Pakistan. FBR integrated, inventory management, and multi-store sync.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased selection:bg-primary/30`}>
        <header className="border-b border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
            <div className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform duration-300">
                S
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
                SALESPECK
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-primary transition-all relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
              <a href="#" className="hover:text-primary transition-all relative group">
                Industries
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
              <a href="#" className="hover:text-primary transition-all relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
              <a href="#" className="hover:text-primary transition-all relative group">
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            </nav>
            <div className="flex items-center gap-6">
              <button className="hidden sm:block text-xs font-black tracking-widest hover:text-primary transition-colors uppercase">LOGIN</button>
              <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-3.5 rounded-full text-xs font-black tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl uppercase">
                FREE DEMO
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-slate-950 text-slate-400 py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-black tracking-tighter text-white mb-8">SALESPECK</div>
              <p className="max-w-md mb-10 text-lg leading-relaxed">
                The ultimate retail intelligence platform. Transform your sales data into actionable growth strategies with Pakistan's most trusted POS.
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">FB</div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">IN</div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">TW</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-xs">Solutions</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">Retail POS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Restaurant POS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pharmacy POS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Inventory Cloud</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-xs">Headquarters</h4>
              <ul className="space-y-6 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 text-primary">📍</div>
                  <span>
                    Office 5, Third Floor, Leeds Center<br />
                    Main Boulevard, Gulberg 3<br />
                    Lahore, Pakistan
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 text-primary">📞</div>
                  <span className="text-lg font-bold text-white">0320 9492059</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 text-primary">✉️</div>
                  <span>hello@salespeck.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs tracking-widest uppercase font-bold">
            <p>© 2026 Salespeck Intelligence. All rights reserved.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Terms</a>
               <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/923000000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center group"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.661 1.436h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap ml-0 group-hover:ml-2 font-bold text-sm">
            Chat with us
          </span>
        </a>
      </body>
    </html>
  );
}
