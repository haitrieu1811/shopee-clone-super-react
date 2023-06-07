import { Fragment, memo, useContext } from 'react';

import { HomeContext } from 'src/pages/Home/Home';
import { ProductListType } from 'src/types/product.type';
import Pagination from '../Pagination';
import ProductItem from '../ProductItem';
import SearchNotFound from '../SearchNotFound';
import Spinner from '../Spinner/Spinner';

interface ProductListProps {
  productList: ProductListType;
  pagination?: boolean;
  classNameOfList?: string;
  classNameOfItem?: string;
}

const ProductList = ({
  productList,
  pagination = true,
  classNameOfList = 'grid grid-cols-10 gap-[10px]',
  classNameOfItem = 'col-span-10 md:col-span-5 lg:col-span-2'
}: ProductListProps) => {
  const { isLoading } = useContext(HomeContext);

  return (
    <Fragment>
      {isLoading && <Spinner className='mt-10 text-center' />}
      {!isLoading && productList.length > 0 && (
        <Fragment>
          <div className={classNameOfList}>
            {productList?.map((product) => (
              <div key={product._id} className={classNameOfItem}>
                <ProductItem data={product} />
              </div>
            ))}
          </div>
          {pagination && <Pagination />}
        </Fragment>
      )}
      {!isLoading && productList.length <= 0 && <SearchNotFound />}
    </Fragment>
  );
};

export default memo(ProductList);
