# Task 6: Update App Layout Wrapper

## Goal
Update `src/App.jsx` with proper layout wrapper, spacing, and updated styling.

## Files to Modify
- `src/App.jsx`

## Requirements

### 1. Update App layout
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

## Verification
- Run `npm run build` to verify build succeeds
- Commit changes with message: "feat: update App layout wrapper for redesign"

## Report File
Write your report to: `D:\Rusil\test\.superpowers\sdd\task-6-report.md`

Include:
- Status: DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, or BLOCKED
- Changes made
- Build verification result
- Any concerns or issues encountered
