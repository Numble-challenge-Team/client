export interface LoginRequestDataType {
  email: string;
  password: string;
}

export interface LoginResponseDataType {
  data: object;
  message: string;
  result: string;
  state: number;
}
