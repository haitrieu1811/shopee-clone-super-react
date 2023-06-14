import { Fragment, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router-dom';

import Drawer from 'src/components/Drawer';
import SideNav from './components/SideNav';

const User = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

  return (
    <div className='bg-[#f5f5f5]'>
      <div className='container pb-[50px] pt-3 md:pt-5'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-2'>
            {!isMobile ? (
              <SideNav />
            ) : (
              <Fragment>
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className='flex w-full items-center justify-center rounded-sm border border-gray-200 bg-white py-2 font-bold capitalize'
                >
                  Menu
                </button>
                <Drawer
                  visible={showMobileFilter}
                  onClickMask={() => {
                    setShowMobileFilter(false);
                  }}
                >
                  <SideNav />
                </Drawer>
              </Fragment>
            )}
          </div>
          <div className='col-span-12 md:ml-10 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
