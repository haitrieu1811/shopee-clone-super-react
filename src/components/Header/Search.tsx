import { Link } from 'react-router-dom';

import useSearchProducts from 'src/hooks/useSearchProducts';
import { SearchIcon } from '../Icons';

const Search = () => {
  const { onSubmit, register } = useSearchProducts();

  return (
    <div className='mx-20 flex-1'>
      <div className='relative'>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='w-full rounded-sm border-none p-3 pr-[70px] text-sm text-black outline-none placeholder:text-gray-400'
            placeholder='Tìm kiếm sản phẩm'
            {...register('name_search')}
          />
          <button
            type='submit'
            className='h-[calc(100% - 8px)] absolute bottom-1 right-1 top-1 flex w-[60px] items-center justify-center rounded-sm bg-[#fb5533] hover:bg-[#fb6445]'
          >
            <SearchIcon className='h-[14px] w-[14px] fill-white' />
          </button>
        </form>
      </div>
      <div className='mt-2'>
        <Link to='/' className='mr-4 text-[13px] font-light text-gray-100'>
          Kênh người bán
        </Link>
        <Link to='/' className='mr-4 text-[13px] font-light text-gray-100'>
          Đồ 1K Free Ship iPhone 14 Pro Max
        </Link>
        <Link to='/' className='mr-4 text-[13px] font-light text-gray-100'>
          Điện thoại giá rẻ
        </Link>
        <Link to='/' className='mr-4 text-[13px] font-light text-gray-100'>
          Dép
        </Link>
        <Link to='/' className='mr-4 text-[13px] font-light text-gray-100'>
          Đồ ăn vặt
        </Link>
      </div>
    </div>
  );
};

export default Search;
