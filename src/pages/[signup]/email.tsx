import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Input } from '@components/Common';

import { EMAIL_VALIDATION } from '@constants/validation';
import { FormRegisterType, SignupInfoType, ValidationResponseType } from '@/types/signup';

import { userSingupState } from '@store/signup';
import { useValidationSignupQuery } from '@api/queries/signup';

function SingupEmailPage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [userEmailData, setUserEmailData] = useState<Pick<SignupInfoType, 'email'>>({ email: '' });
  const [signupInfo, setSignupInfo] = useRecoilState<SignupInfoType>(userSingupState);

  const { data } = useValidationSignupQuery('email', userEmailData, {
    onSuccess: (data: ValidationResponseType) => {
      setSignupInfo({ ...signupInfo, email: userEmailData.email });

      if (data?.state === '200') {
        router.push('/signup/password');
      }
    },
    onError: (error: any) => {
      // 이메일 중복처리 에러 로직
    },
  });

  const handleEmailSubmit = (formEmailData: FormRegisterType) => {
    setUserEmailData({ email: formEmailData.email });
  };

  return (
    <>
      <p>안녕하세요. 오즈가 처음이신가요?</p>
      <p>먼저 이메일을 확인해 주세요!</p>
      <form onSubmit={handleSubmit(handleEmailSubmit)}>
        <label>E-mail</label>
        <Input
          label="email"
          register={register}
          pattern={EMAIL_VALIDATION}
          placeholderText="이메일을 입력해 주세요."
          required
        />
        {errors && errors.email?.message}

        <button type="submit">다음</button>
      </form>
    </>
  );
}

export default SingupEmailPage;
