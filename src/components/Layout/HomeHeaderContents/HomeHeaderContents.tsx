import { useRouter } from 'next/router';
import Link from 'next/link';

import { PropsWithChildren } from 'react';

import { Icon } from '@components/Common';
import { searchState, searchStackState, showSearchState, searchOrderState } from '@store/search';
import { useRecoilState } from 'recoil';
import { useAllVideosQuery } from '@api/queries/videos';
import Search from '../Search/Search';

import * as HomeHeaderContentsStyled from './HomeHeaderContentsStyle';

interface HomeHeaderContentsProps {}

function HomeHeaderContents(prop: PropsWithChildren<HomeHeaderContentsProps>) {
  const router = useRouter();
  const [search, setSearch] = useRecoilState(searchState);
  const [searchOrder, setSearchOrder] = useRecoilState(searchOrderState);
  const isLikeOrder = searchOrder.includes('likes');
  const isCreateAtOrder = searchOrder.includes('created_at');
  const changeOrder = (type: 'likes' | 'created_at') => () => {
    if (type === 'likes') {
      setSearchOrder('likes,desc');
    } else {
      setSearchOrder('created_at,desc');
    }
  };
  const { data } = useAllVideosQuery(router.query.search, searchOrder);
  const totalCount = data?.pages[0]?.totalCount;

  const [searchStack, setSearchStack] = useRecoilState(searchStackState);
  const [showSearch, setShowSearch] = useRecoilState(showSearchState);
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchBackButton = () => {
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
  };

  return (
    <HomeHeaderContentsStyled.HomeHeaderContentsContainer>
      <HomeHeaderContentsStyled.HomeHeaderContentsWrapper>
        {router.query.search ? (
          <>
            <button type="button" onClick={handleSearchBackButton}>
              <Icon type="circle-arrow-left" />
            </button>
            <HomeHeaderContentsStyled.OpenSearchModalWithSearchKeyword onClick={toggleShowSearch}>
              {router.query.search}
            </HomeHeaderContentsStyled.OpenSearchModalWithSearchKeyword>
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
      <HomeHeaderContentsStyled.SearchInfo>
        {totalCount && (
          <HomeHeaderContentsStyled.SearchResultCount>
            검색결과 {totalCount}건
          </HomeHeaderContentsStyled.SearchResultCount>
        )}
        <HomeHeaderContentsStyled.SearchOrderWrapper>
          <HomeHeaderContentsStyled.OrderButton onClick={changeOrder('likes')} isActive={isLikeOrder}>
            인기순
          </HomeHeaderContentsStyled.OrderButton>
          <HomeHeaderContentsStyled.OrderButton onClick={changeOrder('created_at')} isActive={isCreateAtOrder}>
            최신순
          </HomeHeaderContentsStyled.OrderButton>
        </HomeHeaderContentsStyled.SearchOrderWrapper>
      </HomeHeaderContentsStyled.SearchInfo>
    </HomeHeaderContentsStyled.HomeHeaderContentsContainer>
  );
}

export default HomeHeaderContents;
