import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 10.2rem;
  background-color: ${({ theme }) => theme.color.white};
`;

export const Main = styled.main<{ hasHeader: boolean; hasWhitespace?: boolean }>`
  position: relative;
  margin: ${({ hasHeader }) => (hasHeader ? '10.2rem auto 0' : null)};
  padding: ${({ hasWhitespace }) => (hasWhitespace ? '0 2rem' : null)};
  max-width: 37.5rem;
  min-height: calc(100vh - 10.2rem);
  font-family: 'NanumSquareR';
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.black};
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  width: 100%;
  height: 100vh;
  margin-top: -10.2rem;
`;

export const Section = styled.section`
  padding-top: 7rem;
`;
