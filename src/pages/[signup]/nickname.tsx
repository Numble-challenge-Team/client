import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Button, Input } from '@components/Common';
import Layout from '@components/Layout/Layout';

import { FormRegisterType, SignupInfoType } from '@/types/signup';

import { userSingupState } from '@store/signup';
import { NICKNAME_VALIDATION } from '@constants/validation';
import { useSignupQuery, useValidationSignupQuery } from '@api/queries/signup';

import * as Styled from '@components/Signup/SignupPageStyle';

function SignupNicknamePage() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [formErrorState, setFormErrorState] = useState<boolean>(false);
  const [NincknameErrorMessage, setNincknameErrorMessage] = useState<string>('');
  const [userNicknameData, setUserNicknameData] = useState<Pick<SignupInfoType, 'nickname'>>({ nickname: '' });
  const [signupInfo, setSignupInfo] = useRecoilState<SignupInfoType>(userSingupState);

  const { error } = useValidationSignupQuery('nickname', userNicknameData, {
    enabled: !!userNicknameData.nickname,
    retry: 0,
    onSuccess: () => {
      setSignupInfo({ ...signupInfo, nickname: userNicknameData.nickname });
    },
  });

  const fetchSignup = useSignupQuery(signupInfo, {
    enabled: signupInfo.nickname !== '',
    retry: 0,
    onSuccess: () => {
      // 회원가입 성공 시
      router.push('/');
    },
  });

  const handleNicknameSubmit = useCallback((userNickname: FormRegisterType) => {
    setUserNicknameData({ nickname: userNickname.nickname });
  }, []);

  useEffect(() => {
    // 회원가입 하는 도중에 새로고침할 경우
    if (fetchSignup.error && (signupInfo.email === '' || signupInfo.password === '')) {
      setSignupInfo({
        email: '',
        password: '',
        nickname: '',
      });

      alert('죄송합니다. 처음부터 다시 진행부탁드립니다.');
      router.push('/signup/email');
    }
  }, [fetchSignup.error]);

  useEffect(() => {
    // 중복처리
    if (error && error.response !== undefined) {
      setFormErrorState(true);
      setNincknameErrorMessage(error.response.data.message);
    }
  }, [userNicknameData, error]);

  useEffect(() => {
    // 닉네임 규칙 예외처리
    if (errors.nickname?.message) {
      setFormErrorState(false);
    }
  }, [errors.nickname?.message]);

  return (
    <Layout hasHeader={false}>
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
          hasErrorDisplay={formErrorState || !!errors.nickname?.message}
          required
        />
        {errors && <Styled.ErrorMessage>{errors.nickname?.message}</Styled.ErrorMessage>}
        {formErrorState && <Styled.ErrorMessage>{NincknameErrorMessage}</Styled.ErrorMessage>}

        <Button type="submit" margin="3.6rem 0 0 0">
          완료
        </Button>
      </form>
    </Layout>
  );
}

export default SignupNicknamePage;
