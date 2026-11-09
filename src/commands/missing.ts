import type { Template } from "../template";
import type { Options, Result } from "../types";

export function run(options: Options, template: Template): Result {
  const assignedNames = new Set(options.sets.map((assignment) => assignment.name));
  const missing = template.variables.filter(
    (variable) => variable.defaultValue === undefined && !assignedNames.has(variable.name),
  );
  const names = missing.map((variable) => variable.name);

  return {
    status: 0,
    out: `${names.length > 0 ? `${names.join("\n")}\n` : ""}missing ${names.length}\n`,
    err: "",
  };
}
