import { Link } from 'react-router-dom';

import EventImage from 'src/assets/images/event.png';
import { ProductItemType } from 'src/types/product.type';
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils';
import ProductRating from '../ProductRating';

interface ProductItemProps {
    data: ProductItemType;
}

const ProductItem = ({ data }: ProductItemProps) => {
    return (
        <div className='relative shadow-sm hover:-translate-y-[2px] hover:shadow-md'>
            <Link to={`/products/${data._id}`}>
                <div className='absolute -left-1 top-[10px] z-[1] bg-orange px-1 py-[1px] text-xs font-medium text-white after:absolute after:left-0 after:top-full after:z-[2] after:border-l-4 after:border-t-4 after:border-x-transparent after:border-b-transparent after:border-t-orange after:brightness-[60%]'>
                    Yêu thích
                </div>
                <div className='absolute right-0 top-0 z-[1] border-solid bg-[#ffd840f2] p-1 text-center text-xs font-medium after:absolute after:left-0 after:top-full after:border-x-[20px] after:border-b-[4px] after:border-x-[#ffd840f2] after:border-y-transparent'>
                    <div className='text-orange'>43%</div>
                    <div className='uppercase text-white'>Giảm</div>
                </div>
                <div className='relative pt-[100%]'>
                    <img
                        src={data.image}
                        alt={data.name}
                        className='absolute left-0 top-0 h-full w-full object-cover'
                    />
                    <img
                        src={EventImage}
                        alt={data.name}
                        className='absolute left-0 top-0 h-full w-full object-cover'
                    />
                </div>
                <div className='bg-white p-2 pb-4'>
                    <h3 className='line-clamp-2 text-xs text-gray-800'>{data.name}</h3>
                    <div className='my-2 flex items-center'>
                        <span className='text-sm text-gray-500 line-through'>
                            <span className='mr-[2px] text-xs underline'>đ</span>
                            {formatCurrency(data.price_before_discount)}
                        </span>
                        <span className='ml-1 text-orange'>
                            <span className='mr-[2px] text-sm underline'>đ</span>
                            {formatCurrency(data.price)}
                        </span>
                    </div>
                    <div className='flex items-center'>
                        <ProductRating rating={data.rating} />
                        <div className='ml-2 text-xs text-gray-600'>Đã bán {formatNumberToSocialStyle(data.sold)}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductItem;
