import React from 'react';
import * as Styled from './TagStyle';

interface TagPropsType {
  tag: string;
}

function Tag({ tag }: TagPropsType) {
  return <Styled.TagStyle># {tag}</Styled.TagStyle>;
}

export default Tag;
