import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { isEmpty, omit } from 'lodash';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { ChangePasswordSchema, changePasswordSchema } from 'src/utils/rules';
import Heading from '../../components/Heading';
import { useMutation } from '@tanstack/react-query';
import userApi from 'src/apis/user.api';
import { toast } from 'react-toastify';
import { isEntityError } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';

type ChangePasswordFormData = ChangePasswordSchema;

const ChangePassword = () => {
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
          title='Đổi mật khẩu'
          description='Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác'
        />
      </div>
      <form className='pt-[25px]' onSubmit={onSubmit}>
        <div className='flex items-center'>
          <div className='w-[224px] text-right text-sm text-black/[0.65]'>Mật khẩu cũ</div>
          <Input
            type='password'
            name='password'
            className='ml-5 w-[400px]'
            register={register}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className='mt-3 flex items-center'>
          <div className='w-[224px] text-right text-sm text-black/[0.65]'>Mật khẩu mới</div>
          <Input
            type='password'
            name='new_password'
            className='ml-5 w-[400px]'
            register={register}
            errorMessage={errors.new_password?.message}
          />
        </div>
        <div className='mt-3 flex items-center'>
          <div className='w-[224px] text-right text-sm text-black/[0.65]'>Xác nhận mật khẩu</div>
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
            Xác nhận
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
