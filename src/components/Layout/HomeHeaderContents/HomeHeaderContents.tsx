import { useRouter } from 'next/router';
import Link from 'next/link';

import { PropsWithChildren } from 'react';

import { Icon } from '@components/common';
import { searchState, searchStackState } from '@store/search';
import { useRecoilState } from 'recoil';
import Search from '../search/Search';

import * as HomeHeaderContentsStyled from './HomeHeaderContentsStyle';

interface HomeHeaderContentsProps {}

function HomeHeaderContents(prop: PropsWithChildren<HomeHeaderContentsProps>) {
  const router = useRouter();
  const [search, setSearch] = useRecoilState(searchState);
  const [searchStack, setSearchStack] = useRecoilState(searchStackState);

  return (
    <HomeHeaderContentsStyled.HomeHeaderContentsContainer>
      <HomeHeaderContentsStyled.HomeHeaderContentsWrapper>
        {router.query.search ? (
          <>
            <button
              type="button"
              onClick={() => {
                const filterSearchStack = searchStack.slice(0, searchStack.length - 1);

                if (filterSearchStack.length) {
                  const beforeSearch = filterSearchStack[filterSearchStack.length - 1];

                  setSearch(beforeSearch);
                  router.push(beforeSearch ? `?search=${beforeSearch}` : '/');
                  setSearchStack(filterSearchStack.slice(0, searchStack.length - 1));
                } else {
                  setSearch('');
                  setSearchStack([]);
                  router.push('/');
                }
              }}
            >
              <Icon type="circle-arrow-left" />
            </button>
            {router.query.search}
          </>
        ) : (
          <Link href="/">
            <a>
              <Icon type="header-logo" width={72} height={36} />
            </a>
          </Link>
        )}
        <Search />
      </HomeHeaderContentsStyled.HomeHeaderContentsWrapper>
    </HomeHeaderContentsStyled.HomeHeaderContentsContainer>
  );
}

export default HomeHeaderContents;
