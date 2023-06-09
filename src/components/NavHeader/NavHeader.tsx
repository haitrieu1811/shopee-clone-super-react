import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment, memo, useContext } from 'react';
import { Link } from 'react-router-dom';

import authApi from 'src/apis/auth.api';
import config from 'src/config';
import { purchaseStatus } from 'src/constants/purchase';
import { AppContext } from 'src/contexts/app.context';
import { getAvatarUrl } from 'src/utils/utils';
import { ChevronDownIcon, GlobalIcon } from '../Icons';
import Poppover from '../Poppover';

const NavHeader = () => {
  const queryClient = useQueryClient();

  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext);

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
      setProfile(null);
      queryClient.removeQueries({ queryKey: ['cartList', { status: purchaseStatus.inCart }] });
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className='py-2'>
      <div className='flex flex-col-reverse flex-wrap items-center justify-center md:flex-row md:justify-between'>
        <div className='mt-1 flex flex-wrap items-center justify-center md:mt-0'>
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
                <Link
                  to={config.routes.historyPurchase}
                  className='mt-1 flex items-center text-white hover:text-[#ffffffb3] md:mt-0'
                >
                  <img
                    src={getAvatarUrl(profile?.avatar)}
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
                    to={config.routes.historyPurchase}
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
              <Link to={config.routes.login} className='text-[13px] font-medium text-gray-100 hover:text-[#ffffffb3]'>
                Đăng nhập
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(NavHeader);
