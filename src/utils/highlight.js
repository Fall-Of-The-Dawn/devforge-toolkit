export function highlightJSON(str) {
  if (!str) return null;
  try {
    const parsed = JSON.parse(str);
    str = JSON.stringify(parsed, null, 2);
  } catch {
    return str;
  }
  const lines = str.split("\n");
  return lines.map((line) => {
    let highlighted = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    highlighted = highlighted.replace(
      /"([^"]+)"(\s*:)/g,
      '<span class="json-key">"$1"</span>$2',
    );
    highlighted = highlighted.replace(
      /:\s*"([^"]*)"(,?)/g,
      ': <span class="json-string">"$1"</span>$2',
    );
    highlighted = highlighted.replace(
      /:\s*(\d+\.?\d*)(,?)/g,
      ': <span class="json-number">$1</span>$2',
    );
    highlighted = highlighted.replace(
      /:\s*(true|false)(,?)/g,
      ': <span class="json-number">$1</span>$2',
    );
    highlighted = highlighted.replace(
      /([[\]{}])/g,
      '<span class="json-bracket">$1</span>',
    );
    return highlighted;
  });
}
