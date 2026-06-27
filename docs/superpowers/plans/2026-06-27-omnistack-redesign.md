# OmniStack Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign OmniStack with Apple-inspired clean typography, minimal cards, glass morphism navbar, and dense footer while keeping coral accent and both themes equally polished.

**Architecture:** Update CSS variables and typography first, then modify components (Header, Home, Footer) to match the new design system. Keep existing functionality intact while improving visual design.

**Tech Stack:** React, Tailwind CSS, Vite

## Global Constraints
- Keep coral (#FF6B6B) accent for dark theme, #E55B5B for light theme
- Inter + Fraunces fonts (already loaded in index.html)
- Both dark and light themes must be equally polished
- Glass effect only on navbar and category headers
- Minimal cards with thin borders, no shadows
- Body text at 17px, not 16px
- Negative letter-spacing at display sizes

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/index.css` | CSS variables, typography, animations |
| `src/components/Header.jsx` | Glass navbar, breadcrumb, navigation |
| `src/components/Home.jsx` | Hero section, tool grid, category headers |
| `src/components/Footer.jsx` | Dense columns footer |
| `src/App.jsx` | Layout wrapper |
| `src/utils/constants.js` | Theme variables |

---

### Task 1: Update CSS Variables and Typography

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: None (foundational task)
- Produces: CSS custom properties used by all components

- [ ] **Step 1: Update CSS variables for dark theme**

Replace the `:root` section in `src/index.css`:

```css
:root {
  --bg-deep: #050505;
  --bg-surface: #0a0a0a;
  --bg-elevated: #111111;
  --bg-hover: #1a1a1a;
  --accent: #FF6B6B;
  --accent-soft: rgba(255, 107, 107, 0.06);
  --accent-glow: rgba(255, 107, 107, 0.12);
  --accent-strong: rgba(255, 107, 107, 0.2);
  --text-primary: #e8e8e8;
  --text-secondary: #888888;
  --text-muted: #555555;
  --border: #1a1a1a;
  --border-hover: #2a2a2a;
  --border-accent: rgba(255, 107, 107, 0.25);
}
```

- [ ] **Step 2: Update CSS variables for light theme**

Replace the light theme section in `src/index.css`:

```css
html[data-theme="light"] body {
  background-color: #fafafa;
  color: #1a1a1a;
}
html[data-theme="light"] :root {
  --bg-deep: #fafafa;
  --bg-surface: #ffffff;
  --bg-elevated: #ffffff;
  --bg-hover: #f5f5f5;
  --accent: #E55B5B;
  --accent-soft: rgba(229, 91, 91, 0.06);
  --accent-glow: rgba(229, 91, 91, 0.1);
  --accent-strong: rgba(229, 91, 91, 0.18);
  --text-primary: #1a1a1a;
  --text-secondary: #555555;
  --text-muted: #888888;
  --border: #e0e0e0;
  --border-hover: #cccccc;
  --border-accent: rgba(229, 91, 91, 0.3);
}
```

- [ ] **Step 3: Update typography classes**

Add to the `@layer base` section:

```css
.font-display {
  font-family: 'Fraunces', Georgia, serif;
  font-optical-sizing: auto;
}
.font-body {
  font-family: 'Inter', system-ui, sans-serif;
}
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}
```

- [ ] **Step 4: Add glass effect utility classes**

Add after the base layer:

```css
@layer utilities {
  .glass {
    background-color: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(24px) saturate(150%);
    -webkit-backdrop-filter: blur(24px) saturate(150%);
  }
  .glass-light {
    background-color: rgba(250, 250, 250, 0.7);
    backdrop-filter: blur(24px) saturate(150%);
    -webkit-backdrop-filter: blur(24px) saturate(150%);
  }
}
```

- [ ] **Step 5: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 6: Commit**

```bash
git add src/index.css
git commit -m "feat: update CSS variables and typography for redesign"
```

---

### Task 2: Update Theme Variables in Constants

**Files:**
- Modify: `src/utils/constants.js`

**Interfaces:**
- Consumes: CSS variables from Task 1
- Produces: THEME_VARS object used by App.jsx and components

- [ ] **Step 1: Update THEME_VARS in constants.js**

Replace the THEME_VARS object:

```javascript
export const THEME_VARS = {
  light: {
    bg: "bg-[#fafafa]",
    text: "text-[#1a1a1a]",
    headerBg: "glass-light border-[#e0e0e0]/50",
    panelBg: "bg-[#ffffff] border-[#e0e0e0]",
    cardBg: "bg-[#ffffff] border-[#e0e0e0]",
    inputBg: "bg-[#f5f5f5] border-[#e0e0e0]",
    mutedText: "text-[#555555]",
    mutedText2: "text-[#888888]",
    hoverBorder: "hover:border-[#cccccc]",
    activeBtn: "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]",
    inactiveBtn: "bg-white border-[#e0e0e0] text-[#555555] hover:text-[#1a1a1a] hover:border-[#cccccc]",
    codeBg: "bg-[#f5f5f5] border-[#e0e0e0]",
  },
  dark: {
    bg: "bg-[#050505]",
    text: "text-[#c8c8c8]",
    headerBg: "glass border-[#1a1a1a]/50",
    panelBg: "bg-[#0a0a0a] border-[#1a1a1a]",
    cardBg: "bg-[#0a0a0a] border-[#1a1a1a]",
    inputBg: "bg-[#050505] border-[#1a1a1a]",
    mutedText: "text-[#555555]",
    mutedText2: "text-[#555555]",
    hoverBorder: "hover:border-[#2a2a2a]",
    activeBtn: "bg-[rgba(255,107,107,0.08)] border-[rgba(255,107,107,0.2)] text-[#FF6B6B]",
    inactiveBtn: "bg-[#0a0a0a] border-[#1a1a1a] text-[#555555] hover:text-[#888888] hover:border-[#2a2a2a]",
    codeBg: "bg-[#0a0a0a] border-[#1a1a1a]",
  },
};
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add src/utils/constants.js
git commit -m "feat: update theme variables for redesign"
```

---

### Task 3: Update Header with Glass Navbar and Breadcrumb

**Files:**
- Modify: `src/components/Header.jsx`

**Interfaces:**
- Consumes: THEME_VARS from constants.js
- Produces: Updated Header component with glass effect and breadcrumb

- [ ] **Step 1: Update TOOL_LABELS mapping**

Add after NAV_GROUPS definition:

```javascript
const TOOL_LABELS = {};
NAV_GROUPS.forEach((group) => {
  group.items.forEach((item) => {
    TOOL_LABELS[item.id] = item.label;
  });
});
```

- [ ] **Step 2: Update header element with glass effect**

Replace the header element:

```javascript
<header className={`fixed top-0 left-0 right-0 h-[52px] border-b ${isLight ? "glass-light border-[#e0e0e0]/50" : "glass border-[#1a1a1a]/50"} px-4 flex items-center justify-between z-40 transition-colors duration-200`}>
```

- [ ] **Step 3: Add breadcrumb when inside a tool**

After the logo button, add:

```javascript
{activeTool && activeTool !== "home" && (
  <>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${mutedText}`}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
    <span className={`text-sm font-medium ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"} shrink-0`}>
      {TOOL_LABELS[activeTool] || activeTool}
    </span>
  </>
)}
```

- [ ] **Step 4: Hide nav dropdowns when inside a tool**

Update the nav element:

```javascript
<nav className="hidden md:flex items-center gap-0.5 min-w-0">
  {(!activeTool || activeTool === "home") && NAV_GROUPS.map((group) => (
    <Dropdown
      key={group.id}
      group={group}
      activeTool={activeTool}
      setActiveTool={setActiveTool}
      isLight={isLight}
      mutedText2={mutedText2}
      activeBtn={activeBtn}
    />
  ))}
