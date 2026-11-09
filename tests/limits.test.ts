import { test } from "bun:test";
import { checkRows, type Row } from "./helpers/run";

const rows: Row[] = [
  { args: ["check"], stdin: "L0 {{a|x}}\nL1 {{a|x}}\nL2 {{a|x}}\nL3 {{a|x}}\nL4 {{a|x}}\nL5 {{a|x}}\nL6 {{a|x}}\nL7 {{a|x}}\nL8 {{a|x}}\nL9 {{a|x}}\nL10 {{a|x}}\nL11 {{a|x}}\nL12 {{a|x}}\nL13 {{a|x}}\nL14 {{a|x}}\nL15 {{a|x}}\nL16 {{a|x}}\nL17 {{a|x}}\nL18 {{a|x}}\nL19 {{a|x}}\nL20 {{a|x}}\nL21 {{a|x}}\nL22 {{a|x}}\nL23 {{a|x}}\nL24 {{a|x}}\nL25 {{a|x}}\nL26 {{a|x}}\nL27 {{a|x}}\nL28 {{a|x}}\nL29 {{a|x}}\nL30 {{a|x}}\nL31 {{a|x}}\nL32 {{a|x}}\nL33 {{a|x}}\nL34 {{a|x}}\nL35 {{a|x}}\nL36 {{a|x}}\nL37 {{a|x}}\nL38 {{a|x}}\nL39 {{a|x}}\n", code: 0, out: "ok 40 tags, 1 variable\n", err: "" },
  { args: ["check"], stdin: "L0 {{a|x}}\nL1 {{a|x}}\nL2 {{a|x}}\nL3 {{a|x}}\nL4 {{a|x}}\nL5 {{a|x}}\nL6 {{a|x}}\nL7 {{a|x}}\nL8 {{a|x}}\nL9 {{a|x}}\nL10 {{a|x}}\nL11 {{a|x}}\nL12 {{a|x}}\nL13 {{a|x}}\nL14 {{a|x}}\nL15 {{a|x}}\nL16 {{a|x}}\nL17 {{a|x}}\nL18 {{a|x}}\nL19 {{a|x}}\nL20 {{a|x}}\nL21 {{a|x}}\nL22 {{a|x}}\nL23 {{a|x}}\nL24 {{a|x}}\nL25 {{a|x}}\nL26 {{a|x}}\nL27 {{a|x}}\nL28 {{a|x}}\nL29 {{a|x}}\nL30 {{a|x}}\nL31 {{a|x}}\nL32 {{a|x}}\nL33 {{a|x}}\nL34 {{a|x}}\nL35 {{a|x}}\nL36 {{a|x}}\nL37 {{a|x}}\nL38 {{a|x}}\nL39 {{a|x}}\nL40 {{a|x}}\n", code: 1, out: "", err: "holefill: input is too long (max 40 lines)\n" },
  { args: ["check", "--strict"], stdin: "L0 {{a|x}}\nL1 {{a|x}}\nL2 {{a|x}}\nL3 {{a|x}}\nL4 {{a|x}}\nL5 {{a|x}}\nL6 {{a|x}}\nL7 {{a|x}}\nL8 {{a|x}}\nL9 {{a|x}}\nL10 {{a|x}}\nL11 {{a|x}}\nL12 {{a|x}}\nL13 {{a|x}}\nL14 {{a|x}}\nL15 {{a|x}}\nL16 {{a|x}}\nL17 {{a|x}}\nL18 {{a|x}}\nL19 {{a|x}}\nL20 {{a|x}}\nL21 {{a|x}}\nL22 {{a|x}}\nL23 {{a|x}}\nL24 {{a|x}}\nL25 {{a|x}}\nL26 {{a|x}}\nL27 {{a|x}}\nL28 {{a|x}}\nL29 {{a|x}}\nL30 {{a|x}}\nL31 {{a|x}}\nL32 {{a|x}}\nL33 {{a|x}}\nL34 {{a|x}}\nL35 {{a|x}}\nL36 {{a|x}}\nL37 {{a|x}}\nL38 {{a|x}}\nL39 {{a|x}}\n", code: 0, out: "ok 40 tags, 1 variable\n", err: "" },
];

test("rows", () => {
  checkRows(rows);
});
