import styled from 'styled-components';

export const HomeHeaderContentsContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 37.5rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.white};
`;

export const HomeHeaderContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  height: 6.4rem;
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

export const SearchInfo = styled.div`
  position: relative;
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
`;

export const SearchResultCount = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.2rem;
  line-height: 3.8rem;
`;
export const SearchOrderWrapper = styled.div`
  order: 1;
  font-size: 1.1rem;

  & > button:not(:first-child) {
    margin-left: 1.6rem;
  }
`;

export const OrderButton = styled.button<{ isActive: boolean }>`
  position: relative;

  ${({ isActive, theme }) =>
    isActive &&
    `
    &::before {
      content: '';
      position: absolute;
      left: -0.8rem;
      width: 0.4rem;
      height: 0.4rem;
      background-color: ${theme.color.primary[700]};
      border-radius: 50%;
      margin-top: 0.7rem;
      margin-bottom: 0.7rem;
    }
  `}
`;
