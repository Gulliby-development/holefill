import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: [], stdin: "", code: 2, out: "", err: "usage: holefill check [--set NAME=VALUE]... [--strict]\n       holefill vars [--set NAME=VALUE]... [--strict]\n       holefill render [--set NAME=VALUE]... [--strict]\n       holefill missing [--set NAME=VALUE]... [--strict]\n       holefill stats [--set NAME=VALUE]... [--strict]\n" },
  { args: ["help"], stdin: "", code: 0, out: "usage: holefill check [--set NAME=VALUE]... [--strict]\n       holefill vars [--set NAME=VALUE]... [--strict]\n       holefill render [--set NAME=VALUE]... [--strict]\n       holefill missing [--set NAME=VALUE]... [--strict]\n       holefill stats [--set NAME=VALUE]... [--strict]\n", err: "" },
  { args: ["--help", "--bogus"], stdin: "", code: 0, out: "usage: holefill check [--set NAME=VALUE]... [--strict]\n       holefill vars [--set NAME=VALUE]... [--strict]\n       holefill render [--set NAME=VALUE]... [--strict]\n       holefill missing [--set NAME=VALUE]... [--strict]\n       holefill stats [--set NAME=VALUE]... [--strict]\n", err: "" },
  { args: ["--version"], stdin: "", code: 0, out: "holefill 0.1.0\n", err: "" },
  { args: ["--version", "x"], stdin: "", code: 0, out: "holefill 0.1.0\n", err: "" },
  { args: ["frob"], stdin: "", code: 2, out: "", err: "holefill: unknown command frob\n" },
  { args: [""], stdin: "", code: 2, out: "", err: "holefill: unknown command \n" },
  { args: ["Check"], stdin: "", code: 2, out: "", err: "holefill: unknown command Check\n" },
  { args: ["--set"], stdin: "", code: 2, out: "", err: "holefill: unknown command --set\n" },
  { args: ["--strict"], stdin: "", code: 2, out: "", err: "holefill: unknown command --strict\n" },
  { args: ["check"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 0, out: "ok 3 tags, 3 variables\n", err: "" },
  { args: ["stats"], stdin: "", code: 0, out: "characters 0\nlines 0\ntags 0\nvariables 0\nrequired 0\nescapes 0\n", err: "" },
  { args: ["vars"], stdin: "{{a}}", code: 0, out: "a x1 required\n", err: "" },
  { args: ["render"], stdin: "Hello {{name|friend}}, welcome to {{place}}.\nYour id is {{user_id}}.\n", code: 1, out: "", err: "holefill: no value for place\n" },
  { args: ["render", "--set", "name=Ada"], stdin: "{{name}}", code: 0, out: "Ada", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
