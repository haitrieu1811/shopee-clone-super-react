/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form';
import * as yup from 'yup';

type Rules = { [key in 'email' | 'pasword' | 'confirm_password']?: RegisterOptions };

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
    email: {
        required: { value: true, message: 'Email không được để trống' },
        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không đúng định dạng' },
        minLength: { value: 5, message: 'Độ dài từ 5 đến 160 kí tự' },
        maxLength: { value: 160, message: 'Độ dài từ 5 đến 160 kí tự' }
    },
    pasword: {
        required: { value: true, message: 'Mật khẩu không được để trống' },
        minLength: { value: 6, message: 'Độ dài mật khẩu từ 6 đến 160 kí tự' },
        maxLength: { value: 160, message: 'Độ dài mật khẩu từ 6 đến 160 kí tự' }
    },
    confirm_password: {
        required: { value: true, message: 'Nhập lại mật khẩu không được để trống' },
        minLength: { value: 6, message: 'Độ dài mật khẩu từ 6 đến 160 kí tự' },
        maxLength: { value: 160, message: 'Độ dài mật khẩu từ 6 đến 160 kí tự' },
        validate:
            typeof getValues === 'function'
                ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không chính xác'
                : undefined
    }
});

// function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
//     const { price_min, price_max } = this.parent;
//     if (price_min !== '' && price_max !== '') {
//         return Number(price_max) >= Number(price_min);
//     }
//     return price_min !== '' || price_max !== '';
// }

export const schema = yup.object({
    email: yup
        .string()
        .required('Email không được để trống')
        .email('Email không đúng định dạng')
        .min(5, 'Email có độ dài từ 5 đến 160 kí tự')
        .max(160, 'Email có độ dài từ 5 đến 160 kí tự'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có độ dài từ 6 đến 160 kí tự')
        .max(160, 'Mật khẩu phải có độ dài từ 6 đến 160 kí tự'),
    confirm_password: yup
        .string()
        .required('Nhập lại mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có độ dài từ 6 đến 160 kí tự')
        .max(160, 'Mật khẩu phải có độ dài từ 6 đến 160 kí tự')
        .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không chính xác'),
    price_min: yup.string().test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: function (value) {
            const price_min = value;
            const { price_max } = this.parent;
            if (price_min !== '' && price_max !== '') {
                return Number(price_max) >= Number(price_min);
            }
            return price_min !== '' || price_max !== '';
        }
    }),
    price_max: yup.string().test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: function (value) {
            const price_max = value;
            const { price_min } = this.parent;
            if (price_min !== '' && price_max !== '') {
                return Number(price_max) >= Number(price_min);
            }
            return price_min !== '' || price_max !== '';
        }
    })
});

export const loginSchema = schema.pick(['email', 'password']);
export const registerSchema = schema.pick(['email', 'password', 'confirm_password']);
export const priceFilterSchema = schema.pick(['price_min', 'price_max']);

export type LoginSchema = yup.InferType<typeof loginSchema>;
export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type PriceFilterSchema = yup.InferType<typeof priceFilterSchema>;

export type Schema = yup.InferType<typeof schema>;
