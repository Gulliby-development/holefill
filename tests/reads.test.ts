import { test } from "bun:test";
import { checkReads, type ReadsRow } from "./helpers/run";

const rows: ReadsRow[] = [
  { args: ["check"], reads: true },
  { args: ["vars"], reads: true },
  { args: ["render"], reads: true },
  { args: ["missing"], reads: true },
  { args: ["stats"], reads: true },
  { args: ["render", "--set", "a=1"], reads: true },
  { args: ["check", "--strict"], reads: true },
  { args: ["stats", "--strict", "--set", "a=b=c"], reads: true },
  { args: ["help"], reads: false },
  { args: ["-h"], reads: false },
  { args: ["--help"], reads: false },
  { args: ["--version"], reads: false },
  { args: [], reads: false },
  { args: ["frob"], reads: false },
  { args: [""], reads: false },
  { args: ["check", "x"], reads: false },
  { args: ["render", "--set"], reads: false },
  { args: ["render", "--set", "a"], reads: false },
  { args: ["render", "--set", "a=1", "--set", "a=2"], reads: false },
  { args: ["render", "--strict", "--strict"], reads: false },
  { args: ["render", "--set", "a=1", "--bogus"], reads: false },
  { args: ["Render"], reads: false },
  { args: ["--set", "a=1"], reads: false },
  { args: ["vars", "-"], reads: false },
  { args: ["missing", ""], reads: false },
  { args: ["stats", "--set=a=1"], reads: false },
  { args: ["check", "--set", "A=1"], reads: false },
  { args: ["check", "--set", "a=00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"], reads: false },
];

test("rows", () => {
  checkReads(rows);
});
