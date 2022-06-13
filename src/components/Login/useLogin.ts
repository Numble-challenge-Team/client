import { useState } from 'react';
import { useRouter } from 'next/router';

import { LoginRequestDataType } from '@/types/login';
import { FetchDataType } from '@/types/fetchData';

import api from '@api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

export default function useLogin() {
  const router = useRouter();
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');

  const { mutate: userLogin } = useMutation((loginData: LoginRequestDataType) => api('login').fetchUser(loginData), {
    onMutate: () => {
      setLoginErrorMessage('');
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: AxiosError<FetchDataType>) => {
      if (error.response) {
        const { code, status, detail } = error.response.data;

        if (status === 404) {
          setLoginErrorMessage(detail);
        }

        if (code === 400) {
          setLoginErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
      }
    },
  });

  return { userLogin, loginErrorMessage };
}
