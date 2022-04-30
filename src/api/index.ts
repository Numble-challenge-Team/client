import axios, { AxiosInstance } from 'axios';

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

// No token
export const axiosService = createAxios();
