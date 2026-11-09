import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["check"], stdin: "{{A}}", code: 1, out: "", err: "holefill: line 1: bad variable name A\n" },
  { args: ["check"], stdin: "{{1a}}", code: 1, out: "", err: "holefill: line 1: bad variable name 1a\n" },
  { args: ["check"], stdin: "{{a-b}}", code: 1, out: "", err: "holefill: line 1: bad variable name a-b\n" },
  { args: ["check"], stdin: "{{_a}}", code: 1, out: "", err: "holefill: line 1: bad variable name _a\n" },
  { args: ["check"], stdin: "{{ab c}}", code: 1, out: "", err: "holefill: line 1: bad variable name ab c\n" },
  { args: ["check"], stdin: "{{user_id|7}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a b|x}}", code: 1, out: "", err: "holefill: line 1: bad variable name a b\n" },
  { args: ["check"], stdin: "{{x|\n}}", code: 1, out: "", err: "holefill: line 1: unclosed tag\n" },
  { args: ["check"], stdin: "{{a}} and {{a}} and {{a|z}}\n", code: 0, out: "ok 3 tags, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a|first}} {{b}} {{a|second}} {{a}}\n", code: 0, out: "ok 4 tags, 2 variables\n", err: "" },
  { args: ["check"], stdin: "Use {{{{name}} to write a tag.\n{{{{{{{{\n{{{{{{a}}\n", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "line one {{a}}\n\nline three {{b|two}} {{c}}\n}} stray }} and { single }\n", code: 0, out: "ok 3 tags, 3 variables\n", err: "" },
  { args: ["check"], stdin: "{{a|}} {{b|x y}}", code: 0, out: "ok 2 tags, 2 variables\n", err: "" },
  { args: ["check"], stdin: "{{a|{{b}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a|x|y}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "Plain text.\nNothing to fill.\n", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
