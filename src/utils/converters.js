// Convert JSON array to CSV string
export const convertToCSV = (data) => {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
};

// Convert JSON array to SQL Insert Statements
export const convertToSQL = (data, tableName = 'mock_table') => {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const columns = headers.join(', ');
  const sqlRows = data.map(row => {
    const values = headers.map(header => {
      const val = row[header];
      return typeof val === 'number' ? val : `'${String(val).replace(/'/g, "''")}'`;
    });
    return `INSERT INTO ${tableName} (${columns}) VALUES (${values.join(', ')});`;
  });
  return sqlRows.join('\n');
};

// ============================================================
// CSS → TAILWIND CONVERTER
// ============================================================

// Direct exact-match map: "property: value" → "tailwind-class"
const EXACT_MAP = {
  // Display
  "display: flex": "flex",
  "display: grid": "grid",
  "display: none": "hidden",
  "display: block": "block",
  "display: inline-block": "inline-block",
  "display: inline": "inline",
  "display: inline-flex": "inline-flex",
  "display: inline-grid": "inline-grid",
  "display: table": "table",
  "display: flow-root": "flow-root",
  "display: list-item": "list-item",

  // Flex direction
  "flex-direction: row": "flex-row",
  "flex-direction: row-reverse": "flex-row-reverse",
  "flex-direction: column": "flex-col",
  "flex-direction: column-reverse": "flex-col-reverse",

  // Flex wrap
  "flex-wrap: wrap": "flex-wrap",
  "flex-wrap: nowrap": "flex-nowrap",
  "flex-wrap: wrap-reverse": "flex-wrap-reverse",

  // Flex
  "flex: 1": "flex-1",
  "flex: 1 1 0%": "flex-1",
  "flex: 1 1 auto": "flex-auto",
  "flex: 0 1 auto": "flex-initial",
  "flex: none": "flex-none",
  "flex: auto": "flex-auto",
  "flex: initial": "flex-initial",
  "flex-grow: 1": "grow",
  "flex-grow: 0": "grow-0",
  "flex-shrink: 1": "shrink",
  "flex-shrink: 0": "shrink-0",

  // Justify content
  "justify-content: flex-start": "justify-start",
  "justify-content: flex-end": "justify-end",
  "justify-content: center": "justify-center",
  "justify-content: space-between": "justify-between",
  "justify-content: space-around": "justify-around",
  "justify-content: space-evenly": "justify-evenly",
  "justify-content: start": "justify-start",
  "justify-content: end": "justify-end",
  "justify-content: stretch": "justify-stretch",

  // Justify items
  "justify-items: start": "justify-items-start",
  "justify-items: end": "justify-items-end",
  "justify-items: center": "justify-items-center",
  "justify-items: stretch": "justify-items-stretch",

  // Justify self
  "justify-self: auto": "justify-self-auto",
  "justify-self: start": "justify-self-start",
  "justify-self: end": "justify-self-end",
  "justify-self: center": "justify-self-center",
  "justify-self: stretch": "justify-self-stretch",

  // Align items
  "align-items: stretch": "items-stretch",
  "align-items: flex-start": "items-start",
  "align-items: flex-end": "items-end",
  "align-items: center": "items-center",
  "align-items: baseline": "items-baseline",
  "align-items: start": "items-start",
  "align-items: end": "items-end",

  // Align self
  "align-self: auto": "self-auto",
  "align-self: flex-start": "self-start",
  "align-self: flex-end": "self-end",
  "align-self: center": "self-center",
  "align-self: stretch": "self-stretch",
  "align-self: baseline": "self-baseline",

  // Place content/items/self
  "place-content: center": "place-content-center",
  "place-items: center": "place-items-center",
  "place-items: start": "place-items-start",
  "place-items: end": "place-items-end",
  "place-items: stretch": "place-items-stretch",
  "place-self: center": "place-self-center",
  "place-self: start": "place-self-start",
  "place-self: end": "place-self-end",
  "place-self: stretch": "place-self-stretch",

  // Order
  "order: -9999": "order-first",
  "order: 9999": "order-last",
  "order: 0": "order-none",
  "order: 1": "order-1",
  "order: 2": "order-2",
  "order: 3": "order-3",
  "order: 4": "order-4",
  "order: 5": "order-5",
  "order: 6": "order-6",
  "order: 7": "order-7",
  "order: 8": "order-8",
  "order: 9": "order-9",
  "order: 10": "order-10",
  "order: 11": "order-11",
  "order: 12": "order-12",

  // Grid template columns
  "grid-template-columns: none": "grid-cols-none",

  // Grid template rows
  "grid-template-rows: none": "grid-rows-none",

  // Grid column span
  "grid-column: 1 / -1": "col-span-full",

  // Grid row span
  "grid-row: 1 / -1": "row-span-full",

  // Position
  "position: static": "static",
  "position: fixed": "fixed",
  "position: absolute": "absolute",
  "position: relative": "relative",
  "position: sticky": "sticky",

  // Top/right/bottom/left
  "top: auto": "top-auto",
  "right: auto": "right-auto",
  "bottom: auto": "bottom-auto",
  "left: auto": "left-auto",
  "inset: auto": "inset-auto",

  // Z-index
  "z-index: auto": "z-auto",

  // Overflow
  "overflow: hidden": "overflow-hidden",
  "overflow: auto": "overflow-auto",
  "overflow: scroll": "overflow-scroll",
  "overflow: visible": "overflow-visible",
  "overflow: clip": "overflow-clip",
  "overflow-x: hidden": "overflow-x-hidden",
  "overflow-x: auto": "overflow-x-auto",
  "overflow-x: scroll": "overflow-x-scroll",
  "overflow-x: visible": "overflow-x-visible",
  "overflow-x: clip": "overflow-x-clip",
  "overflow-y: hidden": "overflow-y-hidden",
  "overflow-y: auto": "overflow-y-auto",
  "overflow-y: scroll": "overflow-y-scroll",
  "overflow-y: visible": "overflow-y-visible",
  "overflow-y: clip": "overflow-y-clip",

  // Visibility
  "visibility: visible": "visible",
  "visibility: hidden": "invisible",
  "visibility: collapse": "collapse",

  // Cursor
  "cursor: auto": "cursor-auto",
  "cursor: default": "cursor-default",
  "cursor: pointer": "cursor-pointer",
  "cursor: wait": "cursor-wait",
  "cursor: text": "cursor-text",
  "cursor: move": "cursor-move",
  "cursor: help": "cursor-help",
  "cursor: not-allowed": "cursor-not-allowed",
  "cursor: none": "cursor-none",
  "cursor: progress": "cursor-progress",

  // User select
  "user-select: none": "select-none",
  "user-select: all": "select-all",
  "user-select: text": "select-text",
  "user-select: auto": "select-auto",

  // Pointer events
  "pointer-events: none": "pointer-events-none",
  "pointer-events: auto": "pointer-events-auto",

  // Resize
  "resize: none": "resize-none",
  "resize: both": "resize",
  "resize: vertical": "resize-y",
  "resize: horizontal": "resize-x",

  // Object fit
  "object-fit: contain": "object-contain",
  "object-fit: cover": "object-cover",
  "object-fit: fill": "object-fill",
  "object-fit: none": "object-none",
  "object-fit: scale-down": "object-scale-down",

  // List style
  "list-style-type: none": "list-none",
  "list-style-type: disc": "list-disc",
  "list-style-type: decimal": "list-decimal",
  "list-style-position: inside": "list-inside",
  "list-style-position: outside": "list-outside",

  // Appearance
  "appearance: none": "appearance-none",

  // Outline
  "outline: none": "outline-none",

  // Background color
  "background-color: transparent": "bg-transparent",
  "background-color: currentcolor": "bg-current",
  "background-color: currentColor": "bg-current",

  // Color
  "color: transparent": "text-transparent",
  "color: currentcolor": "text-current",
  "color: currentColor": "text-current",

  // Border color
  "border-color: transparent": "border-transparent",
  "border-color: currentcolor": "border-current",
  "border-color: currentColor": "border-current",

  // Border style
  "border-style: solid": "border-solid",
  "border-style: dashed": "border-dashed",
  "border-style: dotted": "border-dotted",
  "border-style: double": "border-double",
  "border-style: none": "border-none",

  // Opacity
  "opacity: 0": "opacity-0",
  "opacity: 0.05": "opacity-5",
  "opacity: 0.1": "opacity-10",
  "opacity: 0.15": "opacity-15",
  "opacity: 0.2": "opacity-20",
  "opacity: 0.25": "opacity-25",
  "opacity: 0.3": "opacity-30",
  "opacity: 0.35": "opacity-35",
  "opacity: 0.4": "opacity-40",
  "opacity: 0.45": "opacity-45",
  "opacity: 0.5": "opacity-50",
  "opacity: 0.55": "opacity-55",
  "opacity: 0.6": "opacity-60",
  "opacity: 0.65": "opacity-65",
  "opacity: 0.7": "opacity-70",
  "opacity: 0.75": "opacity-75",
  "opacity: 0.8": "opacity-80",
  "opacity: 0.85": "opacity-85",
  "opacity: 0.9": "opacity-90",
  "opacity: 0.95": "opacity-95",
  "opacity: 1": "opacity-100",

  // Box shadow
  "box-shadow: none": "shadow-none",

  // Font weight
  "font-weight: 100": "font-thin",
  "font-weight: 200": "font-extralight",
  "font-weight: 300": "font-light",
  "font-weight: 400": "font-normal",
  "font-weight: 500": "font-medium",
  "font-weight: 600": "font-semibold",
  "font-weight: 700": "font-bold",
  "font-weight: 800": "font-extrabold",
  "font-weight: 900": "font-black",

  // Font style
  "font-style: italic": "italic",
  "font-style: normal": "not-italic",

  // Line height
  "line-height: 1": "leading-none",
  "line-height: 1.25": "leading-tight",
  "line-height: 1.375": "leading-snug",
  "line-height: 1.5": "leading-normal",
  "line-height: 1.625": "leading-relaxed",
  "line-height: 2": "leading-loose",
  "line-height: normal": "leading-normal",

  // Letter spacing
  "letter-spacing: -0.05em": "tracking-tighter",
  "letter-spacing: -0.025em": "tracking-tight",
  "letter-spacing: 0em": "tracking-normal",
  "letter-spacing: 0": "tracking-normal",
  "letter-spacing: 0.025em": "tracking-wide",
  "letter-spacing: 0.05em": "tracking-wider",
  "letter-spacing: 0.1em": "tracking-widest",

  // Text align
  "text-align: left": "text-left",
  "text-align: center": "text-center",
  "text-align: right": "text-right",
  "text-align: justify": "text-justify",
  "text-align: start": "text-left",
  "text-align: end": "text-right",

  // Text decoration
  "text-decoration-line: underline": "underline",
  "text-decoration-line: line-through": "line-through",
  "text-decoration-line: overline": "overline",
  "text-decoration-line: none": "no-underline",
  "text-decoration: underline": "underline",
  "text-decoration: line-through": "line-through",
  "text-decoration: none": "no-underline",

  // Text transform
  "text-transform: uppercase": "uppercase",
  "text-transform: lowercase": "lowercase",
  "text-transform: capitalize": "capitalize",
  "text-transform: none": "normal-case",

  // White space
  "white-space: nowrap": "whitespace-nowrap",
  "white-space: pre": "whitespace-pre",
  "white-space: pre-line": "whitespace-pre-line",
  "white-space: pre-wrap": "whitespace-pre-wrap",
  "white-space: normal": "whitespace-normal",

  // Word break
  "word-break: break-all": "break-all",
  "word-break: break-word": "break-words",
  "word-break: normal": "break-normal",
  "overflow-wrap: normal": "break-normal",
  "overflow-wrap: break-word": "break-words",

  // Background size
  "background-size: cover": "bg-cover",
  "background-size: contain": "bg-contain",

  // Background repeat
  "background-repeat: no-repeat": "bg-no-repeat",
  "background-repeat: repeat": "bg-repeat",
  "background-repeat: repeat-x": "bg-repeat-x",
  "background-repeat: repeat-y": "bg-repeat-y",
  "background-repeat: round": "bg-repeat-round",
  "background-repeat: space": "bg-repeat-space",

  // Background position
  "background-position: center": "bg-center",
  "background-position: top": "bg-top",
  "background-position: bottom": "bg-bottom",
  "background-position: left": "bg-left",
  "background-position: right": "bg-right",

  // Border width shorthand
  "border: 1px solid transparent": "border border-transparent",

  // Aspect ratio
  "aspect-ratio: 1 / 1": "aspect-square",
  "aspect-ratio: 16 / 9": "aspect-video",

  // Content
  "content: none": "content-none",
};

