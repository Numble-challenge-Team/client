import styled from 'styled-components';

export const Videos = styled.ul`
  overflow: hidden;
  padding-bottom: 16rem;

  & > li:last-child {
    box-shadow: 0 0.1rem 0.4rem 0 ${({ theme }) => theme.color.gray[300]};
  }
`;

export const Observer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.6rem;
  margin-top: 1.6rem;
`;
