/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Header = styled.header<{ hasSearchInfo: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: ${({ hasSearchInfo }) => (hasSearchInfo ? '10.2rem' : '6.4rem')};
  background-color: ${({ theme }) => theme.color.white};
`;

export const Main = styled.main<{ hasHeader: boolean; hasWhitespace?: boolean; hasSearchInfo: boolean }>`
  position: relative;
  margin: ${({ hasHeader, hasSearchInfo }) =>
    hasHeader ? (hasSearchInfo ? '10.2rem auto 0' : '6.4rem auto 0') : '0 auto'};
  padding: ${({ hasWhitespace }) => (hasWhitespace ? '0 2rem' : null)};
  max-width: 37.5rem;
  min-height: ${({ hasHeader, hasSearchInfo }) =>
    hasHeader && hasSearchInfo ? 'calc(100vh - 10.2rem)' : 'calc(100vh - 6.4rem)'};
  font-family: 'NanumSquareR';
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.black};
`;

export const EmptyContainer = styled.div<{ hasSearchInfo?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  width: 100%;
  height: 100vh;
  margin-top: ${({ hasSearchInfo }) => (hasSearchInfo ? '-10.2rem' : '-6.4rem')};
`;

export const Section = styled.section`
  padding-top: 7rem;
`;