// Shorthand property mappings: "property" → prefix for Tailwind
const SHORTHAND_MAP = {
  // Padding
  "padding": "p", "padding-top": "pt", "padding-right": "pr",
  "padding-bottom": "pb", "padding-left": "pl",
  "padding-inline": "px", "padding-inline-start": "ps", "padding-inline-end": "pe",
  "padding-block": "py", "padding-block-start": "pt", "padding-block-end": "pb",
  // Margin
  "margin": "m", "margin-top": "mt", "margin-right": "mr",
  "margin-bottom": "mb", "margin-left": "ml",
  "margin-inline": "mx", "margin-inline-start": "ms", "margin-inline-end": "me",
  "margin-block": "my", "margin-block-start": "mt", "margin-block-end": "mb",
  // Size
  "width": "w", "min-width": "min-w", "max-width": "max-w",
  "height": "h", "min-height": "min-h", "max-height": "max-h",
  // Gap
  "gap": "gap", "row-gap": "gap-y", "column-gap": "gap-x",
  // Inset
  "top": "top", "right": "right", "bottom": "bottom", "left": "left",
  "inset-block-start": "top", "inset-block-end": "bottom",
  "inset-inline-start": "start", "inset-inline-end": "end",
  // Font
  "font-size": "text",
  // Border radius
  "border-radius": "rounded",
  "border-top-left-radius": "rounded-tl",
  "border-top-right-radius": "rounded-tr",
  "border-bottom-left-radius": "rounded-bl",
  "border-bottom-right-radius": "rounded-br",
  // Border width
  "border-width": "border",
  "border-top-width": "border-t",
  "border-right-width": "border-r",
  "border-bottom-width": "border-b",
  "border-left-width": "border-l",
  // Grid
  "grid-template-columns": "grid-cols",
  "grid-template-rows": "grid-rows",
  "grid-column": "col",
  "grid-row": "row",
  // Z-index
  "z-index": "z",
};

