import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { omit, isEmpty } from 'lodash';

import Input from 'src/components/Input';
import config from 'src/config';
import { RegisterSchema, registerSchema } from 'src/utils/rules';
import { isEntityError } from 'src/utils/utils';
import { ErrorResponse } from 'src/types/utils.type';
import { useContext } from 'react';
import { AppContext } from 'src/contexts/app.context';
import Button from 'src/components/Button';
import authApi from 'src/apis/auth.api';

type FormData = RegisterSchema;

const Register = () => {
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(registerSchema) });

    const { setIsAuthenticated, setProfile } = useContext(AppContext);

    const navigate = useNavigate();

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body),
        onSuccess: (data) => {
            const profile = data.data.data.user;
            setIsAuthenticated(true);
            setProfile(profile);
            navigate(config.routes.home);
        },
        onError: (error) => {
            if (isEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
                const formError = error.response?.data.data;
                if (!isEmpty(formError)) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof Omit<FormData, 'confirm_password'>, {
                            message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                            type: 'Server'
                        });
                    });
                }
            }
        }
    });

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirm_password']);
        registerAccountMutation.mutate(body);
    });

    return (
        <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-6 lg:py-20 lg:pr-32'>
                    <div className='lg:col-span-2 lg:col-start-5'>
                        <form className='rounded bg-white p-8 shadow-sm' onSubmit={onSubmit} noValidate>
                            <div className='text-2xl'>Đăng ký</div>
                            <Input
                                type='email'
                                name='email'
                                className='mt-4'
                                placeholder='Email'
                                register={register}
                                errorMessage={errors.email?.message}
                            />
                            <Input
                                type='password'
                                name='password'
                                className='mt-4'
                                placeholder='Mật khẩu'
                                register={register}
                                errorMessage={errors.password?.message}
                                autoComplete='on'
                            />
                            <Input
                                type='password'
                                name='confirm_password'
                                className='mt-4'
                                placeholder='Nhập lại mật khẩu'
                                register={register}
                                errorMessage={errors.confirm_password?.message}
                                autoComplete='on'
                            />
                            <div className='mt-4'>
                                <Button
                                    className='w-full rounded-sm bg-orange py-3 text-sm uppercase text-white hover:opacity-90'
                                    isLoading={registerAccountMutation.isLoading}
                                >
                                    Đăng ký
                                </Button>
                            </div>
                            <div className='mt-8 text-center text-sm'>
                                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                                <Link to={config.routes.login} className='ml-1 font-medium text-orange'>
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
