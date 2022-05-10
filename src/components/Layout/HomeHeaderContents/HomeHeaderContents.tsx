import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Icon } from '@components/Common';
import Search from '../Search/Search';

import * as HomeHeaderContentsStyled from './HomeHeaderContentsStyle';

interface HomeHeaderContentsProps {}

function HomeHeaderContents(prop: PropsWithChildren<HomeHeaderContentsProps>) {
  return (
    <HomeHeaderContentsStyled.HomeHeaderContentsContainer>
      <HomeHeaderContentsStyled.HomeHeaderContentsWrapper>
        <Link href="/">
          <a>
            <Icon type="header-logo" width={72} height={36} />
          </a>
        </Link>
        <Search />
      </HomeHeaderContentsStyled.HomeHeaderContentsWrapper>
    </HomeHeaderContentsStyled.HomeHeaderContentsContainer>
  );
}

export default HomeHeaderContents;
