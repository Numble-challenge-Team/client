import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { searchState, showSearchState, searchStackState } from '@store/search';
import { useRecoilState } from 'recoil';

import Theme from '@styles/theme';
import { Icon, Input } from '@components/common';
import { useRouter } from 'next/router';
import * as SearchStyled from './SearchStyle';

interface SearchModalProps {}

function SearchModal(prop: PropsWithChildren<SearchModalProps>) {
  const router = useRouter();
  const [search, setSearch] = useRecoilState(searchState);
  const [showSearch, setShowSearch] = useRecoilState(showSearchState);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchStack, setSearchStack] = useRecoilState(searchStackState);

  const changeSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };
  const changeSearchByHistory: (keyword: string) => MouseEventHandler<HTMLButtonElement> = (keyword) => () => {
    setSearch(keyword);
  };
  const deleteKeywordInHistory: (targetKeyword: string) => MouseEventHandler<HTMLButtonElement> =
    (targetKeyword) => () => {
      const filterSearchHistory = searchHistory.filter((keyword) => keyword !== targetKeyword);
      setSearchHistory(filterSearchHistory);
      localStorage.setItem('search-history', JSON.stringify(filterSearchHistory));
    };
  const handleSubmitSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const filterSearchHistory = searchHistory.filter((keyword) => keyword !== search);
    if (filterSearchHistory.length === searchHistory.length) {
      localStorage.setItem('search-history', JSON.stringify([search, ...searchHistory]));
    } else {
      localStorage.setItem('search-history', JSON.stringify([search, ...filterSearchHistory]));
    }

    setSearchStack([...searchStack, search]);
    router.push(search ? `?search=${search}` : '/');
    setShowSearch(false);
  };
  const handleCloseSearch: MouseEventHandler<HTMLButtonElement> = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    const searchHistoryInLocalStorage = JSON.parse(localStorage.getItem('search-history') || '[]');

    setSearchHistory(searchHistoryInLocalStorage);
  }, []);

  return createPortal(
    <SearchStyled.SearchModalContainer>
      <SearchStyled.SearchModalWrapper>
        <SearchStyled.SearchForm onSubmit={handleSubmitSearch}>
          <button type="button" onClick={handleCloseSearch}>
            <Icon type="circle-arrow-left" fill={Theme.color.primary[700]} />
          </button>
          <SearchStyled.SearchInput autoFocus type="text" value={search} onChange={changeSearch} />
          <SearchStyled.SubmitSearchButton type="submit">
            <Icon type="search" />
          </SearchStyled.SubmitSearchButton>
        </SearchStyled.SearchForm>
        <SearchStyled.SearchHistoryList>
          {searchHistory.map((keyword) => (
            <li key={keyword}>
              <Icon type="history" />
              <SearchStyled.AddHistoryKeywordButton type="button" onClick={changeSearchByHistory(keyword)}>
                {keyword}
              </SearchStyled.AddHistoryKeywordButton>
              <SearchStyled.DeleteHistoryKeywordButton onClick={deleteKeywordInHistory(keyword)}>
                ×
              </SearchStyled.DeleteHistoryKeywordButton>
            </li>
          ))}
        </SearchStyled.SearchHistoryList>
      </SearchStyled.SearchModalWrapper>
    </SearchStyled.SearchModalContainer>,
    document.body
  );
}

export default SearchModal;
