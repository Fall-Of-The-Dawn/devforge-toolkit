# SEO Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every tool page individually indexable by Google with unique meta tags, proper heading hierarchy, and structured data — so searches like "json dummy data generator" land on the dedicated tool page, not the home page.

**Architecture:** Add `react-helmet-async` for dynamic `<head>` management, create a centralized `TOOL_SEO` metadata map in constants, wrap each tool render in a `<Helmet>` provider that sets per-page title/description/canonical/OG tags, and upgrade tool title `<label>` elements to semantic `<h1>` tags.

**Tech Stack:** React 19, react-helmet-async, Vite 8

## Global Constraints
- Must not break existing functionality — all 21 tools must still work identically
- Keep coral/black theme (#FF6B6B accent) — no visual changes
- Meta titles < 60 chars, descriptions < 160 chars
- Each tool page gets: unique `<title>`, `<meta name="description">`, `<meta name="robots">`, `<link rel="canonical">`, OG tags, and JSON-LD BreadcrumbList
- One H1 per page, H2s for sub-sections
- `react-helmet-async` must wrap the app in `HelmetProvider` at the top level

---

### Task 1: Install react-helmet-async

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: npm registry
- Produces: `react-helmet-async` available for import

- [ ] **Step 1: Install the package**

```bash
npm install react-helmet-async
```

- [ ] **Step 2: Verify install**

```bash
npm ls react-helmet-async
```
Expected: shows `react-helmet-async@<version>` in the dependency tree

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add react-helmet-async for per-page SEO meta tags"
```

---

### Task 2: Create TOOL_SEO metadata map

**Files:**
- Modify: `src/utils/constants.js`

**Interfaces:**
- Consumes: nothing
- Produces: `TOOL_SEO` export — object keyed by tool ID, each value has `{ title, description, keywords, slug }`

- [ ] **Step 1: Add TOOL_SEO to constants.js**

Append after the existing `AD_CONFIG` export (or at the end of the file):

```js
export const TOOL_SEO = {
  home: {
    title: "DevClat | 21 Free Client-Side Developer Tools",
    description: "Free, 100% private client-side developer toolkit with 21 tools: mock data generator, CSS to Tailwind, JSON formatter, regex tester, and more. No server.",
    keywords: "developer tools, free dev tools, frontend tools, client side tools",
    slug: "",
  },
  generator: {
    title: "Free JSON Dummy Data Generator | DevClat",
    description: "Generate custom, realistic fake JSON, CSV, or SQL data instantly. 10 presets, custom schemas, powered by faker.js. 100% client-side and private.",
    keywords: "json dummy data generator, fake data generator, mock data, test data generator, json generator, csv generator, sql generator",
    slug: "generator",
  },
  "json-formatter": {
    title: "JSON Formatter & Validator | DevClat",
    description: "Pretty-print, minify, and validate JSON instantly. Syntax highlighting, collapsible tree view, error line highlighting. Free, client-side.",
    keywords: "json formatter, json validator, json pretty print, json minifier, format json online",
    slug: "json-formatter",
  },
  "text-diff": {
    title: "Text Diff Tool — Compare Text Online | DevClat",
    description: "Git-diff style text comparison with line-level and word-level highlighting. Unified, split, and words output modes. Free, private, client-side.",
    keywords: "text diff tool, compare text online, diff checker, code diff tool, text comparison",
    slug: "text-diff",
  },
  "regex-tester": {
    title: "Regex Tester — Test Regular Expressions | DevClat",
    description: "Test regex patterns in real-time with match highlighting, capture groups, and flag support. Free, client-side regex validator.",
    keywords: "regex tester, regular expression validator, regex online, regex test, regex checker",
    slug: "regex-tester",
  },
  "css-converter": {
    title: "CSS to Tailwind Converter | DevClat",
    description: "Bidirectional CSS/Tailwind conversion with 200+ property mappings. Dark mode support, arbitrary values, color palette resolution. Free, client-side.",
    keywords: "css to tailwind, tailwind css converter, tailwind to css, css converter online",
    slug: "css-converter",
  },
  base64: {
    title: "Base64 Encoder & Decoder | DevClat",
    description: "Encode and decode Base64 strings with full Unicode support. Real-time conversion, one-click copy. Free, client-side.",
    keywords: "base64 encoder decoder, base64 encode, base64 decode, base64 converter",
    slug: "base64",
  },
  "url-encoder": {
    title: "URL Encoder & Decoder | DevClat",
    description: "Encode and decode URL components instantly. Handles query parameters, path segments, and special characters. Free, client-side.",
    keywords: "url encoder decoder, url encode, url decode, percent encoding",
    slug: "url-encoder",
  },
  "jwt-decoder": {
    title: "JWT Token Decoder — Inspect JWT Locally | DevClat",
    description: "Decode and inspect JWT tokens locally without sending to any server. View header, payload, signature, and expiration. 100% private.",
    keywords: "jwt decoder, jwt token decoder, jwt parser, json web token decoder",
    slug: "jwt-decoder",
  },
  layout: {
    title: "Flexbox & Grid Playground | DevClat",
    description: "Visual CSS flexbox and grid layout builder with live preview and Tailwind output. Drag, drop, and learn CSS layout. Free, client-side.",
    keywords: "flexbox playground, css grid playground, flexbox visualizer, grid layout builder",
    slug: "layout",
  },
  gradient: {
    title: "CSS Gradient Generator | DevClat",
    description: "Visual CSS gradient builder with linear, radial, and conic gradients. Draggable color stops, angle control, live CSS output. Free, client-side.",
    keywords: "gradient generator, css gradient builder, linear gradient, radial gradient, css gradient maker",
    slug: "gradient",
  },
  "box-shadow": {
    title: "CSS Box Shadow Generator | DevClat",
    description: "Visual CSS box-shadow builder with multi-layer support, inset shadows, live preview, and CSS output. Free, client-side.",
    keywords: "box shadow generator, css shadow builder, box shadow css, css box shadow",
    slug: "box-shadow",
  },
  "qr-code": {
    title: "Free QR Code Generator | DevClat",
    description: "Generate downloadable QR codes from any text or URL. Canvas-based rendering, PNG download. Free, no sign-up, client-side.",
    keywords: "qr code generator free, qr code maker, qr code download, create qr code",
    slug: "qr-code",
  },
  password: {
    title: "Strong Password Generator | DevClat",
    description: "Generate cryptographically strong passwords with configurable length, character types, and strength indicator. Free, client-side.",
    keywords: "password generator strong, secure password generator, random password, password creator",
    slug: "password",
  },
  uuid: {
    title: "UUID Generator v4 | DevClat",
    description: "Generate v4 UUIDs in batch. Standard (with hyphens) or compact format. Up to 100 at once. Free, client-side.",
    keywords: "uuid generator v4, generate uuid, uuid creator, random uuid",
    slug: "uuid",
  },
  timestamp: {
    title: "Unix Timestamp Converter | DevClat",
    description: "Convert between Unix timestamps, ISO 8601, and human-readable dates. Real-time conversion. Free, client-side.",
    keywords: "timestamp converter unix, unix time converter, epoch converter, timestamp to date",
    slug: "timestamp",
  },
  lorem: {
    title: "Lorem Ipsum Generator | DevClat",
    description: "Generate placeholder text with configurable paragraph count. Classic lorem ipsum or custom text. Free, client-side.",
    keywords: "lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum creator",
    slug: "lorem",
  },
  tokenizer: {
    title: "Text Tokenizer — Count Tokens & Words | DevClat",
    description: "Count tokens, words, characters, and lines for LLM token limits. Visual token breakdown. Free, client-side.",
    keywords: "text tokenizer, token counter, word counter, llm token counter, token count tool",
    slug: "tokenizer",
  },
  "html-preview": {
    title: "Live HTML Preview Editor | DevClat",
    description: "Live side-by-side HTML/CSS/JS editor with instant preview. Syntax highlighting, full-page preview mode. Free, client-side.",
    keywords: "html preview editor live, html editor online, live code editor, html sandbox",
    slug: "html-preview",
  },
  markdown: {
    title: "Markdown Preview Editor | DevClat",
    description: "Real-time Markdown editor with live HTML preview. Supports headings, lists, tables, code blocks, and links. Free, client-side.",
    keywords: "markdown preview editor, markdown editor online, markdown to html, live markdown",
    slug: "markdown",
  },
  "color-contrast": {
    title: "WCAG Color Contrast Checker | DevClat",
    description: "WCAG accessibility compliance checker for color contrast ratios. Check AA and AAA compliance levels. Free, client-side.",
    keywords: "color contrast checker wcag, accessibility checker, contrast ratio, color accessibility",
    slug: "color-contrast",
  },
  "css-minifier": {
    title: "CSS Minifier & Compressor | DevClat",
    description: "Compress CSS code by removing whitespace, comments, and unnecessary characters. Size comparison display. Free, client-side.",
    keywords: "css minifier, css compressor, minify css, compress css online",
    slug: "css-minifier",
  },
};
```

- [ ] **Step 2: Verify export**

```bash
node -e "const { TOOL_SEO } = require('./src/utils/constants.js'); console.log(Object.keys(TOOL_SEO).length)"
```
Expected: `22` (21 tools + home)

- [ ] **Step 3: Commit**

```bash
git add src/utils/constants.js
git commit -m "feat: add TOOL_SEO metadata map for per-page SEO tags"
```

---

### Task 3: Wrap app in HelmetProvider

**Files:**
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `react-helmet-async` package
- Produces: `<HelmetProvider>` wrapping the entire app

- [ ] **Step 1: Read current main.jsx**

```bash
cat src/main.jsx
```

- [ ] **Step 2: Update main.jsx**

Replace the entire file content with:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
```

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx
git commit -m "feat: wrap app in HelmetProvider for dynamic meta tags"
```

---

### Task 4: Create SEOHead component

**Files:**
- Create: `src/components/SEOHead.jsx`

**Interfaces:**
- Consumes: `react-helmet-async` Helmet, `TOOL_SEO` from constants, tool ID prop
- Produces: `<Helmet>` element that sets title, meta description, OG tags, canonical, JSON-LD BreadcrumbList

- [ ] **Step 1: Create SEOHead.jsx**

```jsx
import { Helmet } from "react-helmet-async";
import { TOOL_SEO } from "../utils/constants";

const BASE_URL = "https://devclat.vercel.app";

export default function SEOHead({ toolId }) {
  const seo = TOOL_SEO[toolId] || TOOL_SEO.home;
  const url = seo.slug ? `${BASE_URL}/${seo.slug}` : BASE_URL;

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    ],
  };

  if (seo.slug) {
    breadcrumbLD.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: seo.title.split(" | ")[0],
      item: url,
    });
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content="DevClat" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />

      {/* JSON-LD Breadcrumb */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbLD)}
      </script>
    </Helmet>
  );
}
```

- [ ] **Step 2: Verify no syntax errors**

```bash
node -e "require('fs').readFileSync('src/components/SEOHead.jsx', 'utf8')"
```
Expected: no error

- [ ] **Step 3: Commit**

```bash
git add src/components/SEOHead.jsx
git commit -m "feat: add SEOHead component for per-page meta tags and JSON-LD"
```

---

### Task 5: Integrate SEOHead into App.jsx

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `SEOHead` component, `activeTool` state
- Produces: `<SEOHead toolId={activeTool} />` rendered inside the app wrapper

- [ ] **Step 1: Add import**

Add at the top of App.jsx, after the last import:

```jsx
import SEOHead from "./components/SEOHead";
```

- [ ] **Step 2: Add SEOHead inside the root div**

Inside the return statement, add `<SEOHead toolId={activeTool} />` as the first child inside the root `<div>`:

```jsx
<div className={`h-screen flex flex-col font-sans transition-colors duration-300 ${isLight ? "bg-[#fafafa] text-[#1a1a1a]" : "bg-[#050505] text-[#e8e8e8]"}`}>
  <SEOHead toolId={activeTool} />
  <Header ... />
