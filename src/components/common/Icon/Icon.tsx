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
    | 'send-inactive'
    | 'help-question'
    | 'search'
    | 'thumbs-up'
    | 'plus-circle'
    | 'video'
    | 'user';
  fill?: string;
  width?: number;
  height?: number;
  clickEvent?: () => void;
}

function Icon({ type, fill = '#000000', width = 24, height = 24, clickEvent }: IconProps) {
  return (
    <svg width={width} height={height} onClick={clickEvent}>
      <use href={`#${type}`} fill={fill} />
    </svg>
  );
}

export default Icon;
