import classNames from 'classnames';
import { useContext } from 'react';
import { Link, createSearchParams } from 'react-router-dom';

import { HomeContext } from 'src/pages/Home/Home';
import { NextIcon, PrevIcon } from '../Icons';
import routes from 'src/config/routes';

const RANGE = 2;

const Pagination = () => {
    const { queryConfig, pageSize } = useContext(HomeContext);
    const page = Number(queryConfig.page);

    const renderPagination = () => {
        let dotBefore = false;
        let dotAfter = false;

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true;
                return (
                    <span
                        key={index}
                        className={classNames(
                            'mx-[15px] flex h-[30px] w-10 select-none items-center justify-center rounded-sm'
                        )}
                    >
                        ...
                    </span>
                );
            }
        };

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true;
                return (
                    <span
                        key={index}
                        className={classNames(
                            'mx-[15px] flex h-[30px] w-10 select-none items-center justify-center rounded-sm'
                        )}
                    >
                        ...
                    </span>
                );
            }
        };

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === page;

                if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                    return renderDotAfter(index);
                } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
                    if (pageNumber < page - RANGE && pageNumber > RANGE) {
                        return renderDotBefore(index);
                    } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                        return renderDotAfter(index);
                    }
                } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
                    return renderDotBefore(index);
                }

                return (
                    <Link
                        to={{
                            pathname: routes.home,
                            search: createSearchParams({
                                ...queryConfig,
                                page: pageNumber.toString()
                            }).toString()
                        }}
                        key={index}
                        className={classNames('mx-[15px] flex h-[30px] w-10 items-center justify-center rounded-sm', {
                            'cursor-not-allowed bg-orange text-white': isActive,
                            'text-gray-500 hover:text-orange': !isActive
                        })}
                    >
                        {pageNumber}
                    </Link>
                );
            });
    };

    return (
        <div className='mb-10 mt-10 flex flex-wrap items-center justify-center text-xl font-light'>
            {page === 1 ? (
                <span className='mx-[15px] flex h-[30px] w-10 cursor-not-allowed items-center justify-center rounded-sm'>
                    <PrevIcon className='h-[14px] w-[14px] fill-gray-500' />
                </span>
            ) : (
                <Link
                    to={{
                        pathname: routes.home,
                        search: createSearchParams({
                            ...queryConfig,
                            page: (page - 1).toString()
                        }).toString()
                    }}
                    className='mx-[15px] flex h-[30px] w-10 items-center justify-center rounded-sm'
                >
                    <PrevIcon className='h-[14px] w-[14px] fill-gray-500' />
                </Link>
            )}

            {renderPagination()}

            {page === pageSize ? (
                <span className='mx-[15px] flex h-[30px] w-10 cursor-not-allowed items-center justify-center rounded-sm'>
                    <NextIcon className='h-[14px] w-[14px] fill-gray-500' />
                </span>
            ) : (
                <Link
                    to={{
                        pathname: routes.home,
                        search: createSearchParams({
                            ...queryConfig,
                            page: (page + 1).toString()
                        }).toString()
                    }}
                    className='mx-[15px] flex h-[30px] w-10 items-center justify-center rounded-sm'
                >
                    <NextIcon className='h-[14px] w-[14px] fill-gray-500' />
                </Link>
            )}
        </div>
    );
};

export default Pagination;
