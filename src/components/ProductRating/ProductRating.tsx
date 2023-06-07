import { StartFillIcon } from '../Icons';

const ProductRating = ({
  rating,
  startFillClassName = 'mr-[1px] h-[10px] w-[10px] fill-yellow-300',
  startEmptyClassName = 'mr-[1px] h-[10px] w-[10px] fill-slate-300'
}: {
  rating: number;
  startFillClassName?: string;
  startEmptyClassName?: string;
}) => {
  const handleWidth = (order: number) => {
    if (order <= rating) return 100;
    if (order > rating && order - rating < 1) return (rating - Math.floor(rating)) * 100;
    return 0;
  };

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='relative'>
            <div
              className={`absolute left-0 top-0 h-full overflow-hidden`}
              style={{ width: handleWidth(index + 1) + '%' }}
            >
              <StartFillIcon className={startFillClassName} />
            </div>
            <StartFillIcon className={startEmptyClassName} />
          </div>
        ))}
    </div>
  );
};

export default ProductRating;