// Standard scale values for common Tailwind sizes
const STANDARD_SIZES = {
  0: "0", 0.5: "0.5", 1: "1", 1.5: "1.5", 2: "2", 2.5: "2.5",
  3: "3", 3.5: "3.5", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8",
  9: "9", 10: "10", 11: "11", 12: "12", 14: "14", 16: "16",
  20: "20", 24: "24", 28: "28", 32: "32", 36: "36", 40: "40",
  44: "44", 48: "48", 52: "52", 56: "56", 60: "60", 64: "64",
  72: "72", 80: "80", 96: "96",
};

// Tailwind spacing: p-N = N * 0.25rem = N * 4px
// Map px values to Tailwind spacing scale (px / 4)
const SPACING_PX = {
  1: "0.25", 2: "0.5", 3: "0.75", 4: "1", 5: "1.25", 6: "1.5",
  7: "1.75", 8: "2", 9: "2.25", 10: "2.5", 11: "2.75", 12: "3",
  14: "3.5", 16: "4", 20: "5", 24: "6", 28: "7", 32: "8",
  36: "9", 40: "10", 44: "11", 48: "12", 52: "13", 56: "14",
  60: "15", 64: "16", 72: "18", 80: "20", 96: "24",
};

// Named colors
const NAMED_COLORS = {
  black: "#000000", white: "#ffffff", transparent: "transparent",
  currentcolor: "currentColor", currentColor: "currentColor",
  red: "#ef4444", orange: "#f97316", yellow: "#eab308",
  green: "#22c55e", blue: "#3b82f6", purple: "#a855f7",
  pink: "#ec4899", gray: "#6b7280", grey: "#6b7280",
  slate: "#64748b", zinc: "#71717a", neutral: "#737373",
  stone: "#78716c", amber: "#f59e0b", lime: "#84cc16",
  emerald: "#10b981", teal: "#14b8a6", cyan: "#06b6d4",
  sky: "#0ea5e9", indigo: "#6366f1", violet: "#8b5cf6",
  fuchsia: "#d946ef", rose: "#f43f5e",
};

