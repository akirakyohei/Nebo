import { IBrowser, IDevice, IOS } from "ua-parser-js";
import { HistorySession } from "../../types";

export type HistorySessionModel = HistorySession & {
  browser: IBrowser;
  device: IDevice;
  os: IOS;
};

export type UpdateUserRequestModel = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  confirm_password: string;
};

export type ChangePasswordRequestModel = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};
