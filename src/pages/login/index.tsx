import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Button, Input, Title, Text } from '@components/Common';
import Layout from '@components/Layout/Layout';

import useLogin from '@components/Login/useLogin';

import * as Styled from '@components/Layout/LayoutStyle';

import { EMAIL_VALIDATION } from '@constants/validation';
import { LoginRequestDataType } from '@/types/login';
import { FormRegisterType } from '@/types/signup';

function LoginPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [noDataErrorMessage, setNoDataErrorMessage] = useState<string>('');

  const { userLogin, loginErrorMessage } = useLogin();

  const handleLoginChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>, type: string) => {
      switch (type) {
        case 'email':
          setEmailValue(e.target.value);
          break;
        case 'password':
          setPasswordValue(e.target.value);
          break;
        // no default
      }
    },
    [emailValue, passwordValue]
  );

  const handleLoginSubmit = useCallback(
    (data: LoginRequestDataType) => {
      setNoDataErrorMessage('');

      if ((data.email === '' || data.password === '') && passwordValue === '') {
        setNoDataErrorMessage('이메일 또는 비밀번호를 입력해 주세요.');
        return;
      }

      const loginData = {
        email: emailValue || data.email,
        password: passwordValue || data.password,
      };

      userLogin(loginData);
    },
    [emailValue, passwordValue, noDataErrorMessage]
  );

  const handleErrorMessage = useCallback(() => {
    const hasErrorMessage = !!errors.email?.message || !!noDataErrorMessage || !!loginErrorMessage;

    return hasErrorMessage;
  }, [errors, noDataErrorMessage, loginErrorMessage]);

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
            value={emailValue}
            changeEvent={(e) => handleLoginChangeValue(e, 'email')}
            placeholderText="이메일을 입력해 주세요."
            hasErrorDisplay={handleErrorMessage()}
            margin="1.2rem"
          />
          <label>Password</label>
          <Input
            type="password"
            label="password"
            register={register}
            value={passwordValue}
            changeEvent={(e) => handleLoginChangeValue(e, 'password')}
            placeholderText="비밀번호를 입력해 주세요."
            hasErrorDisplay={handleErrorMessage()}
          />
          {errors && <Text hasError={!!errors.email?.message}>{errors.email?.message}</Text>}
          {noDataErrorMessage && <Text hasError={!!noDataErrorMessage}>{noDataErrorMessage}</Text>}
          {loginErrorMessage && <Text hasError={!!loginErrorMessage}>{loginErrorMessage}</Text>}

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
