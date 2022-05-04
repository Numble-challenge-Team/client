import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Button, Input } from '@components/Common';
import Layout from '@components/Layout/Layout';

import { EMAIL_VALIDATION } from '@constants/validation';
import { useLoginMutation } from '@api/queries/login';
import { LoginRequestDataType } from '@/types/login';

function LoginPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [userLoginData, setUserLoginData] = useState<LoginRequestDataType>({ email: '', password: '' });

  const { data } = useLoginMutation(userLoginData);

  const handleLoginSubmit = (data: any) => {
    const userData = data;
    setUserLoginData(userData);
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
          required
        />
        <label>Password</label>
        <Input
          type="password"
          label="password"
          register={register}
          placeholderText="비밀번호를 입력해 주세요."
          hasErrorDisplay={isFormErrorState || !!errors.email?.message}
          required
        />
        {errors && <p>{errors.email?.message}</p>}
        {isFormErrorState && <p>{emailErrorMessage}</p>}

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
