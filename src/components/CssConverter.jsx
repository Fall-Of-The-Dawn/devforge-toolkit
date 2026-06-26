import { useState } from "react";
import { cssToTailwind } from "../utils/converters";
import { resolveTailwindClass } from "../utils/reverseMap";

export default function CssConverter({ isLight, mutedText, activeBtn, inactiveBtn }) {
  const [cssInput, setCssInput] = useState("");
  const [tailwindOutput, setTailwindOutput] = useState("");
  const [tailwindInput, setTailwindInput] = useState("");
  const [reverseOutput, setReverseOutput] = useState("");
  const [activeDirection, setActiveDirection] = useState("css-to-tailwind");

  const convertCss = (css) => {
    setCssInput(css);
    if (!css.trim()) { setTailwindOutput(""); return; }
    setTailwindOutput(cssToTailwind(css));
  };

  const convertTailwind = (tw) => {
    setTailwindInput(tw);
    if (!tw.trim()) { setReverseOutput(""); return; }
    const classes = tw.split(/\s+/).filter(Boolean);
    const cssProperties = classes.map((cls) => {
      const result = resolveTailwindClass(cls);
      return result || `/* Unknown: ${cls} */`;
    });
    setReverseOutput(cssProperties.join("\n"));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>CSS ↔ Tailwind</label>
        <div className="flex gap-1.5">
          <button onClick={() => setActiveDirection("css-to-tailwind")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-150 cursor-pointer ${activeDirection === "css-to-tailwind" ? activeBtn : inactiveBtn}`}>CSS → Tailwind</button>
          <button onClick={() => setActiveDirection("tailwind-to-css")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-150 cursor-pointer ${activeDirection === "tailwind-to-css" ? activeBtn : inactiveBtn}`}>Tailwind → CSS</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>{activeDirection === "css-to-tailwind" ? "CSS INPUT" : "TAILWIND INPUT"}</label>
          <textarea
            value={activeDirection === "css-to-tailwind" ? cssInput : tailwindInput}
            onChange={(e) => activeDirection === "css-to-tailwind" ? convertCss(e.target.value) : convertTailwind(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-[#FF6B6B] text-gray-800" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#FF6B6B] text-[#ccc]"}`}
            placeholder={activeDirection === "css-to-tailwind" ? 'Paste CSS code to convert to Tailwind classes...\n\nExample:\n.box {\n  display: flex;\n  padding: 1rem;\n  background: #FF6B6B;\n  border-radius: 0.5rem;\n}' : 'Paste Tailwind utility classes to convert to CSS...\n\nExample:\nflex p-4 bg-[#fff0f0]0 rounded-lg hover:bg-green-600'}
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>{activeDirection === "css-to-tailwind" ? "TAILWIND OUTPUT" : "CSS OUTPUT"}</label>
          <div className={`w-full h-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto select-all border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-800" : "bg-[#080808] border-[#161616] text-[#ccc]"}`}>
            <pre>{activeDirection === "css-to-tailwind" ? tailwindOutput : reverseOutput}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