// Font sizes → Tailwind text classes
const FONT_SIZE_MAP = {
  "10px": "text-[10px]", "11px": "text-[11px]", "12px": "text-xs",
  "13px": "text-[13px]", "14px": "text-sm", "15px": "text-[15px]",
  "16px": "text-base", "18px": "text-lg", "20px": "text-xl",
  "24px": "text-2xl", "30px": "text-3xl", "36px": "text-4xl",
  "48px": "text-5xl", "60px": "text-6xl", "72px": "text-7xl",
  "0.75rem": "text-xs", "0.875rem": "text-sm", "1rem": "text-base",
  "1.125rem": "text-lg", "1.25rem": "text-xl", "1.5rem": "text-2xl",
  "1.875rem": "text-3xl", "2.25rem": "text-4xl", "3rem": "text-5xl",
  "3.75rem": "text-6xl", "4.5rem": "text-7xl", "6rem": "text-8xl",
  "8rem": "text-9xl",
};

// Grid columns
const GRID_COLS_MAP = {
  "1": "grid-cols-1", "2": "grid-cols-2", "3": "grid-cols-3",
  "4": "grid-cols-4", "5": "grid-cols-5", "6": "grid-cols-6",
  "7": "grid-cols-7", "8": "grid-cols-8", "9": "grid-cols-9",
  "10": "grid-cols-10", "11": "grid-cols-11", "12": "grid-cols-12",
};

