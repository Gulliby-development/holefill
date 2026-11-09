import type { Template } from "./template";
import type { Options } from "./types";

import { Failure } from "./types";

export function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

export function checkUnused(options: Options, template: Template): void {
  const names = new Set(template.variables.map((variable) => variable.name));
  const unused = options.sets.find((assignment) => !names.has(assignment.name));
  if (unused) throw new Failure(1, `unused --set ${unused.name}`);
}
