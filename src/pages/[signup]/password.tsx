import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Button, Input } from '@components/Common';
import Layout from '@components/Layout/Layout';
import Text from '@components/Common/Text/Text';
import Title from '@components/Common/Title/Title';

import { PASSWORD_VALIDATION } from '@constants/validation';
import { FormRegisterType, SignupInfoType } from '@/types/signup';

import { userSingupState } from '@store/signup';

function SignupPasswordPage() {
  const router = useRouter();
  const passwordRef = useRef<string>();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [signupInfo, setSignupInfo] = useRecoilState<SignupInfoType>(userSingupState);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const handlePasswordSubmit = ({ password, repeatPassword }: any) => {
    setPasswordErrorMessage('');

    const copyInfo = {
      ...signupInfo,
      password,
    };

    if (password === repeatPassword) {
      setSignupInfo(copyInfo);
      router.push('/signup/nickname');
    }
  };

  const handlePasswordValidation = (value: string) => {
    setPasswordErrorMessage('');

    if (!value) {
      setPasswordErrorMessage('비밀번호를 다시 한 번 입력해 주세요.');
      return false;
    }
    passwordRef.current = watch('password');

    return value === passwordRef.current;
  };

  useEffect(() => {
    if (errors.password?.type === 'pattern' || errors.repeatPassword?.type === 'pattern') {
      setPasswordErrorMessage('');
    }
  }, [passwordErrorMessage]);

  return (
    <Layout hasHeader={false}>
      <Text margin="0 0 0.8rem 0">가입을 진행해 볼까요?</Text>
      <Title margin="0 0 2.8rem 0">비밀번호를 입력해 주세요.</Title>
      <form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <label>Password</label>
        <Input
          type="password"
          label="password"
          register={register}
          pattern={PASSWORD_VALIDATION}
          validate={handlePasswordValidation}
          placeholderText="영문, 숫자 포함 8자 이상 입력해 주세요."
          hasErrorDisplay={!!errors.password || !!errors.repeatPassword}
          margin="1.2rem"
        />

        <label>Repeat Password</label>
        <Input
          type="password"
          label="repeatPassword"
          register={register}
          pattern={PASSWORD_VALIDATION}
          validate={handlePasswordValidation}
          placeholderText="비밀번호 확인"
          hasErrorDisplay={!!errors.password || !!errors.repeatPassword}
        />

        {passwordErrorMessage && <Text hasError={!!passwordErrorMessage}>{passwordErrorMessage}</Text>}
        {(errors.password?.type === 'pattern' || errors.repeatPassword?.type === 'pattern') && (
          <Text hasError={!!errors}>{errors.repeatPassword?.message}</Text>
        )}
        {errors.repeatPassword?.type === 'validate' && <Text hasError={!!errors}>비밀번호가 일치하지 않습니다.</Text>}

        <Button type="submit" margin="3.6rem 0 0 0">
          다음
        </Button>
      </form>
    </Layout>
  );
}

export default SignupPasswordPage;
