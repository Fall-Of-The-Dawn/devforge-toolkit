import { useState } from "react";

const FAQ_DATA = [
  {
    q: "What is OmniDev?",
    a: "OmniDev is a free, client-side developer toolkit with 20+ tools for generating mock data, converting CSS, formatting JSON, testing regex, building QR codes, and more. All processing happens in your browser — no data is sent to any server.",
  },
  {
    q: "Is OmniDev really free?",
    a: "Yes. OmniDev is 100% free with no hidden fees, no sign-up required, and no usage limits. All tools run entirely in your browser.",
  },
  {
    q: "Is my data private?",
    a: "Absolutely. All processing happens locally in your browser. No data is ever sent to a server. Your code, text, and generated data never leave your device.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. OmniDev is a web-based tool that works directly in your browser. No installation, no extensions, no accounts needed.",
  },
  {
    q: "Which browsers are supported?",
    a: "OmniDev works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.",
  },
  {
    q: "Can I use OmniDev on mobile?",
    a: "Yes. OmniDev is responsive and works on mobile devices, though some tools like the layout playground work best on desktop.",
  },
  {
    q: "How does the Mock Data Generator work?",
    a: "The Mock Data Generator uses pre-built data type templates (users, products, orders, etc.) and generates realistic fake data using the Faker.js library. You can customize fields, choose output format (JSON, CSV, SQL), and export the data.",
  },
  {
    q: "What's the difference between CSS Minifier and CSS Converter?",
    a: "The CSS Converter transforms CSS to Tailwind utility classes (or vice versa). The CSS Minifier removes whitespace and comments to reduce file size, or beautifies compressed CSS for readability.",
  },
  {
    q: "How accurate is the Color Contrast Checker?",
    a: "The contrast checker uses the WCAG 2.1 luminance algorithm to calculate contrast ratios. It checks against AA (4.5:1 for normal text, 3:1 for large text) and AAA (7:1 for normal text, 4.5:1 for large text) compliance levels.",
  },
  {
    q: "Can I suggest a new tool?",
    a: "Yes! We welcome feature requests. You can open an issue on our GitHub repository or reach out through the feedback form.",
  },
];

function FaqItem({ item, isLight, mutedText }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-lg border transition-colors ${isLight ? "bg-white border-gray-200" : "bg-[#111] border-[#1a1a1a]"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer">
        <span className={`text-sm font-medium pr-4 ${isLight ? "text-gray-900" : "text-[#e0e0e0]"}`}>{item.q}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""} ${mutedText}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className={`px-5 pb-4 text-sm leading-relaxed ${isLight ? "text-gray-600" : "text-[#888]"}`}>
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FaqSection({ isLight, mutedText }) {
  return (
    <section className="py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-2xl font-black tracking-tight mb-3 ${isLight ? "text-gray-900" : "text-white"}`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-sm ${isLight ? "text-gray-500" : "text-[#666]"}`}>
            Everything you need to know about OmniDev
          </p>
        </div>
        <div className="space-y-3">
          {FAQ_DATA.map((item, i) => (
            <FaqItem key={i} item={item} isLight={isLight} mutedText={mutedText} />
          ))}
        </div>
      </div>
    </section>
  );
}
