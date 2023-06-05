import { useMutation } from '@tanstack/react-query';
import { Fragment, useContext } from 'react';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import authApi from 'src/apis/auth.api';
import Avatar from 'src/assets/images/avatar.png';
import { ChevronDownIcon, GlobalIcon, SearchIcon } from 'src/components/Icons';
import Logo from 'src/components/Logo';
import Poppover from 'src/components/Poppover';
import config from 'src/config';
import { AppContext } from 'src/contexts/app.context';
import useQueryConfig, { QueryConfigType } from 'src/hooks/useQueryConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { SearchSchema, searchSchema } from 'src/utils/rules';

type FormData = SearchSchema;

const CartHeader = () => {
    const navigate = useNavigate();

    const { handleSubmit, register } = useForm<FormData>({
        resolver: yupResolver(searchSchema)
    });

    const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext);

    const queryConfig: QueryConfigType = useQueryConfig();

    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            setIsAuthenticated(false);
            setProfile(null);
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const onSubmitSearch = handleSubmit((data) => {
        navigate({
            pathname: config.routes.home,
            search: createSearchParams({
                ...queryConfig,
                name: data.name_search
            }).toString()
        });
    });

    return (
        <header>
            <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
                <nav className='container py-2'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <Link to='/' className='text-[13px] font-light text-gray-100 hover:text-[#ffffffb3]'>
                                Kênh người bán
                            </Link>
                            <div className='mx-2 h-3 w-[1px] bg-gray-100'></div>
                            <Link to='/' className='text-[13px] font-light text-gray-100 hover:text-[#ffffffb3]'>
                                Trở thành người bán Shopee
                            </Link>
                            <div className='mx-2 h-3 w-[1px] bg-gray-100'></div>
                            <Link to='/' className='text-[13px] font-light text-gray-100 hover:text-[#ffffffb3]'>
                                Tải ứng dụng
                            </Link>
                            <div className='mx-2 h-3 w-[1px] bg-gray-100'></div>
                            <Link to='/' className='text-[13px] font-light text-gray-100 hover:text-[#ffffffb3]'>
                                Kết nối
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            <Poppover
                                className='mr-6 flex items-center text-white hover:cursor-pointer hover:text-[#ffffffb3]'
                                reference={
                                    <Fragment>
                                        <GlobalIcon className='h-[15px] w-[15px]' />
                                        <span className='mx-1 text-[13px]'>Tiếng Việt</span>
                                        <ChevronDownIcon className='h-[12px] w-[12px]' />
                                    </Fragment>
                                }
                                floating={
                                    <Fragment>
                                        <div className='min-w-[160px] px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:text-orange'>
                                            Tiếng Việt
                                        </div>
                                        <div className='min-w-[160px] px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:text-orange'>
                                            Tiếng Anh
                                        </div>
                                    </Fragment>
                                }
                            />

                            {isAuthenticated ? (
                                <Poppover
                                    reference={
                                        <Link to='' className='flex items-center text-white hover:text-[#ffffffb3]'>
                                            <img
                                                src={Avatar}
                                                alt='Avatar'
                                                className='h-5 w-5 flex-shrink-0 rounded-full'
                                            />
                                            <span className='mb-[3px] ml-[6px] text-sm'>{profile?.email}</span>
                                        </Link>
                                    }
                                    floating={
                                        <Fragment>
                                            <Link
                                                to={config.routes.profile}
                                                className='block min-w-[160px] px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-[#fafafa] hover:text-[#00bfa5]'
                                            >
                                                Tài khoản của tôi
                                            </Link>
                                            <Link
                                                to={''}
                                                className='block min-w-[160px] px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-[#fafafa] hover:text-[#00bfa5]'
                                            >
                                                Đơn mua
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className='block min-w-[160px] px-4 py-2 text-left text-sm font-medium text-gray-700 hover:cursor-pointer hover:bg-[#fafafa] hover:text-[#00bfa5]'
                                            >
                                                Đăng xuất
                                            </button>
                                        </Fragment>
                                    }
                                />
                            ) : (
                                <Fragment>
                                    <Link
                                        to={config.routes.register}
                                        className='text-[13px] font-medium text-gray-100 hover:text-[#ffffffb3]'
                                    >
                                        Đăng ký
                                    </Link>
                                    <div className='mx-2 h-3 w-[1px] bg-gray-100'></div>
                                    <Link
                                        to={config.routes.login}
                                        className='text-[13px] font-medium text-gray-100 hover:text-[#ffffffb3]'
                                    >
                                        Đăng nhập
                                    </Link>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            <div className='h-[100px] border-b border-solid border-b-[rgba(0,0,0,.09)] bg-white'>
                <nav className='container flex h-full items-center justify-between'>
                    <Link to={config.routes.home} className='flex items-end'>
                        <Logo className='w-[128px] fill-orange' />
                        <div className='mx-[15px] h-[30px] w-[0.5px] bg-orange'></div>
                        <div className='text-xl capitalize text-orange'>Giỏ hàng</div>
                    </Link>
                    <form className='flex h-[40px]' onSubmit={onSubmitSearch}>
                        <input
                            type='text'
                            placeholder='Tìm trong Shopee'
                            className='w-[538px] rounded-bl-sm rounded-tl-sm border-2 border-orange px-[10px] text-sm outline-none'
                            {...register('name_search')}
                        />
                        <button className='flex w-[80px] items-center justify-center rounded-br-sm rounded-tr-sm bg-orange'>
                            <SearchIcon className='h-[14px] w-[14px] fill-white' />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    );
};

export default CartHeader;
