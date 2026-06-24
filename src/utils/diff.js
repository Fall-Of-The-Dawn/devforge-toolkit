function lcs(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift({ type: "equal", value: a[i - 1] });
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      result.unshift({ type: "removed", value: a[i - 1] });
      i--;
    } else {
      result.unshift({ type: "added", value: b[j - 1] });
      j--;
    }
  }
  while (i > 0) {
    result.unshift({ type: "removed", value: a[i - 1] });
    i--;
  }
  while (j > 0) {
    result.unshift({ type: "added", value: b[j - 1] });
    j--;
  }

  return result;
}

function diffWords(oldLine, newLine) {
  const oldWords = oldLine.split(/(\s+)/);
  const newWords = newLine.split(/(\s+)/);
  const diff = lcs(oldWords, newWords);
  return diff;
}

function alignLines(oldLines, newLines) {
  const m = oldLines.length;
  const n = newLines.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({ type: "unchanged", oldLine: oldLines[i - 1], newLine: newLines[j - 1], oldNum: i, newNum: j });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "added", newLine: newLines[j - 1], newNum: j });
      j--;
    } else if (i > 0) {
      result.unshift({ type: "removed", oldLine: oldLines[i - 1], oldNum: i });
      i--;
    }
  }

  return result;
}

export function computeDiff(oldText, newText) {
  if (!oldText && !newText) return [];
  if (!oldText) {
    return newText.split("\n").map((line, idx) => ({
      type: "added", newLine: line, newNum: idx + 1,
      wordDiff: [{ type: "added", value: line }],
    }));
  }
  if (!newText) {
    return oldText.split("\n").map((line, idx) => ({
      type: "removed", oldLine: line, oldNum: idx + 1,
      wordDiff: [{ type: "removed", value: line }],
    }));
  }

  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const aligned = alignLines(oldLines, newLines);

  const result = [];
  let unchangedCount = 0;

  for (const item of aligned) {
    if (item.type === "unchanged") {
      unchangedCount++;
      if (unchangedCount <= 3) {
        result.push({
          ...item,
          wordDiff: [{ type: "equal", value: item.oldLine }],
        });
      } else if (item === aligned[aligned.length - 1] || aligned[aligned.indexOf(item) + 1]?.type !== "unchanged") {
        result.push({
          type: "separator",
          content: `... ${unchangedCount - 3} unchanged lines hidden ...`,
        });
        unchangedCount = 0;
      }
    } else {
      unchangedCount = 0;

      if (item.type === "removed") {
        const nextAdded = aligned[aligned.indexOf(item) + 1];
        if (nextAdded && nextAdded.type === "added") {
          const wordDiff = diffWords(item.oldLine, nextAdded.newLine);
          result.push({
            type: "changed",
            oldLine: item.oldLine,
            newLine: nextAdded.newLine,
            oldNum: item.oldNum,
            newNum: nextAdded.newNum,
            wordDiff,
          });
          aligned.splice(aligned.indexOf(nextAdded), 1);
          continue;
        }
        const wordDiff = item.oldLine.split(/(\s+)/).map(w => ({ type: "removed", value: w }));
        result.push({ ...item, wordDiff });
      } else if (item.type === "added") {
        const wordDiff = item.newLine.split(/(\s+)/).map(w => ({ type: "added", value: w }));
        result.push({ ...item, wordDiff });
      }
    }
  }

  return result;
}
