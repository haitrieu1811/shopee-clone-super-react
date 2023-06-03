import axios, { AxiosError } from 'axios';
import HttpStatusCode from 'src/constants/httpStatusCode';

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error);
};

export const isEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
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
