import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

// Initial baseline candidate (v1) prior to blind Swiss tournament selection.
const REVIEW =
  "1/5: Left a dime-sized circle of bare metal in my bowl, then shook it once to refill it, proving he could end my starvation anytime and simply chooses not to.";

function assertValidReview(text: string): void {
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    throw new Error(`Review length ${charCount} outside 1..${MAX_CHARS} characters`);
  }
  if (text.trim().length === 0) {
    throw new Error("Review must not be whitespace only");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Review must be a single line with no line breaks");
  }
}

function main(): void {
  assertValidReview(REVIEW);
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, REVIEW, "utf8");
}

main();
