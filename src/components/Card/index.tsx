type CardProps = {
  onClick?: () => void;
  title: string;
  description: string;
  isSelected: boolean;
  isDisabled?: boolean;
  smallTitle?: boolean;
};

function Card(props: CardProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 bg-dagger1 ${props.isSelected ? 'border-brand' : 'border-dagger2'}`}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <div className="flex flex-row items-center justify-between">
        <p className={`font-bold text-${props.smallTitle ? 'sm' : 'base'}`}>{props.title}</p>
        {props.isSelected && (
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <p className="text-dagger3 text-xs">{props.description}</p>
    </div>
  );
}

export default Card;