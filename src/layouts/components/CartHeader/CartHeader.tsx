import { Link } from 'react-router-dom';

import { SearchIcon } from 'src/components/Icons';
import Logo from 'src/components/Logo';
import NavHeader from 'src/components/NavHeader/NavHeader';
import config from 'src/config';
import useSearchProducts from 'src/hooks/useSearchProducts';

const CartHeader = () => {
  const { onSubmit, register } = useSearchProducts();

  return (
    <header>
      <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='border-b border-solid border-b-[rgba(0,0,0,.09)] bg-white py-5 lg:h-[100px] lg:py-0'>
        <nav className='container flex h-full flex-wrap items-center justify-between'>
          <Link to={config.routes.home} className='flex w-full items-end justify-center lg:w-auto'>
            <Logo className='w-[128px] fill-orange' />
            <div className='mx-[15px] h-[30px] w-[0.5px] bg-orange'></div>
            <div className='text-xl capitalize text-orange'>Giỏ hàng</div>
          </Link>
          <form className='mt-5 flex h-[40px] w-full lg:mt-0 lg:w-auto' onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Tìm trong Shopee'
              className='w-full rounded-bl-sm rounded-tl-sm border-2 border-orange px-[10px] text-sm outline-none lg:w-[538px]'
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
