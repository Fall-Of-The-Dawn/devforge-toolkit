export default function Footer({ isLight, mutedText, setActiveTool, adConfig, theme }) {
  const toolCategories = [
    {
      title: "Data",
      tools: [
        { id: "generator", label: "Mock Data Generator" },
      ],
    },
    {
      title: "Converters",
      tools: [
        { id: "css-converter", label: "CSS ↔ Tailwind" },
        { id: "base64", label: "Base64 Encoder" },
        { id: "url-encoder", label: "URL Encoder" },
        { id: "jwt-decoder", label: "JWT Decoder" },
        { id: "css-minifier", label: "CSS Minifier" },
        { id: "tokenizer", label: "Text Tokenizer" },
      ],
    },
    {
      title: "Design",
      tools: [
        { id: "gradient", label: "Gradient Generator" },
        { id: "box-shadow", label: "Box Shadow" },
        { id: "layout", label: "Layout Playground" },
        { id: "color-contrast", label: "Color Contrast" },
      ],
    },
    {
      title: "Editors",
      tools: [
        { id: "json-formatter", label: "JSON Formatter" },
        { id: "text-diff", label: "Text Diff" },
        { id: "regex-tester", label: "Regex Tester" },
        { id: "html-preview", label: "HTML Preview" },
        { id: "markdown", label: "Markdown Preview" },
      ],
    },
    {
      title: "Generators",
      tools: [
        { id: "qr-code", label: "QR Code Generator" },
        { id: "password", label: "Password Generator" },
        { id: "uuid", label: "UUID Generator" },
        { id: "timestamp", label: "Timestamp Converter" },
        { id: "lorem", label: "Lorem Ipsum" },
      ],
    },
  ];

  return (
    <footer className={`border-t ${isLight ? "glass-light border-[#e0e0e0]/50" : "glass border-[#1a1a1a]/50"}`}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {toolCategories.map((category) => (
            <div key={category.title}>
              <h3 className={`text-sm font-semibold mb-4 ${isLight ? "text-[#1a1a1a]" : "text-[#e8e8e8]"}`}>
                {category.title}
              </h3>
              <ul className="space-y-2.5">
                {category.tools.map((tool) => (
                  <li key={tool.id}>
                    <button
                      onClick={() => setActiveTool(tool.id)}
                      className={`text-sm transition-colors hover:text-[var(--accent)] ${isLight ? "text-[#555555]" : "text-[#888888]"}`}
                    >
                      {tool.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-12 pt-8 border-t ${isLight ? "border-[#e0e0e0]" : "border-[#1a1a1a]"}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveTool("home")} className={`text-sm transition-colors hover:text-[var(--accent)] ${isLight ? "text-[#555555]" : "text-[#888888]"}`}>
                Home
              </button>
              <span className={`text-sm ${isLight ? "text-[#888888]" : "text-[#555555]"}`}>·</span>
              <span className={`text-sm ${isLight ? "text-[#888888]" : "text-[#555555]"}`}>
                {new Date().getFullYear()} OmniStack
              </span>
            </div>
            <div className={`text-xs ${isLight ? "text-[#888888]" : "text-[#555555]"}`}>
              100% client-side · No data leaves your browser
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
