export interface SignupInfoType {
  email: string;
  password: string;
  nickname: string;
}

export interface FormRegisterType extends SignupInfoType {
  repeatPassword: string;
}

export interface ValidationResponseType {
  data: string;
  message: string;
  result: string;
  state: string;
}
