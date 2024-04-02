import { isEmpty } from "lodash-es";

export const isBlank = (str: string | undefined | null | number): boolean => {
  return (
    isEmpty(str) ||
    str === undefined ||
    str === null ||
    str?.toString().trim() === ""
  );
};
