import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import DOMPurify from 'dompurify';
import productApi from 'src/apis/product.api';
import purchasesApi from 'src/apis/purchase.api';
import FreeShipImage from 'src/assets/images/free-ship.png';
import Button from 'src/components/Button';
import { AddCartIcon, NextIcon, PrevIcon } from 'src/components/Icons';
import ProductList from 'src/components/ProductList';
import ProductRating from 'src/components/ProductRating';
import QuantityController from 'src/components/QuantityController';
import Spinner from 'src/components/Spinner/Spinner';
import { ProductItemType, ProductListParamsType } from 'src/types/product.type';
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils';
import { purchaseStatus } from 'src/constants/purchase';
import config from 'src/config';

const ProductDetail = () => {
  const navigate = useNavigate();

  const { t } = useTranslation('pages');

  const queryClient = useQueryClient();

  const { nameId } = useParams();
  const productId = getIdFromNameId(nameId as string);

  const [buyCount, setBuyCount] = useState<number>(1);

  const imageRef = useRef<HTMLImageElement>(null);

  const [activeImage, setActiveImage] = useState<string>('');
  const [indexCurrentImages, setIndexCurrentImages] = useState<number[]>([0, 5]);

  const getProductItemQuery = useQuery({
    queryKey: ['productItem', productId],
    queryFn: () => productApi.getProductItem(productId as string),
    enabled: Boolean(productId)
  });

  const productData = useMemo(() => getProductItemQuery.data?.data.data, [getProductItemQuery]);
  const currentImages = useMemo(
    () => (productData ? productData.images.slice(...indexCurrentImages) : []),
    [productData, indexCurrentImages]
  );

  const queryConfig: ProductListParamsType = { page: '1', limit: '30', category: productData?.category._id };

  const getProductListRelatedQuery = useQuery({
    queryKey: ['productList', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(productData?.category._id)
  });

  const productListRelated = useMemo(
    () => getProductListRelatedQuery.data?.data.data.products,
    [getProductListRelatedQuery.data?.data.data.products]
  );

  useEffect(() => {
    if (productData && productData?.images.length > 0) {
      setActiveImage(productData?.images[0]);
    }
  }, [productData]);

  const handleChangeImage = (image: string) => {
    setActiveImage(image);
  };

  const handleNextSlideImage = () => {
    if (indexCurrentImages[1] < (productData as ProductItemType)?.images.length) {
      setIndexCurrentImages((prevState) => [prevState[0] + 1, prevState[1] + 1]);
    }
  };

  const handlePrevSlideImage = () => {
    if (indexCurrentImages[0] > 0) {
      setIndexCurrentImages((prevState) => [prevState[0] - 1, prevState[1] - 1]);
    }
  };

  const handleZoomImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement;
    const { naturalWidth, naturalHeight } = image;
    const rect = e.currentTarget.getBoundingClientRect();

    // Cách 1: Khi đã giải quyết được Bubble Event
    // const { offsetX, offsetY } = e.nativeEvent;

    // Cách 2: Khi không giải quyết được Bubble Event
    const offsetX = e.pageX - (rect.x + window.scrollX);
    const offsetY = e.pageY - (rect.y + window.scrollY);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);

    image.style.width = `${naturalWidth}px`;
    image.style.height = `${naturalHeight}px`;
    image.style.maxWidth = 'unset';
    image.style.top = `${top}px`;
    image.style.left = `${left}px`;
  };

  const handleRemoveZoomImage = () => {
    imageRef.current?.removeAttribute('style');
  };

  const handleChangeBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.addToCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartList', { status: purchaseStatus.inCart }] });
    }
  });

  const handleAddToCart = () => {
    if (productData) {
      addToCartMutation.mutate(
        { product_id: productData._id, buy_count: buyCount },
        {
          onSuccess: (data) => {
            toast.success(data.data.message);
          }
        }
      );
    }
  };

  const buyNow = () => {
    if (productData) {
      addToCartMutation.mutate(
        { product_id: productData?._id, buy_count: buyCount },
        {
          onSuccess: (data) => {
            navigate(config.routes.cart, { state: { cartItemId: data.data.data._id } });
          }
        }
      );
    }
  };

  return (
    <div className='bg-[#f5f5f5]'>
      {productData ? (
        <div className='container py-5'>
          <div className='grid grid-cols-12 gap-6 rounded-sm bg-white shadow-sm'>
            <div className='col-span-5 p-[15px]'>
              {/* Ảnh được hiển thị */}
              <div
                className='relative w-full overflow-hidden pt-[100%] hover:cursor-zoom-in'
                onMouseMove={handleZoomImage}
                onMouseLeave={handleRemoveZoomImage}
              >
                <img
                  ref={imageRef}
                  src={activeImage}
                  alt={activeImage}
                  className='absolute inset-0 h-full w-full object-contain'
                />
              </div>
              {/* Danh sách hình ảnh sản phẩm */}
              <div className='relative mt-[10px] grid grid-cols-10 gap-[10px]'>
                <button
                  onClick={handlePrevSlideImage}
                  className='absolute left-0 top-1/2 z-[1] h-10 w-5 -translate-y-1/2 bg-black/20'
                >
                  <PrevIcon className='h-4 w-4 fill-white' />
                </button>
                {currentImages?.map((image, index) => {
                  const isActive = image === activeImage;
                  return (
                    <div
                      key={index}
                      className='relative col-span-2 cursor-pointer rounded-sm pt-[100%]'
                      onMouseEnter={() => handleChangeImage(image)}
                    >
                      <img src={image} alt={image} className='absolute inset-0 h-full w-full rounded-sm object-cover' />
                      <div
                        className={classNames(
                          'pointer-events-none absolute inset-0 z-[2] rounded-sm border-2 hover:border-orange',
                          {
                            'border-orange': isActive,
                            'border-transparent': !isActive
                          }
                        )}
                      ></div>
                    </div>
                  );
                })}
                <button
                  onClick={handleNextSlideImage}
                  className='absolute right-0 top-1/2 z-[1] h-10 w-5 -translate-y-1/2 bg-black/20'
                >
                  <NextIcon className='h-4 w-4 fill-white' />
                </button>
              </div>
            </div>
            <div className='col-span-7 pr-[35px] pt-5'>
              {/* Tiêu đề sản phẩm */}
              <div className='flex items-center'>
                {productData.sold > 500 && (
                  <span className='mr-4 flex-shrink-0 rounded-sm bg-orange px-1 py-[2px] text-xs font-medium capitalize text-white'>
                    {t('product_detail.favorite')}
                  </span>
                )}
                <h1 className='line-clamp-2 text-xl font-medium' title={productData.name}>
                  {productData.name}
                </h1>
              </div>
              {/* Thông tin về đánh giá, số lượt xem và số lượng bán được*/}
              <div className='mt-[10px] flex items-center'>
                <div
                  className='flex items-center border-r-[1px] border-r-slate-400 pr-[15px]'
                  title={String(productData.rating)}
                >
                  <div className='mr-[5px] border-b-[1px] border-b-orange text-orange'>
                    {productData.rating.toFixed(1)}
                  </div>
                  <ProductRating
                    rating={productData.rating}
                    startFillClassName='w-4 h-4 fill-orange'
                    startEmptyClassName='w-4 h-4 fill-slate-300'
                  />
                </div>
                <div className='flex items-center border-r-[1px] border-r-slate-400 px-[15px]'>
                  <div className='mr-[5px] border-b-[1px] border-b-black' title={String(productData.view)}>
                    {formatNumberToSocialStyle(productData.view)}
                  </div>
                  <div className='text-sm capitalize text-gray-500'>{t('product_detail.view')}</div>
                </div>
                <div className='flex items-center px-[15px]' title={String(productData.sold)}>
                  <div className='mr-[5px]'>{formatNumberToSocialStyle(productData.sold)}</div>
                  <div className='text-sm capitalize text-gray-500'>{t('product_detail.sold')}</div>
                </div>
              </div>
              {/* Giá sản phẩm */}
              <div className='mt-[24px] flex items-center rounded-sm bg-[#f5f5f5] px-4 py-[15px]'>
                <div className='mr-4 flex items-center text-xl text-[#929292] line-through'>
                  <span className='mr-1 underline'>đ</span>
                  {formatCurrency(productData.price_before_discount)}
                </div>
                <div className='flex items-center text-3xl font-medium text-orange'>
                  <span className='mr-1 underline'>đ</span>
                  {formatCurrency(productData.price)}
                </div>
                {rateSale(productData.price_before_discount, productData.price) > 0 && (
                  <span className='ml-[15px] flex-shrink-0 rounded-sm bg-orange px-1 py-[2px] text-xs font-medium uppercase text-white'>
                    {rateSale(productData.price_before_discount, productData.price)}% {t('product_detail.sale')}
                  </span>
                )}
              </div>
              {/* Vận chuyển */}
              <div className='mt-[50px] flex items-start'>
                <div className='mr-[50px] text-sm text-slate-500'>{t('product_detail.transport')}</div>
                <div className='flex items-start'>
                  <img src={FreeShipImage} alt='Free ship' className='w-[25px]' />
                  <div className='ml-[10px]'>
                    <h3 className='mb-1 text-sm font-medium'>{t('product_detail.free_shipping')}</h3>
                    <p className='text-sm text-gray-500'>{t('product_detail.free_shipping_for')} ₫99.000</p>
                  </div>
                </div>
              </div>
              {/* Input nhập số lượng sản phẩm cần mua */}
              <div className='mt-[25px] flex items-center'>
                <div className='mr-[50px] text-sm text-slate-500'>{t('product_detail.quantity')}</div>
                <QuantityController
                  onDecrease={handleChangeBuyCount}
                  onIncrease={handleChangeBuyCount}
                  onType={handleChangeBuyCount}
                  value={buyCount}
                  max={productData.quantity}
                />
                <div className='ml-4 text-sm text-slate-500'>
                  {productData.quantity} {t('product_detail.products_available')}
                </div>
              </div>
              {/* Thêm và mua sản phẩm */}
              <div className='mt-[50px] flex'>
                <Button
                  className='mr-[15px] rounded-sm border-[1px] border-orange bg-[#ff57221a] px-5 py-[10px] hover:bg-[#ffc5b22e]'
                  onClick={handleAddToCart}
                >
                  <AddCartIcon className='mr-[10px] h-5 w-5 fill-transparent stroke-orange' />
                  <span className='capitalize text-orange'>{t('product_detail.add_to_cart')}</span>
                </Button>
                <Button
                  onClick={buyNow}
                  className='rounded-sm border-[1px] border-orange bg-orange px-5 py-[10px] hover:bg-[#f05d40]'
                >
                  <span className='capitalize text-white'>{t('product_detail.buy_now')}</span>
                </Button>
              </div>
            </div>
          </div>
          {/* Mô tả sản phẩm */}
          <div className='mt-[15px] rounded-sm bg-white p-[25px] shadow-sm'>
            <h2 className='mb-[24px] bg-[#f5f5f5] p-[14px] text-lg uppercase'>
              {t('product_detail.product_description')}
            </h2>
            <div
              className='px-[14px] text-sm leading-loose text-black/80'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(productData.description)
              }}
            ></div>
          </div>
          {/* Sản phẩm liên quan */}
          {productListRelated && productListRelated.length > 0 && (
            <div className='my-10'>
              <h2 className='mb-4 font-medium uppercase text-[#00000089]'>{t('product_detail.you_may_also_like')}</h2>
              <ProductList
                productList={productListRelated}
                pagination={false}
                classNameOfList='grid grid-cols-12 gap-[10px]'
                classNameOfItem='col-span-10 md:col-span-5 lg:col-span-2'
              />
            </div>
          )}
        </div>
      ) : (
        <div className='container py-5'>
          <div className='min-h-screen rounded-sm bg-white py-16 shadow-sm'>
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
