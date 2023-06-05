import { Link } from 'react-router-dom';

import { PurchaseItemType } from 'src/types/purchase.type';
import { formatCurrency, generateNameId } from 'src/utils/utils';
import QuantityController from '../QuantityController/QuantityController';
import Checkbox from 'src/pages/Cart/Checkbox';

interface CartItemProps {
    cartItem: PurchaseItemType;
}

const CartItem = ({ cartItem }: CartItemProps) => {
    return (
        <div className='container flex items-center justify-between rounded-sm border-b border-b-gray-200 bg-white p-5 text-sm shadow-sm last:border-b-0'>
            <div className='p-5'>
                <Checkbox />
            </div>
            <div className='flex-1 text-[#000000cc]'>
                <Link
                    to={`/${generateNameId({
                        name: cartItem.product.name,
                        id: cartItem.product._id
                    })}`}
                    className='flex items-start'
                >
                    <img src={cartItem.product.image} alt={cartItem.product.name} className='h-20 w-20 object-cover' />
                    <span className='ml-3 line-clamp-2 text-sm text-[#000000dd]'>{cartItem.product.name}</span>
                </Link>
            </div>
            <div className='w-[15%] text-center text-black/[87]'>₫{formatCurrency(cartItem.price)}</div>
            <div className='flex w-[15%] items-center justify-center'>
                <QuantityController value={cartItem.buy_count} />
            </div>
            <div className='w-[15%] text-center text-orange'>
                ₫{formatCurrency(cartItem.price * cartItem.buy_count)}
            </div>
            <div className='w-[10%] text-center text-black/[87]'>
                <button>Xóa</button>
            </div>
        </div>
    );
};

export default CartItem;
