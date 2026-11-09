import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["check"], stdin: "", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "x", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "x\n", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "ok 3 tags, 3 variables\n", err: "" },
  { args: ["check"], stdin: "{{a", code: 1, out: "", err: "holefill: line 1: unclosed tag\n" },
  { args: ["check"], stdin: "hello {{a}", code: 1, out: "", err: "holefill: line 1: unclosed tag\n" },
  { args: ["check"], stdin: "{{a}}\n{{b\n", code: 1, out: "", err: "holefill: line 2: unclosed tag\n" },
  { args: ["check"], stdin: "{{a\n}}", code: 1, out: "", err: "holefill: line 1: unclosed tag\n" },
  { args: ["check"], stdin: "{{}}", code: 1, out: "", err: "holefill: line 1: empty tag\n" },
  { args: ["check"], stdin: "x\n{{}}\n", code: 1, out: "", err: "holefill: line 2: empty tag\n" },
  { args: ["check"], stdin: "{{|x}}", code: 1, out: "", err: "holefill: line 1: empty tag\n" },
  { args: ["check"], stdin: "ok\n\n{{ a }}\n", code: 1, out: "", err: "holefill: line 3: bad variable name  a \n" },
  { args: ["check"], stdin: "{{{a}}}", code: 1, out: "", err: "holefill: line 1: bad variable name {a\n" },
  { args: ["check"], stdin: "{{{{", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "{{{{a}}", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "{{{{{", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "{{{{{{", code: 1, out: "", err: "holefill: line 1: unclosed tag\n" },
  { args: ["check"], stdin: "}} {{a}} }}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a}}{{b}}{{a}}", code: 0, out: "ok 3 tags, 2 variables\n", err: "" },
  { args: ["check"], stdin: "{{a|x|y}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a|}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a|{{b}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "a\r\n{{b\r\n", code: 1, out: "", err: "holefill: line 2: unclosed tag\n" },
  { args: ["check"], stdin: "\n\n{{", code: 1, out: "", err: "holefill: line 3: unclosed tag\n" },
];

test("rows", () => {
  checkRows(rows);
});
