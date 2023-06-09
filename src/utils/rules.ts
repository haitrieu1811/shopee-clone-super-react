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

const confirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Nhập lại mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có độ dài từ 6 đến 160 kí tự')
    .max(160, 'Mật khẩu phải có độ dài từ 6 đến 160 kí tự')
    .oneOf([yup.ref(refString)], 'Nhập lại mật khẩu không chính xác');
};

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
  confirm_password: confirmPasswordYup('password'),
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
  }),
  name_search: yup.string().trim().required('Từ khóa tìm kiếm không được để trống')
});

export const loginSchema = schema.pick(['email', 'password']);
export const registerSchema = schema.pick(['email', 'password', 'confirm_password']);
export const priceFilterSchema = schema.pick(['price_min', 'price_max']);
export const searchSchema = schema.pick(['name_search']);

export const userSchema = yup.object({
  name: yup.string().max(160, 'Tên dài tối đa 160 kí tự'),
  phone: yup.string().max(20, 'Số điện thoại dài tối đa 20 kí tự'),
  address: yup.string().max(160, 'Địa chỉ dài tối đa 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khư'),
  avatar: yup.string().max(1000, 'Hình ảnh dài tối đa 1000 kí tự'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: confirmPasswordYup('new_password') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
});

export const changePasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_password']);

export type LoginSchema = yup.InferType<typeof loginSchema>;
export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type PriceFilterSchema = yup.InferType<typeof priceFilterSchema>;
export type SearchSchema = yup.InferType<typeof searchSchema>;
export type UserSchema = yup.InferType<typeof userSchema>;
export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>;

export type Schema = yup.InferType<typeof schema>;
