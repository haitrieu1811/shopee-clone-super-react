import FreeShipImage from 'src/assets/images/free-ship.png';

const Cart = () => {
    return (
        <div className='bg-[#f5f5f5] py-4'>
            <div className='container mb-[10px] flex items-center rounded-sm border border-[rgba(224,168,0,.4)] bg-white px-4 py-3 shadow-sm'>
                <img src={FreeShipImage} alt='Free Ship' className='w-6' />
                <span className='ml-2 text-sm text-gray-800'>
                    Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
                </span>
            </div>
            <div className='container min-h-screen rounded-sm bg-white shadow-sm'>
                <h1>Cart Page</h1>
            </div>
        </div>
    );
};

export default Cart;
