import { PropsWithChildren, useState } from 'react';

import { showSearchState } from '@store/search';
import { useRecoilState } from 'recoil';

import { Icon } from '@components/Common';
import SearchModal from './SearchModal';
import * as SearchStyled from './SearchStyle';

interface SearchProps {}

function Search(prop: PropsWithChildren<SearchProps>) {
  const [showSearch, setShowSearch] = useRecoilState(showSearchState);
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      {showSearch ? (
        <SearchModal />
      ) : (
        <SearchStyled.SearchButton onClick={toggleShowSearch}>
          <Icon type="search" />
        </SearchStyled.SearchButton>
      )}
    </>
  );
}

export default Search;
