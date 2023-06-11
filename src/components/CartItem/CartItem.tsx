import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import event2Image from 'src/assets/images/event-small-2.png';
import eventImage from 'src/assets/images/event-small.png';
import Checkbox from 'src/pages/Cart/Checkbox';
import { ExtendedCartItem, PurchaseItemType } from 'src/types/purchase.type';
import { formatCurrency, generateNameId } from 'src/utils/utils';
import QuantityController from '../QuantityController/QuantityController';

const eventImages = [eventImage, event2Image];

interface CartItemProps {
  cartList?: PurchaseItemType[];
  cartItem: ExtendedCartItem;
  handleCheck: (cartItemIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
  handleChangeQuantity: (cartItemIndex: number, value: number, enabled: boolean) => void;
  handleTypeQuantity: (cartItemIndex: number) => (value: number) => void;
  handleDelete: (purchasesId: string[]) => void;
}

const CartItem = ({
  cartList,
  cartItem,
  handleCheck,
  index,
  handleChangeQuantity,
  handleTypeQuantity,
  handleDelete
}: CartItemProps) => {
  const { t } = useTranslation('pages');

  return (
    <div className='container grid grid-cols-12 rounded-sm border-b border-b-gray-200 bg-white p-5 text-sm shadow-sm last:border-b-0'>
      <div className='col-span-6'>
        <div className='grid h-full grid-cols-12 gap-3'>
          <div className='col-span-1 flex items-center justify-center'>
            <Checkbox checked={cartItem.checked} onChange={handleCheck(index)} />
          </div>
          <div className='col-span-11 text-[#000000cc]'>
            <div className='flex items-start'>
              <Link
                to={`/product/${generateNameId({
                  name: cartItem.product.name,
                  id: cartItem.product._id
                })}`}
                className='flex-shrink-0'
              >
                <img
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                  className='h-20 w-20 rounded-sm object-cover'
                />
              </Link>
              <div className='ml-3'>
                <Link
                  to={`/product/${generateNameId({
                    name: cartItem.product.name,
                    id: cartItem.product._id
                  })}`}
                >
                  <span className='line-clamp-2 text-sm text-[#000000dd]'>{cartItem.product.name}</span>
                </Link>
                <img src={eventImages[index % 2]} alt='6/6' className='mt-1 h-[18px]' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-6'>
        <div className='grid h-full grid-cols-12 gap-3'>
          <div className='col-span-3 flex items-center justify-center text-black/[87]'>
            <span className='mr-[1px] text-xs'>₫</span>
            {formatCurrency(cartItem.price)}
          </div>
          <div className='col-span-4 flex justify-center'>
            <QuantityController
              value={cartItem.buy_count}
              max={cartItem.product.quantity}
              onIncrease={(value) => handleChangeQuantity(index, value, value <= cartItem.product.quantity)}
              onDecrease={(value) => handleChangeQuantity(index, value, value >= 1)}
              onType={handleTypeQuantity(index)}
              onFocusOut={(value) =>
                handleChangeQuantity(
                  index,
                  value,
                  value <= cartItem.product.quantity &&
                    value >= 1 &&
                    value !== (cartList as PurchaseItemType[])[index].buy_count
                )
              }
              className={`${cartItem.disabled ? 'pointer-events-none opacity-50' : ''}`}
            />
          </div>
          <div className='col-span-3 flex items-center justify-center text-orange'>
            <span className='mr-[1px] text-xs'>₫</span>
            {formatCurrency(cartItem.price * cartItem.buy_count)}
          </div>
          <div className='col-span-2 flex items-center justify-center text-black/[87]'>
            <button onClick={() => handleDelete([cartItem._id])}>{t('cart.delete')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
