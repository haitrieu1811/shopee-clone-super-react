import { FloatingPortal, shift, useFloating } from '@floating-ui/react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { omit } from 'lodash';
import { useContext, useState } from 'react';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';

import { ChevronDownIcon, NextIcon, PrevIcon } from 'src/components/Icons';
import config from 'src/config';
import { order as orderConstant, sortBy } from 'src/constants/product';
import { HomeContext } from 'src/pages/Home/Home';
import { ProductListParamsType } from 'src/types/product.type';

const ProductSort = () => {
    const navigate = useNavigate();

    const { pageSize, queryConfig } = useContext(HomeContext);
    const page = Number(queryConfig.page);
    const { sort_by = sortBy.createdAt, order } = queryConfig;

    const { x, y, strategy, refs } = useFloating({
        middleware: [shift()],
        placement: 'bottom-end'
    });

    const [show, setShow] = useState(false);

    const showSelect = () => {
        setShow(true);
    };

    const hideSelect = () => {
        setShow(false);
    };

    const isActiveSortBy = (sortByInput: Exclude<ProductListParamsType['sort_by'], undefined>) => {
        return sort_by === sortByInput;
    };

    const handleSort = (sortByInput: Exclude<ProductListParamsType['sort_by'], undefined>) => {
        navigate({
            pathname: config.routes.home,
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByInput
                    },
                    ['order']
                )
            ).toString()
        });
    };

    const handleOrderPrice = (orderInput: Exclude<ProductListParamsType['order'], undefined>) => {
        navigate({
            pathname: config.routes.home,
            search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.price,
                order: orderInput
            }).toString()
        });
    };

    const isActiveOrderPrice = (orderInput: Exclude<ProductListParamsType['order'], undefined>) => {
        return order === orderInput && sort_by === sortBy.price;
    };

    return (
        <div className='mb-3 flex items-center justify-between rounded-sm bg-[#00000008] px-5 py-[13px]'>
            <div className='flex items-center'>
                <span className='mr-4 text-sm text-gray-600'>Sắp xếp theo</span>
                <button
                    onClick={() => handleSort(sortBy.createdAt)}
                    className={classNames('mr-3 rounded-sm px-4 py-2 text-sm capitalize shadow-sm', {
                        'cursor-not-allowed bg-orange text-white': isActiveSortBy(sortBy.createdAt),
                        'bg-white text-black': !isActiveSortBy(sortBy.createdAt)
                    })}
                >
                    Mới nhất
                </button>
                <button
                    onClick={() => handleSort(sortBy.view)}
                    className={classNames('mr-3 rounded-sm px-4 py-2 text-sm capitalize shadow-sm', {
                        'cursor-not-allowed bg-orange text-white': isActiveSortBy(sortBy.view),
                        'bg-white text-black': !isActiveSortBy(sortBy.view)
                    })}
                >
                    Phổ biến
                </button>
                <button
                    onClick={() => handleSort(sortBy.sold)}
                    className={classNames('mr-3 rounded-sm px-4 py-2 text-sm capitalize shadow-sm', {
                        'cursor-not-allowed bg-orange text-white': isActiveSortBy(sortBy.sold),
                        'bg-white text-black': !isActiveSortBy(sortBy.sold)
                    })}
                >
                    Bán chạy
                </button>
                <div
                    ref={refs.setReference}
                    className='relative flex w-[200px] cursor-pointer items-center justify-between rounded-sm bg-white px-4 py-2 shadow-sm'
                    onMouseEnter={showSelect}
                    onMouseLeave={hideSelect}
                >
                    <span className='text-sm text-gray-700'>Giá</span>
                    <ChevronDownIcon className='w-3' />

                    <FloatingPortal>
                        {show && (
                            <motion.div
                                ref={refs.setFloating}
                                style={{
                                    left: x ?? 0,
                                    top: y ?? 0,
                                    position: strategy,
                                    zIndex: 9999
                                }}
                                className='w-[200px] rounded-sm border border-gray-100 bg-white py-2 shadow-sm'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <button
                                    onClick={() => handleOrderPrice(orderConstant.asc)}
                                    className={classNames('block w-full px-4 py-2 text-left text-sm', {
                                        'cursor-not-allowed text-orange': isActiveOrderPrice(orderConstant.asc)
                                    })}
                                >
                                    Giá: Thấp đến Cao
                                </button>
                                <button
                                    onClick={() => handleOrderPrice(orderConstant.desc)}
                                    className={classNames('block w-full px-4 py-2 text-left text-sm', {
                                        'cursor-not-allowed text-orange': isActiveOrderPrice(orderConstant.desc)
                                    })}
                                >
                                    Giá: Cao đến Thấp
                                </button>
                            </motion.div>
                        )}
                    </FloatingPortal>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='mr-5 text-sm'>
                    <span className='text-orange'>{page}</span>
                    <span>/{pageSize}</span>
                </div>
                <div className='flex'>
                    {page === 1 ? (
                        <div className='flex h-[34px] w-9 cursor-not-allowed items-center justify-center rounded-sm border border-gray-100 bg-[#f9f9f9] shadow-sm'>
                            <PrevIcon className='h-[10px] w-[10px] fill-slate-600' />
                        </div>
                    ) : (
                        <Link
                            to={{
                                pathname: config.routes.home,
                                search: createSearchParams({
                                    ...queryConfig,
                                    page: Number(page - 1).toString()
                                }).toString()
                            }}
                            className='flex h-[34px] w-9 items-center justify-center rounded-bl-sm rounded-tl-sm border border-gray-100 bg-white shadow-sm'
                        >
                            <PrevIcon className='h-[10px] w-[10px] fill-slate-600' />
                        </Link>
                    )}

                    {page === pageSize ? (
                        <div className='flex h-[34px] w-9 cursor-not-allowed items-center justify-center rounded-sm border-gray-100 bg-[#f9f9f9] shadow-sm'>
                            <NextIcon className='h-[10px] w-[10px] fill-slate-600' />
                        </div>
                    ) : (
                        <Link
                            to={{
                                pathname: config.routes.home,
                                search: createSearchParams({
                                    ...queryConfig,
                                    page: Number(page + 1).toString()
                                }).toString()
                            }}
                            className='flex h-[34px] w-9 cursor-pointer items-center justify-center rounded-bl-sm rounded-tr-sm bg-white shadow-sm'
                        >
                            <NextIcon className='h-[10px] w-[10px] fill-slate-600' />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSort;
