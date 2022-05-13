import { PropsWithChildren } from 'react';

import { updateVideoIdState } from '@store/videoId';
import { showAlertModalState, showBottomUpModalState } from '@store/modal';
import { useRecoilState } from 'recoil';

import { BottomUp, Icon } from '@components/Common';

interface DeleteButtonProps {}

function DeleteButton(prop: PropsWithChildren<DeleteButtonProps>) {
  const [showBottomUpModal, setShowBottomUpModal] = useRecoilState(showBottomUpModalState);
  const [showAlertModal, setShowAlertModal] = useRecoilState(showAlertModalState);
  const [updateVideoId, setUpdateVideoId] = useRecoilState(updateVideoIdState);
  const handleDelete = () => {
    setShowBottomUpModal(!showBottomUpModal);
    setShowAlertModal(!showAlertModal);
  };

  return (
    <button type="button" onClick={handleDelete}>
      <Icon type="delete" />
      삭제
    </button>
  );
}

export default DeleteButton;