</nav>
```

- [ ] **Step 5: Update dropdown menu with glass effect**

Replace the dropdown menu div:

```javascript
<div
  className={`absolute top-full left-0 mt-1 min-w-[180px] rounded-lg border py-1.5 shadow-xl z-[100] backdrop-blur-xl saturate-150 ${isLight ? "bg-white/80 border-[#e0e0e0]/50 shadow-black/10" : "bg-[#0c0e14]/80 border-[#1c2030]/50 shadow-black/40"}`}
>
```

- [ ] **Step 6: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: add glass navbar and breadcrumb to Header"
```

---

### Task 4: Update Home with New Hero and Tool Grid

**Files:**
- Modify: `src/components/Home.jsx`

**Interfaces:**
- Consumes: None
- Produces: Updated Home component with Apple-style typography and minimal cards

- [ ] **Step 1: Update hero section styling**

Replace the hero section:

```javascript
<section className="relative px-5 pt-16 pb-12 md:pt-24 md:pb-16">
  {/* Dot grid background */}
  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage: `radial-gradient(circle, ${isLight ? "#1a1a1a" : "#888888"} 1px, transparent 1px)`,
      backgroundSize: "24px 24px",
    }}
  />
  {/* Radial glow */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none"
    style={{
      background: `radial-gradient(ellipse at center, ${isLight ? "rgba(229,91,91,0.15)" : "rgba(255,107,107,0.12)"}, transparent 70%)`,
    }}
  />

  <div className="relative max-w-3xl mx-auto text-center">
    {/* Logo */}
    <div className="flex justify-center mb-6">
      <img src="/logo.png" alt="OmniStack" className="w-16 h-16 object-contain drop-shadow-lg rounded-full" />
    </div>

    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 ${isLight ? "bg-[#fff0f0] text-[#c53a3a] border border-[#e0d0d0]" : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B] border border-[rgba(255,107,107,0.15)]"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" style={{ animation: "dotPulse 2s ease-in-out infinite" }} />
      21 tools · all client-side
    </div>

    <h1 style={{ color: isLight ? "#1a1a1a" : "#e8e8e8" }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-[1.1] font-display" letterSpacing="-0.02em">
      The only dev toolkit
      <br />
      <span className="text-accent relative inline-block">
        you need.
        <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
          <path d="M2 5.5C35 2.5 75 1.5 100 3.5C125 5.5 165 7 198 3.5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </span>
    </h1>

    <div className={`text-lg md:text-xl h-8 mb-6 ${isLight ? "text-[#555555]" : "text-[#555555]"}`}>
      <Typewriter />
    </div>

    <p style={{ color: isLight ? "#555555" : "#555555" }} className="text-sm max-w-lg mx-auto mb-8 leading-relaxed">
      Mock data, CSS conversion, JSON formatting, encoding, layout builders, QR codes, and more — every tool runs in your browser. No server. No sign-up. Fully private.
    </p>

    <div className="flex items-center justify-center gap-6 text-xs">
      {[
        { value: "21", label: "Tools" },
        { value: "0", label: "Servers" },
        { value: "100%", label: "Private" },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <div style={{ color: isLight ? "#1a1a1a" : "#e8e8e8" }} className="text-lg font-bold font-display">{stat.value}</div>
          <div style={{ color: isLight ? "#888888" : "#555555" }}>{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update tool card styling**

Replace the tool card button:

```javascript
<button
  key={tool.id}
  onClick={() => setActiveTool(tool.id)}
  className={`animate-slide-up text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer group relative ${
    isLight
      ? "bg-white border-[#e0e0e0] hover:border-[#E55B5B]/40 hover:shadow-lg hover:shadow-[#E55B5B]/5"
      : "bg-[#0a0a0a] border-[#1a1a1a] hover:border-[rgba(255,107,107,0.3)] hover:shadow-lg hover:shadow-[rgba(255,107,107,0.05)]"
  }`}
