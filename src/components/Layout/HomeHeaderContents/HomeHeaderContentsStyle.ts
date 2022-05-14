import styled from 'styled-components';

export const HomeHeaderContentsContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 37.5rem;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.white};
`;

export const HomeHeaderContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  height: 100%;

  font-family: 'NanumSquareR';
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.black};
`;

export const OpenSearchModalWithSearchKeyword = styled.button`
  display: block;
  width: 100%;
  font-family: 'NanumSquareB';
  font-size: 1.8rem;
  padding: 0.8rem 0;
  text-align: left;
`;
