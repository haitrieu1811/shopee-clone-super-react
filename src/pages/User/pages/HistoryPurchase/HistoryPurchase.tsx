import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { Fragment, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, createSearchParams } from 'react-router-dom';

import purchasesApi from 'src/apis/purchase.api';
import noPurchaseImage from 'src/assets/images/no-purchase.png';
import Button from 'src/components/Button';
import { ShieldIcon } from 'src/components/Icons';
import config from 'src/config';
import { purchaseStatus } from 'src/constants/purchase';
import useQueryParams from 'src/hooks/useQueryParams';
import { PurchaseStatusType } from 'src/types/purchase.type';
import { formatCurrency, generateNameId } from 'src/utils/utils';

const HistoryPurchase = () => {
  const { t } = useTranslation('pages');
  const queryParams: { status?: string } = useQueryParams();
  const status = Number(queryParams.status) || purchaseStatus.all;
  const purcharseTabs = useMemo(() => {
    return [
      {
        name: t('history_purcharses.all'),
        status: purchaseStatus.all
      },
      {
        name: t('history_purcharses.to_confirm'),
        status: purchaseStatus.waitForConfirmation
      },
      {
        name: t('history_purcharses.to_get'),
        status: purchaseStatus.waitForGetting
      },
      {
        name: t('history_purcharses.to_ship'),
        status: purchaseStatus.inProgress
      },
      {
        name: t('history_purcharses.completed'),
        status: purchaseStatus.delivered
      },
      {
        name: t('history_purcharses.cancelled'),
        status: purchaseStatus.cancelled
      }
    ];
  }, [t]);

  const getPurchasesQuery = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchasesApi.getPurchaseList({ status: status as PurchaseStatusType })
  });

  const purchases = getPurchasesQuery.data?.data.data;

  return (
    <div className='relative'>
      <Helmet>
        <title>{t('profile.my_purcharse')}</title>
        <meta name='description' content='Cập nhật thông tin tài khoản cá nhân tại Shopee Clone' />
      </Helmet>
      {/* Links */}
      <div className='max-w-full overflow-auto'>
        <div className='sticky top-0 mb-3 flex rounded-t-sm shadow-sm'>
          {purcharseTabs.map((purchase, index) => (
            <Link
              key={index}
              to={{
                pathname: config.routes.historyPurchase,
                search: createSearchParams({
                  status: String(purchase.status)
                }).toString()
              }}
              className={classNames(
                'flex-shrink-0 border-b-2 bg-white px-5 py-[13.5px] text-center capitalize md:flex-1 md:px-0',
                {
                  'border-b-orange text-orange': purchase.status === status,
                  'border-b-transparent text-black/80': purchase.status !== status
                }
              )}
            >
              {purchase.name}
            </Link>
          ))}
        </div>
      </div>

      {purchases && purchases.length > 0 ? (
        // Danh sách đơn hàng
        <Fragment>
          {purchases.map((purchase) => (
            <div key={purchase._id} className='mt-3 rounded-sm bg-white'>
              <Link
                to={`/product/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                className='flex items-center justify-between overflow-auto border-b border-b-slate-200 p-6 md:overflow-visible '
              >
                <div className='flex flex-shrink-0 items-start md:flex-shrink-[unset]'>
                  <div className='flex-shrink-0 rounded-sm border border-slate-300'>
                    <img src={purchase.product.image} alt={purchase.product.name} className='h-20 w-20' />
                  </div>
                  <div className='pl-3'>
                    <div className='text-black/[0.87]'>{purchase.product.name}</div>
                    <div className='mt-1 text-sm text-black/[0.87]'>x{purchase.buy_count}</div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='mr-1 text-sm text-black/30 line-through'>
                    đ{formatCurrency(purchase.product.price_before_discount)}
                  </div>
                  <div className='text-sm text-orange'>đ{formatCurrency(purchase.product.price)}</div>
                </div>
              </Link>
              <div className='flex items-center justify-end p-6 pb-3'>
                <div className='mr-[10px] flex items-center'>
                  <ShieldIcon className='mr-[5px] h-4 w-4' />
                  <span className='text-sm text-black/80'>{t('history_purcharses.order_total')}: </span>
                </div>
                <div className='text-xl text-orange md:text-2xl'>
                  ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                </div>
              </div>
              <div className='flex justify-end p-6 pt-3'>
                <Button className='h-10 w-[100px] rounded-sm bg-orange text-sm capitalize text-white hover:bg-orange/90 md:w-[150px]'>
                  {t('history_purcharses.buy_again')}
                </Button>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        // Không có đơn hàng nào
        <div className='flex min-h-[300px] flex-col items-center justify-center rounded-sm bg-white md:min-h-[600px]'>
          <img src={noPurchaseImage} alt='No purcharse' className='h-[100px] w-[100px]' />
          <p className='mt-5 text-black/80 md:text-lg'>{t('history_purcharses.no_purchases')}</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPurchase;
