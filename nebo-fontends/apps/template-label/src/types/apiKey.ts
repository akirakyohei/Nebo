import { PageFilterRequest } from "./common";

export type ApiKey = {
  id: number;
  user_id: number;
  name: string;
  prefix: string;
  
  created_at: string;
  updated_at: string;
};

export type ApiKeyDetail = ApiKey & {
  access_token: string;
};

export type ApiKeyRequest = {
  name: string;
};

export type ApiKeyFilterRequest = PageFilterRequest & {};
