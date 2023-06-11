import { yupResolver } from '@hookform/resolvers/yup';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import userApi from 'src/apis/user.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { ErrorResponse } from 'src/types/utils.type';
import { ChangePasswordSchema, changePasswordSchema } from 'src/utils/rules';
import { isEntityError } from 'src/utils/utils';
import Heading from '../../components/Heading';

type ChangePasswordFormData = ChangePasswordSchema;

const ChangePassword = () => {
  const { t } = useTranslation('pages');
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  });

  const changePasswordMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setValue('password', '');
      setValue('new_password', '');
      setValue('confirm_password', '');
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = omit(data, ['confirm_password']);
      await changePasswordMutation.mutateAsync(body);
    } catch (error) {
      if (isEntityError<ErrorResponse<ChangePasswordFormData>>(error)) {
        const formError = error.response?.data.data;
        if (!isEmpty(formError)) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof ChangePasswordFormData, {
              message: formError[key as keyof ChangePasswordFormData],
              type: 'Server'
            });
          });
        }
      }
    }
  });

  return (
    <div className='h-[585px] rounded-sm bg-white px-[30px] pb-[10px] shadow'>
      <div className='border-b-[1px] border-b-gray-200 py-[18px]'>
        <Heading
          title={t('change_password.change_password')}
          description={t('change_password.change_password_description')}
        />
      </div>
      <form className='pt-[25px]' onSubmit={onSubmit}>
        <div className='flex items-center'>
          <div className='w-[224px] text-right text-sm text-black/[0.65]'>{t('change_password.old_password')}</div>
          <Input
            type='password'
            name='password'
            className='ml-5 w-[400px]'
            register={register}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className='mt-3 flex items-center'>
          <div className='w-[224px] text-right text-sm text-black/[0.65]'>{t('change_password.new_password')}</div>
          <Input
            type='password'
            name='new_password'
            className='ml-5 w-[400px]'
            register={register}
            errorMessage={errors.new_password?.message}
          />
        </div>
        <div className='mt-3 flex items-center'>
          <div className='w-[224px] text-right text-sm text-black/[0.65]'>{t('change_password.confirm_password')}</div>
          <Input
            type='password'
            name='confirm_password'
            className='ml-5 w-[400px]'
            register={register}
            errorMessage={errors.confirm_password?.message}
          />
        </div>
        <div className='mt-[30px] flex items-center'>
          <div className='md:w-[224px]'></div>
          <Button
            isLoading={changePasswordMutation.isLoading}
            className='ml-5 h-10 rounded-sm bg-orange px-5 text-sm capitalize text-white'
          >
            {t('change_password.confirm')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
