import type { Template } from "./template";

/** What one command line produced: the exit status and the text for standard output and standard error. */
export interface Result {
  status: number;
  out: string;
  err: string;
}

/** Thrown by a command or the template reader: the exit status and the message without "holefill: " and the line feed. */
export class Failure extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** One --set option: the variable name and its value. */
export interface Assignment {
  name: string;
  value: string;
}

/** The options of a command line: the --set values in command-line order and whether --strict was given. */
export interface Options {
  sets: Assignment[];
  strict: boolean;
}

/** A command: its name and its handler. The handler gets the options and the template that run() read from the standard input and returns the result of the command or throws Failure. */
export interface Command {
  name: string;
  run: (options: Options, template: Template) => Result;
}