```

- [ ] **Step 3: Build to verify**

```bash
npm run build
```
Expected: build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: integrate SEOHead into App for dynamic per-route meta tags"
```

---

### Task 6: Add h1 tags to all 21 tool pages

**Files:**
- Modify: `src/components/Generator.jsx` (line 67 — wrap existing label)
- Modify: `src/components/JsonFormatter.jsx` (line 34)
- Modify: `src/components/TextDiff.jsx` (title label)
- Modify: `src/components/RegexTester.jsx` (title label)
- Modify: `src/components/CssConverter.jsx` (title label)
- Modify: `src/components/Base64Tool.jsx` (title label)
- Modify: `src/components/UrlEncoder.jsx` (title label)
- Modify: `src/components/JwtDecoder.jsx` (title label)
- Modify: `src/components/FlexboxGridPlayground.jsx` (title label)
- Modify: `src/components/GradientGenerator.jsx` (title label)
- Modify: `src/components/BoxShadowGenerator.jsx` (title label)
- Modify: `src/components/QrCodeGenerator.jsx` (title label)
- Modify: `src/components/PasswordGenerator.jsx` (title label)
- Modify: `src/components/UuidGenerator.jsx` (title label)
- Modify: `src/components/TimestampConverter.jsx` (title label)
- Modify: `src/components/LoremIpsumGenerator.jsx` (title label)
- Modify: `src/components/Tokenizer.jsx` (line 65 — already h1, verify)
- Modify: `src/components/HtmlPreviewEditor.jsx` (title label)
- Modify: `src/components/MarkdownPreview.jsx` (title label)
- Modify: `src/components/ColorContrastChecker.jsx` (title label)
- Modify: `src/components/CssMinifier.jsx` (title label)

