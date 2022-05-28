import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Button, Input, Title, Text } from '@components/Common';
import Layout from '@components/Layout/Layout';
import CustomHead from '@components/CustomHead/CustomHead';

import * as Styled from '@components/Signup/SignupPageStyle';
import * as SectionStyled from '@components/Layout/LayoutStyle';

import { NICKNAME_VALIDATION } from '@constants/validation';
import { FormRegisterType, SignupInfoType } from '@/types/signup';

import { userSingupState } from '@store/signup';
import { useSignupQuery, useValidationSignupQuery } from '@api/queries/users';

import { AlertColor, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignupNicknamePage() {
  const router = useRouter();
  const alertRef = useRef<HTMLDivElement>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormRegisterType>();
  const [isFormErrorState, setIsFormErrorState] = useState<boolean>(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
  const [isShowSignupAlert, setIsShowSignupAlert] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<AlertColor | undefined>('success');

  const [userNicknameData, setUserNicknameData] = useState<Pick<SignupInfoType, 'nickname'>>({ nickname: '' });
  const [signupInfo, setSignupInfo] = useRecoilState<SignupInfoType>(userSingupState);
  const resetSignupData = useResetRecoilState(userSingupState);

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
      setIsShowSignupAlert(true);
      setAlertState('success');
      resetSignupData();

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    },
  });

  const handleNicknameSubmit = useCallback((userNickname: FormRegisterType) => {
    setUserNicknameData({ nickname: userNickname.nickname });
  }, []);

  const handleCloseAlert = () => {
    setIsShowSignupAlert(false);

    if (alertState === 'success') {
      router.push('/');
    } else {
      router.push('/signup/email');
    }
  };

  useEffect(() => {
    // 회원가입 하는 도중에 새로고침할 경우
    if (fetchSignup.error && (signupInfo.email === '' || signupInfo.password === '')) {
      setSignupInfo({
        email: '',
        password: '',
        nickname: '',
      });

      setIsShowSignupAlert(true);
      setAlertState('error');
    }
  }, [fetchSignup.error]);

  useEffect(() => {
    // 중복처리
    if (error && error.response !== undefined) {
      setIsFormErrorState(true);
      setNicknameErrorMessage(error.response.data.message);
    }
  }, [userNicknameData, error]);

  useEffect(() => {
    // 닉네임 규칙 예외처리
    if (errors.nickname?.message) {
      setIsFormErrorState(false);
    }
  }, [errors.nickname?.message]);

  return (
    <>
      <CustomHead title="회원가입 | 닉네임 입력" />
      <Layout title="회원가입" hasNav={false} hasHeader hasBackButton hasWhitespace>
        <SectionStyled.Section>
          <Text margin="0 0 0.8rem 0">거의 다 왔어요!</Text>
          <Title margin="0 0 2.8rem 0">나만의 닉네임으로 시작해요.</Title>
          <form onSubmit={handleSubmit(handleNicknameSubmit)}>
            <label>Nickname</label>
            <Input
              type="name"
              label="nickname"
              register={register}
              pattern={NICKNAME_VALIDATION}
              placeholderText="별명"
              hasErrorDisplay={isFormErrorState || !!errors.nickname?.message}
              required
            />
            {errors && <Styled.ErrorMessage>{errors.nickname?.message}</Styled.ErrorMessage>}
            {isFormErrorState && <Styled.ErrorMessage>{nicknameErrorMessage}</Styled.ErrorMessage>}

            <Button type="submit" margin="3.6rem 0 0 0">
              완료
            </Button>
          </form>

          <Snackbar
            ref={alertRef}
            open={isShowSignupAlert}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClick={handleCloseAlert}
            test-id="test"
          >
            <Alert severity={alertState}>
              <Styled.AlertMessage>
                {alertState === 'success' ? '회원가입이 완료되었습니다.' : '죄송합니다. 다시 회원가입 해 주세요.'}
              </Styled.AlertMessage>
            </Alert>
          </Snackbar>
        </SectionStyled.Section>
      </Layout>
    </>
  );
}

export default SignupNicknamePage;
