import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import productApi from 'src/apis/product.api';
import Button from 'src/components/Button';
import { AddCartIcon, MinusIcon, PlusIcon } from 'src/components/Icons';
import ProductRating from 'src/components/ProductRating';
import Spinner from 'src/components/Spinner/Spinner';
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils';
import FreeShipImage from 'src/assets/images/free-ship.png';

const ProductDetail = () => {
    const { productId } = useParams();

    const [imageShow, setImageShow] = useState<string>('');

    const getProductItemQuery = useQuery({
        queryKey: ['productItem', productId],
        queryFn: () => productApi.getProductItem(productId as string),
        enabled: Boolean(productId)
    });

    const imageActive = useMemo(() => getProductItemQuery.data?.data.data.image, [getProductItemQuery]);
    const imageList = useMemo(() => getProductItemQuery.data?.data.data.images, [getProductItemQuery]);
    const productData = useMemo(() => getProductItemQuery.data?.data.data, [getProductItemQuery]);

    const handleChangeImage = (image: string) => {
        setImageShow(image);
    };

    return (
        <div className='bg-[#f5f5f5]'>
            {productData ? (
                <div className='container py-5'>
                    <div className='grid grid-cols-12 gap-6 rounded-sm bg-white shadow-sm'>
                        <div className='col-span-5 p-[15px]'>
                            <div className='relative w-full pt-[100%]'>
                                <img
                                    src={imageShow || imageActive}
                                    alt={imageShow}
                                    className='absolute inset-0 w-full object-contain'
                                />
                            </div>
                            <div className='mt-[10px] grid grid-cols-10 flex-nowrap gap-[10px]'>
                                {imageList?.map((image, index) => {
                                    const isActive = image === imageShow;
                                    return (
                                        <div
                                            key={index}
                                            className={classNames(
                                                'relative col-span-2 cursor-pointer rounded-sm border-2 pt-[100%] hover:border-orange',
                                                {
                                                    'border-orange': isActive,
                                                    'border-transparent': !isActive
                                                }
                                            )}
                                            onMouseEnter={() => handleChangeImage(image)}
                                        >
                                            <img
                                                src={image}
                                                alt={image}
                                                className='absolute inset-0 h-full w-full rounded-sm object-cover'
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='col-span-7 pr-[35px] pt-5'>
                            <div className='flex items-center'>
                                <span className='mr-4 flex-shrink-0 rounded-sm bg-orange px-1 py-[2px] text-xs font-medium capitalize text-white'>
                                    Yêu thích
                                </span>
                                <h1 className='line-clamp-2 text-xl font-medium' title={productData.name}>
                                    {productData.name}
                                </h1>
                            </div>
                            <div className='mt-[10px] flex items-center'>
                                <div
                                    className='flex items-center border-r-[1px] border-r-slate-400 pr-[15px]'
                                    title={String(productData.rating)}
                                >
                                    <div className='mr-[5px] border-b-[1px] border-b-orange text-orange'>
                                        {productData.rating.toFixed(1)}
                                    </div>
                                    <ProductRating
                                        rating={productData.rating}
                                        startFillClassName='w-4 h-4 fill-orange'
                                        startEmptyClassName='w-4 h-4 fill-slate-300'
                                    />
                                </div>
                                <div className='flex items-center border-r-[1px] border-r-slate-400 px-[15px]'>
                                    <div
                                        className='mr-[5px] border-b-[1px] border-b-black'
                                        title={String(productData.view)}
                                    >
                                        {formatNumberToSocialStyle(productData.view)}
                                    </div>
                                    <div className='text-sm capitalize text-gray-500'>Lượt xem</div>
                                </div>
                                <div className='flex items-center px-[15px]' title={String(productData.sold)}>
                                    <div className='mr-[5px]'>{formatNumberToSocialStyle(productData.sold)}</div>
                                    <div className='text-sm capitalize text-gray-500'>Đã bán</div>
                                </div>
                            </div>
                            <div className='mt-[24px] flex items-center rounded-sm bg-[#f5f5f5] px-4 py-[15px]'>
                                <div className='mr-4 flex items-center text-xl text-[#929292] line-through'>
                                    <span className='mr-1 underline'>đ</span>
                                    {formatCurrency(productData.price_before_discount)}
                                </div>
                                <div className='flex items-center text-3xl font-medium text-orange'>
                                    <span className='mr-1 underline'>đ</span>
                                    {formatCurrency(productData.price)}
                                </div>
                            </div>
                            <div className='mt-[50px] flex items-start'>
                                <div className='mr-[50px] text-sm text-slate-500'>Vận chuyển</div>
                                <div className='flex items-start'>
                                    <img src={FreeShipImage} alt='Free ship' className='w-[25px]' />
                                    <div className='ml-[10px]'>
                                        <h3 className='mb-1 text-sm font-medium'>Miễn phí vận chuyển</h3>
                                        <p className='text-sm text-gray-500'>
                                            Miễn phí vận chuyển cho đơn hàng trên ₫99.000
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-[25px] flex items-center'>
                                <div className='mr-[50px] text-sm text-slate-500'>Số lượng</div>
                                <div className='mr-[15px] flex items-center'>
                                    <button className='border-[rgba(0, 0, 0, 0.09)] flex h-8 w-8 items-center justify-center rounded-bl-sm rounded-tl-sm border text-slate-500'>
                                        <MinusIcon className='h-[10px] w-[10px] fill-black' />
                                    </button>
                                    <input
                                        type='text'
                                        name='quantity'
                                        defaultValue={1}
                                        className='h-8 w-[50px] border-y-[1px] border-b-[#00000016] border-t-[#00000016] text-center outline-none'
                                    />
                                    <button className='flex h-8 w-8 items-center justify-center rounded-br-sm rounded-tr-sm border border-[#00000016] text-slate-500'>
                                        <PlusIcon className='h-[10px] w-[10px] fill-black' />
                                    </button>
                                </div>
                                <div className='text-sm text-slate-500' title={String(productData.quantity)}>
                                    {formatNumberToSocialStyle(productData.quantity)} sản phẩm có sẵn
                                </div>
                            </div>
                            <div className='mt-[50px] flex'>
                                <Button className='mr-[15px] rounded-sm border-[1px] border-orange bg-[#ff57221a] px-5 py-[10px] hover:bg-[#ffc5b22e]'>
                                    <AddCartIcon className='mr-[10px] h-5 w-5 fill-transparent stroke-orange' />
                                    <span className='capitalize text-orange'>Thêm vào giỏ hàng</span>
                                </Button>
                                <Button className='rounded-sm border-[1px] border-orange bg-orange px-5 py-[10px] hover:bg-[#f05d40]'>
                                    <span className='capitalize text-white'>Mua ngay</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-[15px] rounded-sm bg-white p-[25px] shadow-sm'>
                        <h2 className='mb-[24px] bg-[#f5f5f5] p-[14px] text-lg uppercase'>Chi tiết sản phẩm</h2>
                        <div
                            className='px-[14px] text-sm leading-loose text-gray-500'
                            dangerouslySetInnerHTML={{ __html: productData.description }}
                        ></div>
                    </div>
                </div>
            ) : (
                <div className='container py-5'>
                    <div className='min-h-screen rounded-sm bg-white py-16 shadow-sm'>
                        <Spinner />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
