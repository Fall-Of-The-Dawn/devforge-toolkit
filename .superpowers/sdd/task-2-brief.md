# Task 2: Update Theme Variables in Constants

## Goal
Update THEME_VARS in `src/utils/constants.js` to use the new glass effect classes and updated color values.

## Files to Modify
- `src/utils/constants.js`

## Requirements

### 1. Update THEME_VARS in constants.js
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

## Verification
- Run `npm run build` to verify build succeeds
- Commit changes with message: "feat: update theme variables for redesign"

## Report File
Write your report to: `D:\Rusil\test\.superpowers\sdd\task-2-report.md`

Include:
- Status: DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, or BLOCKED
- Changes made
- Build verification result
- Any concerns or issues encountered
