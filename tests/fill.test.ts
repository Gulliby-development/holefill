import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["render", "--set", "c=3"], stdin: "line one {{a}}\n\nline three {{b|two}} {{c}}\n}} stray }} and { single }\n", code: 1, out: "", err: "holefill: no value for a\n" },
  { args: ["render", "--set", "name=Ada"], stdin: "Dear {{name}},\r\nBye\r\n", code: 0, out: "Dear Ada,\r\nBye\r\n", err: "" },
  { args: ["render", "--set", "a=x"], stdin: "{{a}}", code: 0, out: "x", err: "" },
  { args: ["render", "--set", "a=x"], stdin: "{{a}}\n\n", code: 0, out: "x\n\n", err: "" },
  { args: ["render"], stdin: "{{a|}}", code: 0, out: "", err: "" },
  { args: ["render", "--set", "b=1", "--set", "c=2"], stdin: "{{c}}{{b}}", code: 0, out: "21", err: "" },
  { args: ["render", "--strict", "--set", "a=1"], stdin: "{{a}}", code: 0, out: "1", err: "" },
  { args: ["render", "--strict", "--set", "a=1", "--set", "b=2"], stdin: "{{a}}", code: 1, out: "", err: "holefill: unused --set b\n" },
  { args: ["render", "--set", "a=1", "--set", "b=2"], stdin: "{{a}}", code: 0, out: "1", err: "" },
  { args: ["render", "--set", "a=$1", "--set", "b=\\n"], stdin: "{{a}}{{b}}", code: 0, out: "$1\\n", err: "" },
  { args: ["render"], stdin: "", code: 0, out: "", err: "" },
  { args: ["render", "--set", "a=1"], stdin: "", code: 0, out: "", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
