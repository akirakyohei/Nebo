import axios from "axios";

export const client = axios.create();
export type ClientError = {
  error: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const parseErrorBody = (status: any, _data: any): ClientError => {
  return { error: "Có lỗi xảy ra" };
};
