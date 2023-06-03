import { useQuery } from '@tanstack/react-query';
import { isUndefined, omitBy } from 'lodash';

import { createContext } from 'react';
import productApi from 'src/apis/product.api';
import ProductList from 'src/components/ProductList';
import useQueryParams from 'src/hooks/useQueryParams';
import AsideFilter from 'src/layouts/components/AsideFilter';
import ProductSort from 'src/layouts/components/ProductSort';
import { CategoryType, ProductItemType, ProductListParamsType } from 'src/types/product.type';

interface HomeContextType {
    pageSize: number;
    queryConfig: QueryConfigType;
    productList: ProductItemType[];
    categoryList: CategoryType[];
}

export const HomeContext = createContext<HomeContextType>({
    pageSize: 0,
    queryConfig: {},
    productList: [],
    categoryList: []
});

type QueryConfigType = {
    [key in keyof ProductListParamsType]: string;
};

const Home = () => {
    const queryParams: QueryConfigType = useQueryParams();
    const queryConfig: QueryConfigType = omitBy(
        {
            category: queryParams.category,
            exclude: queryParams.exclude,
            limit: queryParams.limit || 20,
            name: queryParams.name,
            order: queryParams.order,
            page: queryParams.page || '1',
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            rating_filter: queryParams.rating_filter,
            sort_by: queryParams.sort_by
        },
        isUndefined
    );

    const getProductListQuery = useQuery({
        queryKey: ['productList', queryConfig],
        queryFn: () => productApi.getProductList(queryConfig as ProductListParamsType),
        keepPreviousData: true
    });

    const getCategoryListQuery = useQuery({
        queryKey: ['categoryList'],
        queryFn: () => productApi.getCategoryList()
    });

    return (
        <HomeContext.Provider
            value={{
                queryConfig,
                pageSize: getProductListQuery.data?.data.data.pagination.page_size || 0,
                productList: getProductListQuery.data?.data.data.products || [],
                categoryList: getCategoryListQuery.data?.data.data || []
            }}
        >
            <div className='bg-[#f5f5f5]'>
                <div className='container'>
                    <div className='grid grid-cols-11 gap-10 pt-6'>
                        <div className='col-span-11 lg:col-span-2'>
                            <AsideFilter />
                        </div>
                        <div className='col-span-11 lg:col-span-9'>
                            <ProductSort />
                            <ProductList />
                        </div>
                    </div>
                </div>
            </div>
        </HomeContext.Provider>
    );
};

export default Home;
