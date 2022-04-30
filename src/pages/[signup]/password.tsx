import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Button, Input } from '@components/Common';
import Layout from '@components/Layout/Layout';

import { FormRegisterType, SignupInfoType } from '@/types/signup';

import { userSingupState } from '@store/signup';

function SignupPasswordPage() {
  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [signupInfo, setSignupInfo] = useRecoilState<SignupInfoType>(userSingupState);
  const passwordRef = useRef<string>();

  const handlePasswordSubmit = ({ password, repeatPassword }: any) => {
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
    passwordRef.current = watch('password');

    return value === passwordRef.current;
  };

  return (
    <Layout hasHeader={false}>
      <p>가입을 진행해 볼까요?</p>
      <p>비밀번호를 입력해 주세요.</p>
      <form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <label>Password</label>
        <Input type="password" label="password" register={register} placeholderText="비밀번호" required />

        <label>Repeat Password</label>
        <Input
          type="password"
          label="repeatPassword"
          register={register}
          validate={handlePasswordValidation}
          placeholderText="비밀번호 확인"
          required
        />
        {errors && errors.repeatPassword?.type === 'validate' && <p>비밀번호가 일치하지 않습니다.</p>}

        <Button type="submit" margin="3.6rem 0 0 0">
          다음
        </Button>
      </form>
    </Layout>
  );
}

export default SignupPasswordPage;
