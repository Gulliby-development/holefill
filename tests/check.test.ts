import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["check"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "ok 3 tags, 3 variables\n", err: "" },
  { args: ["check"], stdin: "", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "Plain text.\nNothing to fill.\n", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "{{a}} and {{a}} and {{a|z}}\n", code: 0, out: "ok 3 tags, 1 variable\n", err: "" },
  { args: ["check"], stdin: "Use {{{{name}} to write a tag.\n{{{{{{{{\n{{{{{{a}}\n", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "line one {{a}}\n\nline three {{b|two}} {{c}}\n}} stray }} and { single }\n", code: 0, out: "ok 3 tags, 3 variables\n", err: "" },
  { args: ["check"], stdin: "{{a}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a}} {{b}}", code: 0, out: "ok 2 tags, 2 variables\n", err: "" },
  { args: ["check"], stdin: "Dear {{name}},\r\nBye\r\n", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check", "--set", "a=1"], stdin: "{{a}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check", "--strict", "--set", "a=1"], stdin: "{{a}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check", "--strict", "--set", "a=1"], stdin: "{{b}}", code: 1, out: "", err: "holefill: unused --set a\n" },
  { args: ["check", "--strict", "--set", "z=1", "--set", "y=2"], stdin: "{{a}}", code: 1, out: "", err: "holefill: unused --set z\n" },
  { args: ["check", "--strict"], stdin: "{{a", code: 1, out: "", err: "holefill: line 1: unclosed tag\n" },
  { args: ["check", "--strict", "--set", "a=1"], stdin: "Plain text.\nNothing to fill.\n", code: 1, out: "", err: "holefill: unused --set a\n" },
  { args: ["check", "--set", "name=x"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "ok 3 tags, 3 variables\n", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
