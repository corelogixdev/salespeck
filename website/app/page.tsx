import React from "react";
import { Monitor, Cpu, Shield, Zap, Layout, Terminal } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Native Window Management",
      description: "Advanced control over window positioning, transparency, and multi-monitor setups."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Low Resource Overhead",
      description: "Optimized Electron build with minimal memory footprint and fast startup times."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Sandbox",
      description: "Built-in security protocols for safe inter-process communication and file system access."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Hardware Acceleration",
      description: "Leverage GPU performance for smooth animations and data-heavy visualizations."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Custom Titlebars",
      description: "Fully customizable frameless windows with native behavior and aesthetics."
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "OS Integration",
      description: "Deep integration with system tray, global shortcuts, and native notifications."
    }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 text-center mb-32">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
          Desktop Reimagined
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
          Next-Gen <span className="text-primary">Electron</span> Powered Experiences
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto mb-12">
          Salespeck provides the ultimate toolkit for building high-performance, beautiful desktop applications that feel truly native.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/25">
            Get Started
          </button>
          <button className="w-full md:w-auto border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
            View Docs
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats/Info Section */}
      <section className="mt-32 bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-slate-400">Crash-free Sessions</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">&lt; 50MB</div>
            <div className="text-slate-400">Idle Memory Usage</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">60 FPS</div>
            <div className="text-slate-400">Smooth Rendering</div>
          </div>
        </div>
      </section>
    </div>
  );
}
