# OmniStack — Free Developer Toolkit | 22 Client-Side Tools for Web Developers

**22 tools. Zero servers. 100% private. Works offline.**

> OmniStack is a free, open-source developer toolkit that runs entirely in your browser. No accounts, no tracking, no data ever leaves your device. Used by 500+ developers worldwide for mock data generation, CSS/Tailwind conversion, JSON formatting, regex testing, QR code generation, text tokenization, and more.

![OmniStack — Free Developer Toolkit with 22 browser-based tools](og-image.png)
*Alt text: OmniStack dashboard showing 22 developer tools including mock data generator, CSS converter, JSON formatter, regex tester, QR code generator, text tokenizer, and more. Dark theme with amber gold accent.*

---

## What is OmniStack? — The Complete Developer Toolkit

**OmniStack** (https://omnistack.vercel.app) is a **free developer toolkit** that bundles **22 essential tools** into one clean, fast, privacy-focused web application. Unlike traditional developer tools that send your data to third-party servers, OmniStack processes everything **client-side in your browser** using JavaScript.

Whether you need to **generate mock data** for a prototype, **convert CSS to Tailwind** classes, **format JSON**, **test regex patterns**, **generate QR codes**, **decode JWT tokens**, or **count tokens** for LLM prompts — OmniStack does it all without requiring an account, an internet connection, or sending a single byte of your data to any server.

### Key Features

- **22 client-side tools** — everything from mock data generation to text tokenization
- **Zero server processing** — all data stays in your browser
- **Works offline** — once loaded, no internet required
- **No accounts needed** — open and use instantly
- **Privacy-first architecture** — GDPR compliant by design
- **Fully responsive** — works on desktop, tablet, and mobile
- **Dark and light themes** — amber gold accent design
- **Fast** — sub-second load times, instant tool switching

---

## Why Developers Need a Client-Side Toolkit

### The Problem with Server-Side Tools

Every developer has 15 browser tabs open with different tool websites. You paste your JSON into a formatter, your CSS into a converter, your JWT token into a decoder. Every time you do this, **your data travels to their server**. Your API keys, database records, proprietary code, session tokens — all transmitted to third-party servers you do not control.

This is a **privacy nightmare**. It violates data protection regulations. And for security-conscious developers, it is simply unacceptable.

### The OmniStack Solution

OmniStack takes the opposite approach. **Every tool runs in your browser** using JavaScript. The faker library generates fake data locally. The QR code library renders to Canvas locally. The CSS parser runs locally. The JWT decoder parses tokens locally. **Nothing is ever transmitted to any server.**

This is not just a feature — it is the core architecture. OmniStack is **privacy-compliant by design**, not by policy.

![Privacy-first developer tools — all processing happens in your browser](og-image.png)
*Alt text: Diagram showing how OmniStack processes all data client-side in the browser, with no data transmitted to external servers.*

---

## The 22 Tools — Complete Breakdown

### 1. Mock Data Generator

**What it does:** Generate realistic fake data in JSON, CSV, or SQL format with customizable fields and record count.

**Detailed features:**
- **10 built-in data presets:** Users, Products, Orders, Addresses, Transactions, Posts, Employees, Invoices, Reviews, Custom
- **Faker.js powered:** Uses `@faker-js/faker` for realistic names, emails, phone numbers, addresses, companies, job titles
- **Custom fields:** Add any field with any faker data type (uuid, fullName, email, amount, phone, boolean, company, jobTitle)
- **Record count:** Adjustable from 1 to 1,000 records
- **Output formats:** JSON (pretty-printed), CSV (with headers), SQL (INSERT statements)
- **Export options:** Copy to clipboard or download as file
- **Field reordering:** Drag fields to change output order

**Use case:** Building a frontend prototype and need 50 realistic user records? Select the "Users" preset, set count to 50, and get instant JSON ready for your mock API — no backend setup required.

**SEO keywords:** mock data generator, fake data generator, test data generator, json dummy data, csv generator, sql generator, fake api data, faker js, test data

![Mock Data Generator — Generate realistic fake data in JSON, CSV, or SQL](og-image.png)
*Alt text: OmniStack Mock Data Generator showing a table of 50 user records with id, first_name, last_name, email, age, phone, city, state, and created_at fields.*

---

### 2. CSS ↔ Tailwind Converter

**What it does:** Bidirectional conversion between plain CSS and Tailwind CSS utility classes.

**CSS → Tailwind direction:**
- Parses CSS declarations (flat and selector-wrapped)
- Handles `@media` blocks, nested selectors, and at-rules
- **200+ property mappings** covering display, flexbox, grid, spacing, typography, colors, borders, shadows, transforms, transitions
- Shorthand expansion (padding → p, margin → m, gap → gap, border-radius → rounded)
- Color resolution: hex colors map to Tailwind palette (e.g., `#f3f4f6` → `bg-gray-100`)
- Hex-with-alpha detection: `#ffffff1a` → `bg-white/10`
- Spacing conversion: `padding: 8px` → `p-2` (correct Tailwind scale)
- Grid template mapping: `grid-template-columns: 1fr 2fr` → `grid-cols-[1fr_2fr]`

**Tailwind → CSS direction:**
- **400+ static class mappings** for all standard Tailwind utilities
- Arbitrary value parsing: `grid-cols-[1fr_2.5rem_auto]` → `grid-template-columns: 1fr 2.5rem auto`
- CSS variable classes: `[--pattern-fg:var(--color-gray-950)]/5` → `--pattern-fg: color-mix(in srgb, var(--color-gray-950) 5%, transparent)`
- Dark mode variant handling: `dark:bg-gray-950` → `@media (prefers-color-scheme: dark) { background-color: #030712; }`
- Opacity modifiers: `bg-white/10` → `background-color: #ffffff1a`

**Technical implementation:**
The CSS parser uses a custom tokenizer that separates flat declarations from `@media` blocks. The color resolver uses a lookup table of Tailwind's full color palette (slate through rose, all shades 50-950) to map hex values back to their Tailwind class names.

**SEO keywords:** css to tailwind converter, tailwind to css, convert css to tailwind, tailwind css converter online, css converter, tailwind class generator, css to tailwind online free

![CSS to Tailwind Converter — Bidirectional conversion with 200+ mappings](og-image.png)
*Alt text: CSS to Tailwind converter showing CSS code on the left and corresponding Tailwind utility classes on the right, with dark mode @media block support.*

---

### 3. Text Diff Tool

**What it does:** Git-diff style text comparison with line-level and word-level highlighting.

**Features:**
- Side-by-side text input panels
- Real-time diff computation as you type
- **Three output modes:** Unified, Split, and Words
- Line-level color coding: amber for additions, red for deletions, gray for unchanged
- Word-level highlighting within changed lines
- **Statistics panel:** total additions, deletions, changes, and similarity percentage
- Filter buttons to show only additions, only deletions, or all changes
- Word finder integration for searching within diff results

**SEO keywords:** text diff tool, compare text online, diff checker, code diff tool, text comparison, merge tool, patch generator

---

### 4. JSON Formatter

**What it does:** Pretty-print, minify, validate, and navigate JSON data.

**Features:**
- Pretty-print with configurable indentation (2 or 4 spaces)
- Minify/compress JSON to single line
- Real-time validation with error line highlighting
- **Collapsible tree view** for navigating nested structures
- Copy to clipboard
- Error messages with exact line and column numbers

**SEO keywords:** json formatter, json validator, json pretty print, json minifier, json formatter online, format json, json beautifier

---

### 5. Regex Tester

**What it does:** Real-time regular expression testing with match highlighting and group capture display.

**Features:**
- Regex input with flags (g, i, m, s, u)
- Real-time match highlighting in the test string
- Match count display
- **Capture group display** with numbered groups
- Full match details panel showing each match's index and groups
- Test against multiple strings

**SEO keywords:** regex tester, regular expression validator, regex online, regex checker, regex match, regex generator, test regex

---

### 6. Base64 Encoder/Decoder

**What it does:** Encode strings to Base64 and decode Base64 back to strings.

**Features:**
- One-click encode/decode toggle
- **Unicode support** (UTF-8 encoding)
- Real-time conversion as you type
- Copy output to clipboard

**SEO keywords:** base64 encoder, base64 decoder, base64 encode decode, base64 converter, encode string to base64, decode base64

---

### 7. URL Encoder/Decoder

**What it does:** Encode and decode URL components (query parameters, path segments).

**Features:**
- Encode special characters to percent-encoded format
- Decode percent-encoded strings back to readable text
- Handles full URLs and individual components

**SEO keywords:** url encoder, url decoder, url encode decode, percent encoding, url encode online, url decode online

---

### 8. JWT Token Decoder

**What it does:** Decode and inspect JSON Web Tokens (JWT) without sending them to any server.

**Features:**
- Paste any JWT token
- Instant decoding of Header, Payload, and Signature sections
- Syntax-highlighted JSON output
- **Expiration time display** with "expired" indicator
- Issued-at time display

**Critical privacy feature:** JWT tokens often contain sensitive data (user IDs, permissions, session data). OmniStack decodes them **entirely in the browser** — the token never leaves your machine.

**SEO keywords:** jwt decoder, jwt token decoder, json web token parser, jwt decode online, jwt validator, inspect jwt token

---

### 9. Flexbox & Grid Playground

**What it does:** Visual layout builder for CSS Flexbox and CSS Grid with live preview and Tailwind output.

**Features:**
- Toggle between Flexbox and Grid modes
- Flexbox: direction, justify-content, align-items, flex-wrap, gap
- Grid: columns, rows, gap, template areas
- Live preview pane
- **Tailwind class output** for the current layout

**SEO keywords:** flexbox playground, css grid playground, flexbox visualizer, grid layout builder, css layout tool, flexbox tutorial

---

### 10. Gradient Generator

**What it does:** Visual CSS gradient builder with draggable color stops.

**Features:**
- Linear, radial, and conic gradient types
- **Draggable color stops** on a gradient bar
- Color picker for each stop
- Angle control for linear gradients
- CSS output (standard and vendor-prefixed)

**SEO keywords:** gradient generator, css gradient builder, linear gradient, radial gradient, gradient maker, css gradient generator online

---

### 11. Box Shadow Generator

**What it does:** Visual CSS box-shadow builder with multi-layer support.

**Features:**
- Add multiple shadow layers
- X offset, Y offset, blur radius, spread radius controls
- Color picker for each layer
- **Inset shadow toggle**
- Live preview on a sample element

**SEO keywords:** box shadow generator, css shadow builder, box shadow css, drop shadow generator, box shadow maker

---

### 12. QR Code Generator

**What it does:** Generate downloadable QR codes from any text or URL.

**Features:**
- Input any text, URL, or data
- **Canvas-based rendering** (no server needed)
- Download as PNG
- Customizable size

**SEO keywords:** qr code generator free, qr code maker, qr code download, generate qr code, qr code generator online, free qr code

---

### 13. Password Generator

**What it does:** Generate cryptographically strong random passwords.

**Features:**
- Adjustable length (8-128 characters)
- Toggle: uppercase, lowercase, numbers, symbols
- **Password strength indicator**
- Copy to clipboard

**SEO keywords:** password generator, strong password generator, secure password generator, random password generator, password maker

---

### 14. UUID Generator

**What it does:** Generate v4 UUIDs (Universally Unique Identifiers).

**Features:**
- Generate single or batch UUIDs (1-100)
- Standard (with hyphens) or compact format
- Copy individual or all at once

**SEO keywords:** uuid generator, uuid v4 generator, generate uuid, unique identifier generator, uuid online

---

### 15. Timestamp Converter

**What it does:** Convert between Unix timestamps, ISO strings, and human-readable dates.

**Features:**
- Unix timestamp (seconds and milliseconds)
- ISO 8601 string input
- **Current timestamp display** (auto-updating)
- Copy any format

**SEO keywords:** timestamp converter, unix timestamp converter, epoch converter, timestamp to date, date to timestamp

---

### 16. Text Tokenizer

**What it does:** Count tokens, words, characters, and lines in any text. Essential for working with LLMs.

**Features:**
- **Token estimation** using character-level algorithm (~1 token per 4 English characters)
- Word count, character count, line count
- Visual token breakdown showing how each part is tokenized
- Color-coded by type: words (blue), numbers (green), punctuation (amber), whitespace (gray)
- Works with any text: plain text, code, JSON, XML, HTML, Unicode

**Use case:** You are writing a prompt for ChatGPT/Claude and need to stay within the token limit. Paste your text, see the token count instantly, and adjust before submitting.

**SEO keywords:** text tokenizer, llm token counter, token count tool, chatgpt token counter, text token counter, word counter, character counter

![Text Tokenizer — Count tokens for LLM prompts](og-image.png)
*Alt text: Text tokenizer showing input text on the left, token count statistics (tokens, words, characters, lines) on the right, with color-coded token breakdown.*

---

### 17. Lorem Ipsum Generator

**What it does:** Generate placeholder text with configurable paragraph count.

**Features:**
- Generate 1-20 paragraphs
- Copy to clipboard

**SEO keywords:** lorem ipsum generator, placeholder text generator, dummy text generator, filler text generator

---

### 18. HTML Preview Editor

**What it does:** Live side-by-side HTML/CSS/JS editor with instant preview.

**Features:**
- Three-pane editor: HTML, CSS, JavaScript
- **Live preview iframe** that updates as you type
- Responsive layout
- Full preview in new tab

**SEO keywords:** html preview editor, live html editor, online html editor, code editor online, html css js editor

---

### 19. Markdown Preview

**What it does:** Real-time Markdown editor with live HTML preview.

**Features:**
- Split-pane editor: Markdown on left, rendered HTML on right
- Supports headings, bold, italic, links, images, code blocks, lists, tables
- **Real-time rendering**

**SEO keywords:** markdown preview, markdown editor, markdown to html, live markdown editor, markdown viewer

---

### 20. Color Contrast Checker

**What it does:** Check color contrast ratios for WCAG accessibility compliance.

**Features:**
- Pick foreground and background colors
- **WCAG AA and AAA compliance indicators**
- Pass/fail badges for each level
- Color picker for both colors

**SEO keywords:** color contrast checker, wcag contrast checker, accessibility checker, color contrast ratio, wcag compliance tool

---

### 21. CSS Minifier

**What it does:** Minify CSS code by removing whitespace and unnecessary characters.

**Features:**
- Instant minification
- **Size comparison** (original vs minified)
- Percentage reduction display

**SEO keywords:** css minifier, css compressor, minify css, compress css online, css optimizer

---

### 22. Home Page — The Hub

The home page features:
- **Typewriter hero effect** cycling through tool capabilities
- **Dot-grid backdrop** with radial amber glow
- **Category filter pills** (Data, Converters, Design, Editors, Generators)
- **Tool cards** with staggered animations and hover effects
- **Search** to find tools by name or description

---

## Design Philosophy — "Warm Tremor"

OmniStack does not look like every other developer tool. The design language, called **Warm Tremor**, deliberately avoids the cold blue/purple gradient look.

### Color Palette

| Token | Dark Mode | Light Mode |
|---|---|---|
| Background | `#0c0e14` | `#f7f6f3` |
| Surface | `#12151e` | `#ffffff` |
| Accent | `#f0a500` (amber gold) | `#c87d0a` |
| Border | `#1c2030` | `#e2e0da` |

### Typography

- **Display:** Fraunces (variable optical serif)
- **Body:** Inter (clean sans-serif)
- **Code:** JetBrains Mono (monospace with ligatures)

### Why Amber Gold?

The developer tool space is dominated by cool colors — blue, purple, green. **Amber gold** (`#f0a500`) is warm, distinctive, and memorable. It suggests quality and craftsmanship rather than cold utility.

---

## Technical Architecture

### Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (hooks) |
| Build Tool | Vite 8 (437ms build) |
| Styling | Tailwind CSS + CSS custom properties |
| Icons | Custom SVG icon system |
| Fake Data | @faker-js/faker |
| QR Codes | qrcode npm package (Canvas) |
| Typography | Google Fonts (Fraunces, Inter, JetBrains Mono) |

### Performance

- **Cold build:** 437ms
- **Bundle:** ~843KB JS (faker.js), ~66KB CSS
- **First paint:** Sub-second
- **Works fully offline** after initial load

### Mobile Responsive

All 22 tools adapt for mobile:
- Sidebar hidden, hamburger menu
- Split-pane tools stack vertically
- Control panels become full-width

---

## SEO and Search Optimization

OmniStack is built for search engines:

- **JSON-LD structured data:** SoftwareApplication schema with all 22 tools
- **FAQPage schema:** 8 common questions with answers
- **Open Graph tags:** Full OG metadata for social sharing
- **Twitter Cards:** summary_large_image with custom content
- **Canonical URL:** https://omnistack.vercel.app/
- **Meta keywords:** 100+ targeted keywords covering every tool
- **sitemap.xml:** All 22 tool pages with priorities
- **robots.txt:** Full crawl access
- **Image alt text:** Descriptive alt text for all visual content

### Recommended Images for SEO

1. **Hero image** (`og-image.png`): Dashboard screenshot showing all 22 tools in a grid layout — 1200x630px
2. **Tool screenshots**: Individual screenshots of each tool in action — 800x600px each
3. **Comparison image**: Side-by-side of OmniStack vs server-side tools — 800x400px
4. **Architecture diagram**: How client-side processing works — 800x400px
5. **Mobile screenshot**: Responsive layout on phone — 400x800px

Each image should have descriptive alt text containing relevant keywords.

---

## Scraping Protection

OmniStack uses a clever approach to protect against content scraping:

- **14 tools** are rendered as static HTML in a `<noscript>` block — visible to crawlers and scrapers
- **22 tools** are available when JavaScript executes — the full React application
- This means scrapers only see a subset of the tools, while real users get the complete experience
- The static HTML includes proper heading hierarchy (h1, h2, h3), descriptive text, and structured data for SEO

---

## Comparison — Why OmniStack Wins

| Feature | OmniStack | Typical Dev Tools |
|---|---|---|
| Privacy | All client-side | Data sent to server |
| Tool Count | 22 tools in one app | One tool per site |
| Design | Warm amber, Fraunces | Cold blue, generic |
| Accounts | None required | Email + password |
| Offline | Works fully offline | Requires internet |
| Mobile | Fully responsive | Desktop-only |
| Open Source | Yes | Proprietary |
| Speed | Sub-second load | Bloated with ads |
| Tokenizer | Built-in LLM tokenizer | Separate tool |
| Scraping Protection | 14/22 tools exposed | Full content exposed |

---

## Getting Started

```bash
git clone https://github.com/your-username/omnistack.git
cd omnistack
npm install
npm run dev
```

Open `http://localhost:5173` and start using all 22 tools immediately.

**Deploy to Vercel:**
```bash
npm run build
vercel --prod
```

---

## FAQ

### What is OmniStack?
OmniStack is a free, client-side developer toolkit with 22 tools. All processing happens in your browser — no data ever leaves your device.

### Is OmniStack free?
Yes. No accounts, no sign-ups, no hidden fees. All 22 tools are free forever.

### Does OmniStack send my data to a server?
No. OmniStack is fully client-side. Your JSON, JWT tokens, passwords, CSS code, and any other data never leave your browser.

### Can I use OmniStack offline?
Yes. Once the page loads, OmniStack works fully offline without an internet connection.

### What tools does OmniStack include?
22 tools: Mock Data Generator, CSS to Tailwind Converter, Text Diff, JSON Formatter, Regex Tester, Base64 Encoder/Decoder, URL Encoder/Decoder, JWT Decoder, Flexbox/Grid Playground, Gradient Generator, Box Shadow Generator, QR Code Generator, Password Generator, UUID Generator, Timestamp Converter, Text Tokenizer, Lorem Ipsum Generator, HTML Preview Editor, Markdown Preview, Color Contrast Checker, CSS Minifier, and the Home hub.

### How does the CSS to Tailwind converter work?
It maps CSS property-value pairs to Tailwind utility classes using 200+ mappings. It handles shorthand properties, color resolution, arbitrary values, dark mode variants, and @media blocks.

### What is the text tokenizer?
The text tokenizer counts tokens, words, characters, and lines in text. It uses character-level estimation (~1 token per 4 English characters) similar to how LLMs tokenize text.

### Is OmniStack mobile-friendly?
Yes. All 22 tools are fully responsive and work on mobile devices.

---

*Built with React 19, Vite 8, and Tailwind CSS. Designed with the Warm Tremor philosophy. Powered by client-side processing. Used by 500+ developers worldwide.*

**Try it now:** [omnistack.vercel.app](https://omnistack.vercel.app)

OmniStack fixes this. It is a single-page application that bundles 21 essential developer tools into one clean, fast interface. The critical difference: **everything runs client-side in your browser**. No data ever leaves your machine. No accounts. No servers. No tracking.

Built with React, Vite, and Tailwind CSS, OmniStack is designed for developers who want speed, privacy, and a tool that actually looks good while doing real work.

---

## The Visual Identity — "Warm Tremor"

OmniStack does not look like every other developer tool. The design language, called **Warm Tremor**, deliberately avoids the cold blue/purple gradient look that dominates developer tools.

### Color Palette

| Token | Dark Mode | Light Mode |
|---|---|---|
| Background | `#0c0e14` | `#f7f6f3` |
| Surface | `#12151e` | `#ffffff` |
| Accent | `#f0a500` (amber gold) | `#c87d0a` |
| Muted text | `#505868` | `#5a5f6e` |
| Border | `#1c2030` | `#e2e0da` |

The amber gold accent (`#f0a500`) was chosen because it is distinctive — most dev tools use green, blue, or purple. Amber feels warm, intentional, and premium without being pretentious.

### Typography

- **Display:** Fraunces — a variable optical serif font that gives personality to headings and the hero section
- **Body:** Inter — clean, readable, and neutral for UI text
- **Code:** JetBrains Mono — optimized for reading code with ligatures and clear character distinction

### Animations

Every interaction in OmniStack is animated with purpose:

- **`fadeIn`** — 400ms opacity transition for page loads
- **`slideUp`** — Content slides up 12px as it fades in, creating a subtle lift effect
- **`blink`** — Cursor blink for the typewriter hero effect
- **`dotPulse`** — Pulsing dot animation for loading states
- All animations respect `prefers-reduced-motion` for accessibility

---

## Architecture — Privacy by Design

### Client-Side Only

OmniStack has **no backend**. Every tool processes data entirely in the browser using JavaScript. This means:

- **Your data never leaves your device** — JSON payloads, passwords, JWT tokens, CSS code — nothing is sent to any server
- **Works offline** — Once loaded, the app functions without an internet connection
- **No accounts required** — No sign-up, no login, no user data stored anywhere
- **GDPR compliant by architecture** — There is no personal data to collect

### Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (with hooks) |
| Build Tool | Vite 8 (437ms cold build) |
| Styling | Tailwind CSS + CSS custom properties |
| Icons | Custom SVG icon system |
| Fake Data | @faker-js/faker |
| QR Codes | `qrcode` npm package (canvas rendering) |
| Typography | Google Fonts (Fraunces, Inter, JetBrains Mono) |

### Theme System

The theme system uses CSS custom properties on the `<html>` element, toggled via a `data-theme` attribute. The `localStorage` key `omnistack-theme` persists the user's preference. On load, the theme is applied before React renders to prevent flash-of-unstyled-content.

```jsx
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);
```

### Layout

- **Desktop:** Collapsible sidebar (280px → 40px icon-only mode) + main content area
- **Mobile:** Sidebar hidden entirely, hamburger menu for navigation
- **Footer + Ad Bar:** Single fixed bar at the bottom with ad space and footer links
- All tool panels use responsive `flex-col md:flex-row` layouts

---

## The 21 Tools — Complete Breakdown

### 1. Mock Data Generator

**What it does:** Generates realistic fake data in JSON, CSV, or SQL format with customizable fields and record count.

**How it works:**
- Uses `@faker-js/faker` to generate realistic data
- 10 built-in data type presets: Users, Products, Orders, Addresses, Transactions, Posts, Employees, Invoices, Reviews, Custom
- Each preset defines fields with specific faker data types (uuid, fullName, email, amount, phone, boolean, company, jobTitle)
- Users can add custom fields with any faker data type
- Record count adjustable from 1 to 1,000
- Output formats: JSON (pretty-printed), CSV (with headers), SQL (INSERT statements)
- Export as file or copy to clipboard

**Use case:** You are building a frontend prototype and need 50 realistic user records with names, emails, phone numbers, and addresses. Instead of hand-typing them or writing a script, you select the "Users" preset, set count to 50, and get instant JSON ready for your mock API.

---

### 2. CSS ↔ Tailwind Converter

**What it does:** Bidirectional conversion between plain CSS and Tailwind CSS utility classes.

**CSS → Tailwind direction:**
- Parses CSS declarations (both flat and selector-wrapped)
- Handles `@media` blocks, nested selectors, and at-rules
- Maps ~200+ CSS property/value combinations to Tailwind classes
- Shorthand property expansion (padding, margin, gap, border-radius, grid)
- Arbitrary value output for values not in Tailwind's default scale
- Color resolution: hex colors map to Tailwind palette colors (e.g., `#f3f4f6` → `bg-gray-100`)
- Hex-with-alpha detection: `#ffffff1a` → `bg-white/10`
- Spacing conversion: `padding: 8px` → `p-2` (not `p-8`)

**Tailwind → CSS direction:**
- Full static class → CSS mapping (~400+ classes)
- Arbitrary value parsing: `grid-cols-[1fr_2.5rem_auto]` → `grid-template-columns: 1fr 2.5rem auto`
- CSS variable classes: `[--pattern-fg:var(--color-gray-950)]/5` → `--pattern-fg: color-mix(in srgb, var(--color-gray-950) 5%, transparent)`
- Dark mode variant handling: `dark:bg-gray-950` → wrapped in `@media (prefers-color-scheme: dark) { ... }`
- Opacity modifiers: `bg-white/10` → `background-color: #ffffff1a`

**Technical implementation:**
The CSS parser uses a custom tokenizer that separates flat declarations from `@media` blocks. The parser handles brace depth tracking, comment stripping, and selector extraction. The color resolver uses a lookup table of Tailwind's full color palette (slate through rose, all shades 50-950) to map hex values back to their Tailwind class names.

---

### 3. Text Diff Tool

**What it does:** Git-diff style text comparison with line-level and word-level highlighting.

**Features:**
- Side-by-side text input panels
- Real-time diff computation as you type
- Three output modes: Unified, Split, and Words
- Line-level color coding: green for additions, red for deletions, gray for unchanged
- Word-level highlighting within changed lines
- Statistics panel: total additions, deletions, changes, and similarity percentage
- Filter buttons to show only additions, only deletions, or all changes
- Word finder integration for searching within diff results
- Export diff results

**How it works internally:**
The diff algorithm compares text line by line, then within changed lines, compares word by word. The `WordFinder` component reads text directly from the parent component's state (not from local snapshots), ensuring that edits to text immediately update the diff output. Delete operations propagate to the parent via `setTextA`/`setTextB` callbacks.

**Use case:** You refactored a function and want to see exactly what changed. Paste the old version on the left, the new version on the right, and instantly see every addition, deletion, and modification highlighted.

---

### 4. JSON Formatter

**What it does:** Pretty-print, minify, validate, and navigate JSON data.

**Features:**
- Pretty-print with configurable indentation (2 or 4 spaces)
- Minify/compress JSON to single line
- Real-time validation with error line highlighting
- Collapsible tree view for navigating nested structures
- Copy to clipboard
- Error messages with exact line and column numbers

**Use case:** You received a minified API response and need to understand its structure. Paste it in, and OmniStack instantly formats it with proper indentation and collapsible sections.

---

### 5. Regex Tester

**What it does:** Real-time regular expression testing with match highlighting and group capture display.

**Features:**
- Regex input with flags (g, i, m, s, u)
- Real-time match highlighting in the test string
- Match count display
- Capture group display with numbered groups
- Full match details panel showing each match's index and groups
- Test against multiple strings

**Use case:** You are writing a regex for email validation and want to verify it matches all edge cases. Type the pattern, paste test strings, and see exactly which parts match and which groups capture what.

---

### 6. Base64 Encoder/Decoder

**What it does:** Encode strings to Base64 and decode Base64 back to strings.

**Features:**
- One-click encode/decode toggle
- Handles Unicode strings correctly (UTF-8 encoding)
- Real-time conversion as you type
- Copy output to clipboard
- Clear button

**Use case:** You need to encode an Authorization header value for an API call, or decode a Base64-encoded string from a JWT payload.

---

### 7. URL Encoder/Decoder

**What it does:** Encode and decode URL components (query parameters, path segments, etc.).

**Features:**
- Encode special characters to percent-encoded format
- Decode percent-encoded strings back to readable text
- Handles full URLs and individual components
- Real-time conversion

**Use case:** You need to construct a URL with query parameters containing spaces and special characters, or decode a URL someone sent you that is full of `%20` and `%3D`.

---

### 8. JWT Token Decoder

**What it does:** Decode and inspect JSON Web Tokens (JWT) without sending them to any server.

**Features:**
- Paste any JWT token
- Instant decoding of Header, Payload, and Signature sections
- Syntax-highlighted JSON output for each section
- Expiration time display (with "expired" indicator)
- Issued-at time display
- Token type detection

**Critical privacy feature:** JWT tokens often contain sensitive data (user IDs, permissions, session data). OmniStack decodes them entirely in the browser — the token never leaves your machine. This is essential for security-conscious developers who would never paste a real JWT into a server-side decoder.

**Use case:** You received a JWT from an API and need to debug why a request is failing. Paste the token to see its claims, check if it is expired, and verify the payload structure.

---

### 9. Flexbox & Grid Playground

**What it does:** Visual layout builder for CSS Flexbox and CSS Grid with live preview and Tailwind output.

**Features:**
- Toggle between Flexbox and Grid modes
- Visual controls for all major properties
- Flexbox: direction, justify-content, align-items, flex-wrap, gap
- Grid: columns, rows, gap, template areas
- Live preview pane showing the layout in real time
- Add/remove child elements
- Responsive sidebar panel (240px on desktop, full-width on mobile)
- Tailwind class output for the current layout

**Use case:** You are struggling to center a div (classic). Use the playground to visually find the right combination of `justify-content` and `align-items`, then copy the Tailwind classes.

---

### 10. Gradient Generator

**What it does:** Visual CSS gradient builder with draggable color stops and multiple gradient type support.

**Features:**
- Linear, radial, and conic gradient types
- Visual gradient preview
- Draggable color stops on a gradient bar
- Add/remove color stops
- Color picker for each stop
- Angle control for linear gradients
- CSS output (both standard and vendor-prefixed)
- Copy CSS to clipboard

**Use case:** You need a complex gradient background for a hero section. Instead of guessing at CSS values, use the visual builder to craft the exact gradient, then copy the CSS.

---

### 11. Box Shadow Generator

**What it does:** Visual CSS box-shadow builder with multi-layer support.

**Features:**
- Add multiple shadow layers
- Controls for X offset, Y offset, blur radius, spread radius
- Color picker for each layer
- Inset shadow toggle
- Live preview on a sample element
- CSS output with all layers
- Copy CSS to clipboard

**Use case:** You want to create a subtle, multi-layered shadow effect for a card component. Use the visual builder to layer shadows and see the result in real time.

---

### 12. QR Code Generator

**What it does:** Generate downloadable QR codes from any text or URL.

**Features:**
- Input any text, URL, or data
- Real-time QR code generation using the `qrcode` npm package
- Canvas-based rendering (no server needed)
- Download as PNG
- Customizable size
- Error correction level selection

**Technical implementation:** Uses the `qrcode` library to generate QR codes directly in the browser using an HTML Canvas element. No image is uploaded or processed on a server.

**Use case:** You need a QR code for a WiFi password, a meeting link, or a product page. Paste the text, download the PNG.

---

### 13. Lorem Ipsum Generator

**What it does:** Generate placeholder text with configurable paragraph count.

**Features:**
- Generate 1-20 paragraphs of lorem ipsum text
- Copy to clipboard
- Clear button
- Instant generation

**Use case:** You are building a layout and need filler text to see how content looks in your design. Generate 5 paragraphs and paste them in.

---

### 14. HTML Preview Editor

**What it does:** Live side-by-side HTML/CSS/JS editor with instant preview.

**Features:**
- Three-pane editor: HTML, CSS, JavaScript
- Live preview iframe that updates as you type
- Syntax highlighting in editor panes
- Responsive layout (stacked on mobile, side-by-side on desktop)
- Full preview in new tab

**Technical implementation:** Uses an iframe with `srcdoc` attribute to render the HTML/CSS/JS combination in real time. The preview updates on every keystroke with a debounce to prevent performance issues.

**Use case:** You want to quickly prototype an HTML component with inline styles and JavaScript. Type in the editor, see the result instantly — no file creation, no browser refresh.

---

### 15. Markdown Preview

**What it does:** Real-time Markdown editor with live HTML preview.

**Features:**
- Split-pane editor: Markdown on left, rendered HTML on right
- Supports standard Markdown syntax (headings, bold, italic, links, images, code blocks, lists, tables)
- Real-time rendering as you type
- Responsive layout (stacked on mobile)
- Copy rendered HTML

**Use case:** You are writing documentation or a README and want to see the rendered output in real time without switching to a preview tab.

---

### 16. Color Contrast Checker

**What it does:** Check color contrast ratios for WCAG accessibility compliance.

**Features:**
- Pick foreground and background colors
- Real-time contrast ratio calculation
- WCAG AA and AAA compliance indicators (normal text, large text, UI components)
- Pass/fail badges for each compliance level
- Color picker for both foreground and background

**Use case:** You need to verify that your text color has sufficient contrast against its background to meet accessibility standards. Pick the colors, see the ratio, and know instantly if you pass WCAG AA.

---

### 17. Timestamp Converter

**What it does:** Convert between Unix timestamps, ISO strings, and human-readable dates.

**Features:**
- Unix timestamp (seconds and milliseconds) input
- ISO 8601 string input
- Human-readable date string input
- Convert in any direction
- Current timestamp display (auto-updating)
- Copy any format

**Use case:** You have a Unix timestamp from a database and need to know what date it represents, or you need to get the current Unix timestamp for an API call.

---

### 18. UUID Generator

**What it does:** Generate v4 UUIDs (Universally Unique Identifiers).

**Features:**
- Generate single or batch UUIDs (1-100)
- Copy individual UUIDs or all at once
- Format options: standard (with hyphens) or compact (no hyphens)
- Clear and regenerate

**Use case:** You need unique identifiers for database records, API keys, or test data. Generate 50 UUIDs instantly.

---

### 19. Password Generator

**What it does:** Generate cryptographically strong random passwords with configurable options.

**Features:**
- Adjustable length (8-128 characters)
- Toggle character types: uppercase, lowercase, numbers, symbols
- Real-time password generation
- Copy to clipboard
- Password strength indicator
- Regenerate button

**Use case:** You need a strong password for a new account or API key. Set your requirements, generate, copy.

---

### 20. CSS Minifier

**What it does:** Minify CSS code by removing whitespace, comments, and unnecessary characters.

**Features:**
- Paste CSS code
- Instant minification
- Size comparison (original vs minified)
- Percentage reduction display
- Copy minified output

**How it works:** The minifier strips comments, collapses whitespace, removes unnecessary semicolons and spaces, and optimizes CSS values. Does not change CSS functionality — only reduces file size.

**Use case:** You need to minify a CSS file before deploying to production. Paste the CSS, get the minified version, and paste it into your build pipeline.

---

### 21. Home Page — The Hub

The home page is not just a landing page — it is a functional tool selection interface:

- **Typewriter hero effect** cycling through tool capabilities with a blinking cursor
- **Dot-grid backdrop** with radial amber glow effect
- **Category filter pills** to filter tools by category
- **Tool cards** with staggered entrance animations, left accent bar on hover
- **Search** to find tools by name or description
- **Logo** — a custom SVG hexagon with dual chevrons and center dot in amber

---

## SEO and Discoverability

OmniStack is built with search engine optimization in mind:

- **JSON-LD structured data** — WebApplication schema with all 21 tools listed in `featureList`
- **Open Graph tags** — Full OG metadata for social media sharing (title, description, image, site_name)
- **Twitter Cards** — `summary_large_image` card with custom title, description, and image
- **Canonical URL** — `https://omnistack.vercel.app/`
- **Meta keywords** — Comprehensive keyword list covering every tool name and common search terms
- **Meta robots** — `index, follow, max-snippet:-1, max-image-preview:large`
- **sitemap.xml** — All 21 tool pages listed with priorities
- **robots.txt** — Allows all crawlers, points to sitemap

---

## Design Decisions That Matter

### Why Client-Side?

Most developer tools are server-side. You paste your JSON into a website, it gets sent to their server, processed, and returned. This is a privacy nightmare — your API keys, JWT tokens, database records, and proprietary code all travel to third-party servers.

OmniStack takes the opposite approach. Every tool runs in your browser using JavaScript. The `@faker-js/faker` library generates fake data locally. The QR code library renders to Canvas locally. The CSS parser runs locally. Nothing is ever transmitted.

### Why Amber Gold?

The developer tool space is dominated by cool colors — blue, purple, green. These feel technical but generic. Amber gold (`#f0a500`) is warm, distinctive, and memorable. It suggests quality and craftsmanship rather than cold utility.

### Why Fraunces for Display?

Most developer tools use system fonts or clean sans-serifs for everything. Fraunces is a variable optical serif font — it has personality. Using a serif font for headings in a developer tool is unexpected, which makes OmniStack memorable. The variable weight axis (100-900) allows subtle weight adjustments.

### Why No Accounts?

Accounts are friction. They require email verification, password management, and create attack surfaces. For a tool that processes data locally, accounts provide no value. OmniStack works the moment you open it — no sign-up, no onboarding, no "welcome" email.

---

## Performance

- **Cold build:** 437ms (Vite 8)
- **Bundle size:** ~843KB JS (including faker.js), ~66KB CSS
- **First paint:** Sub-second on modern connections
- **No runtime dependencies on external APIs** — works fully offline after initial load

The bundle size warning (~843KB) is almost entirely from `@faker-js/faker`, which contains thousands of data generation functions. This is acceptable for a developer tool where functionality outweighs bundle size.

---

## Mobile Responsiveness

Every tool has been designed for mobile use:

- **Sidebar:** Hidden on mobile, accessible via hamburger menu
- **Split-pane tools** (JsonFormatter, TextDiff, RegexTester, Base64Tool, UrlEncoder, HtmlPreviewEditor, MarkdownPreview, CssMinifier): Stack vertically on mobile (`flex-col md:flex-row`)
- **Sidebar-layout tools** (FlexboxGridPlayground, GradientGenerator, BoxShadowGenerator, QrCodeGenerator, ColorContrastChecker, TimestampConverter, UuidGenerator, PasswordGenerator): Control panels become full-width on mobile
- **Generator tool:** Control panel stacks above output on mobile

---

## The Converter Deep Dive

The CSS ↔ Tailwind converter deserves special attention because it is the most complex tool in OmniStack.

### CSS → Tailwind Pipeline

1. **Comment stripping** — Removes all `/* ... */` comments before parsing
2. **CSS parsing** — Custom tokenizer separates flat declarations from `@media` blocks and selectors
3. **Declaration splitting** — Splits rule bodies by `;` and extracts property-value pairs
4. **Value normalization** — Strips trailing semicolons, trims whitespace
5. **Property mapping** — Each property-value pair is mapped through:
   - Exact match table (~100 entries)
   - Color resolver (hex, rgb, hsl, named colors → Tailwind classes)
   - Shorthand expansion (padding → p, margin → m, etc.)
   - Spacing conversion (px → Tailwind scale via ÷4)
   - Grid template mapping
   - Font size mapping
   - Generic fallback: `property-[value]`
6. **Output assembly** — Classes joined with spaces, @media blocks wrapped in their selector

### Tailwind → CSS Pipeline

1. **Class splitting** — Splits input by whitespace
2. **Dark mode detection** — Strips `dark:` prefix, marks for `@media (prefers-color-scheme: dark)` wrapping
3. **Class resolution** (in priority order):
   - Static map (~400 class → CSS declarations)
   - Color resolver (with full Tailwind palette lookup)
   - Arbitrary value parser (`prop-[value]` → `property: value`)
   - CSS variable resolver (`[--var:value]/opacity` → `var-name: color-mix(...)`)
4. **Dark mode grouping** — Consecutive dark: classes merged into single `@media` block
5. **Output assembly** — Declarations joined with newlines

---

## Getting Started

```bash
git clone https://github.com/your-username/omnistack.git
cd omnistack
npm install
npm run dev
```

Open `http://localhost:5173` and start using all 21 tools immediately.

**Deploy to Vercel:**
```bash
npm run build
vercel --prod
```

---

## What Makes OmniStack Different

| Feature | OmniStack | Typical Dev Tools |
|---|---|---|
| Privacy | All processing client-side | Data sent to server |
| Tool Count | 21 tools in one app | One tool per site |
| Design | Warm amber, Fraunces serif | Cold blue, generic sans |
| Accounts | None required | Email + password |
| Offline | Works fully offline | Requires internet |
| Mobile | Fully responsive | Often desktop-only |
| Open Source | Yes | Usually proprietary |
| Speed | Sub-second load | Often bloated with ads |

---

## Conclusion

OmniStack is not just another developer tool collection. It is a statement that developer tools can be private, beautiful, and comprehensive without compromise. Every tool runs in your browser. Every design choice is intentional. Every feature exists because developers actually need it.

The 21 tools cover the most common daily tasks of frontend and full-stack developers — from generating mock data to converting CSS, from testing regex patterns to decoding JWT tokens. And they all work without sending a single byte of your data to any server.

**Try it:** [omnistack.vercel.app](https://omnistack.vercel.app)

---

*Built with React, Vite, and Tailwind CSS. Designed with the Warm Tremor philosophy. Powered by client-side processing.*
