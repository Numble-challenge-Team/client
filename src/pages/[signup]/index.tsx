import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Button, Input, Title, Text } from '@components/Common';
import Layout from '@components/Layout/Layout';

import * as Styled from '@components/Layout/LayoutStyle';

import { EMAIL_VALIDATION } from '@constants/validation';
import { FormRegisterType, SignupInfoType } from '@/types/signup';

import { userSingupState } from '@store/signup';
import { useValidationSignupQuery } from '@api/queries/users';

function SingupEmailPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
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
      setIsFormErrorState(true);
      setEmailErrorMessage(error.response.data.message);
    }
  }, [userEmailData, error]);

  useEffect(() => {
    if (errors.email?.message) {
      setIsFormErrorState(false);
    }
  }, [errors.email?.message]);

  return (
    <Layout title="회원가입" hasNav={false} hasHeader hasBackButton hasWhitespace>
      <Styled.Section>
        <Text margin="0 0 0.8rem 0">안녕하세요. 오즈가 처음이신가요?</Text>
        <Title margin="0 0 2.8rem 0">먼저 이메일을 확인해 주세요!</Title>
        <form onSubmit={handleSubmit(handleEmailSubmit)}>
          <label>E-mail</label>
          <Input
            label="email"
            register={register}
            pattern={EMAIL_VALIDATION}
            placeholderText="이메일을 입력해 주세요."
            hasErrorDisplay={isFormErrorState || !!errors.email?.message}
            required
          />
          {errors && <Text hasError={!!errors}>{errors.email?.message}</Text>}
          {isFormErrorState && <Text hasError={isFormErrorState}>{emailErrorMessage}</Text>}

          <Button type="submit" margin="3.6rem 0 0 0">
            다음
          </Button>
        </form>
      </Styled.Section>
    </Layout>
  );
}

export default SingupEmailPage;
