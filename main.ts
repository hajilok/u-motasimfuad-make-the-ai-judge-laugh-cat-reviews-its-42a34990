import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

// Tournament champion selected via blind dual-panel pairwise round-robin.
const REVIEW =
  "One star. Zero hospitality: scooped me off the white rug onto tile mid-hairball, forcing me to hold it in all the way to his pillow.";

function assertValidReview(text: string): void {
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    throw new Error(`Review length ${charCount} outside 1..${MAX_CHARS} characters`);
  }
  if (text.trim().length === 0) {
    throw new Error("Review must not be whitespace only");
  }
  if (/[\r\n\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("Review must be a single line of printable text");
  }
}

function main(): void {
  assertValidReview(REVIEW);
  const outputDir = process.argv[2] ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, REVIEW, "utf8");
}

main();
