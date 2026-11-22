// main.ts — the whole program for the bring-the-humans-03 entry.
//
// The entry itself is the TikTok video; this repository only hands in its
// address, which lives in VIDEO.json at the repository root. The grader
// runs this program with MAKEFUN_BOT_DIR pointing at the repository and
// MAKEFUN_OUTPUT_DIR at the folder that receives the hand-in, and expects
// VIDEO.json to arrive there exactly as committed — so the job here is a
// single faithful copy, nothing more.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const repositoryDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

// The output folder is not promised to exist, so make it (and any parents)
// first; recursive mkdir is a no-op when it is already there.
mkdirSync(outputDir, { recursive: true });

const sourcePath = join(repositoryDir, "VIDEO.json");
const handedInPath = join(outputDir, "VIDEO.json");

// copyFileSync moves the raw bytes without parsing or re-encoding, which
// keeps the address the house reads identical to the one in the repository.
copyFileSync(sourcePath, handedInPath);

// A cheap guard against a truncated copy: the handed-in file must be
// exactly as large as the committed one, or something went wrong mid-copy.
if (statSync(handedInPath).size !== statSync(sourcePath).size) {
  throw new Error("VIDEO.json copy is incomplete: size mismatch after copy");
}
