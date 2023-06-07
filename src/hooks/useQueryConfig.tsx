import { omitBy, isUndefined } from 'lodash';

import { ProductListParamsType } from 'src/types/product.type';
import useQueryParams from './useQueryParams';

export type QueryConfigType = {
  [key in keyof ProductListParamsType]: string;
};

const useQueryConfig = () => {
  const queryParams: QueryConfigType = useQueryParams();
  const queryConfig: QueryConfigType = omitBy(
    {
      category: queryParams.category,
      exclude: queryParams.exclude,
      limit: queryParams.limit || 30,
      name: queryParams.name,
      order: queryParams.order,
      page: queryParams.page || '1',
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by
    },
    isUndefined
  );
  return queryConfig;
};

export default useQueryConfig;
