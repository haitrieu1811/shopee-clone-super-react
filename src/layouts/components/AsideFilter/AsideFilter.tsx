import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { Fragment, memo, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'src/components/Button';
import { BarIcon, FilterIcon, StartEmptyIcon, StartFillIcon } from 'src/components/Icons';
import InputNumber from 'src/components/InputNumber';
import InputV2 from 'src/components/InputV2/InputV2';
import config from 'src/config';
import { HomeContext } from 'src/pages/Home/Home';
import { NoUndefinedField } from 'src/types/utils.type';
import { PriceFilterSchema, priceFilterSchema } from 'src/utils/rules';
import CategoryItem from './CategoryItem';

type FormData = NoUndefinedField<PriceFilterSchema>;

const AsideFilter = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { categoryList, queryConfig } = useContext(HomeContext);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceFilterSchema),
    shouldFocusError: false
  });

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: config.routes.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    });
  });

  const handleRatingFilter = (ratingStar: number) => {
    navigate({
      pathname: config.routes.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingStar),
        page: '1'
      }).toString()
    });
  };

  const handleRemoveAll = () => {
    navigate({
      pathname: config.routes.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter'])).toString()
    });
  };

  return (
    <Fragment>
      <div className='mb-[30px]'>
        <h1 className='mb-[10px] flex items-center border-b border-b-gray-200 pb-4'>
          <BarIcon className='mr-3 w-[12px]' />
          <span className='font-semibold capitalize text-black'>{t('aside_filter.all_categories')}</span>
        </h1>
        {categoryList?.map((category) => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </div>
      <div className='mb-[30px]'>
        <div className='flex items-center pb-4'>
          <FilterIcon className='mr-3 w-[12px] stroke-black' />
          <span className='font-semibold uppercase text-black'>{t('aside_filter.search_filter')}</span>
        </div>
        <div className='mb-6'>
          <div className='text-sm font-medium'>{t('aside_filter.price_range')}</div>
          <form onSubmit={onSubmit}>
            <div className='mt-5 flex items-center justify-between'>
              <InputV2
                control={control}
                type='number'
                name='price_min'
                classNameInput='h-[30px] w-[80px] rounded-sm border border-gray-300 p-2 text-sm outline-none'
                classNameError='hidden'
                placeholder={t('aside_filter.from')}
                onChange={() => {
                  trigger('price_max');
                }}
              />
              <div className='h-[1px] w-[10px] bg-gray-300'></div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => (
                  <InputNumber
                    type='text'
                    placeholder={t('aside_filter.to')}
                    name='price_max'
                    classNameInput='h-[30px] w-[80px] rounded-sm border border-gray-300 p-2 text-sm outline-none'
                    onChange={(e) => {
                      field.onChange(e);
                      trigger('price_min');
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )}
              />
            </div>
            <div className='mb-4 mt-2 text-center text-sm text-red-500'>{errors.price_min?.message}</div>
            <Button className='w-full rounded-sm bg-orange py-[6px] text-sm uppercase text-white'>
              {t('aside_filter.apply')}
            </Button>
          </form>
        </div>
        <div className='mt-4'>
          <div className='mb-2 text-sm font-medium capitalize'>{t('aside_filter.rating')}</div>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                onClick={() => handleRatingFilter(5 - index)}
                className={classNames('flex items-center rounded-2xl px-3 py-1 md:inline-flex', {
                  'bg-[#ebebeb]': queryConfig.rating_filter === (5 - index).toString()
                })}
                tabIndex={0}
                role='button'
                aria-hidden='true'
              >
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => {
                    if (indexStar < 5 - index) {
                      return <StartFillIcon key={indexStar} className='mr-1 h-[14px] w-[14px] fill-[#ffa727]' />;
                    }
                    return <StartEmptyIcon key={indexStar} className='mr-1 h-[14px] w-[14px] fill-[#ffa727]' />;
                  })}
                {index !== 0 && <span className='ml-1 text-sm lowercase text-gray-500'>{t('aside_filter.above')}</span>}
              </div>
            ))}
        </div>
      </div>
      <div
        onClick={handleRemoveAll}
        className='mb-[50px] block w-full rounded-sm bg-orange py-[6px] text-center text-sm uppercase text-white'
        tabIndex={0}
        role='button'
        aria-hidden='true'
      >
        {t('aside_filter.delete_all')}
      </div>
    </Fragment>
  );
};

export default memo(AsideFilter);
