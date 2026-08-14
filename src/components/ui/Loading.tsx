interface LoadingProps {
  w: number;
  h: number;
  color: string;
}

type PropBorderColor = {
  [key: string]: string;
}

const boderColor: PropBorderColor = {
  'white': 'border-white',
  'black': 'border-black',
  'transparent': 'border-transparent',
  'green': 'border-green-600',
  'blue': 'border-blue-600',
  'red': 'border-red-600',
};

export default function Loading({ 
  w, 
  h, 
  color 
}: LoadingProps) {
  const borderColorClass = boderColor[color] || '';
  const sizeStyle = {
    width: `${w / 4}rem`,
    height: `${h / 4}rem`,
  };
  // cambia por otro elemento similar 
  return (
    <div className={`
      animate-spin 
      border-4 
      border-solid 
      ${borderColorClass}
      border-t-transparent 
      rounded-full
    `}
      style={sizeStyle}
    ></div>
  );
}