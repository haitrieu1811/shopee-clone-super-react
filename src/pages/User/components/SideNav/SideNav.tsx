import classNames from 'classnames';
import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import PurcharseImage from 'src/assets/images/purcharse.png';
import UserImage from 'src/assets/images/user.png';
import { PencilIcon } from 'src/components/Icons';
import config from 'src/config';
import { AppContext } from 'src/contexts/app.context';
import { getAvatarUrl } from 'src/utils/utils';

const SideNav = () => {
  const { profile } = useContext(AppContext);

  return (
    <Fragment>
      <div className='flex items-center py-[15px]'>
        <NavLink to={config.routes.profile} className='flex-shrink-0'>
          <img src={getAvatarUrl(profile?.avatar)} alt='Avatar' className='h-12 w-12 rounded-full object-cover' />
        </NavLink>
        <div className='flex-1 pl-[15px]'>
          <h3 className='text-sm font-medium'>{profile?.email}</h3>
          <div className='mt-[2px] flex items-center'>
            <PencilIcon className='mr-1 h-3 w-3 fill-[#888]' />
            <NavLink to={config.routes.profile} className='text-sm capitalize text-gray-500'>
              Sửa hồ sơ
            </NavLink>
          </div>
        </div>
      </div>
      <div className='mt-[27px]'>
        <NavLink to={config.routes.profile} className='mb-[15px] flex  items-center hover:text-orange'>
          <img src={UserImage} alt='Tài khoản của tôi' className='mr-[10px] h-5 w-5 flex-shrink-0 object-cover' />
          <h3 className='text-sm font-medium capitalize'>Tài khoản của tôi</h3>
        </NavLink>
        <div className='pb-[3px] pl-[32px]'>
          <NavLink
            to={config.routes.profile}
            className={({ isActive }) =>
              classNames('mb-[15px] block text-sm capitalize', {
                'text-orange': isActive,
                'text-gray-500 hover:text-orange': !isActive
              })
            }
          >
            Hồ sơ
          </NavLink>
          <NavLink
            to={config.routes.changePassword}
            className={({ isActive }) =>
              classNames('mb-[15px] block text-sm capitalize', {
                'text-orange': isActive,
                'text-gray-500 hover:text-orange': !isActive
              })
            }
          >
            Đổi mật khẩu
          </NavLink>
        </div>
        <NavLink
          to={config.routes.historyPurchase}
          className={({ isActive }) =>
            classNames('mb-[15px] flex items-center', {
              'text-orange': isActive,
              'hover:text-orange': !isActive
            })
          }
        >
          <img src={PurcharseImage} alt='' className='mr-[10px] h-5 w-5 flex-shrink-0 object-cover' />
          <h3 className='text-sm font-medium capitalize'>Đơn mua</h3>
        </NavLink>
      </div>
    </Fragment>
  );
};

export default SideNav;
