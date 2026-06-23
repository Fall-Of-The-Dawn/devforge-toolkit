import React, { useState, useEffect, useMemo } from "react";
import { DATA_TYPES } from "./dataTypes";
import { convertToCSV, convertToSQL } from "./utils/converters";
import { TAILWIND_TO_CSS_MAP } from "./utils/reverseMap";

const INITIAL_FIELDS = [
  { id: "1", name: "id", type: "uuid" },
  { id: "2", name: "name", type: "fullName" },
  { id: "3", name: "email", type: "email" },
];
const NEW_USER_SCHEMA = [
  { id: "1", name: "id", type: "uuid" },
  { id: "2", name: "full_name", type: "fullName" },
  { id: "3", name: "email", type: "email" },
  { id: "4", name: "phone_number", type: "phone" },
  { id: "5", name: "job_title", type: "jobTitle" },
];

export default function App() {
  // Global Navigation Layout Toggles
  const [activeTool, setActiveTool] = useState("generator"); // 'generator' or 'css-converter'
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // --- TOOL A: MOCK DATA GENERATOR WORKSPACE STATE ---
  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem("mock_schema");
    return saved ? JSON.parse(saved) : NEW_USER_SCHEMA; // 💡 Default schema fallback
  });
  const [count, setCount] = useState(5);
  const [activeTab, setActiveTab] = useState("json");
  const [copied, setCopied] = useState(false);

  // --- TOOL B: DUAL REVERSIBLE CONVERTER ENGINE STATE ---
  const [conversionDirection, setConversionDirection] = useState("css-to-tw"); // 'css-to-tw' or 'tw-to-css'
  const [cssInput, setCssInput] = useState(
    ".btn {\n  background-color: #4f46e5;\n  color: #ffffff;\n  padding: 8px 16px;\n  border-radius: 6px;\n}",
  );
  const [tailwindOutput, setTailwindOutput] = useState("");
  const [cssCopied, setCssCopied] = useState(false);

  // Cache Layout Preferences automatically
  useEffect(() => {
    localStorage.setItem("mock_schema", JSON.stringify(fields));
  }, [fields]);

  // --- TOOL A IMPLEMENTATION LOGIC ---
  const addField = () => {
    const newId = Date.now().toString();
    setFields([
      ...fields,
      { id: newId, name: `field_${fields.length + 1}`, type: "fullName" },
    ]);
  };
  const removeField = (id) => setFields(fields.filter((f) => f.id !== id));
  const updateField = (id, key, value) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const generatedData = useMemo(() => {
    const rows = [];
    for (let i = 0; i < count; i++) {
      const record = {};
      fields.forEach((field) => {
        if (!field.name) return;
        const typeConfig = DATA_TYPES.find((t) => t.id === field.type);
        record[field.name] = typeConfig ? typeConfig.fn() : "";
      });
      rows.push(record);
    }
    return rows;
  }, [fields, count]);

  const outputString = useMemo(() => {
    if (generatedData.length === 0) return "";
    if (activeTab === "csv") return convertToCSV(generatedData);
    if (activeTab === "sql") return convertToSQL(generatedData);
    return JSON.stringify(generatedData, null, 2);
  }, [generatedData, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputString], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mock_data.${activeTab}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- TOOL B IMPLEMENTATION CODES ---
  const runConversionPipeline = () => {
    if (conversionDirection === "css-to-tw") {
      executeCssToTailwind();
    } else {
      executeTailwindToCss();
    }
  };

  // REVERSE COMPILER MECHANISM
  // REVERSE COMPILER MECHANISM WITH LIVE VALIDATION
  const executeTailwindToCss = () => {
    let cleanInput = cssInput
      .replace(/className\s*=\s*["']/gi, "")
      .replace(/["']/g, "")
      .trim();
    let tokens = cleanInput.split(/\s+/);
    let cssRules = [];
    let warnings = [];

    // Track unique rules to prevent duplicate printouts (like double "display: flex;")
    let uniqueRuleSet = new Set();

    tokens.forEach((token) => {
      if (!token) return;

      // 1. Exact Dictionary Lookup (Prevents flex-1 matching flex)
      if (TAILWIND_TO_CSS_MAP[token]) {
        uniqueRuleSet.add(TAILWIND_TO_CSS_MAP[token]);
        return;
      }

      // 2. Strict Positioned Spacing Regex Matcher
      const spacingMatch = token.match(
        /^(m|p)(t|b|l|r)?-(?:\[([^\]]+)\]|(\d+))$/,
      );
      if (spacingMatch) {
        const [_, base, direction, arbitrary, scale] = spacingMatch;
        const propBase = base === "m" ? "margin" : "padding";
        let dirName =
          direction === "t"
            ? "-top"
            : direction === "b"
              ? "-bottom"
              : direction === "l"
                ? "-left"
                : direction === "r"
                  ? "-right"
                  : "";
        let value = arbitrary ? arbitrary : `${parseInt(scale, 10) * 4}px`;
        uniqueRuleSet.add(`${propBase}${dirName}: ${value};`);
        return;
      }

      // 3. Positioned Hex Color Matcher
      const arbitraryColorMatch = token.match(/^(bg|text)-\[([^\]]+)\]$/);
      if (arbitraryColorMatch) {
        const [_, type, hexValue] = arbitraryColorMatch;
        if (
          /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hexValue)
        ) {
          uniqueRuleSet.add(
            `${type === "bg" ? "background-color" : "color"}: ${hexValue};`,
          );
        } else {
          warnings.push(
            `/* ⚠️ Invalid Token: "${hexValue}" is not a valid hex code */`,
          );
        }
        return;
      }
    });

    // Format array values with standard code indentation
    uniqueRuleSet.forEach((rule) => {
      cssRules.push(`  ${rule}`);
    });

    let output = warnings.length > 0 ? `${warnings.join("\n")}\n\n` : "";
    setTailwindOutput(
      cssRules.length > 0
        ? `${output}.compiled-component {\n${cssRules.join("\n")}\n}`
        : `/* No rules mapped */`,
    );
  };

  // FORWARD COMPILER MECHANISM
  const executeCssToTailwind = () => {
    let cleanInput = cssInput.replace(/\/\*[\s\S]*?\*\//g, "");
    const blockRegex = /([^{]+)\s*\{\s*([^}]+)\s*\}/g;
    let matches = [...cleanInput.matchAll(blockRegex)];

    if (matches.length === 0) {
      setTailwindOutput(`// Error: No CSS blocks discovered.`);
      return;
    }

    let mergedSelectors = {};
    matches.forEach((block) => {
      const rawSelector = block[1].trim();
      const blockContent = block[2].trim();
      if (/^\d+%$/i.test(rawSelector)) return;
      mergedSelectors[rawSelector] = mergedSelectors[rawSelector]
        ? `${mergedSelectors[rawSelector]}\n${blockContent}`
        : blockContent;
    });

    let finalOutputBlocks = [];

    Object.keys(mergedSelectors).forEach((selector) => {
      const blockContent = mergedSelectors[selector];
      let twClasses = [];
      let statePrefix = selector.includes(":hover")
        ? "hover:"
        : selector.includes(":focus")
          ? "focus:"
          : selector.includes(":active")
            ? "active:"
            : "";

      const extractValue = (property) => {
        const regex = new RegExp(
          `(?:^|\\s|;)${property}\\s*:\\s*([^;\\n\\r]+);?`,
          "gi",
        );
        const propertyMatches = [...blockContent.matchAll(regex)];
        return propertyMatches.length > 0
          ? propertyMatches[propertyMatches.length - 1][1].trim()
          : null;
      };

      const spacingProperties = [
        { css: "margin-top", tw: "mt" },
        { css: "margin-bottom", tw: "mb" },
        { css: "margin-left", tw: "ml" },
        { css: "margin-right", tw: "mr" },
        { css: "margin", tw: "m" },
        { css: "padding-top", tw: "pt" },
        { css: "padding-bottom", tw: "pb" },
        { css: "padding-left", tw: "pl" },
        { css: "padding-right", tw: "pr" },
        { css: "padding", tw: "p" },
      ];

      let processedDirections = new Set();
      spacingProperties.forEach(({ css, tw }) => {
        if (processedDirections.has(css)) return;
        const rawVal = extractValue(css);
        if (rawVal) {
          processedDirections.add(css);
          if (rawVal.includes("px") && !rawVal.includes(" ")) {
            const pixels = parseInt(rawVal, 10);
            twClasses.push(
              pixels % 4 === 0
                ? `${statePrefix}${tw}-${pixels / 4}`
                : `${statePrefix}${tw}-[${pixels}px]`,
            );
          }
        }
      });

      const radiusVal = extractValue("border-radius");
      if (radiusVal && radiusVal.includes("px")) {
        const p = parseInt(radiusVal, 10);
        twClasses.push(
          `${statePrefix}${p === 4 ? "rounded-sm" : p === 8 ? "rounded-lg" : p >= 999 ? "rounded-full" : "rounded-md"}`,
        );
      }

      const bgVal = extractValue("background-color");
      if (bgVal)
        twClasses.push(
          `${statePrefix}${bgVal.toLowerCase() === "#4f46e5" ? "bg-indigo-600" : `bg-[${bgVal}]`}`,
        );

      const colorVal = extractValue("color");
      if (colorVal)
        twClasses.push(
          `${statePrefix}${colorVal.toLowerCase() === "#ffffff" ? "text-white" : `text-[${colorVal}]`}`,
        );

      const displayVal = extractValue("display");
      if (displayVal === "flex" || displayVal === "grid")
        twClasses.push(`${statePrefix}${displayVal}`);

      if (twClasses.length > 0)
        finalOutputBlocks.push(
          `// Target Selector: ${selector}\nclassName="${twClasses.join(" ")}"`,
        );
    });

    setTailwindOutput(finalOutputBlocks.join("\n\n"));
  };

  const handleCssCopy = () => {
    navigator.clipboard.writeText(tailwindOutput);
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  // --- NEW FEATURE LOGIC FOR SYNC BUTTON ---
  // --- SYSTEM DYNAMIC FILE EXPORT ROUTER ---
  const handleExportBlueprint = () => {
    let finalContent = "";
    let fileExtension = "json";

    // 1. If the user is actively working inside the DATA MOCK ENGINE
    if (activeTool === "generator") {
      finalContent = outputString;
      fileExtension = activeTab; // ⚡ DYNAMICALLY MATCHES 'json', 'csv', or 'sql' FROM CODE TAB STATE
    }
    // 2. If the user is actively working inside the SWITCHER TRANSFORMER
    else if (activeTool === "css-converter") {
      finalContent = tailwindOutput || "/* No translation compiled */";
      // Saves as .js if compiling to Tailwind classes, or .css if compiling to Classic CSS
      fileExtension = conversionDirection === "css-to-tw" ? "js" : "css";
    }

    // Standard client-side download block execution
    const blob = new Blob([finalContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Generates contextual file names based on user workspace tool selection
    const prefix =
      activeTool === "generator"
        ? "devforge_mock_data"
        : "devforge_compiled_styles";
    link.download = `${prefix}.${fileExtension}`; // ⚡ ASSEMBLIES DYNAMIC FILE EXTENSION

    link.click();
    URL.revokeObjectURL(url);
    setIsDeployModalOpen(false); // Cleanly closes out the ad popup panel container
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-[#e4e6eb] flex flex-col font-sans antialiased selection:bg-[#ff5a5a]/20">
      {/* Global Header Command Control Panel */}
      <header className="border-b border-[#1c1f2b] bg-[#11131a] px-6 py-3.5 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-black uppercase tracking-wider text-white">
            DevForge
            <span className="text-cyber-red text-xs ml-1 font-bold lowercase tracking-normal">
              v2.4
            </span>
          </h1>
          <div className="hidden md:flex items-center bg-[#090a0d] border border-[#1f222e] rounded-lg px-3 py-1.5 w-64 text-slate-500 gap-2 focus-within:border-[#ff5a5a]/40 transition">
            <span className="text-xs">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search columns or filters..."
              className="bg-transparent text-xs outline-none w-full text-slate-300 placeholder-slate-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-[#13151c] border border-[#1f222e] px-3.5 py-1.5 rounded-lg text-[11px] font-mono">
            <span className="h-2 w-2 bg-cyber-red rounded-full animate-pulse" />
            <span className="text-slate-400 font-medium">
              Uptime: <span className="text-white font-bold">99.99%</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Matrix Workspace Container Frame */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-[#161821] bg-[#090a0d] p-4 flex flex-col justify-between hidden md:flex">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTool("generator")}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition ${activeTool === "generator" ? "bg-[#13151c] text-cyber-red border-[#ff5a5a]/30" : "text-slate-400 hover:bg-[#13151c]/40 border-transparent"}`}
            >
              📊 Data Engine
            </button>
            <button
              onClick={() => setActiveTool("css-converter")}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition ${activeTool === "css-converter" ? "bg-[#13151c] text-cyber-red border-[#ff5a5a]/30" : "text-slate-400 hover:bg-[#13151c]/40 border-transparent"}`}
            >
              🔄 Transformer
            </button>
          </div>
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="text-left text-[11px] text-slate-500 hover:text-slate-300 font-medium font-mono px-3 underline underline-offset-4 mb-4"
          >
            🔒 VIEW PRIVACY REGULATION
          </button>
        </aside>

        {/* Dynamic Tool Content Viewer Panels */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTool === "generator" && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-full">
              <div className="lg:col-span-5 p-6 border-r border-[#161821] overflow-y-auto max-h-full space-y-5">
                <div className="flex justify-between items-center bg-[#13151c] p-4 rounded-xl border border-[#1f222e]">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                      Data Mock Engine
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Configure database schema configuration matrices
                    </p>
                  </div>
                  <button
                    onClick={addField}
                    className="text-xs font-bold bg-cyber-red hover:bg-[#e04f4f] text-slate-950 px-4 py-2 rounded-md transition shadow-md shadow-[#ff5a5a]/10"
                  >
                    + New Field
                  </button>
                </div>

                <div className="space-y-2.5">
                  {fields
                    .filter(
                      (f) =>
                        f.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        f.type
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                    )
                    .map((f) => {
                      const isDuplicate =
                        fields.filter(
                          (field) =>
                            field.name.trim() === f.name.trim() &&
                            f.name.trim() !== "",
                        ).length > 1;
                      return (
                        <div
                          key={f.id}
                          className="flex flex-col bg-[#13151c]/40 p-3 rounded-xl border border-[#1f222e]/80 group relative"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              value={f.name}
                              onChange={(e) =>
                                updateField(
                                  f.id,
                                  "name",
                                  e.target.value.replace(/\s+/g, "_"),
                                )
                              }
                              className={`bg-[#090a0d] border rounded-lg px-3.5 py-1.5 text-xs font-medium font-mono text-slate-200 flex-1 focus:outline-none transition ${isDuplicate ? "border-red-500/50 focus:border-red-500" : "border-[#1f222e] focus:border-[#ff5a5a]/50"}`}
                            />
                            <select
                              value={f.type}
                              onChange={(e) =>
                                updateField(f.id, "type", e.target.value)
                              }
                              className="bg-[#090a0d] border border-[#1f222e] rounded-lg px-3.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#ff5a5a]/50 cursor-pointer"
                            >
                              {DATA_TYPES.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.label}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => removeField(f.id)}
                              className="text-slate-600 hover:text-cyber-red px-1 transition"
                            >
                              ✕
                            </button>
                          </div>
                          {isDuplicate && (
                            <span className="text-[10px] text-red-400 font-medium mt-1.5 ml-1 flex items-center gap-1 animate-pulse">
                              ⚠️ Duplicate column key detected. Rename this
                              field to avoid override data loss.
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>

                <div className="pt-4 border-t border-[#161821] space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-400">
                      Batch Capacity Volumetric Scale
                    </span>
                    <span className="text-cyber-red font-mono bg-[#ff5a5a]/5 px-2.5 py-1 border border-[#ff5a5a]/10 rounded-md">
                      {count} Entities
                    </span>
                  </div>
                  <div className="bg-[#13151c] p-4 rounded-xl border border-[#1f222e]">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="w-full h-1 bg-[#090a0d] rounded-lg appearance-none accent-cyber-red cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#090a0d] p-6 flex flex-col max-h-full">
                <div className="flex justify-between items-center mb-4 bg-[#13151c] p-2.5 rounded-xl border border-[#1f222e]">
                  <div className="flex bg-[#090a0d] p-1 rounded-lg border border-[#161821]">
                    {["json", "csv", "sql"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`px-4.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition ${activeTab === t ? "bg-[#1c1f2b] text-cyber-red border border-[#ff5a5a]/20" : "text-slate-500 hover:text-slate-300"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {/* 💡 This now safely forces the user to see the ad wrapper before anything downloads */}
                    <button
                      onClick={() => setIsDeployModalOpen(true)}
                      className="text-xs font-bold bg-[#090a0d] border border-[#1f222e] text-slate-300 hover:bg-[#1c1f2b] px-4 py-2 rounded-lg transition"
                    >
                      💾 Export File
                    </button>
                    <button
                      onClick={handleCopy}
                      className="text-xs font-bold bg-cyber-red hover:bg-[#e04f4f] text-slate-950 px-4 py-2 rounded-lg transition"
                    >
                      {copied ? "✅ COPIED" : "📋 COPY DATA"}
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-[#050608] border border-[#161821] rounded-xl p-5 font-mono text-xs text-emerald-400 overflow-auto select-all shadow-inner leading-relaxed whitespace-pre-wrap">
                  {outputString}
                </div>
              </div>
            </div>
          )}

          {activeTool === "css-converter" && (
            <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4 h-full">
              <div className="flex bg-[#13151c] p-1.5 rounded-xl border border-[#1f222e] self-start shadow-md">
                <button
                  onClick={() => {
                    setConversionDirection("css-to-tw");
                    setCssInput(".btn {\n  margin-top: 16px;\n}");
                  }}
                  className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${conversionDirection === "css-to-tw" ? "bg-cyber-red text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
                >
                  CSS ➔ TAILWIND
                </button>
                <button
                  onClick={() => {
                    setConversionDirection("tw-to-css");
                    setCssInput("mt-4 flex bg-[#123456]");
                  }}
                  className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${conversionDirection === "tw-to-css" ? "bg-cyber-red text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
                >
                  TAILWIND ➔ CSS
                </button>
              </div>
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden gap-5 h-full pb-2">
                <div className="flex flex-col space-y-3 h-full">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>
                      {conversionDirection === "css-to-tw"
                        ? "Source Core Stylesheet"
                        : "Tailwind Utility Token Input"}
                    </span>
                    <button
                      onClick={runConversionPipeline}
                      className="bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-md transition"
                    >
                      RUN TRANSPILER
                    </button>
                  </div>
                  <textarea
                    value={cssInput}
                    onChange={(e) => setCssInput(e.target.value)}
                    className="flex-1 bg-[#090a0d] border border-[#161821] rounded-xl p-5 font-mono text-xs text-slate-300 focus:outline-none focus:border-[#ff5a5a]/40 resize-none leading-relaxed h-full shadow-inner"
                  />
                </div>
                <div className="flex flex-col space-y-3 h-full">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>Transpiled Manifest Output</span>
                    <button
                      onClick={handleCssCopy}
                      className="text-xs font-bold bg-[#13151c] border border-[#1f222e] text-slate-300 hover:bg-[#1c1f2b] px-4 py-1.5 rounded-md transition"
                    >
                      {cssCopied ? "✅ VERIFIED" : "📋 COPY BLOCK"}
                    </button>
                  </div>
                  <div className="flex-1 bg-[#050608] border border-[#161821] rounded-xl p-5 font-mono text-xs text-cyan-400 overflow-auto whitespace-pre leading-relaxed h-full shadow-inner">
                    {tailwindOutput ||
                      "/* Execute matrix mapping compilation parameters above to parse parameters. */"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🛠️ MODAL 1: HIGH-AD REVENUE DEPLOYMENT MODAL */}
      {/* 🛠️ MODAL 1: OPTIMIZED MONETIZATION EXPORT MODAL */}
      {isDeployModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#0d0f17] border border-slate-900 max-w-md w-full rounded-2xl p-6 space-y-5 text-center shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              💾 Preparing File Export
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              To support our free serverless workspace utilities, please
              evaluate our platform partner sponsors below while your download
              compiles!
            </p>

            {/* AD PLACEMENT WRAPPER BOX */}
            <div className="bg-[#090a0d] border border-[#1f222e] h-32 flex items-center justify-center rounded-xl text-[11px] text-slate-600 font-mono shadow-inner">
              [ Sponsored Ad Unit Placeholder Container ]
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeployModalOpen(false)}
                className="flex-1 bg-[#1a1d29] hover:bg-[#232738] text-slate-300 text-xs font-semibold py-2.5 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleExportBlueprint}
                className="flex-1 bg-cyber-red hover:bg-[#e04f4f] text-slate-950 text-xs font-bold py-2.5 rounded-xl transition shadow-md shadow-[#ff5a5a]/10"
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🛠️ MODAL 2: AD-NETWORK REQUIRED PRIVACY COMPLIANCE MODAL */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#0d0f17] border border-slate-900 max-w-lg w-full rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              🔒 Workspace Privacy Regulations
            </h3>
            <div className="space-y-2.5 text-left font-medium text-slate-400 text-[11px] leading-relaxed">
              <p>
                DevForge Workspace utilizes sandbox mechanics. All compilation
                cycles, data generations, mock blueprint translations, and files
                execute completely inside your native local browser client
                instance engine layer.
              </p>
              <p className="font-bold text-slate-300 border-t border-slate-900 pt-2 mt-2">
                Third-Party Cookie Usage Announcement:
              </p>
              <p>
                To deliver this toolkit completely free without premium
                developer subscriptions, we partner with advertising
                distribution networks (like Carbon Ads/EthicalAds) to display
                contextual advertisements. These automated network frames
                utilize basic platform tracking cookies to serve relevant
                technical ads.
              </p>
            </div>
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-600/10"
            >
              Acknowledge Privacy Matrix
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
