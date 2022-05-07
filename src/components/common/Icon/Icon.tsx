interface IconProps {
  type:
    | 'chevron-up'
    | 'cancle'
    | 'circle-arrow-left'
    | 'fill-heart'
    | 'chevron-down'
    | 'flag'
    | 'clear-circle'
    | 'dial-pad'
    | 'home'
    | 'heart'
    | 'send'
    | 'help-question'
    | 'search'
    | 'thumbs-up'
    | 'plus-circle'
    | 'video'
    | 'user';
  fill?: string;
  width?: number;
  height?: number;
}

function Icon({ type, fill = '#000000', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height}>
      <use href={`#${type}`} fill={fill} />
    </svg>
  );
}

export default Icon;
