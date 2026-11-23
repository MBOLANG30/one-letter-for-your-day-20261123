// One Letter for Your Day — writes a single letter, Z, to entry.txt.
//
// The whole entry is one character. The letter stands for the word behind
// the day: Z for zombie — a day shambled through on zero sleep, running on
// fumes and cold coffee. Of all twenty-six letters, Z carries the sharpest
// picture: the rare letter leaves no room for a vague mood, and "zombie"
// lands at once as vivid, funny, and true. Z is also the fit the brief
// itself reaches for (Z for zero sleep), and the Z sound sits inside the
// word it stands for, so the initial suits its word.
//
// Contract (see the kit's RULES.txt): the program writes one text of
// exactly 1 character, UTF-8, not only whitespace, to
// <outputDir>/entry.txt. The output directory comes from
// MAKEFUN_OUTPUT_DIR when set, otherwise it defaults to /output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: exactly one letter, and nothing else.
const LETTER = "Z";

// Resolve the output directory: env override first, /output as fallback.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Validate the letter before writing anything, so a bad value fails loudly
// instead of producing an invalid entry. The gate wants exactly one
// character, A-Z, and nothing else — no word, no gloss, no punctuation.
if (!/^[A-Z]$/.test(LETTER)) {
  console.error(`Entry must be exactly one letter A-Z, got ${JSON.stringify(LETTER)}.`);
  process.exit(1);
}

// Create the output directory if it is missing. Never delete it or its
// contents: the grader may mount it, so we only add our file to it.
mkdirSync(outputDir, { recursive: true });

// Write exactly the letter — no trailing newline, no extra text.
writeFileSync(join(outputDir, "entry.txt"), LETTER, "utf8");

// Read it back and confirm the file holds exactly the letter: a write
// that silently landed elsewhere must fail loudly, not ship a bad entry.
if (readFileSync(join(outputDir, "entry.txt"), "utf8") !== LETTER) {
  console.error("entry.txt does not hold exactly the entry letter.");
  process.exit(1);
}
console.log(`Wrote ${LETTER} to ${join(outputDir, "entry.txt")}.`);
