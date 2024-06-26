export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(
  first_name?: string,
  last_name?: string,
  size?: number
) {
  return {
    sx: {
      bgcolor: stringToColor(first_name || ""),
      height: size ? size : undefined,
      width: size ? size : undefined,
    },
    children: `${last_name?.[0] || ""}${first_name?.[0] || ""}`,
  };
}
