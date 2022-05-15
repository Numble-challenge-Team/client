import { toastModalMessageState } from '@store/modal';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';

import * as ModalStyled from '../ModalStyle';

interface ToastProps {}

function Toast(prop: PropsWithChildren<ToastProps>) {
  const [toastModalMessage] = useRecoilState(toastModalMessageState);

  return createPortal(
    <ModalStyled.ToastModalContainer>
      <ModalStyled.ToastModalWrapper>{toastModalMessage}</ModalStyled.ToastModalWrapper>
    </ModalStyled.ToastModalContainer>,
    document.body
  );
}

export default Toast;
