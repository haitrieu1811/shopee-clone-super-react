import { Link } from 'react-router-dom';

import AvatarImage from 'src/assets/images/avatar.png';
import CoinImage from 'src/assets/images/coin.png';
import NotificationImage from 'src/assets/images/notification.png';
import PurcharseImage from 'src/assets/images/purcharse.png';
import UserImage from 'src/assets/images/user.png';
import VoucherImage from 'src/assets/images/voucher.png';
import Button from 'src/components/Button';
import { PencilIcon } from 'src/components/Icons';
import Input from 'src/components/Input';

const Profile = () => {
    return (
        <div className='bg-[#f5f5f5]'>
            <div className='container pb-[50px] pt-5'>
                <div className='grid grid-cols-12 gap-7'>
                    {/* Aside */}
                    <div className='col-span-12 lg:col-span-2'>
                        <div className='flex items-center py-[15px]'>
                            <img
                                src={AvatarImage}
                                alt='Avatar'
                                className='h-12 w-12 flex-shrink-0 rounded-full object-cover'
                            />
                            <div className='flex-1 pl-[15px]'>
                                <h3 className='truncate text-sm font-medium'>haitrieu1811</h3>
                                <div className='mt-[2px] flex items-center'>
                                    <PencilIcon className='mr-1 h-3 w-3 fill-[#888]' />
                                    <span className='text-sm capitalize text-gray-500'>Sửa hồ sơ</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-[27px]'>
                            <Link to={''} className='mb-[15px] flex  items-center hover:text-orange'>
                                <img src={UserImage} alt='' className='mr-[10px] h-5 w-5 flex-shrink-0 object-cover' />
                                <h3 className='text-sm font-medium capitalize'>Tài khoản của tôi</h3>
                            </Link>
                            <div className='pb-[3px] pl-[32px]'>
                                <Link
                                    to={''}
                                    className='mb-[15px] block text-sm capitalize text-gray-500 hover:text-orange'
                                >
                                    Hồ sơ
                                </Link>
                                <Link
                                    to={''}
                                    className='mb-[15px] block text-sm capitalize text-gray-500 hover:text-orange'
                                >
                                    Ngân hàng
                                </Link>
                                <Link
                                    to={''}
                                    className='mb-[15px] block text-sm capitalize text-gray-500 hover:text-orange'
                                >
                                    Địa chỉ
                                </Link>
                                <Link
                                    to={''}
                                    className='mb-[15px] block text-sm capitalize text-gray-500 hover:text-orange'
                                >
                                    Đổi mật khẩu
                                </Link>
                            </div>
                            <Link to={''} className='mb-[15px] flex  items-center hover:text-orange'>
                                <img
                                    src={PurcharseImage}
                                    alt=''
                                    className='mr-[10px] h-5 w-5 flex-shrink-0 object-cover'
                                />
                                <h3 className='text-sm font-medium capitalize'>Đơn mua</h3>
                            </Link>
                            <Link to={''} className='mb-[15px] flex  items-center hover:text-orange'>
                                <img
                                    src={NotificationImage}
                                    alt=''
                                    className='mr-[10px] h-5 w-5 flex-shrink-0 object-cover'
                                />
                                <h3 className='text-sm font-medium capitalize'>Thông báo</h3>
                            </Link>
                            <Link to={''} className='mb-[15px] flex  items-center hover:text-orange'>
                                <img
                                    src={VoucherImage}
                                    alt=''
                                    className='mr-[10px] h-5 w-5 flex-shrink-0 object-cover'
                                />
                                <h3 className='text-sm font-medium capitalize'>Kho voucher</h3>
                            </Link>
                            <Link to={''} className='mb-[15px] flex  items-center hover:text-orange'>
                                <img src={CoinImage} alt='' className='mr-[10px] h-5 w-5 flex-shrink-0 object-cover' />
                                <h3 className='text-sm font-medium capitalize'>Shopee xu</h3>
                            </Link>
                        </div>
                    </div>
                    {/* Form */}
                    <div className='col-span-12 rounded-sm bg-white px-[30px] pb-[10px] shadow lg:col-span-10 lg:ml-[27px]'>
                        <div className='border-b-[1px] border-b-gray-200 py-[18px]'>
                            <h1 className='text-lg font-medium capitalize'>Hồ sơ của tôi</h1>
                            <p className='text-sm text-gray-500'>Quản lý thông tin hồ sơ để bảo mật tải khoản</p>
                        </div>
                        <div className='grid grid-cols-12 gap-6 pt-[30px]'>
                            <div className='col-span-8 border-r-[1px] border-r-gray-200 pr-[50px]'>
                                <form>
                                    <div className='flex items-center pb-[30px]'>
                                        <div className='w-[160px] pr-5 text-right text-sm text-gray-500'>
                                            Tên đăng nhập
                                        </div>
                                        <div className='flex-1 text-sm'>haitrieu1811</div>
                                    </div>
                                    <div className='flex items-center pb-[30px]'>
                                        <div className='w-[160px] pr-5 text-right text-sm text-gray-500'>Tên</div>
                                        <div className='flex-1 text-sm'>
                                            <Input type='text' name='full_name' placeholder='Họ tên' />
                                        </div>
                                    </div>
                                    <div className='flex items-center pb-[30px]'>
                                        <div className='w-[160px] pr-5 text-right text-sm text-gray-500'>Email</div>
                                        <Link to={''} className='flex-1 text-sm text-[#05a] underline'>
                                            Thêm
                                        </Link>
                                    </div>
                                    <div className='flex items-center pb-[30px]'>
                                        <div className='w-[160px] pr-5 text-right text-sm text-gray-500'>
                                            Số điện thoại
                                        </div>
                                        <div className='flex items-center'>
                                            <span className='mr-2 text-sm'>*********04</span>
                                            <Link to={''} className='flex-1 text-sm text-[#05a] underline'>
                                                Thay Đổi
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='flex items-center pb-[30px]'>
                                        <div className='w-[160px] pr-5 text-right text-sm text-gray-500'>Giới tính</div>
                                        <div className='mr-4'>
                                            <label className='flex items-center'>
                                                <div className='mr-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-orange'>
                                                    <span className='h-[6px] w-[6px] rounded-full bg-orange'></span>
                                                    <input type='checkbox' name='gender' className='appearance-none' />
                                                </div>
                                                <span className='cursor-pointer select-none text-sm text-gray-500 peer-checked/draft:text-sky-500'>
                                                    Nam
                                                </span>
                                            </label>
                                        </div>
                                        <div className='mr-4'>
                                            <label className='flex items-center'>
                                                <div className='mr-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-gray-400'>
                                                    <span className='hidden h-[6px] w-[6px] rounded-full bg-orange'></span>
                                                    <input type='checkbox' name='gender' className='appearance-none' />
                                                </div>
                                                <span className='cursor-pointer select-none text-sm text-gray-500 peer-checked/draft:text-sky-500'>
                                                    Nữ
                                                </span>
                                            </label>
                                        </div>
                                        <div className='mr-4'>
                                            <label className='flex items-center'>
                                                <div className='mr-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-gray-400'>
                                                    <span className='hidden h-[6px] w-[6px] rounded-full bg-orange'></span>
                                                    <input type='checkbox' name='gender' className='appearance-none' />
                                                </div>
                                                <span className='cursor-pointer select-none text-sm text-gray-500 peer-checked/draft:text-sky-500'>
                                                    Khác
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex items-center pb-[30px]'>
                                        <div className='w-[160px] pr-5 text-right text-sm text-gray-500'>Ngày sinh</div>
                                        <div className='grid flex-1 grid-cols-12 gap-2'>
                                            <select
                                                name=''
                                                id=''
                                                className='col-span-4 cursor-pointer rounded-sm border border-gray-300 p-2 text-sm text-gray-500 outline-none focus:border-orange'
                                            >
                                                <option value=''>18</option>
                                            </select>
                                            <select
                                                name=''
                                                id=''
                                                className='col-span-4 cursor-pointer rounded-sm border border-gray-300 p-2 text-sm text-gray-500 outline-none focus:border-orange'
                                            >
                                                <option value=''>11</option>
                                            </select>
                                            <select
                                                name=''
                                                id=''
                                                className='col-span-4 cursor-pointer rounded-sm border border-gray-300 p-2 text-sm text-gray-500 outline-none focus:border-orange'
                                            >
                                                <option value=''>2000</option>
                                            </select>
                                        </div>
                                    </div>
                                    <Button className='mb-[30px] ml-[160px] h-10 w-[70px] rounded-sm bg-orange text-sm text-white hover:bg-[#f05d40]'>
                                        Lưu
                                    </Button>
                                </form>
                            </div>
                            <div className='col-span-4 flex flex-col items-center'>
                                <img
                                    src={AvatarImage}
                                    alt=''
                                    className='my-5 h-[100px] w-[100px] rounded-full object-cover'
                                />
                                <label>
                                    <input type='file' name='' hidden />
                                    <div className='cursor-pointer rounded-sm border border-gray-300 px-5 py-2 text-sm text-gray-500 hover:bg-[#00000005]'>
                                        Chọn Ảnh
                                    </div>
                                </label>
                                <div className='mt-[13px] text-sm leading-relaxed text-gray-500'>
                                    <p>Dung lượng file tối đa 1 MB</p>
                                    <p>Định dạng:.JPEG, .PNG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
