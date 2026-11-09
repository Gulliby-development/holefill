import { readsStdin, run } from "./cli";

// Only this file reads or writes a stream. It reads standard input only when readsStdin says
// the command line is a valid use of a command; every other reply needs no input.
const args = process.argv.slice(2);
const stdin = readsStdin(args) ? await Bun.stdin.text() : "";
const result = run(args, stdin);
process.stdout.write(result.out);
process.stderr.write(result.err);
process.exitCode = result.status;
