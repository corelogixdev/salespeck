import React from "react";
import {
  Package,
  BarChart3,
  ShieldCheck,
  WifiOff,
  Cloud,
  Building2,
  Monitor,
  Bot,
  ClipboardList,
  ChevronRight,
  Check,
  Store,
  ShoppingCart,
  CreditCard,
  Pill,
  Receipt,
  Mail,
} from "lucide-react";

const capabilities = [
  {
    icon: Cloud,
    title: "Online",
    description: "Cloud sync, remote dashboards, and data available wherever you have a connection.",
  },
  {
    icon: WifiOff,
    title: "Offline",
    description: "Counters keep running when the internet drops. Sales upload automatically when you're back online.",
  },
  {
    icon: Building2,
    title: "Multiple branches",
    description: "One view across locations — stock, sales, and transfers between branches without duplicate entry.",
  },
  {
    icon: Monitor,
    title: "Multiple systems",
    description: "Several counters, back-office PCs, and roles working on the same live data at once.",
  },
  {
    icon: Bot,
    title: "WhatsApp AI automation",
    description: "Integrated WhatsApp with AI-driven replies, follow-ups, and customer communication — less manual messaging.",
  },
  {
    icon: ClipboardList,
    title: "Order processing",
    description: "Take orders from counter, phone, or chat, track status, and fulfil without losing the thread.",
  },
];

const features = [
  {
    icon: Receipt,
    title: "Point of sale",
    description: "Fast checkout, discounts, payments, and receipts at the counter.",
  },
  {
    icon: Package,
    title: "Inventory",
    description: "Stock levels, purchases, transfers, and low-stock alerts across branches.",
  },
  {
    icon: ShieldCheck,
    title: "Tax-compliant invoicing",
    description: "Electronic invoices generated with the sale, ready for your region's requirements.",
  },
  {
    icon: BarChart3,
    title: "Reports",
    description: "Daily sales, margins, and exports for management and accounting.",
  },
];

const whoItsFor = [
  {
    title: "Shops & retail",
    icon: ShoppingCart,
    text: "In-store sales plus orders that come in by phone or message — one pipeline.",
  },
  {
    title: "Restaurants & cafés",
    icon: CreditCard,
    text: "Tables, kitchen flow, split bills, and takeaway orders in the same system.",
  },
  {
    title: "Pharmacies",
    icon: Pill,
    text: "Batch and expiry tracking with the compliance reporting you need.",
  },
  {
    title: "Grocery & chains",
    icon: Store,
    text: "High-volume checkout and multi-branch stock under one roof.",
  },
];

const setupSteps = [
  {
    title: "Map your setup",
    text: "We note your branches, counters, who needs access, and whether you want WhatsApp automation from day one.",
  },
  {
    title: "Import & configure",
    text: "Products, prices, users, and branch structure loaded. Online sync and offline mode tested on your hardware.",
  },
  {
    title: "Train & go live",
    text: "Staff learn billing and order flow. We stay on call through the first week across all your systems.",
  },
];

