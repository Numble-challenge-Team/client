import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Button, Input, Title, Text } from '@components/Common';
import Layout from '@components/Layout/Layout';

import * as Styled from '@components/Layout/LayoutStyle';
import * as SignupStyle from '@components/Signup/SignupPageStyle';

import { EMAIL_VALIDATION } from '@constants/validation';
import { LoginRequestDataType } from '@/types/login';
import { FormRegisterType } from '@/types/signup';

import { useLoginMutation } from '@api/queries/users';

function LoginPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();

  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  const loginMutation = useLoginMutation({
    onMutate: () => {
      setIsFormErrorState(false);
      setEmailErrorMessage('');
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

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

  const handlePasswordValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  }, []);

  const handleLoginSubmit = useCallback(
    (data: LoginRequestDataType) => {
      setEmailErrorMessage('');

      if ((data.email === '' || data.password === '') && passwordValue === '') {
        setIsFormErrorState(true);
        setEmailErrorMessage('이메일 또는 비밀번호를 입력해 주세요.');
        return;
      }

      const loginData = {
        email: data.email,
        password: passwordValue || data.password,
      };

      loginMutation.mutate(loginData);
    },
    [passwordValue, isFormErrorState, emailErrorMessage]
  );

  const handleSignupButton = () => {
    router.push('/signup');
  };

  return (
    <Layout title="로그인" hasNav={false} hasHeader hasBackButton hasWhitespace>
      <Styled.Section>
        <Title margin="0 0 1.2rem 0">환영해요!</Title>
        <Text margin="0 0 6rem 0">귀여운 친구들을 만나러 가 볼까요?</Text>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <label>E-mail</label>
          <Input
            label="email"
            register={register}
            pattern={EMAIL_VALIDATION}
            placeholderText="이메일을 입력해 주세요."
            hasErrorDisplay={isFormErrorState || !!errors.email?.message}
            margin="1.2rem"
          />
          <label>Password</label>
          <Input
            type="password"
            label="password"
            register={register}
            value={passwordValue}
            changeEvent={handlePasswordValue}
            placeholderText="비밀번호를 입력해 주세요."
            hasErrorDisplay={isFormErrorState || !!errors.email?.message}
          />
          {errors && <SignupStyle.ErrorMessage>{errors.email?.message}</SignupStyle.ErrorMessage>}
          {isFormErrorState && <Text hasError={isFormErrorState}>{emailErrorMessage}</Text>}

          <Button type="submit" margin="3.6rem 0 0 0">
            로그인
          </Button>
          <Button backColor="none" hasBold={false} clickEvent={handleSignupButton}>
            회원가입
          </Button>
        </form>
      </Styled.Section>
    </Layout>
  );
}

export default LoginPage;
