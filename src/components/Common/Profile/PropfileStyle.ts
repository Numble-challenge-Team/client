import Image from 'next/image';
import styled from 'styled-components';

export const ProfileStyle = styled.div`
  display: flex;
  height: 100%;
`;

export const ProfileImage = styled(Image)`
  object-fit: contain;
  border-radius: 50%;
`;
