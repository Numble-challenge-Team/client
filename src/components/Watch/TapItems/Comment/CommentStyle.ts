import styled from 'styled-components';

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const CommentInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }
`;

export const CommentUser = styled.div`
  gap: 0.8rem;
`;

export const CommentLikeButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  height: 100%;

  & > svg,
  span {
    display: inline-block;
  }

  & > span {
    margin-left: 0.8rem;
    color: ${({ theme }) => theme.color.gray['500']};
  }
`;
