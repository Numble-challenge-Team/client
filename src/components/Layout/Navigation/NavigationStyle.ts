import styled from 'styled-components';

export const NavContainer = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  height: 5.6rem;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 -0.1rem 0.4rem ${({ theme }) => theme.color.gray[300]};
`;

export const Nav = styled.nav`
  margin: 0 auto;
  max-width: 37.5rem;
  height: 100%;
  padding: 0 2rem;

  & > ul {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;

    & a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.8rem;
    }
  }
`;

export const NavLink = styled.a<{ isCurrentRoute: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: ${({ theme, isCurrentRoute }) => (isCurrentRoute ? theme.color.primary[700] : theme.color.gray[500])};
`;
