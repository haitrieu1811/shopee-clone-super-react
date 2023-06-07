import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import authApi from 'src/apis/auth.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import config from 'src/config';
import { AppContext } from 'src/contexts/app.context';
import { ErrorResponse } from 'src/types/utils.type';
import { LoginSchema, loginSchema } from 'src/utils/rules';
import { isEntityError } from 'src/utils/utils';

type FormData = LoginSchema;

const Login = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body),
    onSuccess: (data) => {
      const profile = data.data.data.user;
      setIsAuthenticated(true);
      setProfile(profile);
      navigate(config.routes.home);
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            });
          });
        }
      }
    }
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-6 lg:py-20 lg:pr-32'>
          <div className='lg:col-span-2 lg:col-start-5'>
            <form className='rounded bg-white p-8 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                type='email'
                name='email'
                className='mt-6'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                type='password'
                name='password'
                className='mt-6'
                placeholder='Mật khẩu'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-6'>
                <Button
                  className='w-full rounded-sm bg-orange py-3 text-sm uppercase text-white hover:opacity-90'
                  isLoading={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-6 text-center text-sm text-gray-400'>
                Bạn mới biết đến Shopee?
                <Link to={config.routes.register} className='ml-1 font-medium text-orange'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
