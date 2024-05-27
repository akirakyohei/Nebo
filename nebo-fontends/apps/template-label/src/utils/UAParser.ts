import UAParser from "ua-parser-js";

const parse = (ua: string) => {
  const parser = new UAParser(ua);
  parser.getOS
  return parser.getResult();
};

export const UAParserUtils = { parse };
export default UAParserUtils;