**Interfaces:**
- Consumes: SEOHead from Task 4
- Produces: Each tool page has exactly one `<h1>` wrapping its tool title

**Pattern for each file:**

Find the existing title label, e.g.:
```jsx
<label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>JSON Formatter</label>
```

Replace with:
```jsx
<h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>JSON Formatter</h1>
```

This preserves all existing styling — only the HTML element changes from `<label>` to `<h1>`.

For Tokenizer.jsx, the title is already `<h1>` — no change needed.

For HtmlPreviewEditor.jsx, the `<h1>Hello, DevClat!</h1>` is sample content in the editor, not the page title — find the actual title label and convert it.

- [ ] **Step 1: Update each tool component's title from `<label>` to `<h1>`**

Apply the pattern above to all 20 files (Tokenizer already has h1).

- [ ] **Step 2: Build to verify no errors**

```bash
npm run build
```
Expected: build succeeds

- [ ] **Step 3: Lint**

```bash
npx eslint src/components/*.jsx
```
Expected: 0 errors

- [ ] **Step 4: Commit**

```bash
git add src/components/*.jsx
git commit -m "feat: upgrade tool title labels to semantic h1 tags for SEO"
```

---

### Task 7: Update index.html noscript section

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: TOOL_SEO metadata
- Produces: noscript section uses `<strong>` for tool names (already done), verify canonical and title match new TOOL_SEO values

