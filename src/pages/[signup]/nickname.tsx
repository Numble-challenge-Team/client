import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Button, Input, Title, Text } from '@components/Common';
import Layout from '@components/Layout/Layout';

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
      // ???????????? ?????? ???
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
    // ???????????? ?????? ????????? ??????????????? ??????
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
    // ????????????
    if (error && error.response !== undefined) {
      setIsFormErrorState(true);
      setNicknameErrorMessage(error.response.data.message);
    }
  }, [userNicknameData, error]);

  useEffect(() => {
    // ????????? ?????? ????????????
    if (errors.nickname?.message) {
      setIsFormErrorState(false);
    }
  }, [errors.nickname?.message]);

  return (
    <Layout title="????????????" hasNav={false} hasHeader hasBackButton hasWhitespace>
      <SectionStyled.Section>
        <Text margin="0 0 0.8rem 0">?????? ??? ?????????!</Text>
        <Title margin="0 0 2.8rem 0">????????? ??????????????? ????????????.</Title>
        <form onSubmit={handleSubmit(handleNicknameSubmit)}>
          <label>Nickname</label>
          <Input
            type="name"
            label="nickname"
            register={register}
            pattern={NICKNAME_VALIDATION}
            placeholderText="??????"
            hasErrorDisplay={isFormErrorState || !!errors.nickname?.message}
            required
          />
          {errors && <Styled.ErrorMessage>{errors.nickname?.message}</Styled.ErrorMessage>}
          {isFormErrorState && <Styled.ErrorMessage>{nicknameErrorMessage}</Styled.ErrorMessage>}

          <Button type="submit" margin="3.6rem 0 0 0">
            ??????
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
              {alertState === 'success' ? '??????????????? ?????????????????????.' : '???????????????. ?????? ???????????? ??? ?????????.'}
            </Styled.AlertMessage>
          </Alert>
        </Snackbar>
      </SectionStyled.Section>
    </Layout>
  );
}

export default SignupNicknamePage;