>
  {/* Left accent bar */}
  <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors ${
    isLight
      ? "bg-[#fff0f0] text-[#c53a3a] group-hover:bg-[#E55B5B] group-hover:text-white"
      : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B] group-hover:bg-[#FF6B6B] group-hover:text-[#0c0e14]"
  }`}>
    {tool.icon}
  </div>
  <h3 className={`text-sm font-semibold mb-1.5 ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"} group-hover:text-accent transition-colors`}>
    {tool.title}
  </h3>
  <p className={`text-xs leading-relaxed ${isLight ? "text-[#5a5f6e]" : "text-[#505868]"}`}>
    {tool.description}
  </p>
</button>
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 4: Commit**

```bash
git add src/components/Home.jsx
git commit -m "feat: update Home with Apple-style typography and minimal cards"
```

---

### Task 5: Update Footer with Dense Columns

**Files:**
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: None
- Produces: Updated Footer component with dense columns

- [ ] **Step 1: Replace Footer component**

Replace the entire Footer component:

```javascript
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
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: update Footer with dense columns layout"
```

---

### Task 6: Update App Layout Wrapper

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: Updated Header, Home, Footer components
- Produces: Updated App layout with proper spacing

- [ ] **Step 1: Update App layout**

Replace the return statement in App.jsx:

