import { useTranslation } from 'react-i18next';

import useSearchProducts from 'src/hooks/useSearchProducts';
import { SearchIcon } from '../Icons';

const Search = () => {
  const { t } = useTranslation('layouts');

  const { onSubmit, register } = useSearchProducts();

  return (
    <div className='mr-5 flex-1 md:mx-20 md:mr-0'>
      <div className='relative'>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='w-full rounded-sm border-none p-3 pr-[70px] text-sm text-black outline-none placeholder:text-gray-400'
            placeholder={t('main_layout.header.search_products')}
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
    </div>
  );
};

export default Search;
