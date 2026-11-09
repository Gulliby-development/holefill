import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["check"], stdin: "x\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ny", code: 0, out: "ok 0 tags, 0 variables\n", err: "" },
  { args: ["check"], stdin: "x\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ny", code: 1, out: "", err: "holefill: input is too long (max 40 lines)\n" },
  { args: ["check"], stdin: "{{v0}} {{v1}} {{v2}} {{v3}} {{v4}} {{v5}} {{v6}} {{v7}} {{v8}} {{v9}} {{v10}} {{v11}} {{v12}} {{v13}} {{v14}} {{v15}} \n", code: 0, out: "ok 16 tags, 16 variables\n", err: "" },
  { args: ["check"], stdin: "{{v0}} {{v1}} {{v2}} {{v3}} {{v4}} {{v5}} {{v6}} {{v7}} {{v8}} {{v9}} {{v10}} {{v11}} {{v12}} {{v13}} {{v14}} {{v15}} {{v16}} \n", code: 1, out: "", err: "holefill: line 1: too many variables (max 16)\n" },
  { args: ["check"], stdin: "{{v0}} {{v1}} {{v2}} {{v3}} {{v4}} {{v5}} {{v6}} {{v7}} {{v8}} {{v9}} {{v10}} {{v11}} {{v12}} {{v13}} {{v14}} {{v15}} \n{{v0}} {{v15}}", code: 0, out: "ok 18 tags, 16 variables\n", err: "" },
  { args: ["check"], stdin: "{{abcdefghijklmnop}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{abcdefghijklmnopq}}", code: 1, out: "", err: "holefill: line 1: bad variable name abcdefghijklmnopq\n" },
  { args: ["check"], stdin: "{{a|0123456789012345678901234567890123456789}}", code: 0, out: "ok 1 tag, 1 variable\n", err: "" },
  { args: ["check"], stdin: "{{a|0123456789012345678901234567890123456789x}}", code: 1, out: "", err: "holefill: line 1: default too long (max 40 characters)\n" },
  { args: ["render", "--set", "a=00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"], stdin: "{{a}}", code: 2, out: "", err: "holefill: bad value for --set\n" },
  { args: ["check"], stdin: "{{a}}\n{{b|0123456789012345678901234567890123456789x}}\n{{", code: 1, out: "", err: "holefill: line 2: default too long (max 40 characters)\n" },
  { args: ["render", "--set", "a=0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"], stdin: "{{a}}", code: 0, out: "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", err: "" },
  { args: ["render"], stdin: "{{a|0123456789012345678901234567890123456789}}", code: 0, out: "0123456789012345678901234567890123456789", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
