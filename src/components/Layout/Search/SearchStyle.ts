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
  background-color: ${({ theme }) => theme.color.dim};
`;

export const SearchModalWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  max-width: 37.5rem;
  height: 6.4rem;
  font-family: 'NanumSquareR';
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.black};
`;

export const SearchForm = styled.form`
  display: block;
  width: 100%;
  height: 100%;
`;
export const SearchInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 60rem;
  border: 0.1rem solid ${({ theme }) => theme.color.primary[700]};
  padding: 1.2rem 2.4rem;
  background-color: ${({ theme }) => theme.color.white};
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.black};
`;

export const SubmitSearchButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;
