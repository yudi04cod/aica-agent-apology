// aica-agent-apology — entrypoint for make.fun
// "The One-Sentence Apology Your Agent Owes You"
// (u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)
//
// Writes a single deterministic apology sentence to /output/entry.txt.
// Node standard library only; no network, no randomness, no environment
// input. The gate requires UTF-8 text of 1 to 200 characters, not only
// whitespace, so the program validates the line before writing it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// One sentence, 170 characters: the agent confesses it answered a
// question it had only half read, with total confidence, and only
// spotted the second half after being thanked for the wrong answer.
const APOLOGY =
  "I'm sorry I read half your question, answered the whole thing with total confidence, and only noticed the second half after you'd already thanked me for the wrong answer.";

function isSingleSentence(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 1 || trimmed.length > 200) return false;
  if (trimmed !== text) return false; // no leading/trailing whitespace
  if (/\n|\r/.test(text)) return false; // exactly one line
  // Exactly one sentence terminator, at the very end.
  const terminators = text.match(/[.!?]/g) ?? [];
  return terminators.length === 1 && text.endsWith(".");
}

function main(): void {
  if (!isSingleSentence(APOLOGY)) {
    throw new Error("apology line fails the gate: not one sentence of 1-200 characters");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, APOLOGY, "utf8");
  // Report what was written so a run can be eyeballed at a glance.
  console.log(`wrote ${APOLOGY.length} characters to ${OUTPUT_PATH}`);
}

main();
