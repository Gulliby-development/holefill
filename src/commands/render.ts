import { checkUnused } from "../report";
import type { Template } from "../template";
import { Failure, type Options, type Result } from "../types";

export function run(options: Options, template: Template): Result {
  if (options.strict) checkUnused(options, template);

  const assignedValues = new Map(
    options.sets.map((assignment) => [assignment.name, assignment.value]),
  );
  const defaults = new Map(
    template.variables.map((variable) => [variable.name, variable.defaultValue]),
  );
  let out = "";

  for (const part of template.parts) {
    if (part.kind === "literal") {
      out += part.text;
    } else if (part.kind === "escape") {
      out += "{{";
    } else {
      const assignedValue = assignedValues.get(part.name);
      const value = assignedValue === undefined ? defaults.get(part.name) : assignedValue;
      if (value === undefined) throw new Failure(1, `no value for ${part.name}`);
      out += value;
    }
  }

  return { status: 0, out, err: "" };
}
