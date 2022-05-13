import Link from 'next/link';

import { PropsWithChildren, useState } from 'react';

import { Icon } from '@components/common';
import * as MyVideoStyled from './MyVideoStyle';

interface UploadButtonProps {}

function UploadButton(prop: PropsWithChildren<UploadButtonProps>) {
  const [showUploadNav, setShowUploadNav] = useState(false);
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
