import { isEmpty } from "lodash-es";

export const isBlank = (str: string | undefined | null | number): boolean => {
  return (
    isEmpty(str) ||
    str === undefined ||
    str === null ||
    str?.toString().trim() === ""
  );
};

export const defaultIfBlank = (
  str: string | undefined | null | number
): string => {
  return !isBlank(str) ? (str as string) : "";
};

export const filterNonNull = <T>(items: (T | null)[]) =>
  items.filter((item): item is T => item !== null);

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const split_unit = (v: string) => {
  if (typeof v === "string" && v !== "") {
    const split = v.match(/^([-.\d]+(?:\.\d+)?)(.*)$/);
    if (split) return { value: split[1].trim(), unit: split[2].trim() };
  }
  return { value: v, unit: "" };
};

export const getFullName = ({
  last_name,
  first_name,
}: {
  first_name?: string;
  last_name?: string;
}) => {
  return [last_name, first_name].filter((a) => !!a).join(" ");
};

export const getUrlAsset = (path: string) => {
  return `${import.meta.env.VITE_BASE_URL}${path}`;
};

export function humanFileSize(size: number): { value: number; unit: string } {
  let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return {
    value: size / Math.pow(1024, i),
    unit: ["B", "kB", "MB", "GB", "TB"][i],
  };
}

export function formatNumber(num: number, fixed = 0) {
  const numStr = num.toFixed(fixed) + "";
  const x = numStr.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}
