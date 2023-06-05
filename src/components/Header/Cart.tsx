import { useQuery } from '@tanstack/react-query';
import { Fragment, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import purchasesApi from 'src/apis/purchase.api';
import CartEmpty from 'src/assets/images/cart-empty.png';
import config from 'src/config';
import { purchaseStatus } from 'src/constants/purchase';
import { AppContext } from 'src/contexts/app.context';
import { PurchaseStatusType } from 'src/types/purchase.type';
import { formatCurrency, generateNameId } from 'src/utils/utils';
import { CartIcon } from '../Icons';
import Poppover from '../Poppover';

const MAX_PURCHASES = 5;

const Cart = () => {
    const { isAuthenticated } = useContext(AppContext);

    const getCartListQuery = useQuery({
        queryKey: ['cartList', { status: purchaseStatus.inCart }],
        queryFn: () => purchasesApi.getPurchaseList({ status: purchaseStatus.inCart as PurchaseStatusType }),
        staleTime: 3 * 60 * 1000,
        enabled: isAuthenticated
    });

    const cartList = useMemo(() => getCartListQuery.data?.data.data, [getCartListQuery.data?.data.data]);

    return (
        <Link to={config.routes.cart} className='relative mr-14'>
            <Poppover
                reference={
                    <Fragment>
                        <CartIcon className='h-[26px] w-[26px]' />
                        {isAuthenticated && (
                            <span className='absolute right-[-16px] top-[-8px] min-w-[1.6875rem] rounded-[2.75rem] border-[0.125rem] border-[#ee4d2d] bg-white text-center text-xs font-medium text-orange'>
                                {cartList && cartList.length}
                            </span>
                        )}
                    </Fragment>
                }
                floating={
                    <div className='w-[400px]'>
                        {isAuthenticated && cartList && cartList.length > 0 ? (
                            <Fragment>
                                <h2 className='p-3 text-[15px] capitalize text-gray-400'>Sản phẩm mới thêm</h2>
                                <div>
                                    {cartList.slice(0, MAX_PURCHASES).map((cartItem) => (
                                        <Link
                                            key={cartItem._id}
                                            to={`/${generateNameId({
                                                name: cartItem.product.name,
                                                id: cartItem.product._id
                                            })}`}
                                            className='flex items-start justify-between p-3 hover:bg-[#f8f8f8]'
                                        >
                                            <div className='h-[42px] w-[42px] flex-shrink-0 border border-gray-300'>
                                                <img
                                                    src={cartItem.product.image}
                                                    alt={cartItem.product.name}
                                                    className='h-full w-full rounded-full object-cover'
                                                />
                                            </div>
                                            <div className='flex-1 truncate px-4 text-[15px]'>
                                                {cartItem.product.name}
                                            </div>
                                            <div className='text-sm font-medium text-orange'>
                                                đ{formatCurrency(cartItem.product.price)}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className='flex items-center justify-between p-3'>
                                    <div className='text-sm capitalize text-gray-500'>
                                        {cartList.length > MAX_PURCHASES &&
                                            `${cartList.length - MAX_PURCHASES} sản phẩm khác`}
                                    </div>
                                    <Link
                                        to={config.routes.cart}
                                        className='rounded-sm bg-orange px-4 py-[6px] text-[15px] text-white hover:bg-[#f05d40]'
                                    >
                                        Xem giỏ hàng
                                    </Link>
                                </div>
                            </Fragment>
                        ) : (
                            <div className='flex h-[260px] flex-col items-center justify-center'>
                                <img src={CartEmpty} alt='' className='h-[100px] w-[100px] object-cover' />
                                <p className='mt-4 text-[15px] capitalize text-gray-500'>Chưa có sản phẩm</p>
                            </div>
                        )}
                    </div>
                }
            />
        </Link>
    );
};

export default Cart;
