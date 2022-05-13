import styled from 'styled-components';

export const SearchButton = styled.button`
  margin: 0;
  padding: 0;
  width: 2.4rem;
  height: 2.4rem;
`;

export const SearchModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.white};
`;

export const SearchModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  max-width: 37.5rem;
  height: 100vh;
  font-family: 'NanumSquareR';
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.black};
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 1.2rem;
  width: 100%;
  height: 4.8rem;
`;
export const SearchInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 60rem;
  border: 0.2rem solid ${({ theme }) => theme.color.primary[700]};
  padding: 1.2rem 2.4rem;
  background-color: ${({ theme }) => theme.color.white};
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.black};
`;

export const SubmitSearchButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.6rem;
`;

export const SearchHistoryList = styled.ul`
  display: block;
  width: 100%;
  padding: 1rem;
  padding-top: 2.8rem;
  & > li {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 0.4rem;
    align-items: center;
    color: ${({ theme }) => theme.color.black};
  }
`;

export const AddHistoryKeywordButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.8rem 0;
`;

export const DeleteHistoryKeywordButton = styled.button`
  font-size: 2rem;
  line-height: 1;
  padding: 0 0.4rem;
`;
