import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Fragment, useMemo } from 'react';
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
      {/* Links */}
      <div className='sticky top-0 mb-3 flex rounded-t-sm bg-white shadow-sm'>
        {purcharseTabs.map((purchase, index) => (
          <Link
            key={index}
            to={{
              pathname: config.routes.historyPurchase,
              search: createSearchParams({
                status: String(purchase.status)
              }).toString()
            }}
            className={classNames('flex-1 border-b-2 py-[13.5px] text-center capitalize', {
              'border-b-orange text-orange': purchase.status === status,
              'border-b-transparent text-black/80': purchase.status !== status
            })}
          >
            {purchase.name}
          </Link>
        ))}
      </div>
      {purchases && purchases.length > 0 ? (
        // Danh sách đơn hàng
        <Fragment>
          {purchases.map((purchase) => (
            <div key={purchase._id} className='mt-3 rounded-sm bg-white'>
              <Link
                to={`/product/${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                className='flex items-center justify-between border-b border-b-slate-200 p-6'
              >
                <div className='flex items-start'>
                  <div className='rounded-sm border border-slate-300'>
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
                <div className='text-2xl text-orange'>
                  ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                </div>
              </div>
              <div className='flex justify-end p-6 pt-3'>
                <Button className='h-10 w-[150px] rounded-sm bg-orange text-sm capitalize text-white hover:bg-orange/90'>
                  {t('history_purcharses.buy_again')}
                </Button>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        // Không có đơn hàng nào
        <div className='flex min-h-[600px] flex-col items-center justify-center rounded-sm bg-white'>
          <img src={noPurchaseImage} alt='No purcharse' className='h-[100px] w-[100px]' />
          <p className='mt-5 text-lg text-black/80'>{t('history_purcharses.no_purchases')}</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPurchase;
