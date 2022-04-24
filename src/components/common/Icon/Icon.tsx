interface IconProps {
  type: 'home' | 'video' | 'heart' | 'user';
  fill?: string;
  width?: number;
  height?: number;
}

const Icon = ({ type, fill = '#000000', width = 24, height = 24 }: IconProps) => {
  return (
    <svg width={width} height={height}>
      <use href={`#${type}`} fill={fill}></use>
    </svg>
  );
};

export default Icon;
