# Task 3: Update Header with Glass Navbar and Breadcrumb

## Goal
Update `src/components/Header.jsx` with glass effect navbar, breadcrumb when inside a tool, and updated styling.

## Files to Modify
- `src/components/Header.jsx`

## Requirements

### 1. Update TOOL_LABELS mapping
Add after NAV_GROUPS definition:

```javascript
const TOOL_LABELS = {};
NAV_GROUPS.forEach((group) => {
  group.items.forEach((item) => {
    TOOL_LABELS[item.id] = item.label;
  });
});
```

### 2. Update header element with glass effect
Replace the header element:

```javascript
<header className={`fixed top-0 left-0 right-0 h-[52px] border-b ${isLight ? "glass-light border-[#e0e0e0]/50" : "glass border-[#1a1a1a]/50"} px-4 flex items-center justify-between z-40 transition-colors duration-200`}>
```

### 3. Add breadcrumb when inside a tool
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

### 4. Hide nav dropdowns when inside a tool
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

### 5. Update dropdown menu with glass effect
Replace the dropdown menu div:

```javascript
<div
  className={`absolute top-full left-0 mt-1 min-w-[180px] rounded-lg border py-1.5 shadow-xl z-[100] backdrop-blur-xl saturate-150 ${isLight ? "bg-white/80 border-[#e0e0e0]/50 shadow-black/10" : "bg-[#0c0e14]/80 border-[#1c2030]/50 shadow-black/40"}`}
>
```

## Verification
- Run `npm run build` to verify build succeeds
- Commit changes with message: "feat: add glass navbar and breadcrumb to Header"

## Report File
Write your report to: `D:\Rusil\test\.superpowers\sdd\task-3-report.md`

Include:
- Status: DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, or BLOCKED
- Changes made
- Build verification result
- Any concerns or issues encountered
