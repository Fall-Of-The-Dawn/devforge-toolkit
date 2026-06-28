# DevClat Redesign — Apple-Inspired with Glass Accents

## Overview

Redesign DevClat developer toolkit with Apple-inspired clean typography, minimal cards, glass morphism on navbar, and dense footer. Keep coral (#FF6B6B) accent, Inter + Fraunces fonts, both dark and light themes equally polished.

---

## Color System

### Dark Theme
| Token | Value | Use |
|-------|-------|-----|
| `--bg-deep` | `#050505` | Page background |
| `--bg-surface` | `#0a0a0a` | Cards, panels |
| `--bg-elevated` | `#111111` | Hover states |
| `--bg-hover` | `#1a1a1a` | Interactive hover |
| `--border` | `#1a1a1a` | Subtle dividers |
| `--border-hover` | `#2a2a2a` | Border hover |
| `--text-primary` | `#e8e8e8` | Headlines, body |
| `--text-secondary` | `#888888` | Secondary text |
| `--text-muted` | `#555555` | Captions, hints |
| `--accent` | `#FF6B6B` | Primary coral |
| `--accent-soft` | `rgba(255, 107, 107, 0.06)` | Subtle backgrounds |
| `--accent-glow` | `rgba(255, 107, 107, 0.12)` | Hover glow |
| `--accent-strong` | `rgba(255, 107, 107, 0.2)` | Active states |

### Light Theme
| Token | Value | Use |
|-------|-------|-----|
| `--bg-deep` | `#fafafa` | Page background |
| `--bg-surface` | `#ffffff` | Cards, panels |
| `--bg-elevated` | `#ffffff` | Hover states |
| `--bg-hover` | `#f5f5f5` | Interactive hover |
| `--border` | `#e0e0e0` | Subtle dividers |
| `--border-hover` | `#cccccc` | Border hover |
| `--text-primary` | `#1a1a1a` | Headlines, body |
| `--text-secondary` | `#555555` | Secondary text |
| `--text-muted` | `#888888` | Captions, hints |
| `--accent` | `#E55B5B` | Primary coral |
| `--accent-soft` | `rgba(229, 91, 91, 0.06)` | Subtle backgrounds |
| `--accent-glow` | `rgba(229, 91, 91, 0.1)` | Hover glow |
| `--accent-strong` | `rgba(229, 91, 91, 0.18)` | Active states |

### Glass Effect
- Dark: `bg-[#0a0a0a]/70 backdrop-blur-xl saturate-150`
- Light: `bg-[#fafafa]/70 backdrop-blur-xl saturate-150`

---

## Typography

### Font Families
- **Display:** `Fraunces, Georgia, serif` — headlines, hero text
- **Body:** `Inter, system-ui, sans-serif` — paragraphs, UI elements
- **Mono:** `JetBrains Mono, monospace` — code, technical text

### Type Scale
| Token | Size | Weight | Line Height | Letter Spacing | Font | Use |
|-------|------|--------|-------------|----------------|------|-----|
| `hero` | 56px | 600 | 1.07 | -0.02em | Fraunces | Hero headline |
| `display-lg` | 40px | 600 | 1.1 | -0.02em | Fraunces | Category headers |
| `display-md` | 34px | 600 | 1.47 | -0.01em | Inter | Section heads |
| `lead` | 28px | 400 | 1.14 | 0 | Inter | Sub-headlines |
| `body-strong` | 17px | 600 | 1.24 | -0.01em | Inter | Strong emphasis |
| `body` | 17px | 400 | 1.47 | -0.01em | Inter | Paragraphs |
| `caption` | 14px | 400 | 1.43 | -0.01em | Inter | Captions, hints |
| `fine-print` | 12px | 400 | 1.0 | 0 | Inter | Legal, footer |

### Key Principles
- Negative letter-spacing at display sizes (-0.02em to -0.04em)
- Body at 17px, not 16px
- Weight 600 for headlines, 400 for body
- Weight 500 deliberately absent

---

## Layout & Spacing

### Spacing Scale
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 80px

### Container
- Max width: 1200px (tool grid)
- Max width: 980px (text-heavy sections)
- Padding: 24px horizontal (mobile: 16px)

### Section Rhythm
- Hero: 80px vertical padding
- Tool grid: 64px vertical padding
- Category sections: 80px vertical padding
- Footer: 64px vertical padding

### Border Radius
- Cards: 12px
- Buttons: 8px (utility), 9999px (pill CTAs)
- Icons: 10px

### Grid
- Tool cards: 4 columns (desktop), 3 (tablet), 2 (mobile), 1 (small mobile)
- Footer: 4 columns (desktop), 2 (mobile)

---

## Components

### Navbar
- Fixed position, glass effect background
- Logo (image + "devclat .tools" text) on left
- Navigation links on right (hidden on mobile, hamburger menu)
- Breadcrumb when inside a tool: `devclat .tools > Tool Name`
- Theme toggle and Privacy link on far right
- Height: 52px

### Tool Cards
- Minimal design: thin 1px border, no shadows
- Icon with subtle accent glow on hover only
- Title in Inter 600 weight
- Description in Inter 400, muted color
- Left accent bar appears on hover (2px, coral)
- Smooth transition (200ms)

### Category Headers
- Apple-style typography: Fraunces 40px/600
- Subtle divider line below
- Category description in Inter 17px/400

### Footer
- Dense columns with tool categories
- Column headings in Inter 14px/600
- Links in Inter 17px/400, relaxed line-height (2.41)
- Legal row at bottom in Inter 12px/400
- Glass effect background

---

## Responsive Behavior

### Breakpoints
- Desktop: ≥1024px (4-column grid)
- Tablet: 768-1023px (3-column grid)
- Mobile: <768px (2-column grid)
- Small mobile: <480px (1-column grid)

### Touch Targets
- Minimum 44x44px for interactive elements
- Buttons: 44px height minimum

---

## Do's and Don'ts

### Do
- Use coral (#FF6B6B) for every interactive element
- Set headlines with negative letter-spacing
- Run body copy at 17px
- Use glass effect only on navbar and category headers
- Keep cards minimal with thin borders

### Don't
- Add shadows to cards or buttons
- Use gradients as decorative backgrounds
- Set body copy at weight 500
- Round full-bleed tiles
- Tighten line-height below 1.47 for body copy

---

## Files to Modify

1. `src/index.css` — CSS variables, typography, animations
2. `src/components/Header.jsx` — Glass navbar, breadcrumb
3. `src/components/Home.jsx` — Hero, tool grid, category headers
4. `src/components/Footer.jsx` — Dense columns footer
5. `src/App.jsx` — Layout wrapper
6. `src/utils/constants.js` — Theme variables