const pricingPlans = [
  {
    name: "Single location",
    price: "From $49",
    note: "per month · 1 branch",
    includes: [
      "Online + offline POS",
      "Order processing",
      "Inventory & reports",
      "Email support",
    ],
  },
  {
    name: "Multi-system",
    price: "From $99",
    note: "per month · multiple counters",
    includes: [
      "Everything in Single location",
      "Multiple terminals & users",
      "WhatsApp integration",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Multi-branch",
    price: "Custom",
    note: "branches + automation",
    includes: [
      "Unlimited branches (quoted)",
      "WhatsApp AI automation",
      "Central reporting",
      "Dedicated onboarding",
    ],
  },
];

const faqs = [
  {
    q: "Can we run online and offline at the same time?",
    a: "Yes. Branches sync through the cloud when connected. Each counter can still sell offline and merge data when the link is back.",
  },
  {
    q: "How do multiple branches stay in sync?",
    a: "Stock and sales update from each location into a central database. You can transfer items between branches and see group totals without logging into each shop separately.",
  },
  {
    q: "What does WhatsApp AI automation do?",
    a: "Customer messages on WhatsApp can trigger automated replies, order confirmations, and follow-ups based on rules you set — so your team spends less time on repetitive chats.",
  },
  {
    q: "Is order processing separate from POS?",
    a: "No — orders from WhatsApp, phone, or the counter land in the same workflow. Status moves from new → preparing → ready → completed without retyping.",
  },
  {
    q: "How many systems can we install?",
    a: "As many counters and back-office machines as your plan allows. All of them pull from the same product and customer data.",
  },
];

function ScreenPreview() {
  return (
    <div className="rounded-lg border border-slate-300 bg-slate-100 overflow-hidden shadow-md">
      <div className="px-4 py-2.5 bg-slate-200 border-b border-slate-300 flex justify-between items-center">
        <span className="text-xs font-medium text-slate-600">
          Branch A · Online
        </span>
        <span className="text-[10px] text-slate-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          3 counters active
        </span>
      </div>
      <div className="p-4 bg-white min-h-[280px] text-sm">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded border border-slate-200 p-3">
            <p className="text-[10px] text-slate-500 uppercase">Orders today</p>
            <p className="text-lg font-semibold text-slate-900">52</p>
          </div>
          <div className="rounded border border-slate-200 p-3">
            <p className="text-[10px] text-slate-500 uppercase">All branches</p>
            <p className="text-lg font-semibold text-slate-900">$8,420</p>
          </div>
        </div>
        <p className="text-xs font-medium text-slate-500 mb-2">Open orders</p>
        <ul className="space-y-1.5 text-xs text-slate-700 mb-4">
          <li className="flex justify-between py-1.5 border-b border-slate-100">
            <span>#ORD-218 · WhatsApp</span>
            <span className="text-amber-700 font-medium">Preparing</span>
          </li>
          <li className="flex justify-between py-1.5 border-b border-slate-100">
            <span>#ORD-217 · Counter 2</span>
            <span className="text-emerald-700 font-medium">Ready</span>
          </li>
          <li className="flex justify-between py-1.5 border-b border-slate-100">
            <span>#ORD-216 · Branch B</span>
            <span className="text-slate-500 font-medium">New</span>
          </li>
        </ul>
        <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-800">
          <span className="font-medium">WhatsApp AI</span> — auto-replied to 6
          customer queries in the last hour
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="section-pad border-b border-slate-200">
        <div className="container-pro">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <h1 className="heading-xl mb-4">
                Retail operations online, offline, and across every branch
              </h1>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                Salespeck is POS, inventory, order processing, and WhatsApp AI
                automation in one platform. Run multiple counters and branches,
                stay open when the internet isn&apos;t, and handle orders from
                the shop floor or chat without switching tools.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-600 mb-8">
                {[
                  "Online & offline",
                  "Multiple branches",
                  "Multiple systems",
                  "WhatsApp AI automation",
                  "Order processing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-700 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a href="mailto:hello@salespeck.com" className="btn-primary">
                  <Mail className="w-4 h-4" />
                  hello@salespeck.com
                </a>
                <a href="#capabilities" className="btn-outline">
                  See capabilities
                </a>
              </div>
              <p className="text-sm text-slate-500">
                Tell us how many branches and counters you run — we&apos;ll
                reply within one business day.
              </p>
            </div>
            <ScreenPreview />
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="section-pad bg-slate-50 border-b border-slate-200"
      >
        <div className="container-pro">
          <h2 className="heading-lg mb-3">What we offer</h2>
          <p className="text-slate-600 max-w-2xl mb-10">
            Built for businesses that sell in person, over the phone, and on
            WhatsApp — with more than one location or checkout.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article key={title} className="card-pro !p-6">
                <Icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section-pad bg-white border-b border-slate-200">
        <div className="container-pro">
          <h2 className="heading-lg mb-3">Also included</h2>
          <p className="text-slate-600 max-w-2xl mb-10">
            The day-to-day tools every location needs on top of orders and
            messaging.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="card-muted !p-6">
                <Icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="who" className="section-pad">
        <div className="container-pro">
          <h2 className="heading-lg mb-3">Who it&apos;s for</h2>
          <p className="text-slate-600 max-w-2xl mb-10">
            One platform whether you run a single busy counter or a small chain.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {whoItsFor.map(({ title, icon: Icon, text }) => (
              <article key={title} className="card-pro !p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50 border-y border-slate-200">
        <div className="container-pro max-w-3xl">
          <h2 className="heading-lg mb-3">Getting started</h2>
          <p className="text-slate-600 mb-10">
            We configure online sync, offline mode, and branch structure before
            your team touches the live system.
          </p>
          <ol className="space-y-8">
            {setupSteps.map(({ title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-semibold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pricing" className="section-pad">
        <div className="container-pro">
          <h2 className="heading-lg mb-3">Pricing</h2>
          <p className="text-slate-600 max-w-2xl mb-10">
            Depends on branches, counters, and whether you need full WhatsApp AI
            automation. Figures below are indicative in USD — we&apos;ll quote
            for your exact setup.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  plan.popular
                    ? "border-primary bg-slate-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <p className="text-xs font-medium text-primary mb-3">
                    Most growing teams
                  </p>
                )}
                <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                <p className="text-2xl font-semibold text-slate-900 mt-3">
                  {plan.price}
                </p>
                <p className="text-xs text-slate-500 mb-5">{plan.note}</p>
                <ul className="space-y-2 text-sm text-slate-600 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-outline w-full mt-6 text-center">
                  Ask for a quote
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="section-pad bg-slate-50 border-t border-slate-200"
      >
        <div className="container-pro max-w-2xl">
          <h2 className="heading-lg mb-8">Common questions</h2>
          <div className="space-y-2">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-lg border border-slate-200 bg-white"
              >
                <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-medium text-slate-900 flex justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <p className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-slate-200">
        <div className="container-pro max-w-2xl text-center">
          <h2 className="heading-lg mb-3">See it with your branch layout</h2>
          <p className="text-slate-600 mb-8">
            Share how many locations, counters, and WhatsApp lines you use. We
            walk you through orders, offline mode, and automation on a live
            demo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="mailto:hello@salespeck.com" className="btn-primary">
              hello@salespeck.com
            </a>
            <a
              href="https://wa.me/923209492059"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
