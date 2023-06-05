import { useQuery } from '@tanstack/react-query';
import { useId, useMemo } from 'react';

import purchasesApi from 'src/apis/purchase.api';
import CoinImage from 'src/assets/images/coin.png';
import FreeShipImage from 'src/assets/images/free-ship.png';
import VoucherImage from 'src/assets/images/voucher.png';
import Button from 'src/components/Button';
import CartItem from 'src/components/CartItem/CartItem';
import { QuestionIcon } from 'src/components/Icons';
import { purchaseStatus } from 'src/constants/purchase';
import { PurchaseStatusType } from 'src/types/purchase.type';
import { cartUtils } from 'src/utils/utils';
import Checkbox from './Checkbox';

const Cart = () => {
    const id = useId();

    const getCartListQuery = useQuery({
        queryKey: ['cartList', { status: purchaseStatus.inCart }],
        queryFn: () => purchasesApi.getPurchaseList({ status: purchaseStatus.inCart as PurchaseStatusType }),
        staleTime: 3 * 60 * 1000
    });

    const cartList = useMemo(() => getCartListQuery.data?.data.data, [getCartListQuery.data?.data.data]);

    if (!cartList) return null;

    return (
        <div className='bg-[#f5f5f5] py-4'>
            <div className='container mb-[10px] flex items-center rounded-sm border border-[rgba(224,168,0,.4)] bg-white px-4 py-3 shadow-sm'>
                <img src={FreeShipImage} alt='Free Ship' className='w-6' />
                <span className='ml-2 text-sm text-gray-800'>
                    Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
                </span>
            </div>
            <div className='container flex h-[55px] items-center justify-between rounded-sm bg-white px-5 text-sm shadow-sm'>
                <div className='p-5'>
                    <Checkbox />
                </div>
                <div className='flex-1 capitalize text-[#000000cc]'>Sản phẩm</div>
                <div className='w-[15%] text-center text-[#888888]'>Đơn giá</div>
                <div className='w-[15%] text-center text-[#888888]'>Số lượng</div>
                <div className='w-[15%] text-center text-[#888888]'>Số tiền</div>
                <div className='w-[10%] text-center text-[#888888]'>Thao tác</div>
            </div>
            <div className='relative'>
                <div className='mt-3'>
                    {cartList.map((cartItem) => (
                        <CartItem key={cartItem._id} cartItem={cartItem} />
                    ))}
                </div>
                <div className='container sticky bottom-0 left-0 mt-3 w-full rounded-sm bg-white'>
                    <div className='grid grid-cols-12 border-b border-dotted border-b-gray-300 py-3'>
                        <div className='col-span-3 col-start-7 flex items-center'>
                            <img src={VoucherImage} alt='Shopee voucher' className='h-5 w-5' />
                            <span className='ml-[5px] font-medium text-black/80'>Shopee voucher</span>
                        </div>
                        <div className='col-span-2 col-start-11 text-right text-sm capitalize text-[#0055aa]'>
                            Chọn hoặc nhập mã
                        </div>
                    </div>
                    <div className='grid grid-cols-12 border-b border-dotted border-b-gray-300 py-3'>
                        <div className='col-span-6 mr-2 flex items-center justify-end'>
                            <Checkbox />
                        </div>
                        <div className='col-span-3 col-start-7 flex items-center'>
                            <img src={CoinImage} alt='CoinImage' className='h-5 w-5' />
                            <span className='ml-2 text-sm font-medium capitalize'>Shopee xu</span>
                            <span className='ml-[17px] text-sm font-medium text-[#929292]'>Dùng 100 Shopee Xu</span>
                            <span className='ml-2 flex h-3 w-3 items-center justify-center rounded-full border border-slate-600'>
                                <QuestionIcon className='h-3 w-6' />
                            </span>
                        </div>
                        <div className='col-span-2 col-start-11 text-right font-medium text-[#d0d0d0]'>-₫100</div>
                    </div>
                    <div className='flex items-center justify-between py-3'>
                        <div className='flex items-center'>
                            <Checkbox id={id} />
                            <label htmlFor={id} className='ml-6 capitalize'>
                                Chọn tất cả ({cartUtils.getQuantityInCart(cartList)})
                            </label>
                            <span className='ml-4'>Xóa</span>
                            <span className='ml-6 capitalize text-orange'>Lưu vào mục đã thích</span>
                        </div>
                        <div className='flex items-center'>
                            <div>
                                Tổng thanh toán (3 sản phẩm): <span className='text-2xl text-orange'>đ959.000</span>
                            </div>
                            <Button className='ml-[15px] rounded-sm bg-orange px-16 py-2 font-medium capitalize text-white'>
                                Mua hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
