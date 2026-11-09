import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["stats"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "characters 69\nlines 2\ntags 3\nvariables 3\nrequired 2\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "", code: 0, out: "characters 0\nlines 0\ntags 0\nvariables 0\nrequired 0\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "\n", code: 0, out: "characters 1\nlines 1\ntags 0\nvariables 0\nrequired 0\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "Plain text.\nNothing to fill.\n", code: 0, out: "characters 29\nlines 2\ntags 0\nvariables 0\nrequired 0\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "{{a}} and {{a}} and {{a|z}}\n", code: 0, out: "characters 28\nlines 1\ntags 3\nvariables 1\nrequired 0\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "{{a|first}} {{b}} {{a|second}} {{a}}\n", code: 0, out: "characters 37\nlines 1\ntags 4\nvariables 2\nrequired 1\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "Use {{{{name}} to write a tag.\n{{{{{{{{\n{{{{{{a}}\n", code: 0, out: "characters 50\nlines 3\ntags 1\nvariables 1\nrequired 1\nescapes 4\n", err: "" },
  { args: ["stats"], stdin: "line one {{a}}\n\nline three {{b|two}} {{c}}\n}} stray }} and { single }\n", code: 0, out: "characters 70\nlines 4\ntags 3\nvariables 3\nrequired 2\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "Dear {{name}},\r\nBye\r\n", code: 0, out: "characters 21\nlines 2\ntags 1\nvariables 1\nrequired 1\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "no newline {{a}}", code: 0, out: "characters 16\nlines 1\ntags 1\nvariables 1\nrequired 1\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "{{a}}\n\n", code: 0, out: "characters 7\nlines 2\ntags 1\nvariables 1\nrequired 1\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "{{{{{{{{", code: 0, out: "characters 8\nlines 1\ntags 0\nvariables 0\nrequired 0\nescapes 2\n", err: "" },
  { args: ["stats", "--set", "a=1"], stdin: "{{a}}", code: 0, out: "characters 5\nlines 1\ntags 1\nvariables 1\nrequired 1\nescapes 0\n", err: "" },
  { args: ["stats"], stdin: "{{a|x}} {{b}}", code: 0, out: "characters 13\nlines 1\ntags 2\nvariables 2\nrequired 1\nescapes 0\n", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
