import { useRouter } from 'next/router';

import { updateVideoIdState } from '@store/videoId';
import { showAlertModalState, showBottomUpModalState } from '@store/modal';
import { useRecoilState } from 'recoil';

import { useDeleteVideoMutation } from '@api/queries/delete';

import { Alert, BottomUp, Button, Icon, Text } from '@components/Common';
import DeleteButton from './DeleteButton';

function UpdateButton() {
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

  const deleteVideo = () => {
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
          <Text>정말 삭제하시겠어요?</Text>
          <div>
            <Button type="button" size="S" backColor="border" clickEvent={handleBlurAlertModal}>
              아니오
            </Button>
            <Button type="button" size="S" clickEvent={deleteVideo}>
              네
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
}

export default UpdateButton;
