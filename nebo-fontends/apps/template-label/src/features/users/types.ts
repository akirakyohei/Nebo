export type LoginRequestModel = {
  emailOrPhone: string;
  password: string;
};

export type SignupRequestModel = {
  first_name: string;
  last_name: string;
  email_or_phone: string;
  password: string;
};