- [ ] **Step 1: Verify noscript section**

The noscript section already uses `<strong>` tags for tool names — confirmed from the file read. No changes needed to the noscript content.

- [ ] **Step 2: Verify canonical URL**

The canonical URL is already `https://devclat.vercel.app/` — correct for the home page. Individual tool canonicals are handled by SEOHead.

- [ ] **Step 3: Commit (no-op if no changes)**

If no changes were needed, skip this commit.

---

### Task 8: Final build verification

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: all previous tasks
- Produces: clean build, 0 lint errors

- [ ] **Step 1: Full build**

```bash
npm run build
```
Expected: succeeds with only the chunk size warning (expected)

- [ ] **Step 2: Full lint**

```bash
npx eslint src/
```
Expected: 0 errors

- [ ] **Step 3: Verify meta tags in browser**

```bash
npm run preview
```
Then open http://localhost:4173, navigate to each tool page, and verify:
- Browser tab title changes to the tool-specific title
- `document.querySelector('meta[name="description"]').content` matches TOOL_SEO
- One `<h1>` tag exists per page
- `document.querySelectorAll('h1').length === 1` on each tool page

- [ ] **Step 4: Commit final state**

```bash
git add -A
git commit -m "feat: complete SEO overhaul — per-page meta tags, h1 hierarchy, JSON-LD breadcrumbs"
```
