import styled from 'styled-components';

export const UploadNavigationFixedContainer = styled.div`
  position: fixed;

  bottom: 7.6rem;
  right: 0;
  width: 100%;
  z-index: 1000;
`;

export const UploadNavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.2rem;
  max-width: 37.5rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const UploadNavigation = styled.ul`
  margin: 0;
  padding: 1rem;
  width: 14.8rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.color.white};

  & > li {
    position: relative;
    margin: 0;
    padding: 0.6rem 0;
    font-family: 'NanumSquareR';
    font-size: 1.6rem;
    color: ${({ theme }) => theme.color.black};

    & > * {
      display: inline-block;
      width: 100%;
      text-align: center;
    }

    &:first-child {
      padding-bottom: 1.6rem;
    }

    &:not(:first-child) {
      padding-top: 1.6rem;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        display: block;
        width: 100%;
        height: 0.1rem;
        background-color: ${({ theme }) => theme.color.gray[200]};
      }
    }
  }
`;

export const ShowUploadNavButton = styled.button`
  margin: 0;
  padding: 0;
  width: 6.4rem;
  height: 6.4rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
