import axios, { AxiosInstance } from 'axios';
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { axiosService } from '@api';

export function interceptors(requestHTTP: AxiosInstance) {
  requestHTTP.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('accessToken');

      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.guest = config.headers.guest || !accessToken;
        return config;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  requestHTTP.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (error.response.status === 401) {
        try {
          if (accessToken && refreshToken) {
            const response = await axiosService.post('/users/reissue', {
              accessToken,
              refreshToken,
            });
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);

            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return requestHTTP(error.config);
          }

          window.location.href = '/login';
        } catch (axiosError) {
          if (axios.isAxiosError(axiosError)) {
            if (axiosError.response?.status === 403) {
              if (/\/videos\/(main|search)/.test(error.config.url)) {
                error.config.headers.guest = true;
                return requestHTTP(error.config);
              }

              window.location.href = '/login';
            }
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return requestHTTP;
}
