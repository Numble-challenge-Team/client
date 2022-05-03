import styled from 'styled-components';

export const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.color.error};
`;

export const AlertMessage = styled.p`
  font-size: 1.4rem;
`;
