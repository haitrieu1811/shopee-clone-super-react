import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { produce } from 'immer';
import keyBy from 'lodash/keyBy';
import { Fragment, useContext, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import purchasesApi from 'src/apis/purchase.api';
import cartEmptyImage from 'src/assets/images/cart-empty.png';
import FreeShipImage from 'src/assets/images/free-ship.png';
import Button from 'src/components/Button';
import CartItem from 'src/components/CartItem/CartItem';
import { ChevronUpIcon } from 'src/components/Icons';
import Poppover from 'src/components/Poppover';
import config from 'src/config';
import { purchaseStatus } from 'src/constants/purchase';
import { AppContext } from 'src/contexts/app.context';
import { PurchaseStatusType } from 'src/types/purchase.type';
import { formatCurrency } from 'src/utils/utils';
import Checkbox from './Checkbox';

const Cart = () => {
  const location = useLocation();
  const { t } = useTranslation('pages');
  const { extendedCartList, setExtendedCartList } = useContext(AppContext);

  const getCartListQuery = useQuery({
    queryKey: ['cartList', { status: purchaseStatus.inCart }],
    queryFn: () => purchasesApi.getPurchaseList({ status: purchaseStatus.inCart as PurchaseStatusType }),
    staleTime: 3 * 60 * 1000
  });

  const cartList = getCartListQuery.data?.data.data;
  const cartListChecked = useMemo(() => extendedCartList.filter((cartItem) => cartItem.checked), [extendedCartList]);
  const isAllChecked = useMemo(() => extendedCartList.every((cartItem) => cartItem.checked), [extendedCartList]);
  const totalPrice = useMemo(
    () => cartListChecked.reduce((acc, cartItem) => acc + cartItem.price_before_discount * cartItem.buy_count, 0),
    [cartListChecked]
  );
  const priceSave = useMemo(
    () =>
      cartListChecked.reduce(
        (acc, cartItem) =>
          acc + (cartItem.price_before_discount * cartItem.buy_count - cartItem.price * cartItem.buy_count),
        0
      ),
    [cartListChecked]
  );
  const pricePaid = totalPrice - priceSave;

  useEffect(() => {
    if (cartList) {
      setExtendedCartList((prevState) => {
        const cartListExtendedObject = keyBy(prevState, '_id');
        return cartList?.map((cartItem) => {
          const isBuyNowItem = location.state && (location.state as { cartItemId: string }).cartItemId === cartItem._id;
          return {
            ...cartItem,
            disabled: false,
            checked: isBuyNowItem || Boolean(cartListExtendedObject[cartItem._id]?.checked)
          };
        });
      });
    }
  }, [cartList, location.state, setExtendedCartList]);

  useEffect(() => {
    return () => {
      history.replaceState(null, '');
    };
  }, []);

  const updateQuantityMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.updatePurchase(body),
    onSuccess: () => {
      getCartListQuery.refetch();
    }
  });

  const handleCheck = (cartItemIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedCartList(
      produce((draft) => {
        draft[cartItemIndex].checked = e.target.checked;
      })
    );
  };

  const handleCheckAll = () => {
    setExtendedCartList((prevState) =>
      prevState.map((cartItem) => ({
        ...cartItem,
        checked: !isAllChecked
      }))
    );
  };

  const handleChangeQuantity = (cartItemIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const cartItem = extendedCartList[cartItemIndex];
      setExtendedCartList(
        produce((draft) => {
          draft[cartItemIndex].disabled = true;
        })
      );
      updateQuantityMutation.mutate({ product_id: cartItem.product._id, buy_count: value });
    }
  };

  const handleTypeQuantity = (cartItemIndex: number) => (value: number) => {
    setExtendedCartList(
      produce((draft) => {
        draft[cartItemIndex].buy_count = value;
      })
    );
  };

  const deleteMutation = useMutation({
    mutationFn: purchasesApi.deletePurchase,
    onSuccess: (data) => {
      toast.success(data.data.message);
      getCartListQuery.refetch();
    }
  });

  const handleDelete = (purchasesId: string[]) => {
    deleteMutation.mutate(purchasesId);
  };

  const buyProductsMutation = useMutation({
    mutationFn: purchasesApi.buyPurchases,
    onSuccess: (data) => {
      toast.success(data.data.message);
      getCartListQuery.refetch();
    }
  });

  const handleBuyProducts = () => {
    if (cartListChecked.length > 0) {
      const body = cartListChecked.map((cartItem) => ({
        product_id: cartItem.product._id,
        buy_count: cartItem.buy_count
      }));
      buyProductsMutation.mutate(body);
    }
  };

  return (
    <div className='bg-[#f5f5f5] py-4'>
      <Helmet>
        <title>{t('cart.cart')}</title>
        <meta name='description' content='Đăng nhập để mua sắm tại Shopee Clone' />
      </Helmet>
      {cartList && cartList.length > 0 ? (
        <Fragment>
          <div className='container mb-[10px] flex items-center rounded-sm border border-[rgba(224,168,0,.4)] bg-white px-4 py-3 shadow-sm'>
            <img src={FreeShipImage} alt='Free Ship' className='w-6' />
            <span className='ml-2 text-sm text-gray-800'>{t('cart.voucher_head')}</span>
          </div>
          {/* Head */}
          <div className='container grid grid-cols-12 rounded-sm bg-white p-5 text-sm shadow-sm'>
            <div className='col-span-6'>
              <div className='grid grid-cols-12 gap-3'>
                <div className='col-span-1 flex items-center justify-center'>
                  <Checkbox checked={isAllChecked} onChange={handleCheckAll} />
                </div>
                <div className='col-span-11 capitalize text-[#000000cc]'>{t('cart.product')}</div>
              </div>
            </div>
            <div className='col-span-6'>
              <div className='grid grid-cols-12 gap-3 capitalize'>
                <div className='col-span-3 text-center text-[#888888]'>{t('cart.price')}</div>
                <div className='col-span-4 text-center text-[#888888]'>{t('cart.quantity')}</div>
                <div className='col-span-3 text-center text-[#888888]'>{t('cart.total')}</div>
                <div className='col-span-2 text-center text-[#888888]'>{t('cart.actions')}</div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className='relative'>
            {/* List */}
            <div className='mt-3'>
              {extendedCartList.map((cartItem, index) => (
                <CartItem
                  key={cartItem._id}
                  index={index}
                  cartList={cartList}
                  cartItem={cartItem}
                  handleCheck={handleCheck}
                  handleChangeQuantity={handleChangeQuantity}
                  handleTypeQuantity={handleTypeQuantity}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
            {/* Checkout */}
            <div className='container sticky bottom-0 mt-3 rounded-sm bg-white'>
              <div className='flex items-center justify-between py-3'>
                <div className='flex items-center'>
                  <Checkbox checked={isAllChecked} onChange={handleCheckAll} />
                  <button className='ml-6 capitalize' onClick={handleCheckAll}>
                    {t('cart.select_all')} ({cartList.length})
                  </button>
                  <button
                    className='ml-4'
                    onClick={() => handleDelete(cartListChecked.map((cartItem) => cartItem._id))}
                  >
                    {t('cart.delete')}
                  </button>
                </div>
                <div className='flex items-center'>
                  <Poppover
                    reference={
                      <div className='group flex flex-col items-end'>
                        <div className='flex items-center'>
                          <span className='mr-2'>
                            {t('cart.total_payment')} ({cartListChecked.length}{' '}
                            <span className='lowercase'>{t('cart.items')}</span>):
                          </span>
                          <span className='text-2xl text-orange'>
                            <span className='mr-1 text-xl'>₫</span>
                            {formatCurrency(pricePaid)}
                          </span>
                          {cartListChecked.length > 0 && (
                            <ChevronUpIcon className='ml-2 h-3 w-3 text-black/[0.54] duration-75 group-hover:rotate-180' />
                          )}
                        </div>
                        {cartListChecked.length > 0 && (
                          <div className='mt-[2px]'>
                            <span className='mr-6 text-sm'>{t('cart.save')}</span>
                            <span className='text-orange'>
                              <span className='mr-[2px] text-sm'>₫</span>
                              {formatCurrency(priceSave)}
                            </span>
                          </div>
                        )}
                      </div>
                    }
                    floating={
                      <div className='w-[610px] px-[30px]'>
                        <h2 className='border-b border-b-black/[0.09] py-[25px] text-xl font-medium capitalize'>
                          {t('cart.promotion_details')}
                        </h2>
                        <div className='flex items-center justify-between border-b border-b-black/[0.09] py-[15px] text-sm text-black/80'>
                          <span className='capitalize'>{t('cart.total_purcharses')}</span>
                          <span>đ{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className='flex items-center justify-between border-b border-b-black/[0.09] py-[15px] text-sm text-black/80'>
                          <span className='capitalize'>{t('cart.product_discounts')}</span>
                          <span>-đ{formatCurrency(priceSave)}</span>
                        </div>
                        <div className='py-[15px]'>
                          <div>
                            <div className='mb-2 flex items-center justify-between text-sm font-medium text-black/80'>
                              <span className='capitalize'>{t('cart.save')}</span>
                              <span className='text-orange'>-đ{formatCurrency(priceSave)}</span>
                            </div>
                            <div className='mb-2 flex items-center justify-between text-sm font-medium text-black/80'>
                              <span className='capitalize'>{t('cart.total_money')}</span>
                              <span>đ{formatCurrency(pricePaid)}</span>
                            </div>
                          </div>
                          <div className='pb-[11px] pt-[2px] text-right text-xs text-black/[0.54]'>
                            {t('cart.final_amount')}
                          </div>
                        </div>
                      </div>
                    }
                    placement='top-end'
                    classNameArrow='absolute translate-y-full border-[11px] border-x-transparent border-t-white border-b-transparent bottom-0'
                    floatingEnabled={cartListChecked.length > 0}
                  />
                  <Button
                    onClick={handleBuyProducts}
                    isLoading={buyProductsMutation.isLoading}
                    className={classNames(
                      'ml-[15px] rounded-sm bg-orange px-16 py-2 font-medium capitalize text-white',
                      {
                        'cursor-not-allowed': cartListChecked.length <= 0
                      }
                    )}
                  >
                    {t('cart.checkout')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className='container flex h-[336px] flex-col items-center justify-center'>
          <img src={cartEmptyImage} alt='Cart Empty' className='w-[108px] object-contain' />
          <p className='mt-[18px] text-sm font-bold text-black/40'> {t('cart.cart_empty')}</p>
          <Link
            to={config.routes.home}
            className='mt-[17px] rounded-sm bg-orange px-[42px] py-[8px] text-sm uppercase text-white hover:bg-orange/90'
          >
            {t('cart.buy_purcharses')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
