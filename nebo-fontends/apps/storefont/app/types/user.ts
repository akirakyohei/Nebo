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
  email: string;
  password: string;
  phone_number: string;
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
