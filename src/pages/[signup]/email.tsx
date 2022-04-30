import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Button, Input } from '@components/Common';
import Layout from '@components/Layout/Layout';

import { EMAIL_VALIDATION } from '@constants/validation';
import { FormRegisterType, SignupInfoType } from '@/types/signup';

import { userSingupState } from '@store/signup';
import { useValidationSignupQuery } from '@api/queries/signup';

import * as Styled from '@components/Signup/SignupPageStyle';

function SingupEmailPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [formErrorState, setFormErrorState] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [userEmailData, setUserEmailData] = useState<Pick<SignupInfoType, 'email'>>({ email: '' });
  const [signupInfo, setSignupInfo] = useRecoilState<SignupInfoType>(userSingupState);

  const { error } = useValidationSignupQuery('email', userEmailData, {
    enabled: !!userEmailData.email,
    retry: 0,
    onSuccess: (data) => {
      setSignupInfo({ ...signupInfo, email: userEmailData.email });

      if (data?.state === '200') {
        router.push('/signup/password');
      }
    },
  });

  const handleEmailSubmit = useCallback((formEmailData: FormRegisterType) => {
    setUserEmailData({ email: formEmailData.email });
  }, []);

  useEffect(() => {
    if (error && error.response !== undefined) {
      setFormErrorState(true);
      setEmailErrorMessage(error.response.data.message);
    }
  }, [userEmailData, error]);

  useEffect(() => {
    if (errors.email?.message) {
      setFormErrorState(false);
    }
  }, [errors.email?.message]);

  return (
    <Layout hasHeader={false}>
      <p>안녕하세요. 오즈가 처음이신가요?</p>
      <p>먼저 이메일을 확인해 주세요!</p>
      <form onSubmit={handleSubmit(handleEmailSubmit)}>
        <label>E-mail</label>
        <Input
          label="email"
          register={register}
          pattern={EMAIL_VALIDATION}
          placeholderText="이메일을 입력해 주세요."
          hasErrorDisplay={formErrorState || !!errors.email?.message}
          required
        />
        {errors && <Styled.ErrorMessage>{errors.email?.message}</Styled.ErrorMessage>}
        {formErrorState && <Styled.ErrorMessage>{emailErrorMessage}</Styled.ErrorMessage>}

        <Button type="submit" margin="3.6rem 0 0 0">
          다음
        </Button>
      </form>
    </Layout>
  );
}

export default SingupEmailPage;
