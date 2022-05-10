import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { searchState, showSearchState } from '@store/search';
import { useRecoilState } from 'recoil';

import { Icon, Input } from '@components/Common';
import { useRouter } from 'next/router';
import * as SearchStyled from './SearchStyle';

interface SearchModalProps {}

function SearchModal(prop: PropsWithChildren<SearchModalProps>) {
  const router = useRouter();
  const [search, setSearch] = useRecoilState(searchState);
  const [showSearch, setShowSearch] = useRecoilState(showSearchState);

  const changeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmitSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    router.push(search ? `?search=${search}` : '/');
    setShowSearch(false);
  };

  return createPortal(
    <SearchStyled.SearchModalContainer>
      <SearchStyled.SearchModalWrapper>
        <SearchStyled.SearchForm onSubmit={handleSubmitSearch}>
          <SearchStyled.SearchInput autoFocus type="text" value={search} onChange={changeSearch} />
          <SearchStyled.SubmitSearchButton
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              console.log('하이');
            }}
          >
            <Icon type="search" />
          </SearchStyled.SubmitSearchButton>
        </SearchStyled.SearchForm>
      </SearchStyled.SearchModalWrapper>
    </SearchStyled.SearchModalContainer>,
    document.body
  );
}

export default SearchModal;
