import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';

import config from 'src/config';
import useQueryConfig from 'src/hooks/useQueryConfig';
import { SearchSchema, searchSchema } from 'src/utils/rules';
import { SearchIcon } from '../Icons';

type FormData = SearchSchema;

const Search = () => {
    const navigate = useNavigate();

    const queryConfig = useQueryConfig();

    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            name_search: ''
        },
        resolver: yupResolver(searchSchema)
    });

    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: config.routes.home,
            search: createSearchParams({
                ...queryConfig,
                name: data.name_search
            }).toString()
        });
    });

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
