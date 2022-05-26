import { Alert, Button, Text } from '@components/Common';
import React from 'react';

interface ReportVideoModalPropsType {
  isShowReportVideoModal: boolean;
  isShowSuccessModal: boolean;
  isShowFailedModal: boolean;
  errorMessage: string;
  handleReportVideoButton: (type: 'open' | 'close' | 'submit') => void;
}

function ReportVideoModal({
  isShowReportVideoModal,
  isShowSuccessModal,
  isShowFailedModal,
  errorMessage,
  handleReportVideoButton,
}: ReportVideoModalPropsType) {
  return (
    <>
      {isShowReportVideoModal && (
        <Alert onBlurModal={() => handleReportVideoButton('close')}>
          <div>
            <Text>영상을 신고하시겠어요?</Text>
          </div>
          <div>
            <Button type="button" size="S" backColor="border" clickEvent={() => handleReportVideoButton('close')}>
              취소
            </Button>
            <Button type="button" size="S" backColor="primary" clickEvent={() => handleReportVideoButton('submit')}>
              확인
            </Button>
          </div>
        </Alert>
      )}
      {isShowSuccessModal && (
        <Alert onBlurModal={() => handleReportVideoButton('close')}>
          <div>
            <Text>신고가 완료되었습니다.</Text>
            <Text>콘텐츠 유해성 확인 후 조치하겠습니다.</Text>
          </div>
          <Button type="button" size="M" backColor="primary" clickEvent={() => handleReportVideoButton('close')}>
            확인
          </Button>
        </Alert>
      )}
      {isShowFailedModal && (
        <Alert onBlurModal={() => handleReportVideoButton('close')}>
          <Text>{errorMessage}</Text>
          <Button type="button" size="M" backColor="primary" clickEvent={() => handleReportVideoButton('close')}>
            확인
          </Button>
        </Alert>
      )}
    </>
  );
}

export default ReportVideoModal;
