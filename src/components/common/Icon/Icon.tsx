interface IconProps {
  type:
    | 'chevron-down'
    | 'chevron-up'
    | 'clear-circle'
    | 'circle-arrow-left'
    | 'header-logo'
    | 'dial-pad'
    | 'flag'
    | 'fill-heart'
    | 'heart'
    | 'search'
    | 'plus-circle'
    | 'help-question'
    | 'home'
    | 'video-off'
    | 'send'
    | 'app-logo'
    | 'thumbs-up'
    | 'user'
    | 'video'
    | 'cancle';

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
