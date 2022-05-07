/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { axiosService } from '@api';
import { AxiosInstance } from 'axios';

export function interceptors(requestHTTP: AxiosInstance) {
  requestHTTP.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('accessToken');

      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
          const response = await axiosService.post('/users/reissue', {
            accessToken,
            refreshToken,
          });

          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('accessToken', response.data.data.refeshToken);

          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return requestHTTP(error.config);
        } catch (error) {
          console.log('토큰 만료 후 재요청 실패', error);
        }
      }

      return Promise.reject(error);
    }
  );

  return requestHTTP;
}
