import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Button, Input } from '@components/Common';
import Layout from '@components/Layout/Layout';

import { EMAIL_VALIDATION } from '@constants/validation';
import { useLoginMutation } from '@api/queries/login';
import { LoginRequestDataType } from '@/types/login';

import * as Styled from '@components/Signup/SignupPageStyle';

function LoginPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  const loginMutation = useLoginMutation({
    onSuccess: () => {
      setIsFormErrorState(false);
      router.push('/');
    },
    onError: (error) => {
      if (error.response) {
        const { code, status, detail } = error.response.data;

        setIsFormErrorState(true);
        if (status === 404) {
          setEmailErrorMessage(detail);
        }

        if (code === 400) {
          setEmailErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
      }
    },
  });

  const handleLoginSubmit = (data: LoginRequestDataType) => {
    setEmailErrorMessage('');

    if (data.email === '' || data.password === '') {
      setIsFormErrorState(true);
      setEmailErrorMessage('이메일 또는 비밀번호를 입력해 주세요.');
      return;
    }

    loginMutation.mutate(data);
  };

  const handleSignupButton = () => {
    router.push('/signup/email');
  };

  return (
    <Layout hasHeader={false}>
      <p>환영해요!</p>
      <p>귀여운 친구들을 만나러 가 볼까요?</p>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <label>E-mail</label>
        <Input
          label="email"
          register={register}
          pattern={EMAIL_VALIDATION}
          placeholderText="이메일을 입력해 주세요."
          hasErrorDisplay={isFormErrorState || !!errors.email?.message}
        />
        <label>Password</label>
        <Input
          type="password"
          label="password"
          register={register}
          placeholderText="비밀번호를 입력해 주세요."
          hasErrorDisplay={isFormErrorState || !!errors.email?.message}
        />
        {errors && <p>{errors.email?.message}</p>}
        {isFormErrorState && <Styled.ErrorMessage>{emailErrorMessage}</Styled.ErrorMessage>}

        <Button type="submit" margin="3.6rem 0 0 0">
          로그인
        </Button>
        <Button backColor="none" clickEvent={handleSignupButton}>
          회원가입
        </Button>
      </form>
    </Layout>
  );
}

export default LoginPage;
