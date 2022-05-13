import { MouseEventHandler, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import * as ModalStyled from '../ModalStyle';

interface BottomUpProps {
  onBlurModal: MouseEventHandler<HTMLDivElement>;
}

function BottomUp({ onBlurModal, children }: PropsWithChildren<BottomUpProps>) {
  const handleModalContainer: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <ModalStyled.Dim onClick={onBlurModal}>
      <ModalStyled.BottomUpModalContainer onClick={handleModalContainer}>{children}</ModalStyled.BottomUpModalContainer>
    </ModalStyled.Dim>,
    document.body
  );
}

export default BottomUp;
