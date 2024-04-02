export const toQueryString = (
  obj: { [key: string]: any } | null | undefined
) => {
  const newObj = { ...obj };
  if (!newObj) return "";
  for (const key in newObj) {
    if (newObj[key] === null || newObj[key] === undefined) {
      delete newObj[key];
    }
  }
  if (Object.keys(newObj).length === 0) return "";
  return `?${new URLSearchParams(newObj).toString()}`;
};
