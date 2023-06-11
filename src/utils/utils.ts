import axios, { AxiosError } from 'axios';

import defaultAvatar from 'src/assets/images/default-avatar.jpg';
import config from 'src/config';
import HttpStatusCode from 'src/constants/httpStatusCode';
import { ErrorResponse } from 'src/types/utils.type';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

export const isEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};

export const isUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
};

export const isExpiredError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return (
    isUnauthorizedError<ErrorResponse<{ message: string; name: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  );
};

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('de-DE').format(currency);
};

export const formatNumberToSocialStyle = (number: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.', ',')
    .toLocaleLowerCase();
};

export const rateSale = (originalPrice: number, salePrice: number) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

const removeSpecialCharacter = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');
};

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-');
  return arr[arr.length - 1];
};

export const getAvatarUrl = (imageName?: string) => {
  return imageName ? `${config.app.baseUrl}images/${imageName}` : defaultAvatar;
};

export const setLanguageToLS = (lang: string) => {
  localStorage.setItem('language', lang);
};

export const getLanguageFromLS = () => {
  return localStorage.getItem('language') || 'vi';
};
