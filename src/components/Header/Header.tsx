import { useMutation } from '@tanstack/react-query';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import authApi from 'src/apis/auth.api';
import Avatar from 'src/assets/images/avatar.png';
import CartEmpty from 'src/assets/images/cart-empty.png';
import config from 'src/config';
import { AppContext } from 'src/contexts/app.context';
import { CartIcon, ChevronDownIcon, GlobalIcon, SearchIcon } from '../Icons';
import Logo from '../Logo';
import Poppover from '../Poppover';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext);

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

    return (
        <header className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
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
                                        <img src={Avatar} alt='Avatar' className='h-5 w-5 flex-shrink-0 rounded-full' />
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
            <nav className='container flex items-center justify-between pb-[10px] pt-4'>
                <Link to={config.routes.home}>
                    <Logo className='block w-[162px] fill-white' />
                </Link>
                <div className='mx-20 flex-1'>
                    <div className='relative'>
                        <form>
                            <input
                                type='text'
                                className='w-full rounded-sm border-none p-3 pr-[70px] text-sm text-black outline-none placeholder:text-gray-400'
                                placeholder='Tìm kiếm sản phẩm'
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

                <Link to={config.routes.cart} className='relative mr-14'>
                    <Poppover
                        reference={
                            <Fragment>
                                <CartIcon className='h-[26px] w-[26px]' />
                                <span className='absolute right-[-16px] top-[-8px] min-w-[1.6875rem] rounded-[2.75rem] border-[0.125rem] border-[#ee4d2d] bg-white text-center text-xs font-medium text-orange'>
                                    28
                                </span>
                            </Fragment>
                        }
                        floating={
                            <div className='w-[400px]'>
                                {isAuthenticated ? (
                                    <Fragment>
                                        <h2 className='p-3 text-[15px] capitalize text-gray-400'>Sản phẩm mới thêm</h2>
                                        <div>
                                            {Array(5)
                                                .fill(0)
                                                .map((_, index) => (
                                                    <Link
                                                        key={index}
                                                        to={''}
                                                        className='flex items-start justify-between p-3 hover:bg-[#f8f8f8]'
                                                    >
                                                        <div className='h-[42px] w-[42px] flex-shrink-0 border border-gray-300'>
                                                            <img
                                                                src={Avatar}
                                                                alt=''
                                                                className='h-full w-full rounded-full object-cover'
                                                            />
                                                        </div>
                                                        <div className='flex-1 truncate px-4 text-[15px]'>
                                                            Motion components are DOM primitives optimised for 60fps
                                                            animation and gestures.
                                                        </div>
                                                        <div className='text-sm font-medium text-orange'>đ395.000</div>
                                                    </Link>
                                                ))}
                                        </div>
                                        <div className='flex items-center justify-between p-3'>
                                            <div className='text-sm capitalize text-gray-500'>4 thêm hàng vào giỏ</div>
                                            <Link
                                                to={config.routes.cart}
                                                className='rounded-sm bg-orange px-4 py-[6px] text-[15px] text-white hover:bg-[#f05d40]'
                                            >
                                                Xem giỏ hàng
                                            </Link>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div className='flex h-[260px] flex-col items-center justify-center'>
                                        <img src={CartEmpty} alt='' className='h-[100px] w-[100px] object-cover' />
                                        <p className='mt-4 text-[15px] capitalize text-gray-500'>Chưa có sản phẩm</p>
                                    </div>
                                )}
                            </div>
                        }
                    ></Poppover>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
