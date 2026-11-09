import { checkUnused, plural } from "../report";
import type { Template } from "../template";
import type { Options, Result } from "../types";

export function run(options: Options, template: Template): Result {
  if (options.strict) checkUnused(options, template);

  const tagCount = plural(template.tags, "tag", "tags");
  const variableCount = plural(template.variables.length, "variable", "variables");
  return {
    status: 0,
    out: `ok ${tagCount}, ${variableCount}\n`,
    err: "",
  };
}
