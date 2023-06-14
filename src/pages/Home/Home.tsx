import { useQuery } from '@tanstack/react-query';
import { Fragment, createContext, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import productApi from 'src/apis/product.api';
import Drawer from 'src/components/Drawer';
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
  const { t } = useTranslation('pages');
  const queryConfig = useQueryConfig();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

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
        <Helmet>
          <title>{t('home.home')} | Shopee Clone</title>
          <meta name='description' content='Đăng nhập để mua sắm tại Shopee Clone' />
        </Helmet>
        <div className='container'>
          <div className='flex flex-wrap pt-3 md:pt-6'>
            <div className='w-full md:mr-10 md:w-[190px]'>
              {!isMobile ? (
                <AsideFilter />
              ) : (
                <Fragment>
                  <button
                    onClick={() => setShowMobileFilter(true)}
                    className='mb-3 flex w-full items-center justify-center rounded-sm border border-gray-200 bg-white py-2 font-bold capitalize'
                  >
                    {t('home.filter')}
                  </button>
                  <Drawer
                    visible={showMobileFilter}
                    onClickMask={() => {
                      setShowMobileFilter(false);
                    }}
                  >
                    <AsideFilter />
                  </Drawer>
                </Fragment>
              )}
            </div>
            {isMobile && <ProductSort />}
            <div className='flex-1'>
              {!isMobile && <ProductSort />}
              <ProductList productList={productList || []} />
            </div>
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
