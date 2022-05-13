export interface IconProps {
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
    | 'send'
    | 'send-inactive'
    | 'help-question'
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
    | 'cancle'
    | 'loading'
    | 'fetching'
    | 'bend-arrow-right';
  fill?: string;
  width?: number;
  height?: number;
  clickEvent?: () => void;
}

function Icon({ type, fill = '#808080', width = 24, height = 24, clickEvent }: IconProps) {
  return (
    <svg width={width} height={height} onClick={clickEvent}>
      <use href={`#${type}`} fill={fill} />
    </svg>
  );
}

export default Icon;
