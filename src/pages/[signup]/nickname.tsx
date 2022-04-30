import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Input } from '@components/Common';

import { FormRegisterType, SignupInfoType } from '@/types/signup';

import { userSingupState } from '@store/signup';
import { NICKNAME_VALIDATION } from '@constants/validation';
import { useSignupQuery, useValidationSignupQuery } from '@api/queries/signup';

function SignupNicknamePage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [userNicknameData, setUserNicknameData] = useState<Pick<SignupInfoType, 'nickname'>>({ nickname: '' });
  const [signupInfo, setSignupInfo] = useRecoilState<SignupInfoType>(userSingupState);

  const { data } = useValidationSignupQuery('nickname', userNicknameData, {
    onSuccess: () => {
      setSignupInfo({ ...signupInfo, nickname: userNicknameData.nickname });
    },
    onError: (error: any) => {
      // 닉네임 중복처리 에러 로직
    },
  });

  const signupData = useSignupQuery(signupInfo, {
    enabled: signupInfo.nickname !== '',
    onSuccess: () => {
      // 회원가입 성공 시
      router.push('/');
    },
    onError: (error: any) => {
      // 회원가입 실패
    },
  });

  const handleNicknameSubmit = (userNickname: FormRegisterType) => {
    setUserNicknameData({ nickname: userNickname.nickname });
  };

  return (
    <>
      <p>거의 다 왔어요!</p>
      <p>나만의 닉네임으로 시작해요.</p>
      <form onSubmit={handleSubmit(handleNicknameSubmit)}>
        <label>Nickname</label>
        <Input
          type="name"
          label="nickname"
          register={register}
          pattern={NICKNAME_VALIDATION}
          placeholderText="별명"
          required
        />
        {errors && errors.nickname?.message}

        <button type="submit">완료</button>
      </form>
    </>
  );
}

export default SignupNicknamePage;
