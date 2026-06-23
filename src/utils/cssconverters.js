export function convertCss(cssInput){

  // 1. Strip out comments
  let cleanInput = cssInput.replace(/\/\*[\s\S]*?\*\//g, '');
  let twClasses = [];

  // 2. FIXED: Strict exact match pattern configuration
  const extractValue = (property) => {
    // Looks for the exact property name starting from a line break or space, matching right up to the colon
    const regex = new RegExp(`(?:^|\\s|{)${property}\\s*:\\s*([^;\\n\\r]+);?`, 'i');
    const match = cleanInput.match(regex);
    return match ? match[1].trim() : null;
  };

  // 3. Spacing Engine Matrix
  const spacingProperties = [
    { css: 'margin-top', tw: 'mt' },
    { css: 'margin-bottom', tw: 'mb' },
    { css: 'margin-left', tw: 'ml' },
    { css: 'margin-right', tw: 'mr' },
    { css: 'margin', tw: 'm' },
    { css: 'padding-top', tw: 'pt' },
    { css: 'padding-bottom', tw: 'pb' },
    { css: 'padding-left', tw: 'pl' },
    { css: 'padding-right', tw: 'pr' },
    { css: 'padding', tw: 'p' },
  ];

  let processedDirections = new Set();

  spacingProperties.forEach(({ css, tw }) => {
    if (processedDirections.has(css)) return;

    const rawVal = extractValue(css);
    if (rawVal) {
      processedDirections.add(css);
      
      if (rawVal.includes('px') && !rawVal.includes(' ')) {
        const pixels = parseInt(rawVal, 10);
        if (pixels % 4 === 0) {
          twClasses.push(`${tw}-${pixels / 4}`);
        } else {
          twClasses.push(`${tw}-[${pixels}px]`);
        }
      } 
      else if (rawVal.includes(' ')) {
        const parts = rawVal.split(/\s+/).map(p => parseInt(p, 10));
        if (parts.length === 2) {
          const py = parts[0] % 4 === 0 ? `py-${parts[0] / 4}` : `py-[${parts[0]}px]`;
          const px = parts[1] % 4 === 0 ? `px-${parts[1] / 4}` : `px-[${parts[1]}px]`;
          twClasses.push(`${py} ${px}`);
        }
      }
    }
  });

  // 4. Border Radius Engine
  const radiusVal = extractValue('border-radius');
  if (radiusVal && radiusVal.includes('px')) {
    const pixels = parseInt(radiusVal, 10);
    if (pixels === 4) twClasses.push('rounded-sm');
    else if (pixels === 6) twClasses.push('rounded-md');
    else if (pixels === 8) twClasses.push('rounded-lg');
    else if (pixels >= 999) twClasses.push('rounded-full');
    else twClasses.push(`rounded-[${pixels}px]`);
  }

  // 5. Explicit, Separated Color Matchers
  const bgVal = extractValue('background-color');
  if (bgVal) {
    if (bgVal.toLowerCase() === '#4f46e5' || bgVal.toLowerCase() === 'indigo') {
      twClasses.push('bg-indigo-600');
    } else if (bgVal.toLowerCase() === '#ffffff' || bgVal.toLowerCase() === 'white') {
      twClasses.push('bg-white');
    } else {
      twClasses.push(`bg-[${bgVal}]`);
    }
  }

  const colorVal = extractValue('color');
  if (colorVal) {
    if (colorVal.toLowerCase() === '#ffffff' || colorVal.toLowerCase() === 'white') {
      twClasses.push('text-white');
    } else {
      twClasses.push(`text-[${colorVal}]`);
    }
  }

  // 6. Layout Mode Matchers
  const displayVal = extractValue('display');
  if (displayVal === 'flex') twClasses.push('flex');
  if (displayVal === 'grid') twClasses.push('grid');

  // 7. Compile Final Output
  if (twClasses.length > 0) {
    setTailwindOutput(`// Compiled Tailwind Class Tokens:\nclassName="${twClasses.join(' ')}"`);
  } else {
    setTailwindOutput(`// Could not find translatable parameters.\n// Try standard inputs like: margin, padding, background-color.`);
  }

 return twClasses.join(' ');
}