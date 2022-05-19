import { Alert, Button, Text } from '@components/Common';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface SignupExitModalPropsType {
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

function SignupExitModal({ isShowModal, setIsShowModal }: SignupExitModalPropsType) {
  const router = useRouter();

  const handleCloseModal = useCallback(() => {
    setIsShowModal((prev) => !prev);
  }, [isShowModal]);

  const handleExitSignout = useCallback(() => {
    setIsShowModal((prev) => !prev);
    router.push('/login');
  }, [isShowModal]);

  return (
    <Alert onBlurModal={handleCloseModal}>
      <div>
        <Text>입력하신 내용은 저장되지 않습니다.</Text>
        <Text>회원가입을 종료하시겠어요?</Text>
      </div>
      <div>
        <Button type="button" size="S" backColor="border" clickEvent={handleCloseModal}>
          아니오
        </Button>
        <Button type="button" size="S" clickEvent={handleExitSignout}>
          네
        </Button>
      </div>
    </Alert>
  );
}

export default SignupExitModal;