// Grid rows
const GRID_ROWS_MAP = {
  "1": "grid-rows-1", "2": "grid-rows-2", "3": "grid-rows-3",
  "4": "grid-rows-4", "5": "grid-rows-5", "6": "grid-rows-6",
};

// Parse a CSS value, stripping units and normalizing
function parseValue(val) {
  val = val.trim().replace(/;$/, "").trim();
  return val;
}

// Convert a px/rem value to Tailwind size scale
function valueToTailwindSize(val, isSpacing) {
  val = parseValue(val);
  // px values
  const pxMatch = val.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    const px = parseFloat(pxMatch[1]);
    if (px === 0) return "0";
    // Spacing: p-N = N * 4px, so N = px / 4
    if (isSpacing && SPACING_PX[px]) return SPACING_PX[px];
    // Non-spacing: use STANDARD_SIZES directly
    if (!isSpacing) {
      for (const [sizePx, sizeName] of Object.entries(STANDARD_SIZES)) {
        if (Math.abs(px - parseFloat(sizePx)) < 0.01) return sizeName;
      }
    }
    return `[${px}px]`;
  }
  // rem values
  const remMatch = val.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) {
    const rem = parseFloat(remMatch[1]);
    if (rem === 0) return "0";
    // Try to find a matching Tailwind size (0.25rem = 1, 0.5rem = 2, etc.)
    const remToTw = { 0.25: "1", 0.5: "2", 0.75: "3", 1: "4", 1.25: "5",
      1.5: "6", 1.75: "7", 2: "8", 2.25: "9", 2.5: "10", 2.75: "11",
      3: "12", 3.5: "14", 4: "16", 5: "20", 6: "24", 7: "28",
      8: "32", 9: "36", 10: "40", 11: "44", 12: "48", 14: "56",
      16: "64", 20: "80", 24: "96" };
    if (remToTw[rem]) return remToTw[rem];
    return `[${rem}rem]`;
  }
  //百分比
  const pctMatch = val.match(/^(\d+(?:\.\d+)?)%$/);
  if (pctMatch) {
    const pct = parseFloat(pctMatch[1]);
    const fracMap = { 25: "1/4", 33.333: "1/3", 50: "1/2",
      66.667: "2/3", 75: "3/4", 20: "1/5", 40: "2/5",
      60: "3/5", 80: "4/5", 16.667: "1/6", 83.333: "5/6",
      10: "1/10", 90: "9/10" };
    for (const [pctVal, frac] of Object.entries(fracMap)) {
      if (Math.abs(pct - parseFloat(pctVal)) < 0.1) return frac;
    }
    return `[${pct}%]`;
  }
  return null;
}

