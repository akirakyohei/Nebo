import { IBrowser, IDevice, IOS } from "ua-parser-js";
import { HistorySession } from "../../types";

export type HistorySessionModel = HistorySession & {
  browser: IBrowser;
  device: IDevice;
  os: IOS;
};
