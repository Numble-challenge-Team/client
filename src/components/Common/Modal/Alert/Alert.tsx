import { MouseEventHandler, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import * as ModalStyled from '../ModalStyle';

interface AlertProps {
  onBlurModal?: MouseEventHandler<HTMLDivElement>;
}

function Alert({ onBlurModal, children }: PropsWithChildren<AlertProps>) {
  const handleModalContainer: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };
  return createPortal(
    <ModalStyled.Dim onClick={onBlurModal}>
      <ModalStyled.AlertModalContainer onClick={handleModalContainer}>{children}</ModalStyled.AlertModalContainer>
    </ModalStyled.Dim>,
    document.body
  );
}

export default Alert;
