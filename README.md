<p align="center"><img src="docs/logo.svg" width="96" alt="" /></p>

# holefill

[![CI](https://github.com/Gulliby-development/holefill/actions/workflows/ci.yml/badge.svg)](https://github.com/Gulliby-development/holefill/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

holefill is a small, offline command-line tool for checking, inspecting, and rendering strict prompt templates. It is for people building prompts for language-model applications, and for use in terminals, scripts, and CI. It needs no model, API key, or network connection. The CLI is written in TypeScript and runs on Bun 1.4 or newer on Windows, macOS, and Linux.

## Install and run

Install the project dependencies from the repository directory:

```sh
bun install
```

Run a command by piping a template to the program:

```sh
bun run src/main.ts COMMAND
```

All commands read the template from standard input. The examples below use a POSIX shell function in the repository directory:

```sh
holefill() { bun run src/main.ts "$@"; }
```

## Commands

The complete synopsis is:

```text
usage: holefill check [--set NAME=VALUE]... [--strict]
       holefill vars [--set NAME=VALUE]... [--strict]
       holefill render [--set NAME=VALUE]... [--strict]
       holefill missing [--set NAME=VALUE]... [--strict]
       holefill stats [--set NAME=VALUE]... [--strict]
```

The first word selects a command. `help`, `-h`, or `--help` prints the synopsis; `--version` prints `holefill 0.1.0`. Both replies ignore any following words and do not read standard input. With no command, the synopsis goes to standard error and the program exits with status 2. An unrecognized command prints `holefill: unknown command WORD` to standard error and exits 2.

The five commands are:

- **check** validates the template and prints `ok T tags, V variables`, using singular nouns for counts of one and plural nouns otherwise. Values supplied with `--set` are not required or otherwise used. With `--strict`, it rejects the first assignment, in command-line order, whose name does not occur in the template.
- **vars** lists each distinct variable in order of first appearance. A line is `NAME xN required` or `NAME xN default \"DEFAULT\"`; N is the number of occurrences. Defaults are shown raw, between quote marks, without escaping. With no variables it prints `no variables`. It ignores valid `--set` and `--strict` options.
- **render** substitutes each tag and writes the resulting template without adding a final newline. An assigned value takes precedence over the first available default, including an empty default. Unused assignments are ignored unless `--strict` is given; in strict mode they are rejected before missing values are checked.
- **missing** lists required variables with no assignment in first-appearance order, then prints `missing K`. Defaults satisfy a variable, and an assigned empty value counts as present. Unused assignments and `--strict` have no effect.
- **stats** prints six lines in order: `characters N`, `lines L`, `tags T`, `variables V`, `required R`, and `escapes E`. Characters include line feeds, and an empty input has zero lines and zero for every other metric. It ignores valid `--set` and `--strict` options.

A template with no final line feed renders without one. Rendering preserves literal characters and existing line endings (including carriage returns), turns each escape into two opening braces, and inserts values literally rather than parsing them again. A failed command produces no partial standard output.

## Options and errors

Options follow the command and are validated from left to right; the first invalid option stops validation. `--strict` is a flag and may appear once. `--set` consumes the next word as its operand, even if that word looks like an option. For each `--set`, validation proceeds in this order: check that an operand exists, then that it has the form `NAME=VALUE` with a valid name and value, then check whether the name was already assigned. Thus a malformed operand is reported before a duplicate name. A value may be empty or contain further equals signs, and must contain at most 100 printable ASCII characters (space through tilde). All commands validate options, even when they ignore valid options.

A word that is empty, exactly `-`, or does not start with a hyphen is an unexpected argument. An unrecognized hyphen-prefixed word, including `--set=...`, is an unknown option. The option errors are:

- `holefill: unexpected argument WORD`
- `holefill: unknown option WORD`
- `holefill: missing value for --set`
- `holefill: bad value for --set`
- `holefill: given twice: --set NAME`
- `holefill: given twice: --strict`

Option errors exit with status 2 and occur before input is read. A valid invocation reads standard input; help, version, unknown commands, and invalid option forms do not.

Successful commands write their result only to standard output. Failures write one line, `holefill: MESSAGE`, to standard error, write nothing to standard output, and end with a line feed. Command-line errors exit 2. Template errors and value errors exit 1.

## Template syntax and limits

Input is split at line feeds. A final line without a line feed counts as a line; empty input has no lines. Carriage returns are ordinary characters and are preserved. A template can contain at most 40 lines.

The escape `{{{{` represents two literal opening braces and does not start a tag. Otherwise `{{` begins a tag, which ends at the first `}}` on the same line. Tags cannot cross line boundaries. Tag content is a name, optionally followed by `|` and a default. The first bar separates name and default; the rest of the default may contain bars and may be empty. Text outside tags—including a single brace or stray closing braces—is literal.

A name is 1–16 characters: a lowercase letter followed by lowercase letters, digits, or underscores. A default is at most 40 characters, and a template may contain at most 16 distinct variables. Repeated variables count as one variable, while every tag occurrence contributes to that variable's occurrence count. The default used by vars and render is the first default provided for that name; an empty first default is still a default.

Template validation reports the first error in text order, after the overall line limit is checked. Within a tag, the order is: unclosed tag, empty name, invalid name, overlong default, then too many distinct variables. Errors include the one-based line number:

- `holefill: input is too long (max 40 lines)`
- `holefill: line N: unclosed tag`
- `holefill: line N: empty tag`
- `holefill: line N: bad variable name NAME`
- `holefill: line N: default too long (max 40 characters)`
- `holefill: line N: too many variables (max 16)`

For check with strict mode and render with strict mode, template errors come before unused-assignment errors. Render checks unused assignments before checking tags for values; it reports the first tag without an assignment or default as `holefill: no value for NAME`. An unused assignment is `holefill: unused --set NAME`. Both value errors exit 1.

## Examples

```text
$ printf 'Hello {{name|friend}}!\n' | holefill render; printf 'Hello {{name|friend}}!\n' | holefill render --set name=Ada
Hello friend!
Hello Ada!
$ printf 'Answer in {{language|English}} for {{audience}}.\n' | holefill vars; printf 'Answer in {{language|English}} for {{audience}}.\n' | holefill missing
language x1 default "English"
audience x1 required
audience
missing 1
$ printf 'Use {{{{name}} to write a tag; {{a}}\n' | holefill render --set a=1
Use {{name}} to write a tag; 1
$ printf 'Hi {{Name}}\n' | holefill check 2>&1; printf 'Hi {{name}}\n' | holefill render 2>&1
holefill: line 1: bad variable name Name
holefill: no value for name
```

## Development

Run the project checks from the repository directory:

```sh
bun run typecheck
bun run lint
bun test
```

The CLI separates stream access from command behavior: `src/main.ts` reads standard input only for a valid command invocation and writes the returned result to standard output and standard error. The CLI validates arguments and parses the complete template before dispatching to a handler. Handlers receive options and the parsed template and return a result; they do not access streams.

---

Built with [BAKED](https://github.com/Gulliby-development/baked), an open-source coding agent (bench round R97).
