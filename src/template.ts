import { MAX_DEFAULT_LENGTH, MAX_LINES, MAX_NAME_LENGTH, MAX_VARIABLES } from "./registry";
import { Failure } from "./types";

export type TemplatePart =
  | { kind: "literal"; text: string }
  | { kind: "escape"; text: string }
  | { kind: "tag"; text: string; name: string; defaultValue: string | undefined };

export interface TemplateVariable {
  name: string;
  count: number;
  defaultValue: string | undefined;
}

export interface Template {
  source: string;
  parts: TemplatePart[];
  variables: TemplateVariable[];
  characters: number;
  lines: number;
  tags: number;
  escapes: number;
}

export function validName(name: string): boolean {
  return name.length >= 1 && name.length <= MAX_NAME_LENGTH && /^[a-z][a-z0-9_]*$/.test(name);
}

export function readTemplate(source: string): Template {
  const lines =
    source.length === 0 ? 0 : source.split("\n").length - (source.endsWith("\n") ? 1 : 0);
  if (lines > MAX_LINES) {
    throw new Failure(1, "input is too long (max 40 lines)");
  }

  const parts: TemplatePart[] = [];
  const variables: TemplateVariable[] = [];
  const byName = new Map<string, TemplateVariable>();
  let tags = 0;
  let escapes = 0;

  const addLiteral = (text: string): void => {
    if (!text) return;
    const previous = parts[parts.length - 1];
    if (previous?.kind === "literal") previous.text += text;
    else parts.push({ kind: "literal", text });
  };

  let lineStart = 0;
  let lineNumber = 1;
  while (lineStart < source.length) {
    const newline = source.indexOf("\n", lineStart);
    const lineEnd = newline === -1 ? source.length : newline;
    let cursor = lineStart;
    let literalStart = cursor;

    while (cursor < lineEnd) {
      if (source.startsWith("{{{{", cursor)) {
        addLiteral(source.slice(literalStart, cursor));
        parts.push({ kind: "escape", text: "{{{{" });
        escapes += 1;
        cursor += 4;
        literalStart = cursor;
      } else if (source.startsWith("{{", cursor)) {
        addLiteral(source.slice(literalStart, cursor));
        const close = source.indexOf("}}", cursor + 2);
        if (close === -1 || close >= lineEnd) {
          throw new Failure(1, `line ${lineNumber}: unclosed tag`);
        }
        const content = source.slice(cursor + 2, close);
        const bar = content.indexOf("|");
        const name = bar === -1 ? content : content.slice(0, bar);
        const defaultValue = bar === -1 ? undefined : content.slice(bar + 1);

        if (name.length === 0) throw new Failure(1, `line ${lineNumber}: empty tag`);
        if (!validName(name)) throw new Failure(1, `line ${lineNumber}: bad variable name ${name}`);
        if (defaultValue !== undefined && defaultValue.length > MAX_DEFAULT_LENGTH) {
          throw new Failure(1, `line ${lineNumber}: default too long (max 40 characters)`);
        }

        let variable = byName.get(name);
        if (!variable) {
          if (variables.length >= MAX_VARIABLES) {
            throw new Failure(1, `line ${lineNumber}: too many variables (max 16)`);
          }
          variable = { name, count: 0, defaultValue: undefined };
          byName.set(name, variable);
          variables.push(variable);
        }
        variable.count += 1;
        if (variable.defaultValue === undefined && defaultValue !== undefined) {
          variable.defaultValue = defaultValue;
        }
        parts.push({ text: source.slice(cursor, close + 2), kind: "tag", name, defaultValue });
        tags += 1;
        cursor = close + 2;
        literalStart = cursor;
      } else {
        cursor += 1;
      }
    }
    addLiteral(source.slice(literalStart, lineEnd));
    if (newline !== -1) {
      addLiteral("\n");
      lineStart = newline + 1;
      lineNumber += 1;
    } else {
      lineStart = source.length;
    }
  }

  return { source, parts, variables, characters: source.length, lines, tags, escapes };
}
