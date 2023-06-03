import { ChevronDownIcon } from 'src/components/Icons';

const SeeMore = () => {
    return (
        <div className='flex cursor-pointer items-center px-3 py-2 text-sm hover:opacity-80'>
            <span className='mr-2'>Thêm</span> <ChevronDownIcon className='w-2' />
        </div>
    );
};

export default SeeMore;
