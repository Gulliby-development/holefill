import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["render"], stdin: "Plain text.\nNothing to fill.\n", code: 0, out: "Plain text.\nNothing to fill.\n", err: "" },
  { args: ["render", "--set", "name=Ada", "--set", "place=Paris", "--set", "user_id=7"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "Hello Ada, welcome to Paris.\nYour id is 7.\n", err: "" },
  { args: ["render", "--set", "place=Paris", "--set", "user_id=7"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "Hello friend, welcome to Paris.\nYour id is 7.\n", err: "" },
  { args: ["render"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 1, out: "", err: "holefill: no value for place\n" },
  { args: ["render", "--set", "a=1"], stdin: "{{a}} and {{a}} and {{a|z}}\n", code: 0, out: "1 and 1 and 1\n", err: "" },
  { args: ["render"], stdin: "{{a}} and {{a}} and {{a|z}}\n", code: 0, out: "z and z and z\n", err: "" },
  { args: ["render", "--set", "a={{b}}", "--set", "b=x"], stdin: "{{a}} {{b}}", code: 0, out: "{{b}} x", err: "" },
  { args: ["render", "--set", "a="], stdin: "[{{a}}]", code: 0, out: "[]", err: "" },
  { args: ["render", "--set", "a=1"], stdin: "Use {{{{name}} to write a tag.\n{{{{{{{{\n{{{{{{a}}\n", code: 0, out: "Use {{name}} to write a tag.\n{{{{\n{{1\n", err: "" },
  { args: ["render"], stdin: "Use {{{{name}} to write a tag.\n{{{{{{{{\n{{{{{{a}}\n", code: 1, out: "", err: "holefill: no value for a\n" },
  { args: ["render", "--set", "a=1", "--set", "b=2"], stdin: "line one {{a}}\n\nline three {{b|two}} {{c}}\n}} stray }} and { single }\n", code: 1, out: "", err: "holefill: no value for c\n" },
];

test("rows", () => {
  checkRows(rows);
});
