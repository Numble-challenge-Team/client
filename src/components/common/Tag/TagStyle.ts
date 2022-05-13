import styled from 'styled-components';

export const TagStyle = styled.span`
  padding: 0.6rem 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary['800']};
  border-radius: 50px;
`;
