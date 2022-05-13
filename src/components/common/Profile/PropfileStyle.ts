import Image from 'next/image';
import styled from 'styled-components';

export const ProfileStyle = styled.div`
  display: flex;
`;

export const ProfileImage = styled(Image)`
  object-fit: contain;
  border-radius: 50px;
`;