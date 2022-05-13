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

const createAxiosWithToken = (): AxiosInstance => {
  const requestHTTP = axios.create({ baseURL: `${BASE_URL}/api/v1`, headers: HEADERS });

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
export const axiosWithToken = createAxiosWithToken();

// With token
export const axiosWithTokenInUpload = createAxiosWithTokenInUpload();
