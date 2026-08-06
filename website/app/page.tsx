import React from "react";
import {
  Package,
  BarChart3,
  WifiOff,
  Cloud,
  Building2,
  Bot,
  ChevronRight,
  Check,
  Scissors,
  ShoppingBag,
  Users,
  KeyRound,
  Download,
  Headphones,
  Receipt,
  RotateCcw,
  BookOpen,
  Mail,
  Shield,
} from "lucide-react";

const shipsToday = [
  {
    icon: Receipt,
    title: "Point of sale",
    description: "Product and service sales, discounts, and printed receipts at the counter.",
  },
  {
    icon: Package,
    title: "Stock & purchases",
    description: "Products, batches, purchase invoices, and a clear stock ledger.",
  },
  {
    icon: RotateCcw,
    title: "Sales returns",
    description: "Return against an invoice with stock restored and books kept tidy.",
  },
  {
    icon: BookOpen,
    title: "Accounting basics",
    description: "Chart of accounts, expenses, cash closing, and party balances.",
  },
  {
    icon: Users,
    title: "Staff seats",
    description: "Branch manager plus cashiers — seat limits enforced by your license.",
  },
  {
    icon: WifiOff,
    title: "Offline-first",
    description: "Runs on the shop PC with local SQLite. No internet required to sell.",
  },
];

const whoItsFor = [
  {
    title: "Tailors & stitching shops",
    icon: Scissors,
    text: "Design/service sales, fabric stock, and customer accounts in one desktop app.",
  },
  {
    title: "Retail counters",
    icon: ShoppingBag,
    text: "Fast checkout, vendors, purchases, and daily reports without a cloud dependency.",
  },
  {
    title: "Owners & managers",
    icon: Shield,
    text: "Licensed seats, role permissions, backups you control, and renewals you can plan.",
  },
];

