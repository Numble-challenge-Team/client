import { useRouter } from 'next/router';

import { MouseEventHandler, PropsWithChildren } from 'react';

import { updateVideoIdState } from '@store/videoId';
import { showAlertModalState, showBottomUpModalState } from '@store/modal';
import { useRecoilState } from 'recoil';

import { useDeleteVideoMutation } from '@api/queries/delete';

import { Alert, BottomUp, Icon } from '@components/Common';
import DeleteButton from './DeleteButton';

interface UpdateButtonProps {}

function UpdateButton(prop: PropsWithChildren<UpdateButtonProps>) {
  const router = useRouter();
  const [showBottomUpModal, setShowBottomUpModal] = useRecoilState(showBottomUpModalState);
  const [showAlertModal, setShowAlertModal] = useRecoilState(showAlertModalState);
  const [updateVideoId, setUpdateVideoId] = useRecoilState(updateVideoIdState);
  const handleBlurBottomUpModal = () => {
    setShowBottomUpModal(!showBottomUpModal);
    setUpdateVideoId(null);
  };
  const handleBlurAlertModal = () => {
    setShowAlertModal(!showAlertModal);
    setUpdateVideoId(null);
  };

  const handleUpdateLink = () => {
    setShowBottomUpModal(!showBottomUpModal);
    router.push('/my-video/update');
  };

  const deleteMutation = useDeleteVideoMutation({
    onSuccess: (data) => {
      console.log({ data });
      setShowAlertModal(!showAlertModal);
      setUpdateVideoId(null);
      router.reload();
    },
    onError: (err) => {
      console.log({ err });
      setShowAlertModal(!showAlertModal);
      setUpdateVideoId(null);
      router.reload();
    },
  });
  const deleteVideo: MouseEventHandler<HTMLButtonElement> = () => {
    if (!updateVideoId) {
      return;
    }
    deleteMutation.mutate({ videoId: updateVideoId });
  };

  return (
    <>
      {showBottomUpModal && (
        <BottomUp onBlurModal={handleBlurBottomUpModal}>
          <ul>
            <li>
              <button type="button" onClick={handleUpdateLink}>
                <Icon type="edit" />
                수정
              </button>
            </li>
            <li>
              <DeleteButton />
            </li>
          </ul>
        </BottomUp>
      )}
      {showAlertModal && (
        <Alert onBlurModal={handleBlurAlertModal}>
          <h3>정말 삭제하시겠어요?</h3>
          <div>
            <button type="button" onClick={deleteVideo}>
              네
            </button>
            <button type="button" onClick={handleBlurAlertModal}>
              아니오
            </button>
          </div>
        </Alert>
      )}
    </>
  );
}

export default UpdateButton;
