import { useState, useMemo } from "react";

const DEFAULT_MD = `# DevClat

## Features

- **Mock Data Generator** — Generate realistic fake data
- **CSS Converter** — Convert between CSS and Tailwind
- **Text Diff** — Compare texts side by side

### Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Links

[Visit GitHub](https://github.com)

### Blockquote

> "First, solve the problem. Then, write the code."
> — John Johnson

### Table

| Tool | Status |
|------|--------|
| JSON Formatter | Done |
| Regex Tester | Done |

---

*Built with React. 100% client-side.*
`;

function parseMarkdown(md) {
  let html = md;

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-[#0d0d0d] rounded-lg p-4 my-3 overflow-x-auto text-sm"><code class="text-[#FF6B6B]">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm text-[#FF6B6B]">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-black text-white mt-4 mb-4">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic text-gray-300">$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#FF6B6B] hover:underline" target="_blank" rel="noopener">$1</a>');

  // Blockquote
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-[#FF6B6B] pl-4 py-1 my-2 text-gray-400 italic">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-[#222] my-6" />');

  // Unordered list
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-300 mb-1">• $1</li>');

  // Table
  html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split("|").map((c) => c.trim());
    if (cells.every((c) => /^[-:]+$/.test(c))) return "";
    const isHeader = false;
    const tag = isHeader ? "th" : "td";
    return `<tr>${cells.map((c) => `<${tag} class="px-3 py-2 border border-[#222] text-sm">${c}</${tag}>`).join("")}</tr>`;
  });
  html = html.replace(/(<tr>.*<\/tr>)/gs, '<table class="w-full my-3 border-collapse">$1</table>');

  // Paragraphs
  html = html.replace(/^(?!<[hpboltau]|<tr|<li|<hr|<blockquote|<pre)(.+)$/gm, '<p class="text-gray-300 mb-3 leading-relaxed">$1</p>');

  return html;
}

export default function MarkdownPreview({ isLight, mutedText }) {
  const [md, setMd] = useState(DEFAULT_MD);
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => parseMarkdown(md), [md]);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Markdown Preview</h1>
        <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          {copied ? "Copied!" : "Copy HTML"}
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>MARKDOWN</label>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e0e0e0]"}`}
            placeholder="Write Markdown here..."
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>PREVIEW</label>
          <div className={`w-full h-full rounded-lg p-5 overflow-auto border ${isLight ? "bg-white border-gray-200" : "bg-[#0a0a0a] border-[#1a1a1a]"}`}>
            <div className="prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </div>
  );
}
