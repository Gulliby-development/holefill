import { run as check } from "./commands/check";
import { run as missing } from "./commands/missing";
import { run as render } from "./commands/render";
import { run as stats } from "./commands/stats";
import { run as vars } from "./commands/vars";
import type { Command } from "./types";

/** The version, the limits, the usage text and the table of commands. */
export const VERSION = "holefill 0.1.0";
export const MAX_LINES = 40;
export const MAX_NAME_LENGTH = 16;
export const MAX_DEFAULT_LENGTH = 40;
export const MAX_VARIABLES = 16;
export const MAX_VALUE_LENGTH = 100;

export const USAGE =
  "usage: holefill check [--set NAME=VALUE]... [--strict]\n" +
  "       holefill vars [--set NAME=VALUE]... [--strict]\n" +
  "       holefill render [--set NAME=VALUE]... [--strict]\n" +
  "       holefill missing [--set NAME=VALUE]... [--strict]\n" +
  "       holefill stats [--set NAME=VALUE]... [--strict]\n";

export const COMMANDS: Command[] = [
  { name: "check", run: check },
  { name: "vars", run: vars },
  { name: "render", run: render },
  { name: "missing", run: missing },
  { name: "stats", run: stats },
];
