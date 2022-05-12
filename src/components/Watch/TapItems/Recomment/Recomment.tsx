/* eslint-disable import/no-cycle */
import { Icon, Title } from '@components/Common';
import Comment from '@components/Watch/TapItems/Comment/Comment';
import * as Styled from './RecommentStyle';

interface RecommentPropsType {
  setIsOpen: (newOpen: boolean) => void;
}

function Recomment({ setIsOpen }: RecommentPropsType) {
  return (
    <Styled.RecommentHeader>
      <Title size="title2">답글</Title>
      <Icon type="cancle" width={18} height={18} clickEvent={() => setIsOpen(false)} />
      {/* <Comment /> */}
    </Styled.RecommentHeader>
  );
}

export default Recomment;
