// ============================================================
// TAILWIND → CSS CONVERTER
// Full reverse mapping with arbitrary value support
// ============================================================

const TAILWIND_COLORS = {
  black: "#000000", white: "#ffffff", transparent: "transparent", currentcolor: "currentColor",
  slate: { 50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617" },
  gray: { 50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712" },
  zinc: { 50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b" },
  neutral: { 50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a" },
  stone: { 50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e3",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09" },
  red: { 50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a" },
  orange: { 50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12",950:"#431407" },
  amber: { 50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03" },
  yellow: { 50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006" },
  lime: { 50:"#f7fee7",100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314",950:"#1a2e05" },
  green: { 50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16" },
  emerald: { 50:"#ecfdf5",100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b",950:"#022c22" },
  teal: { 50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a",950:"#042f2e" },
  cyan: { 50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",950:"#083344" },
  sky: { 50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49" },
  blue: { 50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554" },
  indigo: { 50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81",950:"#1e1b4b" },
  violet: { 50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",950:"#2e1065" },
  purple: { 50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764" },
  fuchsia: { 50:"#fdf4ff",100:"#fae8ff",200:"#f5d0fe",300:"#f0abfc",400:"#e879f9",500:"#d946ef",600:"#c026d3",700:"#a21caf",800:"#86198f",900:"#701a75",950:"#4a044e" },
  pink: { 50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843",950:"#500724" },
  rose: { 50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337",950:"#4c0519" },
};

const SHADES = ["50","100","200","300","400","500","600","700","800","900","950"];

function resolveColor(className) {
  const match = className.match(/^(bg|text|border|ring|shadow|outline|accent|caret|decoration|placeholder|fill|stroke|from|to|via)-(.+)$/);
  if (!match) return null;
  const prefix = match[1];
  const rest = match[2];

  // Split opacity modifier: bg-white/10 → colorPart="white", opacity=0.1
  const parts = rest.split("/");
  const colorPart = parts[0];
  const opacity = parts[1] ? parseInt(parts[1]) / 100 : null;

  // Resolve hex from color string
  let hex = null;
  let isNamed = false;
  if (colorPart === "white") { hex = "#ffffff"; isNamed = true; }
  else if (colorPart === "black") { hex = "#000000"; isNamed = true; }
  else if (colorPart === "transparent") { hex = "transparent"; isNamed = true; }
  else if (colorPart === "current" || colorPart === "currentcolor") { hex = "currentColor"; isNamed = true; }
  else if (colorPart.startsWith("[")) {
    // Arbitrary value: bg-[#333], text-[rgb(1,2,3)], bg-[100px]
    const val = colorPart.slice(1, -1);
    const prop = prefix === "bg" ? "background-color" : prefix === "text" ? "color" : prefix === "border" ? "border-color" : prefix === "ring" ? "box-shadow" : `${prefix}-color`;
    if (prefix === "ring") return `box-shadow: 0 0 0 ${val} ${val};`;
    if (prefix === "shadow") return `box-shadow: ${val};`;
    return `${prop}: ${val};`;
  }
  else {
    // Find color-shade: bg-red-500, border-gray-200
    const colorParts = colorPart.split("-");
    const lastPart = colorParts[colorParts.length - 1];
    if (SHADES.includes(lastPart) && colorParts.length >= 2) {
      const shade = lastPart;
      const colorName = colorParts.slice(0, -1).join("-");
      const colorGroup = TAILWIND_COLORS[colorName];
      if (colorGroup && typeof colorGroup !== "string") {
        hex = colorGroup[shade];
      }
    }
  }

  if (!hex) return null;

  const prop = prefix === "bg" ? "background-color" : prefix === "text" ? "color" : prefix === "fill" ? "fill" : prefix === "stroke" ? "stroke" : prefix === "ring" ? "box-shadow" : prefix === "shadow" ? "box-shadow" : "border-color";

  // Apply opacity if present
  let finalColor = hex;
  if (opacity !== null && hex !== "transparent" && hex !== "currentColor") {
    const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, "0");
    finalColor = `${hex}${alphaHex}`;
  }

  if (prefix === "ring") {
    const ringSize = isNamed ? "1px" : "1px";
    return `box-shadow: 0 0 0 ${ringSize} ${finalColor};`;
  }
  if (prefix === "shadow") return `box-shadow: 0 4px 6px -1px ${finalColor};`;
  return `${prop}: ${finalColor};`;
}

// Static class → CSS mapping
const STATIC_MAP = {
  // Display
  'flex': 'display: flex;', 'inline-flex': 'display: inline-flex;',
  'grid': 'display: grid;', 'inline-grid': 'display: inline-grid;',
  'hidden': 'display: none;', 'block': 'display: block;',
  'inline-block': 'display: inline-block;', 'inline': 'display: inline;',
  'table': 'display: table;', 'flow-root': 'display: flow-root;',
  'table-row': 'display: table-row;', 'table-cell': 'display: table-cell;',
  'contents': 'display: contents;', 'list-item': 'display: list-item;',

  // Flex direction
  'flex-row': 'flex-direction: row;',
  'flex-row-reverse': 'flex-direction: row-reverse;',
  'flex-col': 'flex-direction: column;',
  'flex-col-reverse': 'flex-direction: column-reverse;',

  // Flex wrap
  'flex-wrap': 'flex-wrap: wrap;',
  'flex-wrap-reverse': 'flex-wrap: wrap-reverse;',
  'flex-nowrap': 'flex-wrap: nowrap;',

  // Flex
  'flex-1': 'flex: 1 1 0%;', 'flex-auto': 'flex: 1 1 auto;',
  'flex-initial': 'flex: 0 1 auto;', 'flex-none': 'flex: none;',
  'grow': 'flex-grow: 1;', 'grow-0': 'flex-grow: 0;',
  'shrink': 'flex-shrink: 1;', 'shrink-0': 'flex-shrink: 0;',

  // Justify
  'justify-start': 'justify-content: flex-start;',
  'justify-end': 'justify-content: flex-end;',
  'justify-center': 'justify-content: center;',
  'justify-between': 'justify-content: space-between;',
  'justify-around': 'justify-content: space-around;',
  'justify-evenly': 'justify-content: space-evenly;',
  'justify-items-start': 'justify-items: start;',
  'justify-items-end': 'justify-items: end;',
  'justify-items-center': 'justify-items: center;',
  'justify-items-stretch': 'justify-items: stretch;',

  // Align
  'items-start': 'align-items: flex-start;',
  'items-end': 'align-items: flex-end;',
  'items-center': 'align-items: center;',
  'items-baseline': 'align-items: baseline;',
  'items-stretch': 'align-items: stretch;',

  'self-auto': 'align-self: auto;',
  'self-start': 'align-self: flex-start;',
  'self-end': 'align-self: flex-end;',
  'self-center': 'align-self: center;',
  'self-stretch': 'align-self: stretch;',

  'place-content-center': 'place-content: center;',
  'place-items-center': 'place-items: center;',
  'place-items-start': 'place-items: start;',
  'place-items-end': 'place-items: end;',
  'place-items-stretch': 'place-items: stretch;',

  // Order
  'order-first': 'order: -9999;', 'order-last': 'order: 9999;',
  'order-none': 'order: 0;',
  'order-1': 'order: 1;', 'order-2': 'order: 2;', 'order-3': 'order: 3;',
  'order-4': 'order: 4;', 'order-5': 'order: 5;', 'order-6': 'order: 6;',
  'order-7': 'order: 7;', 'order-8': 'order: 8;', 'order-9': 'order: 9;',
  'order-10': 'order: 10;', 'order-11': 'order: 11;', 'order-12': 'order: 12;',

  // Grid cols
  'grid-cols-1': 'grid-template-columns: repeat(1, minmax(0, 1fr));',
  'grid-cols-2': 'grid-template-columns: repeat(2, minmax(0, 1fr));',
  'grid-cols-3': 'grid-template-columns: repeat(3, minmax(0, 1fr));',
  'grid-cols-4': 'grid-template-columns: repeat(4, minmax(0, 1fr));',
  'grid-cols-5': 'grid-template-columns: repeat(5, minmax(0, 1fr));',
  'grid-cols-6': 'grid-template-columns: repeat(6, minmax(0, 1fr));',
  'grid-cols-7': 'grid-template-columns: repeat(7, minmax(0, 1fr));',
  'grid-cols-8': 'grid-template-columns: repeat(8, minmax(0, 1fr));',
  'grid-cols-9': 'grid-template-columns: repeat(9, minmax(0, 1fr));',
  'grid-cols-10': 'grid-template-columns: repeat(10, minmax(0, 1fr));',
  'grid-cols-11': 'grid-template-columns: repeat(11, minmax(0, 1fr));',
  'grid-cols-12': 'grid-template-columns: repeat(12, minmax(0, 1fr));',
  'grid-cols-none': 'grid-template-columns: none;',
  'grid-cols-subgrid': 'grid-template-columns: subgrid;',

  // Grid rows
  'grid-rows-1': 'grid-template-rows: repeat(1, minmax(0, 1fr));',
  'grid-rows-2': 'grid-template-rows: repeat(2, minmax(0, 1fr));',
  'grid-rows-3': 'grid-template-rows: repeat(3, minmax(0, 1fr));',
  'grid-rows-4': 'grid-template-rows: repeat(4, minmax(0, 1fr));',
  'grid-rows-5': 'grid-template-rows: repeat(5, minmax(0, 1fr));',
  'grid-rows-6': 'grid-template-rows: repeat(6, minmax(0, 1fr));',
  'grid-rows-none': 'grid-template-rows: none;',

  // Col/row span
  'col-span-full': 'grid-column: 1 / -1;',
  'row-span-full': 'grid-row: 1 / -1;',

  // Gap
  'gap-0': 'gap: 0px;', 'gap-px': 'gap: 1px;',
  'gap-0.5': 'gap: 2px;', 'gap-1': 'gap: 4px;',
  'gap-1.5': 'gap: 6px;', 'gap-2': 'gap: 8px;',
  'gap-2.5': 'gap: 10px;', 'gap-3': 'gap: 12px;',
  'gap-3.5': 'gap: 14px;', 'gap-4': 'gap: 16px;',
  'gap-5': 'gap: 20px;', 'gap-6': 'gap: 24px;',
  'gap-7': 'gap: 28px;', 'gap-8': 'gap: 32px;',
  'gap-9': 'gap: 36px;', 'gap-10': 'gap: 40px;',
  'gap-11': 'gap: 44px;', 'gap-12': 'gap: 48px;',
  'gap-14': 'gap: 56px;', 'gap-16': 'gap: 64px;',
  'gap-20': 'gap: 80px;', 'gap-24': 'gap: 96px;',

  'gap-x-0': 'column-gap: 0px;', 'gap-x-1': 'column-gap: 4px;',
  'gap-x-2': 'column-gap: 8px;', 'gap-x-3': 'column-gap: 12px;',
  'gap-x-4': 'column-gap: 16px;', 'gap-x-5': 'column-gap: 20px;',
  'gap-x-6': 'column-gap: 24px;', 'gap-x-8': 'column-gap: 32px;',
  'gap-x-10': 'column-gap: 40px;', 'gap-x-12': 'column-gap: 48px;',

  'gap-y-0': 'row-gap: 0px;', 'gap-y-1': 'row-gap: 4px;',
  'gap-y-2': 'row-gap: 8px;', 'gap-y-3': 'row-gap: 12px;',
  'gap-y-4': 'row-gap: 16px;', 'gap-y-5': 'row-gap: 20px;',
  'gap-y-6': 'row-gap: 24px;', 'gap-y-8': 'row-gap: 32px;',
  'gap-y-10': 'row-gap: 40px;', 'gap-y-12': 'row-gap: 48px;',

  // Padding
  'p-0': 'padding: 0px;', 'p-px': 'padding: 1px;',
  'p-0.5': 'padding: 2px;', 'p-1': 'padding: 4px;',
  'p-1.5': 'padding: 6px;', 'p-2': 'padding: 8px;',
  'p-2.5': 'padding: 10px;', 'p-3': 'padding: 12px;',
  'p-3.5': 'padding: 14px;', 'p-4': 'padding: 16px;',
  'p-5': 'padding: 20px;', 'p-6': 'padding: 24px;',
  'p-7': 'padding: 28px;', 'p-8': 'padding: 32px;',
  'p-9': 'padding: 36px;', 'p-10': 'padding: 40px;',
  'p-11': 'padding: 44px;', 'p-12': 'padding: 48px;',
  'p-14': 'padding: 56px;', 'p-16': 'padding: 64px;',
  'p-20': 'padding: 80px;', 'p-24': 'padding: 96px;',

  'px-0': 'padding-left: 0px; padding-right: 0px;',
  'px-px': 'padding-left: 1px; padding-right: 1px;',
  'px-0.5': 'padding-left: 2px; padding-right: 2px;',
  'px-1': 'padding-left: 4px; padding-right: 4px;',
  'px-1.5': 'padding-left: 6px; padding-right: 6px;',
  'px-2': 'padding-left: 8px; padding-right: 8px;',
  'px-2.5': 'padding-left: 10px; padding-right: 10px;',
  'px-3': 'padding-left: 12px; padding-right: 12px;',
  'px-3.5': 'padding-left: 14px; padding-right: 14px;',
  'px-4': 'padding-left: 16px; padding-right: 16px;',
  'px-5': 'padding-left: 20px; padding-right: 20px;',
  'px-6': 'padding-left: 24px; padding-right: 24px;',
  'px-8': 'padding-left: 32px; padding-right: 32px;',
  'px-10': 'padding-left: 40px; padding-right: 40px;',

  'py-0': 'padding-top: 0px; padding-bottom: 0px;',
  'py-px': 'padding-top: 1px; padding-bottom: 1px;',
  'py-0.5': 'padding-top: 2px; padding-bottom: 2px;',
  'py-1': 'padding-top: 4px; padding-bottom: 4px;',
  'py-1.5': 'padding-top: 6px; padding-bottom: 6px;',
  'py-2': 'padding-top: 8px; padding-bottom: 8px;',
  'py-2.5': 'padding-top: 10px; padding-bottom: 10px;',
  'py-3': 'padding-top: 12px; padding-bottom: 12px;',
  'py-3.5': 'padding-top: 14px; padding-bottom: 14px;',
  'py-4': 'padding-top: 16px; padding-bottom: 16px;',
  'py-5': 'padding-top: 20px; padding-bottom: 20px;',
  'py-6': 'padding-top: 24px; padding-bottom: 24px;',
  'py-8': 'padding-top: 32px; padding-bottom: 32px;',
  'py-10': 'padding-top: 40px; padding-bottom: 40px;',

  'pt-0': 'padding-top: 0px;', 'pt-1': 'padding-top: 4px;',
  'pt-2': 'padding-top: 8px;', 'pt-3': 'padding-top: 12px;',
  'pt-4': 'padding-top: 16px;', 'pt-5': 'padding-top: 20px;',
  'pt-6': 'padding-top: 24px;', 'pt-8': 'padding-top: 32px;',

  'pb-0': 'padding-bottom: 0px;', 'pb-1': 'padding-bottom: 4px;',
  'pb-2': 'padding-bottom: 8px;', 'pb-3': 'padding-bottom: 12px;',
  'pb-4': 'padding-bottom: 16px;', 'pb-5': 'padding-bottom: 20px;',
  'pb-6': 'padding-bottom: 24px;', 'pb-8': 'padding-bottom: 32px;',

  'pl-0': 'padding-left: 0px;', 'pl-1': 'padding-left: 4px;',
  'pl-2': 'padding-left: 8px;', 'pl-3': 'padding-left: 12px;',
  'pl-4': 'padding-left: 16px;', 'pl-5': 'padding-left: 20px;',
  'pl-6': 'padding-left: 24px;', 'pl-8': 'padding-left: 32px;',

  'pr-0': 'padding-right: 0px;', 'pr-1': 'padding-right: 4px;',
  'pr-2': 'padding-right: 8px;', 'pr-3': 'padding-right: 12px;',
  'pr-4': 'padding-right: 16px;', 'pr-5': 'padding-right: 20px;',
  'pr-6': 'padding-right: 24px;', 'pr-8': 'padding-right: 32px;',

  // Margin
  'm-0': 'margin: 0px;', 'm-auto': 'margin: auto;',
  'm-px': 'margin: 1px;', 'm-0.5': 'margin: 2px;',
  'm-1': 'margin: 4px;', 'm-1.5': 'margin: 6px;',
  'm-2': 'margin: 8px;', 'm-3': 'margin: 12px;',
  'm-4': 'margin: 16px;', 'm-5': 'margin: 20px;',
  'm-6': 'margin: 24px;', 'm-8': 'margin: 32px;',
  'm-10': 'margin: 40px;', 'm-12': 'margin: 48px;',

  'mx-0': 'margin-left: 0px; margin-right: 0px;',
  'mx-auto': 'margin-left: auto; margin-right: auto;',
  'mx-1': 'margin-left: 4px; margin-right: 4px;',
  'mx-2': 'margin-left: 8px; margin-right: 8px;',
  'mx-3': 'margin-left: 12px; margin-right: 12px;',
  'mx-4': 'margin-left: 16px; margin-right: 16px;',
  'mx-6': 'margin-left: 24px; margin-right: 24px;',
  'mx-8': 'margin-left: 32px; margin-right: 32px;',

  'my-0': 'margin-top: 0px; margin-bottom: 0px;',
  'my-auto': 'margin-top: auto; margin-bottom: auto;',
  'my-1': 'margin-top: 4px; margin-bottom: 4px;',
  'my-2': 'margin-top: 8px; margin-bottom: 8px;',
  'my-3': 'margin-top: 12px; margin-bottom: 12px;',
  'my-4': 'margin-top: 16px; margin-bottom: 16px;',
  'my-6': 'margin-top: 24px; margin-bottom: 24px;',
  'my-8': 'margin-top: 32px; margin-bottom: 32px;',

  'mt-0': 'margin-top: 0px;', 'mt-auto': 'margin-top: auto;',
  'mt-1': 'margin-top: 4px;', 'mt-2': 'margin-top: 8px;',
  'mt-3': 'margin-top: 12px;', 'mt-4': 'margin-top: 16px;',
  'mt-5': 'margin-top: 20px;', 'mt-6': 'margin-top: 24px;',
  'mt-8': 'margin-top: 32px;',

  'mb-0': 'margin-bottom: 0px;', 'mb-auto': 'margin-bottom: auto;',
  'mb-1': 'margin-bottom: 4px;', 'mb-2': 'margin-bottom: 8px;',
  'mb-3': 'margin-bottom: 12px;', 'mb-4': 'margin-bottom: 16px;',
  'mb-5': 'margin-bottom: 20px;', 'mb-6': 'margin-bottom: 24px;',
  'mb-8': 'margin-bottom: 32px;',

  'ml-0': 'margin-left: 0px;', 'ml-auto': 'margin-left: auto;',
  'ml-1': 'margin-left: 4px;', 'ml-2': 'margin-left: 8px;',
  'ml-3': 'margin-left: 12px;', 'ml-4': 'margin-left: 16px;',
  'ml-6': 'margin-left: 24px;', 'ml-8': 'margin-left: 32px;',

  'mr-0': 'margin-right: 0px;', 'mr-auto': 'margin-right: auto;',
  'mr-1': 'margin-right: 4px;', 'mr-2': 'margin-right: 8px;',
  'mr-3': 'margin-right: 12px;', 'mr-4': 'margin-right: 16px;',
  'mr-6': 'margin-right: 24px;', 'mr-8': 'margin-right: 32px;',

  // Width
  'w-0': 'width: 0px;', 'w-auto': 'width: auto;', 'w-full': 'width: 100%;',
  'w-screen': 'width: 100vw;', 'w-min': 'width: min-content;',
  'w-max': 'width: max-content;', 'w-fit': 'width: fit-content;',
  'w-1/2': 'width: 50%;', 'w-1/3': 'width: 33.333333%;',
  'w-2/3': 'width: 66.666667%;', 'w-1/4': 'width: 25%;',
  'w-3/4': 'width: 75%;', 'w-1/5': 'width: 20%;',
  'w-2/5': 'width: 40%;', 'w-3/5': 'width: 60%;',
  'w-4/5': 'width: 80%;', 'w-1/6': 'width: 16.666667%;',
  'w-5/6': 'width: 83.333333%;',

  // Min/Max width
  'min-w-0': 'min-width: 0px;', 'min-w-full': 'min-width: 100%;',
  'min-w-min': 'min-width: min-content;', 'min-w-max': 'min-width: max-content;',
  'min-w-fit': 'min-width: fit-content;',
  'max-w-none': 'max-width: none;', 'max-w-full': 'max-width: 100%;',
  'max-w-min': 'max-width: min-content;', 'max-w-max': 'max-width: max-content;',
  'max-w-fit': 'max-width: fit-content;',
  'max-w-xs': 'max-width: 20rem;', 'max-w-sm': 'max-width: 24rem;',
  'max-w-md': 'max-width: 28rem;', 'max-w-lg': 'max-width: 32rem;',
  'max-w-xl': 'max-width: 36rem;', 'max-w-2xl': 'max-width: 42rem;',
  'max-w-3xl': 'max-width: 48rem;', 'max-w-4xl': 'max-width: 56rem;',
  'max-w-5xl': 'max-width: 64rem;', 'max-w-6xl': 'max-width: 72rem;',
  'max-w-7xl': 'max-width: 80rem;',

  // Height
  'h-0': 'height: 0px;', 'h-auto': 'height: auto;', 'h-full': 'height: 100%;',
  'h-screen': 'height: 100vh;', 'h-px': 'height: 1px;',
  'h-min': 'height: min-content;', 'h-max': 'height: max-content;',
  'h-fit': 'height: fit-content;',

  'min-h-0': 'min-height: 0px;', 'min-h-full': 'min-height: 100%;',
  'min-h-screen': 'min-height: 100vh;', 'min-h-min': 'min-height: min-content;',
  'min-h-max': 'min-height: max-content;', 'min-h-fit': 'min-height: fit-content;',

  'max-h-none': 'max-height: none;', 'max-h-full': 'max-height: 100%;',
  'max-h-screen': 'max-height: 100vh;', 'max-h-min': 'max-height: min-content;',
  'max-h-max': 'max-height: max-content;', 'max-h-fit': 'max-height: fit-content;',

  // Font size
  'text-xs': 'font-size: 12px; line-height: 16px;',
  'text-sm': 'font-size: 14px; line-height: 20px;',
  'text-base': 'font-size: 16px; line-height: 24px;',
  'text-lg': 'font-size: 18px; line-height: 28px;',
  'text-xl': 'font-size: 20px; line-height: 28px;',
  'text-2xl': 'font-size: 24px; line-height: 32px;',
  'text-3xl': 'font-size: 30px; line-height: 36px;',
  'text-4xl': 'font-size: 36px; line-height: 40px;',
  'text-5xl': 'font-size: 48px; line-height: 1;',
  'text-6xl': 'font-size: 60px; line-height: 1;',
  'text-7xl': 'font-size: 72px; line-height: 1;',
  'text-8xl': 'font-size: 96px; line-height: 1;',
  'text-9xl': 'font-size: 128px; line-height: 1;',

  // Font weight
  'font-thin': 'font-weight: 100;', 'font-extralight': 'font-weight: 200;',
  'font-light': 'font-weight: 300;', 'font-normal': 'font-weight: 400;',
  'font-medium': 'font-weight: 500;', 'font-semibold': 'font-weight: 600;',
  'font-bold': 'font-weight: 700;', 'font-extrabold': 'font-weight: 800;',
  'font-black': 'font-weight: 900;',

  // Line height
  'leading-none': 'line-height: 1;', 'leading-tight': 'line-height: 1.25;',
  'leading-snug': 'line-height: 1.375;', 'leading-normal': 'line-height: 1.5;',
  'leading-relaxed': 'line-height: 1.625;', 'leading-loose': 'line-height: 2;',

  // Letter spacing
  'tracking-tighter': 'letter-spacing: -0.05em;',
  'tracking-tight': 'letter-spacing: -0.025em;',
  'tracking-normal': 'letter-spacing: 0em;',
  'tracking-wide': 'letter-spacing: 0.025em;',
  'tracking-wider': 'letter-spacing: 0.05em;',
  'tracking-widest': 'letter-spacing: 0.1em;',

  // Text align
  'text-left': 'text-align: left;', 'text-center': 'text-align: center;',
  'text-right': 'text-align: right;', 'text-justify': 'text-align: justify;',

  // Text decoration
  'underline': 'text-decoration-line: underline;',
  'overline': 'text-decoration-line: overline;',
  'line-through': 'text-decoration-line: line-through;',
  'no-underline': 'text-decoration-line: none;',

  // Text transform
  'uppercase': 'text-transform: uppercase;',
  'lowercase': 'text-transform: lowercase;',
  'capitalize': 'text-transform: capitalize;',
  'normal-case': 'text-transform: none;',

  // Font style
  'italic': 'font-style: italic;', 'not-italic': 'font-style: normal;',

  // White space
  'whitespace-normal': 'white-space: normal;',
  'whitespace-nowrap': 'white-space: nowrap;',
  'whitespace-pre': 'white-space: pre;',
  'whitespace-pre-line': 'white-space: pre-line;',
  'whitespace-pre-wrap': 'white-space: pre-wrap;',

  // Word break
  'break-normal': 'overflow-wrap: normal; word-break: normal;',
  'break-words': 'overflow-wrap: break-word;',
  'break-all': 'word-break: break-all;',
  'break-keep': 'word-break: keep-all;',

  // Overflow
  'overflow-hidden': 'overflow: hidden;', 'overflow-auto': 'overflow: auto;',
  'overflow-scroll': 'overflow: scroll;', 'overflow-visible': 'overflow: visible;',
  'overflow-clip': 'overflow: clip;',
  'overflow-x-hidden': 'overflow-x: hidden;', 'overflow-x-auto': 'overflow-x: auto;',
  'overflow-x-scroll': 'overflow-x: scroll;',
  'overflow-y-hidden': 'overflow-y: hidden;', 'overflow-y-auto': 'overflow-y: auto;',
  'overflow-y-scroll': 'overflow-y: scroll;',

  // Position
  'static': 'position: static;', 'fixed': 'position: fixed;',
  'absolute': 'position: absolute;', 'relative': 'position: relative;',
  'sticky': 'position: sticky;',

  // Inset
  'inset-0': 'top: 0px; right: 0px; bottom: 0px; left: 0px;',
  'inset-x-0': 'left: 0px; right: 0px;',
  'inset-y-0': 'top: 0px; bottom: 0px;',
  'top-0': 'top: 0px;', 'top-auto': 'top: auto;', 'top-full': 'top: 100%;',
  'top-1/2': 'top: 50%;',
  'right-0': 'right: 0px;', 'right-auto': 'right: auto;',
  'right-full': 'right: 100%;', 'right-1/2': 'right: 50%;',
  'bottom-0': 'bottom: 0px;', 'bottom-auto': 'bottom: auto;',
  'bottom-full': 'bottom: 100%;', 'bottom-1/2': 'bottom: 50%;',
  'left-0': 'left: 0px;', 'left-auto': 'left: auto;',
  'left-full': 'left: 100%;', 'left-1/2': 'left: 50%;',
  'start-0': 'inset-inline-start: 0px;', 'start-auto': 'inset-inline-start: auto;',
  'end-0': 'inset-inline-end: 0px;', 'end-auto': 'inset-inline-end: auto;',

  // Z-index
  'z-0': 'z-index: 0;', 'z-10': 'z-index: 10;', 'z-20': 'z-index: 20;',
  'z-30': 'z-index: 30;', 'z-40': 'z-index: 40;', 'z-50': 'z-index: 50;',
  'z-auto': 'z-index: auto;',

  // Border width
  'border': 'border-width: 1px;',
  'border-0': 'border-width: 0px;', 'border-2': 'border-width: 2px;',
  'border-4': 'border-width: 4px;', 'border-8': 'border-width: 8px;',
  'border-t': 'border-top-width: 1px;',
  'border-t-0': 'border-top-width: 0px;', 'border-t-2': 'border-top-width: 2px;',
  'border-t-4': 'border-top-width: 4px;',
  'border-b': 'border-bottom-width: 1px;',
  'border-b-0': 'border-bottom-width: 0px;', 'border-b-2': 'border-bottom-width: 2px;',
  'border-b-4': 'border-bottom-width: 4px;',
  'border-l': 'border-left-width: 1px;',
  'border-l-0': 'border-left-width: 0px;', 'border-l-2': 'border-left-width: 2px;',
  'border-l-4': 'border-left-width: 4px;',
  'border-r': 'border-right-width: 1px;',
  'border-r-0': 'border-right-width: 0px;', 'border-r-2': 'border-right-width: 2px;',
  'border-r-4': 'border-right-width: 4px;',
  'border-solid': 'border-style: solid;', 'border-dashed': 'border-style: dashed;',
  'border-dotted': 'border-style: dotted;', 'border-double': 'border-style: double;',
  'border-none': 'border-style: none;',

  // Border radius
  'rounded-none': 'border-radius: 0px;', 'rounded-sm': 'border-radius: 2px;',
  'rounded': 'border-radius: 4px;', 'rounded-md': 'border-radius: 6px;',
  'rounded-lg': 'border-radius: 8px;', 'rounded-xl': 'border-radius: 12px;',
  'rounded-2xl': 'border-radius: 16px;', 'rounded-3xl': 'border-radius: 24px;',
  'rounded-full': 'border-radius: 9999px;',
  'rounded-t': 'border-top-left-radius: 4px; border-top-right-radius: 4px;',
  'rounded-t-md': 'border-top-left-radius: 6px; border-top-right-radius: 6px;',
  'rounded-t-lg': 'border-top-left-radius: 8px; border-top-right-radius: 8px;',
  'rounded-b': 'border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;',
  'rounded-b-md': 'border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;',
  'rounded-b-lg': 'border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;',
  'rounded-l': 'border-top-left-radius: 4px; border-bottom-left-radius: 4px;',
  'rounded-l-md': 'border-top-left-radius: 6px; border-bottom-left-radius: 6px;',
  'rounded-r': 'border-top-right-radius: 4px; border-bottom-right-radius: 4px;',
  'rounded-r-md': 'border-top-right-radius: 6px; border-bottom-right-radius: 6px;',

  // Shadow
  'shadow-sm': 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);',
  'shadow': 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);',
  'shadow-md': 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
  'shadow-lg': 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
  'shadow-xl': 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);',
  'shadow-2xl': 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);',
  'shadow-none': 'box-shadow: none;',
  'shadow-inner': 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);',

  // Opacity
  'opacity-0': 'opacity: 0;', 'opacity-5': 'opacity: 0.05;',
  'opacity-10': 'opacity: 0.1;', 'opacity-15': 'opacity: 0.15;',
  'opacity-20': 'opacity: 0.2;', 'opacity-25': 'opacity: 0.25;',
  'opacity-30': 'opacity: 0.3;', 'opacity-35': 'opacity: 0.35;',
  'opacity-40': 'opacity: 0.4;', 'opacity-45': 'opacity: 0.45;',
  'opacity-50': 'opacity: 0.5;', 'opacity-55': 'opacity: 0.55;',
  'opacity-60': 'opacity: 0.6;', 'opacity-65': 'opacity: 0.65;',
  'opacity-70': 'opacity: 0.7;', 'opacity-75': 'opacity: 0.75;',
  'opacity-80': 'opacity: 0.8;', 'opacity-85': 'opacity: 0.85;',
  'opacity-90': 'opacity: 0.9;', 'opacity-95': 'opacity: 0.95;',
  'opacity-100': 'opacity: 1;',

  // Transition
  'transition-none': 'transition-property: none;',
  'transition-all': 'transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-colors': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-opacity': 'transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-shadow': 'transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',
  'transition-transform': 'transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;',

  // Duration
  'duration-75': 'transition-duration: 75ms;', 'duration-100': 'transition-duration: 100ms;',
  'duration-150': 'transition-duration: 150ms;', 'duration-200': 'transition-duration: 200ms;',
  'duration-300': 'transition-duration: 300ms;', 'duration-500': 'transition-duration: 500ms;',
  'duration-700': 'transition-duration: 700ms;', 'duration-1000': 'transition-duration: 1000ms;',

  // Easing
  'ease-linear': 'transition-timing-function: linear;',
  'ease-in': 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1);',
  'ease-out': 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1);',
  'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);',

  // Cursor
  'cursor-auto': 'cursor: auto;', 'cursor-default': 'cursor: default;',
  'cursor-pointer': 'cursor: pointer;', 'cursor-wait': 'cursor: wait;',
  'cursor-text': 'cursor: text;', 'cursor-move': 'cursor: move;',
  'cursor-help': 'cursor: help;', 'cursor-not-allowed': 'cursor: not-allowed;',
  'cursor-none': 'cursor: none;', 'cursor-progress': 'cursor: progress;',
  'cursor-grab': 'cursor: grab;', 'cursor-grabbing': 'cursor: grabbing;',

  // User select
  'select-none': 'user-select: none;', 'select-all': 'user-select: all;',
  'select-text': 'user-select: text;', 'select-auto': 'user-select: auto;',

  // Pointer events
  'pointer-events-none': 'pointer-events: none;',
  'pointer-events-auto': 'pointer-events: auto;',

  // Resize
  'resize-none': 'resize: none;', 'resize': 'resize: both;',
  'resize-y': 'resize: vertical;', 'resize-x': 'resize: horizontal;',

  // Object fit
  'object-contain': 'object-fit: contain;', 'object-cover': 'object-fit: cover;',
  'object-fill': 'object-fit: fill;', 'object-none': 'object-fit: none;',
  'object-scale-down': 'object-fit: scale-down;',

  // List style
  'list-none': 'list-style-type: none;', 'list-disc': 'list-style-type: disc;',
  'list-decimal': 'list-style-type: decimal;',
  'list-inside': 'list-style-position: inside;',
  'list-outside': 'list-style-position: outside;',

  // Appearance
  'appearance-none': 'appearance: none;',

  // Outline
  'outline-none': 'outline: 2px solid transparent; outline-offset: 2px;',
  'outline': 'outline-style: solid; outline-width: 2px;',

  // Background
  'bg-transparent': 'background-color: transparent;',
  'bg-current': 'background-color: currentColor;',
  'bg-cover': 'background-size: cover;',
  'bg-contain': 'background-size: contain;',
  'bg-no-repeat': 'background-repeat: no-repeat;',
  'bg-center': 'background-position: center;',
  'bg-top': 'background-position: top;',
  'bg-bottom': 'background-position: bottom;',
  'bg-left': 'background-position: left;',
  'bg-right': 'background-position: right;',

  // Text color
  'text-transparent': 'color: transparent;',
  'text-current': 'color: currentColor;',

  // Border color
  'border-transparent': 'border-color: transparent;',
  'border-current': 'border-color: currentColor;',

  // Aspect ratio
  'aspect-square': 'aspect-ratio: 1 / 1;',
  'aspect-video': 'aspect-ratio: 16 / 9;',

  // Content
  'content-none': 'content: none;',

  // Truncate
  'truncate': 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',

  // SR only
  'sr-only': 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;',
  'not-sr-only': 'position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal;',
};

// Try to resolve a class that has an arbitrary value: prop-[value]
function resolveArbitrary(cls) {
  // grid-cols-[1fr_2.5rem_auto]
  const gridColsMatch = cls.match(/^grid-cols-\[(.+)\]$/);
  if (gridColsMatch) return `grid-template-columns: ${gridColsMatch[1].replace(/_/g, " ")};`;

  const gridRowsMatch = cls.match(/^grid-rows-\[(.+)\]$/);
  if (gridRowsMatch) return `grid-template-rows: ${gridRowsMatch[1].replace(/_/g, " ")};`;

  // col-[...] or row-[...]
  const colMatch = cls.match(/^col-\[(.+)\]$/);
  if (colMatch) return `grid-column: ${colMatch[1].replace(/_/g, " ")};`;

  const rowMatch = cls.match(/^row-\[(.+)\]$/);
  if (rowMatch) return `grid-row: ${rowMatch[1].replace(/_/g, " ")};`;

  // col-span-N / row-span-N
  const colSpanMatch = cls.match(/^col-span-(\d+)$/);
  if (colSpanMatch) return `grid-column: span ${colSpanMatch[1]} / span ${colSpanMatch[1]};`;

  const rowSpanMatch = cls.match(/^row-span-(\d+)$/);
  if (rowSpanMatch) return `grid-row: span ${rowSpanMatch[1]} / span ${rowSpanMatch[1]};`;

  // col-start-N / col-end-N / row-start-N / row-end-N
  const colStartMatch = cls.match(/^col-start-(\d+)$/);
  if (colStartMatch) return `grid-column-start: ${colStartMatch[1]};`;
  const colEndMatch = cls.match(/^col-end-(\d+)$/);
  if (colEndMatch) return `grid-column-end: ${colEndMatch[1]};`;
  const rowStartMatch = cls.match(/^row-start-(\d+)$/);
  if (rowStartMatch) return `grid-row-start: ${rowStartMatch[1]};`;
  const rowEndMatch = cls.match(/^row-end-(\d+)$/);
  if (rowEndMatch) return `grid-row-end: ${rowEndMatch[1]};`;

  // Size classes with arbitrary: w-[100px], h-[50vh], p-[20px], m-[auto]
  const sizeMatch = cls.match(/^(w|min-w|max-w|h|min-h|max-h|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|top|right|bottom|left|inset|gap|gap-x|gap-y|text|font-size)-\[(.+)\]$/);
  if (sizeMatch) {
    const prefix = sizeMatch[1];
    const val = sizeMatch[2].replace(/_/g, " ");
    const propMap = {
      "w": "width", "min-w": "min-width", "max-w": "max-width",
      "h": "height", "min-h": "min-height", "max-h": "max-height",
      "p": "padding", "px": "padding-left; padding-right",
      "py": "padding-top; padding-bottom",
      "pt": "padding-top", "pb": "padding-bottom",
      "pl": "padding-left", "pr": "padding-right",
      "m": "margin", "mx": "margin-left; margin-right",
      "my": "margin-top; margin-bottom",
      "mt": "margin-top", "mb": "margin-bottom",
      "ml": "margin-left", "mr": "margin-right",
      "top": "top", "right": "right", "bottom": "bottom", "left": "left",
      "inset": "top; right; bottom; left",
      "gap": "gap", "gap-x": "column-gap", "gap-y": "row-gap",
      "text": "font-size", "font-size": "font-size",
    };
    const prop = propMap[prefix];
    if (!prop) return null;

    if (prefix === "px") return `padding-left: ${val}; padding-right: ${val};`;
    if (prefix === "py") return `padding-top: ${val}; padding-bottom: ${val};`;
    if (prefix === "mx") return `margin-left: ${val}; margin-right: ${val};`;
    if (prefix === "my") return `margin-top: ${val}; margin-bottom: ${val};`;
    if (prefix === "inset") return `top: ${val}; right: ${val}; bottom: ${val}; left: ${val};`;
    return `${prop}: ${val};`;
  }

  // Shadow arbitrary: shadow-[...]
  const shadowMatch = cls.match(/^shadow-\[(.+)\]$/);
  if (shadowMatch) return `box-shadow: ${shadowMatch[1].replace(/_/g, " ")};`;

  // Ring arbitrary: ring-[...]
  const ringMatch = cls.match(/^ring-\[(.+)\]$/);
  if (ringMatch) return `box-shadow: 0 0 0 ${ringMatch[1].replace(/_/g, " ")};`;

  // Border arbitrary: border-[...]
  const borderMatch = cls.match(/^border-\[(.+)\]$/);
  if (borderMatch) return `border-color: ${borderMatch[1].replace(/_/g, " ")};`;

  // Outline arbitrary: outline-[...]
  const outlineMatch = cls.match(/^outline-\[(.+)\]$/);
  if (outlineMatch) return `outline-color: ${outlineMatch[1].replace(/_/g, " ")};`;

  // Background arbitrary: bg-[...]
  const bgMatch = cls.match(/^bg-\[(.+)\]$/);
  if (bgMatch) return `background-color: ${bgMatch[1].replace(/_/g, " ")};`;

  // Text color arbitrary: text-[...]
  const textColorMatch = cls.match(/^text-\[(.+)\]$/);
  if (textColorMatch) {
    const val = textColorMatch[1].replace(/_/g, " ");
    // Could be font-size or color
    if (/^\d/.test(val) || val.includes("rem") || val.includes("px")) {
      return `font-size: ${val};`;
    }
    return `color: ${val};`;
  }

  // Leading arbitrary: leading-[...]
  const leadingMatch = cls.match(/^leading-\[(.+)\]$/);
  if (leadingMatch) return `line-height: ${leadingMatch[1].replace(/_/g, " ")};`;

  // Tracking arbitrary: tracking-[...]
  const trackingMatch = cls.match(/^tracking-\[(.+)\]$/);
  if (trackingMatch) return `letter-spacing: ${trackingMatch[1].replace(/_/g, " ")};`;

  // Z arbitrary: z-[...]
  const zMatch = cls.match(/^z-\[(.+)\]$/);
  if (zMatch) return `z-index: ${zMatch[1]};`;

  // Top/right/bottom/left arbitrary already handled above

  return null;
}

// Handle CSS variable classes: [--variable:value] or [--variable:value]/opacity
function resolveCSSVar(cls) {
  // Match [--var:value] first (without /opacity)
  const varMatch = cls.match(/^\[([a-zA-Z0-9_-]+):(.+)\]$/);
  if (varMatch) {
    const varName = varMatch[1];
    const val = varMatch[2].replace(/_/g, " ");
    return `${varName}: ${val};`;
  }
  // Match [--var:value]/opacity (with /opacity after the closing bracket)
  const varOpMatch = cls.match(/^\[([a-zA-Z0-9_-]+):(.+)\]\/(\d+)$/);
  if (varOpMatch) {
    const varName = varOpMatch[1];
    const val = varOpMatch[2].replace(/_/g, " ");
    const opacity = parseInt(varOpMatch[3]) / 100;
    return `${varName}: color-mix(in srgb, ${val} ${opacity * 100}%, transparent);`;
  }
  return null;
}

// Build @media (prefers-color-scheme: dark) wrapper for dark: prefixed classes
function wrapDark(css) {
  // Return CSS wrapped in a dark mode media query block
  return `@media (prefers-color-scheme: dark) {\n  ${css.trim()}\n}`;
}

export function resolveTailwindClass(cls) {
  // Strip dark: prefix
  const isDark = cls.startsWith("dark:");
  const actualCls = isDark ? cls.slice(5) : cls;

  let css = null;

  // Check static map
  if (STATIC_MAP[actualCls]) {
    css = STATIC_MAP[actualCls];
  }

  // Check colors
  if (!css) {
    css = resolveColor(actualCls);
  }

  // Check arbitrary values
  if (!css) {
    css = resolveArbitrary(actualCls);
  }

  // Check CSS variable classes: [--variable:value] or [--variable:value]/opacity
  if (!css) {
    css = resolveCSSVar(actualCls);
  }

  // Handle prefix-only arbitrary: border-[color] (no value)
  if (!css && actualCls.endsWith("-[")) return null;

  if (!css) return null;

  return isDark ? wrapDark(css) : css;
}

export const TAILWIND_TO_CSS_MAP = new Proxy({}, {
  get(_, prop) {
    return resolveTailwindClass(prop);
  }
});