// Try to map a color value to a Tailwind color class
const TW_PALETTE = {
  gray: { 50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712" },
  red: { 50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a" },
  blue: { 50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554" },
  green: { 50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16" },
  amber: { 50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03" },
  purple: { 50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764" },
};
function findPaletteMatch(hex) {
  for (const [name, shades] of Object.entries(TW_PALETTE)) {
    for (const [shade, h] of Object.entries(shades)) {
      if (h === hex) return `${name}-${shade}`;
    }
  }
  return null;
}
function colorToTailwind(color, prefix) {
  color = parseValue(color).toLowerCase();
  // Named colors (pass in name like "white")
  if (NAMED_COLORS[color]) {
    const hex = NAMED_COLORS[color];
    if (hex === "transparent") return `${prefix}-transparent`;
    if (color === "currentcolor" || color === "currentColor") return `${prefix}-current`;
    return `${prefix}-${color}`;
  }
  // Hex with alpha: #ffffff1a → white/10
  if (color.startsWith("#") && color.length === 9) {
    const rgb = color.substring(0, 7);
    const alphaHex = parseInt(color.substring(7, 9), 16);
    const opacityPct = Math.round((alphaHex / 255) * 100);
    // Check named colors
    const namedBase = Object.entries(NAMED_COLORS).find(([, h]) => h === rgb);
    if (namedBase) return `${prefix}-${namedBase[0]}/${opacityPct}`;
    // Check palette
    const pal = findPaletteMatch(rgb);
    if (pal) return `${prefix}-${pal}/${opacityPct}`;
    return `${prefix}-[${color}]`;
  }
  // Hex colors
  if (color.startsWith("#")) {
    // Check named colors first
    const namedHex = Object.entries(NAMED_COLORS).find(([, h]) => h === color);
    if (namedHex) return `${prefix}-${namedHex[0]}`;
    // Check palette
    const pal = findPaletteMatch(color);
    if (pal) return `${prefix}-${pal}`;
    return `${prefix}-[${color}]`;
  }
  // rgb/rgba/hsl/hsla
  if (color.startsWith("rgb") || color.startsWith("hsl")) {
    return `${prefix}-[${color}]`;
  }
  return null;
}

// Map a single CSS declaration to Tailwind class(es)
function mapDecl(prop, val) {
  val = parseValue(val);
  const key = `${prop}: ${val}`;

  // 1. Exact match
  if (EXACT_MAP[key]) return EXACT_MAP[key];

  // 2. Colors
  if (prop === "color") return colorToTailwind(val, "text");
  if (prop === "background-color" || prop === "background") {
    if (val === "none" || val === "transparent") return "bg-transparent";
    const c = colorToTailwind(val, "bg");
    if (c) return c;
  }
  if (prop === "border-color") return colorToTailwind(val, "border");
  if (prop === "outline-color") return colorToTailwind(val, "outline");
  if (prop === "text-decoration-color") return colorToTailwind(val, "decoration");
  if (prop === "caret-color") return colorToTailwind(val, "caret");
  if (prop === "accent-color") return colorToTailwind(val, "accent");
  if (prop === "fill") return colorToTailwind(val, "fill");
  if (prop === "stroke") return colorToTailwind(val, "stroke");
  if (prop === "column-rule-color") return colorToTailwind(val, "divide");
  if (prop === "ring-color") return colorToTailwind(val, "ring");

  // 3. Font size
  if (prop === "font-size") {
    if (FONT_SIZE_MAP[val]) return FONT_SIZE_MAP[val];
    return `text-[${val}]`;
  }

  // 4. Grid
  if (prop === "grid-template-columns") {
    if (GRID_COLS_MAP[val]) return GRID_COLS_MAP[val];
    if (val.startsWith("repeat(")) {
      const countMatch = val.match(/repeat\(\s*(\d+)/);
      if (countMatch && GRID_COLS_MAP[countMatch[1]]) return GRID_COLS_MAP[countMatch[1]];
    }
    return `grid-cols-[${val}]`;
  }
  if (prop === "grid-template-rows") {
    if (GRID_ROWS_MAP[val]) return GRID_ROWS_MAP[val];
    return `grid-rows-[${val}]`;
  }
  if (prop === "grid-column") {
    if (val === "1 / -1") return "col-span-full";
    const spanMatch = val.match(/span\s+(\d+)/);
    if (spanMatch) return `col-span-${spanMatch[1]}`;
    return `col-[${val}]`;
  }
  if (prop === "grid-row") {
    if (val === "1 / -1") return "row-span-full";
    const spanMatch = val.match(/span\s+(\d+)/);
    if (spanMatch) return `row-span-${spanMatch[1]}`;
    return `row-[${val}]`;
  }
  if (prop === "grid-column-start") return val === "auto" ? "col-start-auto" : `col-start-${val}`;
  if (prop === "grid-column-end") return val === "auto" ? "col-end-auto" : `col-end-${val}`;
  if (prop === "grid-row-start") return val === "auto" ? "row-start-auto" : `row-start-${val}`;
  if (prop === "grid-row-end") return val === "auto" ? "row-end-auto" : `row-end-${val}`;

  // 5. Shorthand properties with size values
  if (SHORTHAND_MAP[prop]) {
    const prefix = SHORTHAND_MAP[prop];
    const isSpacing = ["p","pt","pr","pb","pl","px","ps","pe","py",
      "m","mt","mr","mb","ml","mx","ms","me","my",
      "gap","gap-x","gap-y"].includes(prefix);

    // Special handling for grid cols/rows with arbitrary values
    if (prop === "grid-template-columns" && val.includes(" ")) {
      return `grid-cols-[${val}]`;
    }
    if (prop === "grid-template-rows" && val.includes(" ")) {
      return `grid-rows-[${val}]`;
    }

    const size = valueToTailwindSize(val, isSpacing);
    if (size !== null) {
      return `${prefix}-${size}`;
    }

    // Handle percentages for width/height
    if (prop === "width" || prop === "height" || prop === "min-width" || prop === "min-height" || prop === "max-width" || prop === "max-height") {
      const frac = valueToTailwindSize(val, false);
      if (frac) return `${prefix}-${frac}`;
      return `${prefix}-[${val}]`;
    }

    // Handle "auto" for sizing
    if (val === "auto") return `${prefix}-auto`;
    if (val === "100%") return `${prefix}-full`;
    if (val === "100vw") return `${prefix}-screen`;
    if (val === "100vh") return `${prefix}-screen`;
    if (val === "min-content") return `${prefix}-min`;
    if (val === "max-content") return `${prefix}-max`;
    if (val === "fit-content") return `${prefix}-fit`;

    return `${prefix}-[${val}]`;
  }

  // 6. Generic fallback: prop-[value]
  return `${prop.replace(/-/g, '-')}-[${val}]`;
}

// Parse CSS text into rules with selectors and declarations
function parseCSS(css) {
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");

  const rules = [];
  let pos = 0;

  while (pos < css.length) {
    // Skip whitespace
    while (pos < css.length && /\s/.test(css[pos])) pos++;
    if (pos >= css.length) break;

    const rest = css.substring(pos);
    // Check if this starts with @media or another at-rule
    const atRuleMatch = rest.match(/^(@media[^{]*?)\{/);
    if (atRuleMatch && pos + atRuleMatch[0].length <= css.length) {
      const selector = atRuleMatch[1].trim();
      const bodyStart = pos + atRuleMatch[0].length;
      let depth = 1;
      let i = bodyStart;
      while (i < css.length && depth > 0) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") depth--;
        i++;
      }
      const body = css.substring(bodyStart, i - 1);
      rules.push({ selector, body });
      pos = i;
    } else {
      // Flat declarations until next { or end
      const nextBrace = css.indexOf("{", pos);
      const nextAt = css.indexOf("@", pos);
      let end;
      if (nextBrace === -1 && nextAt === -1) end = css.length;
      else if (nextBrace === -1) end = nextAt;
      else if (nextAt === -1) end = nextBrace;
      else end = Math.min(nextBrace, nextAt);
      const decls = css.substring(pos, end).trim();
      if (decls) rules.push({ selector: "", body: decls });
      pos = end;
    }
  }

  return rules;
}

// Parse declarations from a rule body
function parseDeclarations(body) {
  const decls = [];
  const parts = body.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const prop = trimmed.substring(0, colonIdx).trim();
    const val = trimmed.substring(colonIdx + 1).trim();
    if (prop && val) {
      decls.push({ prop, value: val });
    }
  }
  return decls;
}

// Main export
export const cssToTailwind = (css) => {
  if (!css.trim()) return "";

  // Remove comments once, before any parsing
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");

  const rules = parseCSS(css);

  // No rules found — treat as flat declarations
  if (rules.length === 0) {
    const decls = parseDeclarations(css);
    if (decls.length === 0) return "";
    return decls.map(d => mapDecl(d.prop, d.value)).filter(Boolean).join(" ");
  }

  // Convert each rule
  const output = [];
  for (const rule of rules) {
    const decls = parseDeclarations(rule.body);
    if (decls.length === 0) continue;

    const classes = decls.map(d => mapDecl(d.prop, d.value)).filter(Boolean);
    if (classes.length === 0) continue;

    if (rule.selector) {
      output.push(`${rule.selector} {\n  ${classes.join("\n  ")}\n}`);
    } else {
      // Flat declarations (no selector)
      output.push(classes.join(" "));
    }
  }

  return output.join("\n\n");
};
