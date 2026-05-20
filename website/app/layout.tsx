import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Mail, Menu, X } from "lucide-react";
import { Logo, LogoIcon } from "../components/logo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Salespeck — POS, Orders & WhatsApp Automation",
  description:
    "Online and offline POS for multiple branches and systems. Order processing and WhatsApp AI communication automation for retail.",
};

const navLinks = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#features", label: "Features" },
  { href: "#who", label: "Who it's for" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Questions" },
  { href: "#contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen flex flex-col font-sans bg-white text-slate-900`}
      >
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
          <div className="container-pro h-16 flex items-center justify-between">
            <a href="#" aria-label="Salespeck home">
              <Logo size={38} />
            </a>

            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@salespeck.com"
                className="hidden md:block nav-link"
              >
                hello@salespeck.com
              </a>
              <a href="#contact" className="btn-primary text-xs sm:text-sm">
                Get in touch
              </a>

              <details className="lg:hidden relative group">
                <summary className="list-none cursor-pointer p-2 rounded-md border border-slate-200 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                  <Menu className="w-5 h-5 text-slate-700 group-open:hidden" />
                  <X className="w-5 h-5 text-slate-700 hidden group-open:block" />
                </summary>
                <div className="absolute right-0 top-full mt-2 w-52 rounded-lg bg-white border border-slate-200 shadow-lg py-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {link.label}
                    </a>
                  ))}
                  <hr className="my-2 border-slate-100" />
                  <a
                    href="mailto:hello@salespeck.com"
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Email us
                  </a>
                </div>
              </details>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer id="contact" className="bg-slate-900 text-slate-400">
          <div className="container-pro py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <LogoIcon size={32} />
                  <p className="text-lg font-semibold text-white">Salespeck</p>
                </div>
                <p className="text-sm leading-relaxed max-w-md mb-6">
                  Online and offline POS for multiple branches and counters,
                  with order processing and WhatsApp AI automation built in.
                </p>
                <p className="text-xs text-slate-500">A Corelogix product</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white mb-4">Contact</p>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary-light shrink-0" />
                    <a
                      href="mailto:hello@salespeck.com"
                      className="text-white hover:text-primary-light"
                    >
                      hello@salespeck.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/923209492059"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      WhatsApp support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500">
              © {new Date().getFullYear()} Salespeck
            </div>
          </div>
        </footer>

        <a
          href="https://wa.me/923209492059"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 bg-[#128C7E] text-white px-4 py-3 rounded-lg shadow-md hover:bg-[#0d7368] transition-colors text-sm font-medium"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.661 1.436h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </body>
    </html>
  );
}
