import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["vars"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "name x1 default \"friend\"\nplace x1 required\nuser_id x1 required\n", err: "" },
  { args: ["vars"], stdin: "", code: 0, out: "no variables\n", err: "" },
  { args: ["vars"], stdin: "\n", code: 0, out: "no variables\n", err: "" },
  { args: ["vars"], stdin: "Plain text.\nNothing to fill.\n", code: 0, out: "no variables\n", err: "" },
  { args: ["vars"], stdin: "{{a}} and {{a}} and {{a|z}}\n", code: 0, out: "a x3 default \"z\"\n", err: "" },
  { args: ["vars"], stdin: "{{a|first}} {{b}} {{a|second}} {{a}}\n", code: 0, out: "a x3 default \"first\"\nb x1 required\n", err: "" },
  { args: ["vars"], stdin: "Use {{{{name}} to write a tag.\n{{{{{{{{\n{{{{{{a}}\n", code: 0, out: "a x1 required\n", err: "" },
  { args: ["vars"], stdin: "{{a|}}", code: 0, out: "a x1 default \"\"\n", err: "" },
  { args: ["vars"], stdin: "{{a|say \"hi\"}}", code: 0, out: "a x1 default \"say \"hi\"\"\n", err: "" },
  { args: ["vars"], stdin: "{{a}} {{b|1}} {{c}} {{b}}", code: 0, out: "a x1 required\nb x2 default \"1\"\nc x1 required\n", err: "" },
  { args: ["vars", "--set", "a=1"], stdin: "{{a}}", code: 0, out: "a x1 required\n", err: "" },
  { args: ["vars", "--strict"], stdin: "{{a}}", code: 0, out: "a x1 required\n", err: "" },
  { args: ["vars"], stdin: "{{user_id}} {{user_id}} {{user_id}}", code: 0, out: "user_id x3 required\n", err: "" },
  { args: ["vars"], stdin: "line one {{a}}\n\nline three {{b|two}} {{c}}\n}} stray }} and { single }\n", code: 0, out: "a x1 required\nb x1 default \"two\"\nc x1 required\n", err: "" },
  { args: ["vars"], stdin: "{{x|0123456789012345678901234567890123456789}}", code: 0, out: "x x1 default \"0123456789012345678901234567890123456789\"\n", err: "" },
  { args: ["vars"], stdin: "{{a|}} {{b|x y}}", code: 0, out: "a x1 default \"\"\nb x1 default \"x y\"\n", err: "" },
  { args: ["vars"], stdin: "{{a|x|y}}", code: 0, out: "a x1 default \"x|y\"\n", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
