import { Fragment, memo, useContext } from 'react';

import { HomeContext } from 'src/pages/Home/Home';
import Pagination from '../Pagination';
import ProductItem from '../ProductItem';
import Spinner from '../Spinner/Spinner';

const ProductList = () => {
    const { productList } = useContext(HomeContext);

    return (
        <Fragment>
            {productList && productList.length > 0 ? (
                <Fragment>
                    <div className='grid grid-cols-10 gap-[10px]'>
                        {productList?.map((product) => (
                            <div key={product._id} className='col-span-10 md:col-span-5 lg:col-span-2'>
                                <ProductItem data={product} />
                            </div>
                        ))}
                    </div>
                    <Pagination />
                </Fragment>
            ) : (
                <Spinner />
            )}
        </Fragment>
    );
};

export default memo(ProductList);
