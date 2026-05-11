import React from "react";
import { 
  Package, 
  Users, 
  BarChart3, 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Cloud, 
  WifiOff, 
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Store,
  ShoppingCart,
  CreditCard
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Package className="w-10 h-10" />,
      title: "Real-time Inventory",
      description: "Automated stock tracking across multiple locations with predictive low-stock intelligence."
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "FBR Certified",
      description: "Seamless, real-time integration with FBR servers. Automatic invoice synchronization and compliance."
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Global Dashboard",
      description: "Access your entire business ecosystem from any device, anywhere in the world."
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Predictive Analytics",
      description: "AI-driven insights that help you anticipate market trends and optimize your inventory."
    },
    {
      icon: <WifiOff className="w-10 h-10" />,
      title: "Hybrid Cloud",
      description: "Fully functional offline mode with lightning-fast cloud synchronization once reconnected."
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: "WhatsApp CRM",
      description: "Engage customers with automated digital receipts and personalized loyalty rewards via WhatsApp."
    }
  ];

  const industries = [
    { title: "Retail", icon: <ShoppingCart /> },
    { title: "Dining", icon: <CreditCard /> },
    { title: "Pharma", icon: <Zap /> },
    { title: "Grocery", icon: <Store /> },
  ];

  return (
    <div className="overflow-hidden bg-white selection:bg-primary/30">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 md:pt-48 md:pb-60 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 mb-10 text-xs font-black tracking-[0.3em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10 backdrop-blur-sm animate-fade-in">
              <Zap className="w-4 h-4 fill-primary" />
              Intelligence for Modern Commerce
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tight leading-[0.85] text-slate-900">
              RETAIL <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-primary-dark">REIMAGINED</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
              Elevate your business with Salespeck—the elite POS solution that fuses high-performance inventory management with deep retail analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-primary transition-all shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] hover:shadow-primary/40 flex items-center justify-center gap-3 group">
                START FREE TRIAL
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white/50 backdrop-blur-md border-2 border-slate-200 px-12 py-6 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                EXPLORE PRICING
              </button>
            </div>
          </div>

          {/* Interactive Mockup */}
          <div className="mt-32 relative max-w-6xl mx-auto group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
             <div className="relative aspect-[16/9] bg-slate-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.1),_transparent)]" />
                <div className="w-full h-full flex flex-col p-8">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-500/50" />
                         <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                         <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      <div className="px-4 py-1 rounded-full bg-white/5 text-[10px] font-bold tracking-widest text-white/40 uppercase border border-white/5">Salespeck Cloud v4.2</div>
                   </div>
                   <div className="flex-1 grid grid-cols-12 gap-6">
                      <div className="col-span-3 space-y-4">
                         {[1,2,3,4].map(i => <div key={i} className="h-12 rounded-xl bg-white/5 border border-white/5 animate-pulse" style={{animationDelay: `${i*200}ms`}} />)}
                      </div>
                      <div className="col-span-9 rounded-2xl bg-white/5 border border-white/5 p-6 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-6">
                            <div className="text-4xl font-black text-primary animate-float">Rs. 1,425,000</div>
                            <div className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase text-right mt-1">Live Revenue Today</div>
                         </div>
                         <div className="mt-auto h-32 w-full flex items-end gap-2">
                            {[40,70,50,90,60,80,100,70,90].map((h, i) => (
                               <div key={i} className="flex-1 bg-primary/20 border-t-2 border-primary rounded-t-lg transition-all duration-1000 ease-out" style={{height: `${h}%`, animation: `grow-up 1.5s ease-out forwards ${i*100}ms`}} />
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Dynamic Badges */}
             <div className="absolute -top-10 -right-10 hidden xl:flex flex-col gap-4">
                <div className="p-6 glass-card rounded-2xl border-l-4 border-primary shadow-2xl animate-bounce-subtle">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                         <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                         <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">FBR Status</div>
                         <div className="text-lg font-black text-slate-900">VERIFIED</div>
                      </div>
                   </div>
                </div>
                <div className="p-6 glass-card rounded-2xl border-l-4 border-indigo-500 shadow-2xl animate-bounce-subtle delay-300">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500">
                         <Users className="w-6 h-6" />
                      </div>
                      <div>
                         <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Users</div>
                         <div className="text-lg font-black text-slate-900">12,402+</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Premium Industries Section */}
      <section className="py-40 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">CRAFTED FOR YOUR INDUSTRY</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">Every business is unique. Our solutions are precision-engineered to meet the specific demands of your sector.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-slate-100 group cursor-pointer">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-900 mb-8 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-[10deg]">
                  {React.cloneElement(industry.icon as React.ReactElement, { className: "w-10 h-10" })}
                </div>
                <h3 className="text-2xl font-black tracking-tight">{industry.title}</h3>
                <div className="mt-4 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.2em] uppercase">View Solution</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact Features Section */}
      <section className="py-60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5">
              <div className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.3em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                Power & Simplicity
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-[0.95]">
                UNMATCHED <br />
                <span className="text-primary">PRECISION</span>
              </h2>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
                We don't just build software. We build intelligence engines that empower you to dominate your market with data-driven confidence.
              </p>
              <div className="space-y-6">
                {[
                  { label: "24/7 Elite Response Support", icon: <CheckCircle2 className="text-green-500" /> },
                  { label: "Bespoke Enterprise Integration", icon: <CheckCircle2 className="text-green-500" /> },
                  { label: "Weekly Intelligence Updates", icon: <CheckCircle2 className="text-green-500" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-bold text-slate-900 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-10 rounded-[2.5rem] glass-card border border-slate-200/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl group cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Elite Trust Metrics */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {[
            { value: "1,200+", label: "Elite Partners" },
            { value: "45+", label: "Cities Nationwide" },
            { value: "99.99%", label: "Platform Uptime" },
            { value: "Rs. 25B+", label: "Processed Annually" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{stat.value}</div>
              <div className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className="py-60 relative overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-1000" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tight leading-none">
                THE FUTURE <br />
                <span className="text-primary">IS YOURS</span>
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
                Step into the new era of commerce. Join the elite circle of businesses powered by Salespeck Intelligence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button className="bg-white text-slate-900 px-16 py-7 rounded-[2rem] font-black text-2xl hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95">
                  GET STARTED
                </button>
                <div className="text-white/50 font-bold uppercase tracking-widest text-xs">No Credit Card Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
