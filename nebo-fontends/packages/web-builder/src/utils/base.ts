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

export const getFullName = ({
  last_name,
  first_name,
}: {
  first_name?: string;
  last_name?: string;
}) => {
  return [last_name, first_name].filter((a) => !!a).join(" ");
};
