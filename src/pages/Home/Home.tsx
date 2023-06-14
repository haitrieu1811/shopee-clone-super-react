import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Fragment, createContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import productApi from 'src/apis/product.api';
import ProductList from 'src/components/ProductList';
import useQueryConfig, { QueryConfigType } from 'src/hooks/useQueryConfig';
import AsideFilter from 'src/layouts/components/AsideFilter';
import ProductSort from 'src/layouts/components/ProductSort';
import { CategoryType, ProductListParamsType } from 'src/types/product.type';
import Drawer from 'src/components/Drawer';
import { CartIcon, FilterIcon } from 'src/components/Icons';
import { Link } from 'react-router-dom';
import config from 'src/config';
import Cart from 'src/components/Header/Cart';

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
          <div className='flex flex-wrap pt-6'>
            {!isMobile && (
              <div className='w-full md:mr-10 md:w-[190px]'>
                <AsideFilter />
              </div>
            )}
            {isMobile && (
              <Fragment>
                <button
                  onClick={() => {
                    setShowMobileFilter(true);
                  }}
                  className='fixed bottom-10 right-0 z-10 rounded-sm bg-orange p-1'
                >
                  <FilterIcon className='h-8 w-8 stroke-white' />
                </button>
                <Link to={config.routes.cart} className='fixed bottom-24 right-0 z-10 rounded-sm bg-orange p-2'>
                  <Cart />
                </Link>
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
            <div className='flex-1'>
              {/* <ProductSort /> */}
              <ProductList productList={productList || []} />
            </div>
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
