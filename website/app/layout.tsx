import React from "react";
import "./globals.css";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { Mail, Menu, X } from "lucide-react";
import { Logo, LogoIcon } from "../components/logo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "SalesPeck — Desktop POS for shops that need to keep selling",
  description:
    "Windows desktop POS with stock, sales, returns, purchases, accounting, and licensed staff seats. Offline-first. Cloud sync and WhatsApp automation on the roadmap.",
};

const navLinks = [
  { href: "#product", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#support", label: "Support" },
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
        className={`${outfit.variable} ${sourceSans.variable} flex min-h-screen flex-col font-sans text-text antialiased`}
      >
        <header className="site-header">
          <div className="container-pro flex h-16 items-center justify-between">
            <a href="#" aria-label="SalesPeck home">
              <Logo size={36} />
            </a>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a href="mailto:hello@salespeck.com" className="btn-ghost hidden md:inline-flex">
                <Mail className="h-4 w-4" />
                hello@salespeck.com
              </a>
              <a href="#contact" className="btn-primary px-4 py-2.5 text-xs sm:text-sm">
                Get a quote
              </a>

              <details className="group relative lg:hidden">
                <summary className="list-none cursor-pointer rounded-lg border border-border p-2 hover:bg-surface [&::-webkit-details-marker]:hidden">
                  <Menu className="h-5 w-5 text-text group-open:hidden" />
                  <X className="hidden h-5 w-5 text-text group-open:block" />
                </summary>
                <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-border bg-surface py-2 shadow-xl">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-text-muted hover:bg-surface-hover hover:text-text"
                    >
                      {link.label}
                    </a>
                  ))}
                  <hr className="my-2 border-border" />
                  <a
                    href="mailto:hello@salespeck.com"
                    className="block px-4 py-2.5 text-sm text-text-muted hover:bg-surface-hover hover:text-text"
                  >
                    Email us
                  </a>
                </div>
              </details>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer id="contact" className="border-t border-border bg-bg-elevated">
          <div className="container-pro py-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="mb-4 flex items-center gap-2.5">
                  <LogoIcon size={32} />
                  <p
                    className="text-lg font-semibold text-text"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    SalesPeck
                  </p>
                </div>
                <p className="mb-4 max-w-sm text-sm leading-relaxed text-text-muted">
                  Desktop POS for shops that need reliable billing, stock, and
                  accounting — with licensed seats and a clear path to cloud and
                  messaging tools.
                </p>
              </div>

              <div>
                <p className="mb-4 text-sm font-semibold text-text">Sales</p>
                <ul className="space-y-3 text-sm text-text-muted">
                  <li>
                    <a href="mailto:hello@salespeck.com" className="hover:text-primary-light">
                      hello@salespeck.com
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-primary-light">
                      Plans & seats
                    </a>
                  </li>
                  <li>
                    <a href="#product" className="hover:text-primary-light">
                      What ships today
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-4 text-sm font-semibold text-text">Support</p>
                <ul className="space-y-3 text-sm text-text-muted">
                  <li>
                    <a
                      href="https://wa.me/923209492059"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-light"
                    >
                      WhatsApp +92 320 9492059
                    </a>
                  </li>
                  <li>
                    <a href="#support" className="hover:text-primary-light">
                      Help & onboarding
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-primary-light">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} SalesPeck</span>
              <span>Windows desktop · Offline-first · Licensed seats</span>
            </div>
          </div>
        </footer>

        <a
          href="https://wa.me/923209492059?text=Hi%20SalesPeck%20—%20I%20need%20help%20with%20the%20POS"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-xl bg-[#128C7E] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/40 transition hover:bg-[#0d7368]"
          aria-label="WhatsApp support"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.661 1.436h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Support
        </a>
      </body>
    </html>
  );
}
