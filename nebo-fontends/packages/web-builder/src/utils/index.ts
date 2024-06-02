import _, { take, takeRight, isInteger, round } from "lodash";

import handlebars from "handlebars";
import customHelpers from "@documint/custom-handlebars-helpers";

import * as JsonUtils from "./json";

export function noop() {}

export const split_unit = (v: string) => {
  if (typeof v === "string" && v !== "") {
    const split = v.match(/^([-.\d]+(?:\.\d+)?)(.*)$/);
    if (split !== undefined && split !== null)
      return { value: split[1]?.trim(), unit: split[2]?.trim() };
  }
  return { value: v, unit: "" };
};

customHelpers({ handlebars });

/**
 * @param {String} template Handlebars HTML Template
 */
export function validateTemplate(template: string) {
  try {
    handlebars.compile(template);
  } catch (error) {
    return (error as any).message;
  }
}

export * from "./json";

const Utils = {
  split_unit,
  validateTemplate,
  ...JsonUtils,
};

export default Utils;
