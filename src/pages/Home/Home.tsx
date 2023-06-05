import { useQuery } from '@tanstack/react-query';

import { createContext, useMemo } from 'react';
import productApi from 'src/apis/product.api';
import ProductList from 'src/components/ProductList';
import useQueryConfig, { QueryConfigType } from 'src/hooks/useQueryConfig';
import AsideFilter from 'src/layouts/components/AsideFilter';
import ProductSort from 'src/layouts/components/ProductSort';
import { CategoryType, ProductListParamsType } from 'src/types/product.type';

interface HomeContextType {
    pageSize: number;
    queryConfig: QueryConfigType;
    categoryList: CategoryType[];
    isLoading: boolean;
}

export const HomeContext = createContext<HomeContextType>({
    pageSize: 0,
    queryConfig: {},
    categoryList: [],
    isLoading: false
});

const Home = () => {
    const queryConfig = useQueryConfig();

    const getProductListQuery = useQuery({
        queryKey: ['productList', queryConfig],
        queryFn: () => productApi.getProductList(queryConfig as ProductListParamsType),
        staleTime: 3 * 60 * 1000,
        keepPreviousData: true
    });

    const getCategoryListQuery = useQuery({
        queryKey: ['categoryList'],
        queryFn: () => productApi.getCategoryList()
    });

    const productList = useMemo(
        () => getProductListQuery.data?.data.data.products,
        [getProductListQuery.data?.data.data.products]
    );

    return (
        <HomeContext.Provider
            value={{
                queryConfig,
                pageSize: getProductListQuery.data?.data.data.pagination.page_size || 0,
                categoryList: getCategoryListQuery.data?.data.data || [],
                isLoading: getProductListQuery.isLoading
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
                            <ProductList productList={productList || []} />
                        </div>
                    </div>
                </div>
            </div>
        </HomeContext.Provider>
    );
};

export default Home;
