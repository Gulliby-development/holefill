import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["missing"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "place\nuser_id\nmissing 2\n", err: "" },
  { args: ["missing"], stdin: "", code: 0, out: "missing 0\n", err: "" },
  { args: ["missing"], stdin: "Plain text.\nNothing to fill.\n", code: 0, out: "missing 0\n", err: "" },
  { args: ["missing", "--set", "name=Ada"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "place\nuser_id\nmissing 2\n", err: "" },
  { args: ["missing", "--set", "name=Ada", "--set", "place=P", "--set", "user_id=7"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "missing 0\n", err: "" },
  { args: ["missing"], stdin: "{{a}} and {{a}} and {{a|z}}\n", code: 0, out: "missing 0\n", err: "" },
  { args: ["missing"], stdin: "{{a|first}} {{b}} {{a|second}} {{a}}\n", code: 0, out: "b\nmissing 1\n", err: "" },
  { args: ["missing"], stdin: "{{b}} {{a}} {{b}}", code: 0, out: "b\na\nmissing 2\n", err: "" },
  { args: ["missing", "--set", "a="], stdin: "{{a}}", code: 0, out: "missing 0\n", err: "" },
  { args: ["missing", "--set", "z=1"], stdin: "{{a}}", code: 0, out: "a\nmissing 1\n", err: "" },
  { args: ["missing"], stdin: "line one {{a}}\n\nline three {{b|two}} {{c}}\n}} stray }} and { single }\n", code: 0, out: "a\nc\nmissing 2\n", err: "" },
  { args: ["missing", "--strict", "--set", "z=1"], stdin: "{{a}}", code: 0, out: "a\nmissing 1\n", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
