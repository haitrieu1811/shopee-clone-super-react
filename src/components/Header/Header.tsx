import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import config from 'src/config';
import Logo from '../Logo';
import NavHeader from '../NavHeader/NavHeader';
import Cart from './Cart';
import Search from './Search';

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <header className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <div className='container'>
        <NavHeader />
      </div>
      <nav className='container flex flex-wrap items-center justify-between py-4'>
        <Link to={config.routes.home} className='flex w-full justify-center md:block md:w-auto'>
          <Logo className='block w-[162px] fill-white' />
        </Link>
        <Search />
        {!isMobile ? (
          <Cart />
        ) : (
          <button className='fixed bottom-[30px] right-4 z-[999] rounded-full bg-orange p-3'>
            <Cart />
          </button>
        )}
      </nav>
    </header>
  );
};

export default memo(Header);
