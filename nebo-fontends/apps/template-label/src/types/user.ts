import { FileDataUploadRequest } from "./mediafile";

export type UserCredentials = {
  id: number;
  first_name: string;
  last_name: string;
  gmail: string;
  phone: string;
};

export type UserCreateRequest = {
  first_name: string;
  last_name: string;
  email?: string;
  password: string;
  phone_number?: string;
};

export type UserUpdateRequest = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  avatar?: FileDataUploadRequest;
  confirm_password?: string;
};

export type UserLoginRequest = {
  email?: string;
  phone_number?: string;
  password: string;
};

export type UserToken = {
  id: number;
  permissions: string[];
  token: string;
  refresh_token: string;
};

export type CredentialProvider = "local" | "facebook" | "google";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  email: string;
  phone_number: string;
  permissions: string[];
  provider: CredentialProvider;
  provider_id: string;
};
