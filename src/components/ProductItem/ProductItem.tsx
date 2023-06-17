import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import EventImage from 'src/assets/images/event.png';
import { ProductItemType } from 'src/types/product.type';
import { formatCurrency, formatNumberToSocialStyle, generateNameId, rateSale } from 'src/utils/utils';
import ProductRating from '../ProductRating';

interface ProductItemProps {
  data: ProductItemType;
}

const ProductItem = ({ data }: ProductItemProps) => {
  const { t } = useTranslation();
  const discount = rateSale(data.price_before_discount, data.price);

  return (
    <div className='relative shadow-sm hover:-translate-y-[2px] hover:shadow-md'>
      <Link to={`/product/${generateNameId({ name: data.name, id: data._id })}`}>
        {data.sold > 500 && (
          <div className='absolute -left-1 top-[10px] z-[1] bg-orange px-1 py-[1px] text-xs font-medium text-white after:absolute after:left-0 after:top-full after:z-[2] after:border-l-4 after:border-t-4 after:border-x-transparent after:border-b-transparent after:border-t-orange after:brightness-[60%]'>
            {t('product_item.favorite')}
          </div>
        )}
        {discount > 0 && (
          <div className='absolute right-0 top-0 z-[1] bg-[#ffd840f2] p-1 text-center text-xs font-medium after:absolute after:left-0 after:top-full after:border-x-[20px] after:border-b-[4px] after:border-x-[#ffd840f2] after:border-y-transparent'>
            <div className='text-orange'>{discount}%</div>
            <div className='uppercase text-white'>{t('product_item.sale')}</div>
          </div>
        )}
        <div className='relative w-full pt-[100%]'>
          <img src={data.image} alt={data.name} className='absolute left-0 top-0 h-full w-full object-cover' />
          <img src={EventImage} alt={data.name} className='absolute left-0 top-0 h-full w-full object-cover' />
        </div>
        <div className='bg-white p-2 pb-4'>
          <h3 className='line-clamp-2 text-xs text-gray-800'>{data.name}</h3>
          <div className='my-2 flex items-center truncate'>
            <span className='text-xs text-gray-500 line-through md:text-sm'>
              <span className='mr-[2px] text-xs underline'>đ</span>
              {formatCurrency(data.price_before_discount)}
            </span>
            <span className='ml-1 text-sm text-orange md:text-base'>
              <span className='mr-[2px] text-sm underline'>đ</span>
              {formatCurrency(data.price)}
            </span>
          </div>
          <div className='flex items-center'>
            <ProductRating rating={data.rating} />
            <div className='ml-2 text-xs text-gray-600'>
              {t('product_item.sold')} {formatNumberToSocialStyle(data.sold)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
