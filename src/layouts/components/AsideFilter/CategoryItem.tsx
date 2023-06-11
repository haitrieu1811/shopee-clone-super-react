import classNames from 'classnames';
import { useContext } from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import config from 'src/config';
import { HomeContext } from 'src/pages/Home/Home';
import { CategoryType } from 'src/types/product.type';

const categoriesLanguage = {
  'Áo thun': 'aside_filter.t_shirt',
  'Đồng hồ': 'aside_filter.watch',
  'Điện thoại': 'aside_filter.smart_phone'
};

const CategoryItem = ({ category }: { category: CategoryType }) => {
  const { t } = useTranslation();
  const { queryConfig } = useContext(HomeContext);

  return (
    <Link
      to={{
        pathname: config.routes.home,
        search: createSearchParams({
          ...queryConfig,
          category: category._id.toString(),
          page: '1'
        }).toString()
      }}
      className={classNames(
        'relative block w-full px-3 py-2 text-left text-sm font-medium capitalize text-gray-800 before:absolute before:left-0 before:top-[50%] before:-translate-y-[50%] before:border-4 before:border-y-transparent before:border-l-orange before:border-r-transparent before:opacity-0',
        {
          'text-orange before:opacity-100': queryConfig.category === category._id
        }
      )}
    >
      {t(categoriesLanguage[category.name])}
    </Link>
  );
};

export default CategoryItem;
