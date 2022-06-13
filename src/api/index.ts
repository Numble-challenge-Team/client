/* eslint-disable import/no-cycle */
import axios, { AxiosInstance } from 'axios';
import { interceptors } from './interceptor';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const HEADERS = {
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8',
  pragma: 'no-cache',
};

const createAxios = (): AxiosInstance => {
  return axios.create({ baseURL: `${BASE_URL}/api/v1`, headers: HEADERS });
};

const createAxiosWithToken = (version: string): AxiosInstance => {
  const requestHTTP = axios.create({ baseURL: `${BASE_URL}/api/${version}`, headers: HEADERS, withCredentials: true });

  return interceptors(requestHTTP);
};

const createAxiosWithTokenInUpload = (): AxiosInstance => {
  const requestHTTP = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    headers: { ...HEADERS, 'Content-Type': 'multipart/form-data; boundary=something' },
  });

  return interceptors(requestHTTP);
};

// No token
export const axiosService = createAxios();

// With token
export const axiosWithToken = createAxiosWithToken('v1');

// With token
export const axiosWithTokenInUpload = createAxiosWithTokenInUpload();

interface ApisType {
  url: string;
}

class Apis implements ApisType {
  constructor(public url: string) {
    this.url = url;
  }

  async fetchUser<bodyDataType>(bodyData: bodyDataType) {
    await createAxiosWithToken('v2').post(`/users/${this.url}`, bodyData);
  }
}

const api = (url: string) => new Apis(url);

export default api;
