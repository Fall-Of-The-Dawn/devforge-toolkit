# Task 1: Update CSS Variables and Typography

## Goal
Update CSS variables and typography in `src/index.css` to match the new design system.

## Files to Modify
- `src/index.css`

## Requirements

### 1. Update CSS variables for dark theme
Replace the `:root` section:

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

### 2. Update CSS variables for light theme
Replace the light theme section:

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

### 3. Update typography classes
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

### 4. Add glass effect utility classes
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

## Verification
- Run `npm run build` to verify build succeeds
- Commit changes with message: "feat: update CSS variables and typography for redesign"

## Report File
Write your report to: `D:\Rusil\test\.superpowers\sdd\task-1-report.md`

Include:
- Status: DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, or BLOCKED
- Changes made
- Build verification result
- Any concerns or issues encountered