```javascript
return (
  <div className={`h-screen flex flex-col font-sans transition-colors duration-300 ${isLight ? "bg-[#fafafa] text-[#1a1a1a]" : "bg-[#050505] text-[#e8e8e8]"}`}>
    <Header
      activeTool={activeTool} setActiveTool={setActiveTool}
      isLight={isLight} setTheme={handleSetTheme}
      setIsPrivacyOpen={setIsPrivacyOpen}
      mutedText={mutedText} mutedText2={mutedText2} activeBtn={activeBtn}
    />

    <div className="flex-1 pt-[52px] min-h-0 overflow-hidden">
      {activeTool === "home" && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden h-full">
          <Home setActiveTool={setActiveTool} isLight={isLight} />
        </div>
      )}

      {activeTool !== "home" && (
        <>
          <div className="flex-1 flex flex-row min-h-0 overflow-hidden h-full">
            <div className="flex-1 overflow-auto flex flex-col min-h-0">
              {/* Tool components remain the same */}
            </div>
            <Sidebar isLight={isLight} mutedText={mutedText} adConfig={AD_CONFIG} theme={theme} setActiveTool={setActiveTool} />
          </div>
          <Footer isLight={isLight} mutedText={mutedText} setActiveTool={setActiveTool} adConfig={AD_CONFIG} theme={theme} />
        </>
      )}
    </div>

    <PrivacyModal isOpen={isPrivacyOpen} setIsPrivacyOpen={setIsPrivacyOpen} isLight={isLight} />
    <ExportModal isOpen={isExportModalOpen} setIsExportModalOpen={setIsExportModalOpen} isLight={isLight} mutedText={mutedText} data={fields} />
  </div>
);
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: update App layout wrapper for redesign"
```

---

### Task 7: Final Verification and Cleanup

**Files:**
- Verify all modified files

**Interfaces:**
- Consumes: All previous tasks
- Produces: Final working application

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 2: Test both themes**

Manually verify:
- Dark theme works correctly
- Light theme works correctly
- Theme toggle works
- Glass effect visible on navbar
- Breadcrumb shows when inside a tool
- Tool cards have hover effects
- Footer displays correctly

- [ ] **Step 3: Test responsive design**

Manually verify:
- Desktop layout (4-column grid)
- Tablet layout (3-column grid)
- Mobile layout (2-column grid)
- Small mobile layout (1-column grid)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete OmniStack redesign with Apple-inspired design"
```
