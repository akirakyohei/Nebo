import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { camelCase, includes, mapKeys } from "lodash-es";
import { isBlank } from "./base";

type MyCustomType = { page?: number; limit?: number };
export type CustomTabDescriptor = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: any;
};

export type FilterQueryResult<T> = {
  isFilter: string;
  filter: T;
  onChangeSearchParams: <TKey extends keyof T>(
    key: TKey,
    value: T[TKey]
  ) => void;
  onChangeSearchParamsAll: (filter: T, reset?: boolean) => void;
  onRemoveSearchParams: (key: keyof T | (keyof T)[]) => void;
};
const inValidParamValue = "[object Object]";

export const useBaseFilter = <T extends MyCustomType>(input?: {
  keyIsListFilter?: (keyof T)[];
  excludeCheckFilter?: (keyof T)[];
}): FilterQueryResult<T> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeSearchParams = <TKey extends keyof T>(
    key: TKey,
    value: T[TKey]
  ) => {
    const copyParams = new URLSearchParams(searchParams);
    if (typeof key !== "string") return;
    if (key !== "page") copyParams.delete("page");
    if (value?.toString().includes(inValidParamValue)) copyParams.delete(key);

    if (typeof value === "string" && isBlank(value)) {
      copyParams.delete(key);
      setSearchParams(copyParams);
      return;
    }
    if (value === undefined) {
      copyParams.delete(key);
      setSearchParams(copyParams);
      return;
    }

    copyParams.set(key, value?.toString() || "");

    if ((key === "page" && value === "1") || copyParams.get("page") === "1")
      copyParams.delete("page");
    if ((key === "limit" && value === "20") || copyParams.get("limit") === "20")
      copyParams.delete("limit");
    setSearchParams(copyParams);
  };

  const onChangeSearchParamsAll = (filter: T, reset?: boolean) => {
    let copyParams = new URLSearchParams(searchParams);
    if (reset) copyParams = new URLSearchParams();

    for (const key in filter) {
      const type = typeof filter[key as keyof T];
      const value = filter[key as keyof T];
      if (value === undefined || value === null || value === "") {
        copyParams.delete(key);
        continue;
      }
      if (type === "string") {
        copyParams.set(key, value?.toString() || "");
      }
      if (type === "number") {
        copyParams.set(key, value?.toString() || "");
      }
      if (type === "boolean") {
        copyParams.set(key, value?.toString() || "");
      }
      if (type === "object") {
        if (Array.isArray(value)) {
          copyParams.set(key, value.join(","));
        } else {
          copyParams.set(key, value?.toString() || "");
        }
      }
      if (value.toString().includes(inValidParamValue)) copyParams.delete(key);
    }
    copyParams.delete("page");
    if (filter.limit === 20) copyParams.delete("limit");
    setSearchParams(copyParams);
  };

  const onRemoveSearchParams = (key: keyof T | (keyof T)[]) => {
    if (typeof key === "string") {
      key = [key];
    }
    if (!Array.isArray(key)) return;
    const copyParams = new URLSearchParams(searchParams);
    copyParams.delete("page");
    key.forEach((item) => {
      if (typeof item !== "string") return;
      copyParams.delete(item);
    });

    setSearchParams(copyParams);
  };

  const filter = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    const convertParamsToFilter = (params: { [k: string]: string }) => {
      let filter: T = params as unknown as T;
      for (const key in params) {
        const value = params[key];
        if (value === undefined) {
          continue;
        }
        if (includes(input?.keyIsListFilter, key as keyof T)) {
          filter = {
            ...filter,
            [key]:
              value !== ""
                ? Array.isArray(value)
                  ? value
                  : value.split(",")
                : undefined,
          };
        } else {
          filter = {
            ...filter,
            [key]: value,
          };
        }
        if (value.toString().includes(inValidParamValue))
          delete filter[key as keyof T];
      }
      mapKeys(filter, (value, key) => camelCase(key));

      return filter;
    };
    const filter = convertParamsToFilter(params);

    return filter;
  }, [input?.keyIsListFilter, searchParams]);

  const isFilter = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    const convertParamsToFilter = (params: { [k: string]: string }) => {
      // remove page and limit
      delete params["page"];
      delete params["limit"];
      (input?.excludeCheckFilter || []).forEach(
        (a) => delete params[`${a as any}`]
      );
      // remove empty value
      for (const key in params) {
        if (params[key] === "" || params[key] === undefined) {
          delete params[key];
        }
      }
      if (Object.keys(params).length === 0) return "";
      return "search";
    };
    return convertParamsToFilter(params);
  }, [input, searchParams]);

  return {
    isFilter,
    filter,
    onChangeSearchParams,
    onChangeSearchParamsAll,
    onRemoveSearchParams,
  };
};
