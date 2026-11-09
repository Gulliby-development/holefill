import { COMMANDS, MAX_VALUE_LENGTH, USAGE, VERSION } from "./registry";
import { readTemplate, validName } from "./template";
import { Failure, type Options, type Result } from "./types";

/** Parse the option words that follow a command, preserving assignment order. */
export function parseOptions(args: string[]): Options {
  const sets: Options["sets"] = [];
  const names = new Set<string>();
  let strict = false;

  for (let index = 0; index < args.length; index += 1) {
    const word = args[index];
    if (word === "--strict") {
      if (strict) throw new Failure(2, "given twice: --strict");
      strict = true;
      continue;
    }
    if (word === "--set") {
      if (index + 1 >= args.length) throw new Failure(2, "missing value for --set");
      const operand = args[index + 1];
      index += 1;
      const equals = operand.indexOf("=");
      if (equals < 0) throw new Failure(2, "bad value for --set");
      const name = operand.slice(0, equals);
      const value = operand.slice(equals + 1);
      if (!validName(name) || value.length > MAX_VALUE_LENGTH || !/^[\x20-\x7e]*$/.test(value)) {
        throw new Failure(2, "bad value for --set");
      }
      if (names.has(name)) throw new Failure(2, `given twice: --set ${name}`);
      names.add(name);
      sets.push({ name, value });
      continue;
    }
    if (word === "" || word === "-" || !word.startsWith("-")) {
      throw new Failure(2, `unexpected argument ${word}`);
    }
    throw new Failure(2, `unknown option ${word}`);
  }

  return { sets, strict };
}

/** Whether this command line is valid and therefore requires standard input. */
export function readsStdin(args: string[]): boolean {
  const command = args[0];
  if (!COMMANDS.some((entry) => entry.name === command)) return false;
  try {
    parseOptions(args.slice(1));
    return true;
  } catch (error) {
    if (error instanceof Failure) return false;
    throw error;
  }
}

function failureResult(error: Failure): Result {
  return { status: error.status, out: "", err: `holefill: ${error.message}\n` };
}

/** Handle replies, validate arguments, parse the template, then dispatch the command. */
export function run(args: string[], stdin: string): Result {
  const first = args[0];
  if (first === undefined) return { status: 2, out: "", err: USAGE };
  if (first === "help" || first === "-h" || first === "--help") {
    return { status: 0, out: USAGE, err: "" };
  }
  if (first === "--version") return { status: 0, out: `${VERSION}\n`, err: "" };

  const command = COMMANDS.find((entry) => entry.name === first);
  if (!command) return failureResult(new Failure(2, `unknown command ${first}`));

  try {
    const options = parseOptions(args.slice(1));
    const template = readTemplate(stdin);
    return command.run(options, template);
  } catch (error) {
    if (error instanceof Failure) return failureResult(error);
    throw error;
  }
}
