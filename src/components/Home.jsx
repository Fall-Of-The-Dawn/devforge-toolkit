export default function Home({ setActiveTool, isLight }) {
  const tools = [
    {
      id: "generator",
      title: "Mock Data Generator",
      description: "Generate realistic fake data in JSON, CSV, or SQL format. Choose from 10+ data presets or build custom schemas with editable fields.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      id: "css-converter",
      title: "CSS ↔ Tailwind Converter",
      description: "Convert CSS to Tailwind utility classes or reverse. Supports 50+ CSS properties including flexbox, spacing, colors, borders, and more.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "diff",
      title: "Text Diff Tool",
      description: "Compare two texts side by side with git-diff style output. Highlights additions, deletions, and unchanged lines with line numbers.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      ),
    },
    {
      id: "json-formatter",
      title: "JSON Formatter",
      description: "Pretty-print, minify, and validate JSON data with syntax highlighting, indentation options, and tree structure analysis.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M5 16l-1 4 4-1" />
          <path d="M19 12l2 2-2 2" />
        </svg>
      ),
    },
    {
      id: "regex-tester",
      title: "Regex Tester",
      description: "Test regular expressions with real-time match highlighting, capture groups, and common pattern examples.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ),
    },
    {
      id: "base64",
      title: "Base64 Encoder/Decoder",
      description: "Encode plain text to Base64 or decode Base64 strings. Supports UTF-8 characters and file content encoding.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
        </svg>
      ),
    },
    {
      id: "url-encoder",
      title: "URL Encoder/Decoder",
      description: "Encode URLs and query parameters for safe transmission or decode encoded URLs back to readable format.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      id: "jwt-decoder",
      title: "JWT Decoder",
      description: "Decode and inspect JWT tokens. View header, payload, signature, expiration status, and token metadata.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      id: "layout",
      title: "Flexbox / Grid Playground",
      description: "Visual layout builder with live preview. Configure flex or grid properties and get Tailwind + CSS output instantly.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "gradient",
      title: "Gradient Generator",
      description: "Visual gradient builder with color stops, presets, and live preview. Outputs CSS and Tailwind classes.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20" fill="#00e67633" />
        </svg>
      ),
    },
    {
      id: "box-shadow",
      title: "Box Shadow Generator",
      description: "Visual shadow builder with multi-layer support, presets, and real-time preview. CSS and Tailwind output.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M21 12H12V21" strokeOpacity="0.4" />
        </svg>
      ),
    },
    {
      id: "qr-code",
      title: "QR Code Generator",
      description: "Generate downloadable QR codes from text or URLs. Customizable colors, size, and error correction level.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="8" height="8" rx="1" />
          <rect x="14" y="2" width="8" height="8" rx="1" />
          <rect x="2" y="14" width="8" height="8" rx="1" />
          <rect x="14" y="14" width="4" height="4" />
          <rect x="20" y="14" width="2" height="2" />
          <rect x="14" y="20" width="2" height="2" />
          <rect x="20" y="20" width="2" height="2" />
        </svg>
      ),
    },
    {
      id: "lorem",
      title: "Lorem Ipsum Generator",
      description: "Generate placeholder text by paragraphs, sentences, or words. Copy-ready output with word and character counts.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h16v3" />
          <path d="M9 20h6" />
          <path d="M12 4v16" />
        </svg>
      ),
    },
    {
      id: "html-preview",
      title: "HTML Preview Editor",
      description: "Live side-by-side HTML/CSS/JS editor with instant preview. Write code on the left, see results on the right.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center p-8 pt-10 overflow-auto">
      <div className="max-w-3xl w-full text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`w-14 h-14 ${isLight ? "bg-green-50 border-green-200" : "bg-[#00e676]/10 border-[#00e676]/30"} border-2 rounded-xl flex items-center justify-center`}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
        </div>
        <h1 className={`text-4xl font-black tracking-tight mb-3 ${isLight ? "text-gray-900" : "text-white"}`}>
          DevForge
        </h1>
        <p className={`text-lg ${isLight ? "text-gray-500" : "text-[#666]"} max-w-xl mx-auto leading-relaxed`}>
          Free developer toolkit. Mock data, CSS conversion, text diff, JSON formatting, encoding, layout builders, and more — all processing happens in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl w-full">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`text-left p-6 rounded-xl border transition-all duration-200 cursor-pointer group ${
              isLight
                ? "bg-white border-gray-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/5"
                : "bg-[#111] border-[#1a1a1a] hover:border-[#00e676]/30 hover:shadow-lg hover:shadow-[#00e676]/5"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${isLight ? "bg-green-50" : "bg-[#00e676]/10"}`}>
              {tool.icon}
            </div>
            <h3 className={`text-base font-bold mb-2 ${isLight ? "text-gray-900" : "text-white"} group-hover:text-[#00e676] transition-colors`}>
              {tool.title}
            </h3>
            <p className={`text-sm leading-relaxed ${isLight ? "text-gray-500" : "text-[#666]"}`}>
              {tool.description}
            </p>
          </button>
        ))}
      </div>

      <div className={`mt-12 text-center text-xs ${isLight ? "text-gray-400" : "text-[#444]"}`}>
        <p>100% client-side · No data sent to servers · Open source</p>
      </div>
    </div>
  );
}
