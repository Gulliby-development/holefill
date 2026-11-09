import type { Template } from "../template";
import type { Options, Result } from "../types";

export function run(_options: Options, template: Template): Result {
  const required = template.variables.filter(
    (variable) => variable.defaultValue === undefined,
  ).length;

  return {
    status: 0,
    out: `characters ${template.characters}\nlines ${template.lines}\ntags ${template.tags}\nvariables ${template.variables.length}\nrequired ${required}\nescapes ${template.escapes}\n`,
    err: "",
  };
}
