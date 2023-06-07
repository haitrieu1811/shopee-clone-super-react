import { ReactNode, useId } from 'react';
import { CheckIcon } from 'src/components/Icons';

const FilterItem = ({ children }: { children: ReactNode }) => {
  const id = useId();

  return (
    <div className='flex items-start py-2 text-gray-600'>
      <div className='relative mr-[10px] h-[13px] w-[13px]'>
        <input
          type='checkbox'
          id={id}
          className={`peer absolute inset-0 mr-2 h-full w-full appearance-none rounded-sm border border-gray-300`}
        />
        <CheckIcon
          className={`absolute left-[50%] top-[50%] w-2 -translate-x-[50%] -translate-y-[50%] fill-orange opacity-0 peer-checked:opacity-100`}
        />
      </div>
      <label htmlFor={id} className='-mt-1 cursor-pointer select-none text-sm'>
        {children}
      </label>
    </div>
  );
};

export default FilterItem;
