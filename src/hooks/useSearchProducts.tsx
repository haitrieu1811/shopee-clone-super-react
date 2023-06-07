import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';

import config from 'src/config';
import useQueryConfig from 'src/hooks/useQueryConfig';
import { SearchSchema, searchSchema } from 'src/utils/rules';

type FormData = SearchSchema;

const useSearchProducts = () => {
  const navigate = useNavigate();

  const queryConfig = useQueryConfig();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name_search: ''
    },
    resolver: yupResolver(searchSchema)
  });

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: config.routes.home,
      search: createSearchParams({
        ...queryConfig,
        name: data.name_search
      }).toString()
    });
  });

  return { onSubmit, register };
};

export default useSearchProducts;
