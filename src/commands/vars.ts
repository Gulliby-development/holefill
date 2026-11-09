import type { Template } from "../template";
import type { Options, Result } from "../types";

export function run(_options: Options, template: Template): Result {
  const out =
    template.variables.length === 0
      ? "no variables\n"
      : `${template.variables
          .map((variable) =>
            variable.defaultValue === undefined
              ? `${variable.name} x${variable.count} required`
              : `${variable.name} x${variable.count} default "${variable.defaultValue}"`,
          )
          .join("\n")}\n`;

  return { status: 0, out, err: "" };
}
