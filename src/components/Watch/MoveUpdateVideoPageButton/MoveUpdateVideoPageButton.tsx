import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { Alert, Button, Drawer, Icon, Text } from '@components/Common';

import { useDeleteVideoMutation } from '@api/queries/delete';
import { updateVideoIdState } from '@store/videoId';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { showToastModalState, toastModalMessageState } from '@store/modal';

import * as Styled from './MoveUpdateVideoPageButtonStyle';

interface MoveUpdateVideoPageButtonPropsType {
  videoId: number;
}

function MoveUpdateVideoPageButton({ videoId }: MoveUpdateVideoPageButtonPropsType) {
  const router = useRouter();
  const [updateVideoId, setUpdateVideoId] = useRecoilState(updateVideoIdState);
  const setShowToastModal = useSetRecoilState(showToastModalState);
  const setToastModalMessage = useSetRecoilState(toastModalMessageState);

  const [isShowUpdateVideoModal, setIsShowUpdateVideoModal] = useState<boolean>(false);
  const [isShowDeleteVideoConfirmModal, setIsShowDeleteVideoConfirmModla] = useState<boolean>(false);

  const fetchDeleteVideoResult = useDeleteVideoMutation({
    onSuccess: () => {
      router.back();

      setShowToastModal(true);
      setToastModalMessage('영상 삭제가 완료되었습니다.');

      setTimeout(() => {
        setShowToastModal(false);
        setToastModalMessage('');
      }, 2000);
    },
    onError: () => {
      router.reload();
    },
    onSettled: () => {
      setIsShowDeleteVideoConfirmModla(false);
      setUpdateVideoId(null);
    },
  });

  const handleMoveUpdateVideoPage = useCallback(() => {
    setUpdateVideoId(videoId);
    router.push('/my-video/update');
  }, [updateVideoId]);

  const handleDeleteVideoModal = useCallback(() => {
    setIsShowDeleteVideoConfirmModla((prev) => !prev);
  }, [isShowDeleteVideoConfirmModal]);

  const handleDeleteVideo = useCallback(() => {
    setUpdateVideoId(videoId);
    if (!updateVideoId) {
      return;
    }

    fetchDeleteVideoResult.mutate({ videoId: updateVideoId });
  }, [updateVideoId]);

  return (
    <>
      <Drawer
        icon={{ type: 'dial-pad', width: 18, height: 18 }}
        isOpen={isShowUpdateVideoModal}
        setIsOpen={setIsShowUpdateVideoModal}
        height={30}
      >
        <Styled.UpdateVideoModalItemContainer>
          <Styled.UpdateVideoModalItem>
            <button type="button" onClick={handleMoveUpdateVideoPage}>
              <Icon type="edit" />
              수정
            </button>
          </Styled.UpdateVideoModalItem>
          <Styled.UpdateVideoModalItem>
            <button type="button" onClick={handleDeleteVideoModal}>
              <Icon type="delete" />
              삭제
            </button>
          </Styled.UpdateVideoModalItem>
        </Styled.UpdateVideoModalItemContainer>
      </Drawer>
      {isShowDeleteVideoConfirmModal && (
        <Alert onBlurModal={handleDeleteVideoModal}>
          <Text>정말 삭제하시겠어요?</Text>
          <div>
            <Button type="button" size="S" backColor="border" clickEvent={handleDeleteVideoModal}>
              아니오
            </Button>
            <Button type="button" size="S" clickEvent={handleDeleteVideo}>
              네
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
}

export default MoveUpdateVideoPageButton;