const setupSteps = [
  {
    icon: KeyRound,
    title: "License & seats",
    text: "Agree monthly or yearly plan and staff seats. We issue a signed key for your install.",
  },
  {
    icon: Download,
    title: "Install on Windows",
    text: "Run the installer, activate the license, register the branch manager, then add staff.",
  },
  {
    icon: Headphones,
    title: "Configure & support",
    text: "Company details, printer, chart of accounts. We stay reachable on email and WhatsApp.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Ask for quote",
    note: "Monthly or yearly · fewer seats",
    includes: [
      "Windows desktop POS",
      "Stock, sales, returns",
      "Purchases & parties",
      "Email support",
    ],
  },
  {
    name: "Shop",
    price: "Ask for quote",
    note: "Most shops · more seats",
    includes: [
      "Everything in Starter",
      "Accounting & cash closing",
      "Reports & DB backup path",
      "Priority WhatsApp support",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "Custom",
    note: "Higher seats · multi-PC installs",
    includes: [
      "Quoted seat pack",
      "On-site or remote onboarding",
      "Renewal & upgrade path",
      "Dedicated handoff checklist",
    ],
  },
];

const roadmap = [
  {
    icon: Cloud,
    title: "Cloud data sync",
    description: "Optional backup and multi-device sync when you want the shop online.",
  },
  {
    icon: Building2,
    title: "Multi-branch view",
    description: "Central visibility across locations without losing offline counters.",
  },
  {
    icon: Bot,
    title: "WhatsApp automation",
    description: "Order updates and customer follow-ups from the same SalesPeck workflow.",
  },
];

const faqs = [
  {
    q: "Does SalesPeck need the internet to sell?",
    a: "No. The desktop app is offline-first on Windows with a local database. Internet is only needed for installing updates or when you choose online features later.",
  },
  {
    q: "How do seats and licenses work?",
    a: "Your signed license sets staff seats (branch manager + cashiers) and monthly or yearly expiry. Customers and vendors do not consume seats. Renew by activating a new key.",
  },
  {
    q: "Can we back up our data?",
    a: "Yes. Set a backup folder in Settings, use Export DB, and keep copies of the SQLite file. Packaged updates also create automatic backups before migrations.",
  },
  {
    q: "Is cloud sync available now?",
    a: "Not yet. Cloud sync, multi-branch central view, and WhatsApp automation are on the product roadmap. Today you get a solid offline POS you can deploy immediately.",
  },
  {
    q: "How do we get support?",
    a: "Email hello@salespeck.com or WhatsApp +92 320 9492059. We help with install, license activation, training, and renewals.",
  },
];

function PosPreview() {
  return (
    <div className="panel overflow-hidden shadow-2xl shadow-black/40 fade-up-delay-2">
      <div className="flex items-center justify-between border-b border-border bg-muted/80 px-4 py-2.5">
        <span className="text-xs font-medium text-text-muted">SalesPeck · Counter</span>
        <span className="flex items-center gap-2 text-[10px] text-text-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Offline ready
        </span>
      </div>
      <div className="min-h-[300px] bg-bg-elevated p-4 text-sm">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-[10px] uppercase tracking-wide text-text-faint">Today&apos;s sales</p>
            <p className="mt-1 font-display text-lg font-semibold text-text">Rs. 42,800</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-[10px] uppercase tracking-wide text-text-faint">Staff seats</p>
            <p className="mt-1 font-display text-lg font-semibold text-text">3 / 5</p>
          </div>
        </div>
        <p className="mb-2 text-xs font-medium text-text-faint">Recent tickets</p>
        <ul className="mb-4 space-y-1.5 text-xs text-text-muted">
          <li className="flex justify-between border-b border-border/60 py-2">
            <span>INV-1042 · Service sale</span>
            <span className="text-accent">Paid</span>
          </li>
          <li className="flex justify-between border-b border-border/60 py-2">
            <span>INV-1041 · Fabric stock</span>
            <span className="text-primary-light">POS</span>
          </li>
          <li className="flex justify-between border-b border-border/60 py-2">
            <span>RET-0018 · Return</span>
            <span className="text-text-faint">Stock in</span>
          </li>
        </ul>
        <div className="rounded-xl border border-primary/30 bg-primary-dark/30 px-3 py-2.5 text-[11px] text-primary-light">
          <span className="font-semibold text-text">License active</span>
          {" — "}
          yearly plan · renew before expiry from Settings
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-pad border-b border-border/60">
        <div className="container-pro">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="fade-up">
              <p className="eyebrow">SalesPeck</p>
              <h1 className="heading-xl mb-5">
                Desktop POS that keeps the counter moving — even offline
              </h1>
              <p className="lead mb-8 max-w-lg">
                Stock, sales, returns, purchases, and accounting on Windows.
                Licensed staff seats. Built for shops that cannot wait on the
                cloud.
              </p>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn-primary">
                  Get a quote
                </a>
                <a href="#product" className="btn-outline">
                  See what ships today
                </a>
              </div>
              <p className="text-sm text-text-faint">
                Tell us seats and plan preference — we reply within one business day.
              </p>
            </div>
            <PosPreview />
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="section-pad border-b border-border/60">
        <div className="container-pro">
          <p className="eyebrow">Product</p>
          <h2 className="heading-lg mb-3">What you get today</h2>
          <p className="lead mb-12 max-w-2xl">
            A complete offline-first POS for a single shop PC — ready to license,
            install, and train on.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shipsToday.map(({ icon: Icon, title, description }) => (
              <article key={title} className="panel p-6 transition hover:border-border-strong">
                <Icon className="mb-3 h-5 w-5 text-primary-light" />
                <h3 className="heading-md mb-2 text-base">{title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who */}
      <section id="who" className="section-pad border-b border-border/60 bg-bg-elevated/40">
        <div className="container-pro">
          <p className="eyebrow">Audience</p>
          <h2 className="heading-lg mb-3">Who it&apos;s for</h2>
          <p className="lead mb-12 max-w-2xl">
            One install for the shop floor — not a multi-tenant cloud portal.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {whoItsFor.map(({ title, icon: Icon, text }) => (
              <article key={title} className="panel p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="heading-md text-base">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Getting started / sales */}
      <section className="section-pad border-b border-border/60">
        <div className="container-pro">
          <p className="eyebrow">Sales</p>
          <h2 className="heading-lg mb-3">From quote to go-live</h2>
          <p className="lead mb-12 max-w-2xl">
            Simple commercial path: seats, plan, installer, activation, then support.
          </p>
          <ol className="grid gap-6 md:grid-cols-3">
            {setupSteps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="panel relative p-6">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <Icon className="mb-3 h-5 w-5 text-primary-light" />
                <h3 className="heading-md mb-2 text-base">{title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-pad border-b border-border/60 bg-bg-elevated/40">
        <div className="container-pro">
          <p className="eyebrow">Pricing</p>
          <h2 className="heading-lg mb-3">Plans by seats &amp; term</h2>
          <p className="lead mb-12 max-w-2xl">
            Monthly or yearly licenses with a staff seat pack. Final price depends
            on seats and support level — we quote for your shop.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`panel flex flex-col p-6 ${
                  plan.popular ? "border-primary/50 ring-1 ring-primary/30" : ""
                }`}
              >
                {plan.popular && (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-light">
                    Popular
                  </p>
                )}
                <h3 className="heading-md text-base">{plan.name}</h3>
                <p className="mt-3 font-display text-2xl font-semibold text-text">{plan.price}</p>
                <p className="mb-5 text-xs text-text-faint">{plan.note}</p>
                <ul className="mb-6 flex-1 space-y-2 text-sm text-text-muted">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-outline w-full text-center">
                  Ask for a quote
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="section-pad border-b border-border/60">
        <div className="container-pro">
          <p className="eyebrow">Roadmap</p>
          <h2 className="heading-lg mb-3">Coming next</h2>
          <p className="lead mb-12 max-w-2xl">
            We ship the desktop POS first. These capabilities are planned — not
            required to run your counter today.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {roadmap.map(({ icon: Icon, title, description }) => (
              <article key={title} className="panel border-dashed p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-text-faint" />
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-faint">
                    Coming soon
                  </span>
                </div>
                <h3 className="heading-md mb-2 text-base">{title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="section-pad border-b border-border/60 bg-bg-elevated/40">
        <div className="container-pro max-w-3xl">
          <p className="eyebrow">Support</p>
          <h2 className="heading-lg mb-3">Help when you need it</h2>
          <p className="lead mb-8">
            Install issues, license activation, printer setup, backups, and
            renewals — reach us on the channels below.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:hello@salespeck.com"
              className="panel flex items-start gap-3 p-5 transition hover:border-primary/40"
            >
              <Mail className="mt-0.5 h-5 w-5 text-primary-light" />
              <div>
                <p className="font-semibold text-text">Email</p>
                <p className="text-sm text-text-muted">hello@salespeck.com</p>
              </div>
            </a>
            <a
              href="https://wa.me/923209492059"
              target="_blank"
              rel="noopener noreferrer"
              className="panel flex items-start gap-3 p-5 transition hover:border-accent/40"
            >
              <Headphones className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold text-text">WhatsApp</p>
                <p className="text-sm text-text-muted">+92 320 9492059</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad border-b border-border/60">
        <div className="container-pro max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="heading-lg mb-8">Common questions</h2>
          <div className="space-y-2">
            {faqs.map(({ q, a }) => (
              <details key={q} className="faq-item group">
                <summary className="flex items-start justify-between gap-4">
                  <span>{q}</span>
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-text-faint transition group-open:rotate-90" />
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-pad">
        <div className="container-pro max-w-2xl text-center">
          <p className="eyebrow justify-center">Contact</p>
          <h2 className="heading-lg mb-3">Ready to equip your counter?</h2>
          <p className="lead mx-auto mb-8">
            Share how many staff seats you need and whether you prefer monthly or
            yearly. We&apos;ll send a clear quote and next steps.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href="mailto:hello@salespeck.com?subject=SalesPeck%20quote" className="btn-primary">
              <Mail className="h-4 w-4" />
              Email for a quote
            </a>
            <a
              href="https://wa.me/923209492059?text=Hi%20SalesPeck%20—%20I%20want%20a%20quote%20for%20POS%20seats"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
