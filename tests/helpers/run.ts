import { expect } from "bun:test";
import { readsStdin, run } from "../../src/cli";

/** One literal row: the arguments, the standard input and the expected exit status, standard output and standard error. */
export interface Row {
  args: string[];
  stdin: string;
  code: number;
  out: string;
  err: string;
}

/** One literal row of the reads file: whether readsStdin must be true for the arguments. */
export interface ReadsRow {
  args: string[];
  reads: boolean;
}

/** Runs every row through run() and checks the three results; one failure names the rows that differ. */
export function checkRows(rows: Row[]): void {
  const failures: string[] = [];
  rows.forEach((row, index) => {
    const result = run(row.args, row.stdin);
    const got = { code: result.status, out: result.out, err: result.err };
    const want = { code: row.code, out: row.out, err: row.err };
    if (JSON.stringify(got) !== JSON.stringify(want)) {
      failures.push(
        `row ${index + 1} ${JSON.stringify(row.args)}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`,
      );
    }
  });
  expect(failures).toEqual([]);
}

/** Checks that readsStdin says what each row of the reads file says. */
export function checkReads(rows: ReadsRow[]): void {
  const failures: string[] = [];
  rows.forEach((row, index) => {
    const got = readsStdin(row.args);
    if (got !== row.reads) {
      failures.push(
        `row ${index + 1} ${JSON.stringify(row.args)}: readsStdin is ${got}, want ${row.reads}`,
      );
    }
  });
  expect(failures).toEqual([]);
}
