import { Outlet } from 'react-router-dom';

import SideNav from './components/SideNav';

const User = () => {
  return (
    <div className='bg-[#f5f5f5]'>
      <div className='container pb-[50px] pt-5'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-2'>
            <SideNav />
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
