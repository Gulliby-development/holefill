import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["check", "x"], stdin: "", code: 2, out: "", err: "holefill: unexpected argument x\n" },
  { args: ["check", ""], stdin: "", code: 2, out: "", err: "holefill: unexpected argument \n" },
  { args: ["check", "-"], stdin: "", code: 2, out: "", err: "holefill: unexpected argument -\n" },
  { args: ["check", "--nope"], stdin: "", code: 2, out: "", err: "holefill: unknown option --nope\n" },
  { args: ["check", "--set"], stdin: "", code: 2, out: "", err: "holefill: missing value for --set\n" },
  { args: ["check", "--set", "a"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--set", "A=1"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--set", "=1"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--set", "1a=x"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--set", "a-b=x"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--set", "a=1", "--set", "a=2"], stdin: "", code: 2, out: "", err: "holefill: given twice: --set a\n" },
  { args: ["check", "--set", "bad", "--set", "a=1", "--set", "a=2"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--strict", "--strict"], stdin: "", code: 2, out: "", err: "holefill: given twice: --strict\n" },
  { args: ["check", "--set=a=1"], stdin: "", code: 2, out: "", err: "holefill: unknown option --set=a=1\n" },
  { args: ["check", "--Strict"], stdin: "", code: 2, out: "", err: "holefill: unknown option --Strict\n" },
  { args: ["check", "--set", "--strict"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--set", "a=1", "--bogus"], stdin: "", code: 2, out: "", err: "holefill: unknown option --bogus\n" },
  { args: ["check", "--set", "a=", "--strict"], stdin: "Plain text.\nNothing to fill.\n", code: 1, out: "", err: "holefill: unused --set a\n" },
  { args: ["check", "--set", "a=tab\there"], stdin: "", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check", "--set", "a= "], stdin: "[{{a}}]", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check", "--set", "a=1", "extra"], stdin: "", code: 2, out: "", err: "holefill: unexpected argument extra\n" },
];

test("rows", () => {
  checkRows(rows);
});
