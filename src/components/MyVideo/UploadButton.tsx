import Link from 'next/link';

import { PropsWithChildren } from 'react';

import { useRecoilState } from 'recoil';
import { showMyVideoUploadNav } from '@store/myVideo';

import { MyVideoStyled } from '@components/MyVideo';
import { Icon } from '@components/Common';
interface UploadButtonProps {}

function UploadButton(prop: PropsWithChildren<UploadButtonProps>) {
  const [showUploadNav, setShowUploadNav] = useRecoilState(showMyVideoUploadNav);
  const toggleShowUploadNav = () => {
    setShowUploadNav(!showUploadNav);
  };
  return (
    <MyVideoStyled.UploadNavigationFixedContainer>
      <MyVideoStyled.UploadNavigationWrapper>
        {showUploadNav && (
          <MyVideoStyled.UploadNavigation>
            <li>
              <Link href="/my-video/add">
                <a>직접 영상 업로드</a>
              </Link>
            </li>
            <li>
              <Link href="/my-video/embed">
                <a>임베드 영상 업로드</a>
              </Link>
            </li>
          </MyVideoStyled.UploadNavigation>
        )}
        <MyVideoStyled.ShowUploadNavButton onClick={toggleShowUploadNav}>
          <Icon type="plus-circle" width={42} height={42} />
        </MyVideoStyled.ShowUploadNavButton>
      </MyVideoStyled.UploadNavigationWrapper>
    </MyVideoStyled.UploadNavigationFixedContainer>
  );
}

export default UploadButton;
