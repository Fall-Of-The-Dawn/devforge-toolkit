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

// Convert CSS to Tailwind utility classes
export const cssToTailwind = (css) => {
  if (!css.trim()) return "";

  const CSS_TO_TAILWIND = {
    "display: flex": "flex",
    "display: grid": "grid",
    "display: none": "hidden",
    "display: block": "block",
    "display: inline-block": "inline-block",
    "display: inline": "inline",
    "flex-direction: row": "flex-row",
    "flex-direction: row-reverse": "flex-row-reverse",
    "flex-direction: column": "flex-col",
    "flex-direction: column-reverse": "flex-col-reverse",
    "flex-wrap: wrap": "flex-wrap",
    "flex-wrap: nowrap": "flex-nowrap",
    "flex: 1": "flex-1",
    "flex-grow: 1": "grow",
    "flex-grow: 0": "grow-0",
    "flex-shrink: 1": "shrink",
    "flex-shrink: 0": "shrink-0",
    "justify-content: flex-start": "justify-start",
    "justify-content: flex-end": "justify-end",
    "justify-content: center": "justify-center",
    "justify-content: space-between": "justify-between",
    "justify-content: space-around": "justify-around",
    "justify-content: space-evenly": "justify-evenly",
    "justify-content: start": "justify-start",
    "justify-content: end": "justify-end",
    "align-items: stretch": "items-stretch",
    "align-items: flex-start": "items-start",
    "align-items: flex-end": "items-end",
    "align-items: center": "items-center",
    "align-items: baseline": "items-baseline",
    "align-items: start": "items-start",
    "align-items: end": "items-end",
    "align-self: auto": "self-auto",
    "align-self: flex-start": "self-start",
    "align-self: flex-end": "self-end",
    "align-self: center": "self-center",
    "align-self: stretch": "self-stretch",
    "gap: 0": "gap-0",
    "gap: 0.25rem": "gap-1",
    "gap: 4px": "gap-1",
    "gap: 0.5rem": "gap-2",
    "gap: 8px": "gap-2",
    "gap: 0.75rem": "gap-3",
    "gap: 12px": "gap-3",
    "gap: 1rem": "gap-4",
    "gap: 16px": "gap-4",
    "gap: 1.5rem": "gap-6",
    "gap: 24px": "gap-6",
    "gap: 2rem": "gap-8",
    "gap: 32px": "gap-8",
    "padding: 0": "p-0",
    "padding: 1px": "p-px",
    "padding: 0.125rem": "p-0.5",
    "padding: 2px": "p-0.5",
    "padding: 0.25rem": "p-1",
    "padding: 4px": "p-1",
    "padding: 0.375rem": "p-1.5",
    "padding: 6px": "p-1.5",
    "padding: 0.5rem": "p-2",
    "padding: 8px": "p-2",
    "padding: 0.75rem": "p-3",
    "padding: 12px": "p-3",
    "padding: 1rem": "p-4",
    "padding: 16px": "p-4",
    "padding: 1.25rem": "p-5",
    "padding: 20px": "p-5",
    "padding: 1.5rem": "p-6",
    "padding: 24px": "p-6",
    "padding: 2rem": "p-8",
    "padding: 32px": "p-8",
    "padding: 2.5rem": "p-10",
    "padding: 3rem": "p-12",
    "padding-top: 0": "pt-0",
    "padding-top: 4px": "pt-1",
    "padding-top: 0.25rem": "pt-1",
    "padding-top: 8px": "pt-2",
    "padding-top: 0.5rem": "pt-2",
    "padding-top: 12px": "pt-3",
    "padding-top: 1rem": "pt-4",
    "padding-top: 16px": "pt-4",
    "padding-top: 1.5rem": "pt-6",
    "padding-top: 2rem": "pt-8",
    "padding-bottom: 0": "pb-0",
    "padding-bottom: 4px": "pb-1",
    "padding-bottom: 0.25rem": "pb-1",
    "padding-bottom: 8px": "pb-2",
    "padding-bottom: 0.5rem": "pb-2",
    "padding-bottom: 12px": "pb-3",
    "padding-bottom: 1rem": "pb-4",
    "padding-bottom: 16px": "pb-4",
    "padding-bottom: 1.5rem": "pb-6",
    "padding-bottom: 2rem": "pb-8",
    "padding-left: 0": "pl-0",
    "padding-left: 4px": "pl-1",
    "padding-left: 0.25rem": "pl-1",
    "padding-left: 8px": "pl-2",
    "padding-left: 0.5rem": "pl-2",
    "padding-left: 12px": "pl-3",
    "padding-left: 1rem": "pl-4",
    "padding-left: 16px": "pl-4",
    "padding-left: 1.5rem": "pl-6",
    "padding-left: 2rem": "pl-8",
    "padding-right: 0": "pr-0",
    "padding-right: 4px": "pr-1",
    "padding-right: 0.25rem": "pr-1",
    "padding-right: 8px": "pr-2",
    "padding-right: 0.5rem": "pr-2",
    "padding-right: 12px": "pr-3",
    "padding-right: 1rem": "pr-4",
    "padding-right: 16px": "pr-4",
    "padding-right: 1.5rem": "pr-6",
    "padding-right: 2rem": "pr-8",
    "padding-x: 0": "px-0",
    "padding-x: 4px": "px-1",
    "padding-x: 0.25rem": "px-1",
    "padding-x: 8px": "px-2",
    "padding-x: 0.5rem": "px-2",
    "padding-x: 12px": "px-3",
    "padding-x: 0.75rem": "px-3",
    "padding-x: 1rem": "px-4",
    "padding-x: 16px": "px-4",
    "padding-x: 1.5rem": "px-6",
    "padding-x: 2rem": "px-8",
    "padding-y: 0": "py-0",
    "padding-y: 4px": "py-1",
    "padding-y: 0.25rem": "py-1",
    "padding-y: 8px": "py-2",
    "padding-y: 0.5rem": "py-2",
    "padding-y: 12px": "py-3",
    "padding-y: 0.75rem": "py-3",
    "padding-y: 1rem": "py-4",
    "padding-y: 16px": "py-4",
    "padding-y: 1.5rem": "py-6",
    "padding-y: 2rem": "py-8",
    "margin: 0": "m-0",
    "margin: auto": "m-auto",
    "margin: 4px": "m-1",
    "margin: 0.25rem": "m-1",
    "margin: 8px": "m-2",
    "margin: 0.5rem": "m-2",
    "margin: 1rem": "m-4",
    "margin: 16px": "m-4",
    "margin: 1.5rem": "m-6",
    "margin: 2rem": "m-8",
    "margin-top: 0": "mt-0",
    "margin-top: auto": "mt-auto",
    "margin-top: 4px": "mt-1",
    "margin-top: 0.25rem": "mt-1",
    "margin-top: 8px": "mt-2",
    "margin-top: 0.5rem": "mt-2",
    "margin-top: 1rem": "mt-4",
    "margin-top: 16px": "mt-4",
    "margin-top: 1.5rem": "mt-6",
    "margin-top: 2rem": "mt-8",
    "margin-bottom: 0": "mb-0",
    "margin-bottom: auto": "mb-auto",
    "margin-bottom: 4px": "mb-1",
    "margin-bottom: 0.25rem": "mb-1",
    "margin-bottom: 8px": "mb-2",
    "margin-bottom: 0.5rem": "mb-2",
    "margin-bottom: 1rem": "mb-4",
    "margin-bottom: 16px": "mb-4",
    "margin-bottom: 1.5rem": "mb-6",
    "margin-bottom: 2rem": "mb-8",
    "margin-left: 0": "ml-0",
    "margin-left: auto": "ml-auto",
    "margin-left: 4px": "ml-1",
    "margin-left: 0.25rem": "ml-1",
    "margin-left: 8px": "ml-2",
    "margin-left: 0.5rem": "ml-2",
    "margin-left: 1rem": "ml-4",
    "margin-left: 16px": "ml-4",
    "margin-left: 1.5rem": "ml-6",
    "margin-left: 2rem": "ml-8",
    "margin-right: 0": "mr-0",
    "margin-right: auto": "mr-auto",
    "margin-right: 4px": "mr-1",
    "margin-right: 0.25rem": "mr-1",
    "margin-right: 8px": "mr-2",
    "margin-right: 0.5rem": "mr-2",
    "margin-right: 1rem": "mr-4",
    "margin-right: 16px": "mr-4",
    "margin-right: 1.5rem": "mr-6",
    "margin-right: 2rem": "mr-8",
    "margin-x: 0": "mx-0",
    "margin-x: auto": "mx-auto",
    "margin-x: 4px": "mx-1",
    "margin-x: 0.25rem": "mx-1",
    "margin-x: 8px": "mx-2",
    "margin-x: 0.5rem": "mx-2",
    "margin-x: 1rem": "mx-4",
    "margin-x: 16px": "mx-4",
    "margin-x: 1.5rem": "mx-6",
    "margin-x: 2rem": "mx-8",
    "margin-y: 0": "my-0",
    "margin-y: auto": "my-auto",
    "margin-y: 4px": "my-1",
    "margin-y: 0.25rem": "my-1",
    "margin-y: 8px": "my-2",
    "margin-y: 0.5rem": "my-2",
    "margin-y: 1rem": "my-4",
    "margin-y: 16px": "my-4",
    "margin-y: 1.5rem": "my-6",
    "margin-y: 2rem": "my-8",
    "width: 0": "w-0",
    "width: auto": "w-auto",
    "width: 100%": "w-full",
    "width: 50%": "w-1/2",
    "width: 33.333333%": "w-1/3",
    "width: 66.666667%": "w-2/3",
    "width: 25%": "w-1/4",
    "width: 75%": "w-3/4",
    "width: 20%": "w-1/5",
    "width: 40%": "w-2/5",
    "width: 60%": "w-3/5",
    "width: 80%": "w-4/5",
    "max-width: 100%": "max-w-full",
    "max-width: 20rem": "max-w-md",
    "max-width: 24rem": "max-w-lg",
    "max-width: 28rem": "max-w-xl",
    "max-width: 32rem": "max-w-2xl",
    "max-width: 36rem": "max-w-3xl",
    "max-width: 42rem": "max-w-4xl",
    "min-width: 0": "min-w-0",
    "min-width: 100%": "min-w-full",
    "height: 0": "h-0",
    "height: auto": "h-auto",
    "height: 100%": "h-full",
    "height: 100vh": "h-screen",
    "max-height: 100%": "max-h-full",
    "max-height: 100vh": "max-h-screen",
    "min-height: 100%": "min-h-full",
    "min-height: 100vh": "min-h-screen",
    "font-size: 12px": "text-xs",
    "font-size: 0.75rem": "text-xs",
    "font-size: 14px": "text-sm",
    "font-size: 0.875rem": "text-sm",
    "font-size: 16px": "text-base",
    "font-size: 1rem": "text-base",
    "font-size: 18px": "text-lg",
    "font-size: 1.125rem": "text-lg",
    "font-size: 20px": "text-xl",
    "font-size: 1.25rem": "text-xl",
    "font-size: 24px": "text-2xl",
    "font-size: 1.5rem": "text-2xl",
    "font-size: 30px": "text-3xl",
    "font-size: 1.875rem": "text-3xl",
    "font-size: 36px": "text-4xl",
    "font-size: 2.25rem": "text-4xl",
    "font-weight: 100": "font-thin",
    "font-weight: 200": "font-extralight",
    "font-weight: 300": "font-light",
    "font-weight: 400": "font-normal",
    "font-weight: 500": "font-medium",
    "font-weight: 600": "font-semibold",
    "font-weight: 700": "font-bold",
    "font-weight: 800": "font-extrabold",
    "font-weight: 900": "font-black",
    "line-height: 1": "leading-none",
    "line-height: 1.25": "leading-tight",
    "line-height: 1.375": "leading-snug",
    "line-height: 1.5": "leading-normal",
    "line-height: 1.625": "leading-relaxed",
    "line-height: 2": "leading-loose",
    "letter-spacing: -0.05em": "tracking-tighter",
    "letter-spacing: -0.025em": "tracking-tight",
    "letter-spacing: 0": "tracking-normal",
    "letter-spacing: 0.025em": "tracking-wide",
    "letter-spacing: 0.05em": "tracking-wider",
    "letter-spacing: 0.1em": "tracking-widest",
    "text-align: left": "text-left",
    "text-align: center": "text-center",
    "text-align: right": "text-right",
    "text-align: justify": "text-justify",
    "text-decoration: underline": "underline",
    "text-decoration: line-through": "line-through",
    "text-decoration: none": "no-underline",
    "text-transform: uppercase": "uppercase",
    "text-transform: lowercase": "lowercase",
    "text-transform: capitalize": "capitalize",
    "text-transform: none": "normal-case",
    "white-space: nowrap": "whitespace-nowrap",
    "white-space: pre": "whitespace-pre",
    "white-space: pre-line": "whitespace-pre-line",
    "white-space: pre-wrap": "whitespace-pre-wrap",
    "word-break: break-all": "break-all",
    "word-break: break-word": "break-words",
    "overflow: hidden": "overflow-hidden",
    "overflow: auto": "overflow-auto",
    "overflow: scroll": "overflow-scroll",
    "overflow: visible": "overflow-visible",
    "overflow-x: hidden": "overflow-x-hidden",
    "overflow-x: auto": "overflow-x-auto",
    "overflow-y: hidden": "overflow-y-hidden",
    "overflow-y: auto": "overflow-y-auto",
    "position: static": "static",
    "position: fixed": "fixed",
    "position: absolute": "absolute",
    "position: relative": "relative",
    "position: sticky": "sticky",
    "top: 0": "top-0",
    "top: auto": "top-auto",
    "top: 50%": "top-1/2",
    "right: 0": "right-0",
    "right: auto": "right-auto",
    "bottom: 0": "bottom-0",
    "bottom: auto": "bottom-auto",
    "bottom: 50%": "bottom-1/2",
    "left: 0": "left-0",
    "left: auto": "left-auto",
    "left: 50%": "left-1/2",
    "inset: 0": "inset-0",
    "z-index: 0": "z-0",
    "z-index: 10": "z-10",
    "z-index: 20": "z-20",
    "z-index: 30": "z-30",
    "z-index: 40": "z-40",
    "z-index: 50": "z-50",
    "border: 1px solid #e5e7eb": "border",
    "border: 1px solid transparent": "border border-transparent",
    "border-top: 1px solid #e5e7eb": "border-t",
    "border-bottom: 1px solid #e5e7eb": "border-b",
    "border-left: 1px solid #e5e7eb": "border-l",
    "border-right: 1px solid #e5e7eb": "border-r",
    "border-width: 0": "border-0",
    "border-width: 1px": "border",
    "border-width: 2px": "border-2",
    "border-width: 4px": "border-4",
    "border-color: transparent": "border-transparent",
    "border-style: solid": "border-solid",
    "border-style: dashed": "border-dashed",
    "border-style: dotted": "border-dotted",
    "border-radius: 0": "rounded-none",
    "border-radius: 9999px": "rounded-full",
    "border-radius: 0.25rem": "rounded-sm",
    "border-radius: 4px": "rounded-sm",
    "border-radius: 0.375rem": "rounded",
    "border-radius: 6px": "rounded",
    "border-radius: 0.5rem": "rounded-md",
    "border-radius: 8px": "rounded-md",
    "border-radius: 0.75rem": "rounded-lg",
    "border-radius: 12px": "rounded-lg",
    "border-radius: 1rem": "rounded-xl",
    "border-radius: 16px": "rounded-xl",
    "border-radius: 1.5rem": "rounded-2xl",
    "opacity: 0": "opacity-0",
    "opacity: 0.05": "opacity-5",
    "opacity: 5": "opacity-5",
    "opacity: 0.1": "opacity-10",
    "opacity: 10": "opacity-10",
    "opacity: 0.25": "opacity-25",
    "opacity: 25": "opacity-25",
    "opacity: 0.5": "opacity-50",
    "opacity: 50": "opacity-50",
    "opacity: 0.75": "opacity-75",
    "opacity: 75": "opacity-75",
    "opacity: 1": "opacity-100",
    "opacity: 100": "opacity-100",
    "box-shadow: none": "shadow-none",
    "pointer-events: none": "pointer-events-none",
    "pointer-events: auto": "pointer-events-auto",
    "cursor: auto": "cursor-auto",
    "cursor: default": "cursor-default",
    "cursor: pointer": "cursor-pointer",
    "cursor: wait": "cursor-wait",
    "cursor: text": "cursor-text",
    "cursor: move": "cursor-move",
    "cursor: not-allowed": "cursor-not-allowed",
    "user-select: none": "select-none",
    "user-select: all": "select-all",
    "resize: none": "resize-none",
    "resize: both": "resize",
    "object-fit: cover": "object-cover",
    "object-fit: contain": "object-contain",
    "object-fit: fill": "object-fill",
    "object-fit: none": "object-none",
    "list-style-type: none": "list-none",
    "list-style-type: disc": "list-disc",
    "list-style-type: decimal": "list-decimal",
    "appearance: none": "appearance-none",
    "outline: none": "outline-none",
    "background-color: transparent": "bg-transparent",
    "background-color: white": "bg-white",
    "background-color: black": "bg-black",
    "color: transparent": "text-transparent",
    "color: white": "text-white",
    "color: black": "text-black",
    "visibility: visible": "visible",
    "visibility: hidden": "invisible",
    "text-decoration-style: solid": "decoration-solid",
    "text-decoration-style: dashed": "decoration-dashed",
    "text-decoration-style: dotted": "decoration-dotted",
    "text-underline-offset: 4px": "underline-offset-4",
    "text-underline-offset: 2px": "underline-offset-2",
    "aspect-ratio: 1 / 1": "aspect-square",
    "aspect-ratio: 16 / 9": "aspect-video",
  };

  function mapDeclToTailwind(decl) {
    const cssString = `${decl.prop}: ${decl.value}`;
    if (CSS_TO_TAILWIND[cssString]) return CSS_TO_TAILWIND[cssString];

    if (decl.prop === "color" || decl.prop === "background-color" || decl.prop === "border-color") {
      const color = decl.value;
      if (color.startsWith("#")) {
        const hex = color.replace("#", "");
        if (decl.prop === "color") return `text-[#${hex}]`;
        if (decl.prop === "background-color") return `bg-[#${hex}]`;
        if (decl.prop === "border-color") return `border-[#${hex}]`;
      }
      if (color.startsWith("rgb")) {
        if (decl.prop === "color") return `text-[${color}]`;
        if (decl.prop === "background-color") return `bg-[${color}]`;
        if (decl.prop === "border-color") return `border-[${color}]`;
      }
      const namedColors = {
        red: "#ef4444", blue: "#3b82f6", green: "#22c55e", yellow: "#eab308",
        purple: "#a855f7", pink: "#ec4899", orange: "#f97316", gray: "#6b7280",
        grey: "#6b7280", white: "#ffffff", black: "#000000", transparent: "transparent",
        currentcolor: "currentColor",
      };
      if (namedColors[color]) {
        const hex = namedColors[color];
        if (hex === "transparent") {
          if (decl.prop === "color") return "text-transparent";
          if (decl.prop === "background-color") return "bg-transparent";
          if (decl.prop === "border-color") return "border-transparent";
        }
        if (decl.prop === "color") return `text-[${hex}]`;
        if (decl.prop === "background-color") return `bg-[${hex}]`;
        if (decl.prop === "border-color") return `border-[${hex}]`;
      }
    }

    const pxProps = {
      "padding": "p", "padding-top": "pt", "padding-bottom": "pb",
      "padding-left": "pl", "padding-right": "pr",
      "margin": "m", "margin-top": "mt", "margin-bottom": "mb",
      "margin-left": "ml", "margin-right": "mr",
      "width": "w", "height": "h", "max-width": "max-w", "max-height": "max-h",
      "min-width": "min-w", "min-height": "min-h", "gap": "gap",
      "top": "top", "right": "right", "bottom": "bottom", "left": "left",
      "font-size": "text",
    };
    if (pxProps[decl.prop] && /^\d+(\.\d+)?px$/.test(decl.value)) {
      const prefix = pxProps[decl.prop];
      const px = parseFloat(decl.value);
      if (decl.prop === "font-size") return `text-[${px}px]`;
      return `${prefix}-[${px}px]`;
    }
    if (pxProps[decl.prop] && /^\d+(\.\d+)?rem$/.test(decl.value)) {
      const prefix = pxProps[decl.prop];
      const rem = parseFloat(decl.value);
      if (decl.prop === "font-size") return `text-[${rem}rem]`;
      return `${prefix}-[${rem}rem]`;
    }
    if (decl.prop === "width" && /^\d+(\.\d+)?%$/.test(decl.value)) {
      return `w-[${decl.value}]`;
    }
    if (decl.prop === "border-radius" && /^\d+(\.\d+)?(px|rem)$/.test(decl.value)) {
      return `rounded-[${decl.value}]`;
    }
    return `${decl.prop}-[${decl.value}]`;
  }

  // Parse CSS rules with selectors
  let cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "");

  // Check if it's a flat list of declarations (no selectors)
  const hasBraces = cleaned.includes("{");
  if (!hasBraces) {
    // Flat declarations without selectors - extract and map directly
    const declarations = [];
    const parts = cleaned.split(";");
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const match = trimmed.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*$/);
      if (match) {
        declarations.push({ prop: match[1].trim(), value: match[2].replace(/;$/, "").trim() });
      }
    }
    if (declarations.length === 0) return "";
    const mapped = declarations.map(mapDeclToTailwind);
    return mapped.filter(Boolean).join(" ");
  }

  // Parse CSS rules with selectors
  const rules = [];
  let currentSelector = "";
  let braceDepth = 0;
  let currentContent = "";
  let lastClosePos = -1;

  // Process the entire string character by character
  for (let ci = 0; ci < cleaned.length; ci++) {
    const ch = cleaned[ci];
    if (ch === "{") {
      braceDepth++;
      if (braceDepth === 1) {
        currentSelector = cleaned.substring(lastClosePos + 1, ci).trim();
        currentContent = "";
      } else {
        currentContent += ch;
      }
    } else if (ch === "}") {
      braceDepth--;
      if (braceDepth === 0) {
        rules.push({ selector: currentSelector, body: currentContent });
        currentSelector = "";
        currentContent = "";
        lastClosePos = ci;
      } else {
        currentContent += ch;
      }
    } else if (braceDepth > 0) {
      currentContent += ch;
    }
  }

  // Also handle inline styles on single line: .box { display:flex; padding:4px; }
  if (rules.length === 0) {
    const inlineMatch = cleaned.match(/^([^{:]+)\{(.+)\}$/s);
    if (inlineMatch) {
      rules.push({ selector: inlineMatch[1].trim(), body: inlineMatch[2] });
    }
  }

  if (rules.length === 0) return "";

  // Convert each rule
  const outputParts = [];
  for (const rule of rules) {
    const declarations = [];
    const bodyParts = rule.body.split(";");
    for (const part of bodyParts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const match = trimmed.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*$/);
      if (match) {
        declarations.push({ prop: match[1].trim(), value: match[2].replace(/;$/, "").trim() });
      }
    }

    if (declarations.length === 0) continue;

    const mapped = declarations.map(mapDeclToTailwind).filter(Boolean);
    if (mapped.length === 0) continue;

    outputParts.push(`${rule.selector} {\n  ${mapped.join("\n  ")}\n}`);
  }

  return outputParts.join("\n\n");
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
