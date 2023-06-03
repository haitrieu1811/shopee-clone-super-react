/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import HttpStatusCode from 'src/constants/httpStatusCode';
import config from 'src/config';
import { AuthResponse } from 'src/types/auth.type';
import {
    getAccessTokenFromStorage,
    getProfileFromStorage,
    removeAccessTokenFromStorage,
    setAccessTokenToStorage,
    setProfileToStorage
} from './auth';
import { User } from 'src/types/user.type';

class Http {
    instance: AxiosInstance;
    private accessToken: string;
    private profile: User;

    constructor() {
        this.accessToken = getAccessTokenFromStorage() || '';
        this.profile = getProfileFromStorage() || null;
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = this.accessToken;
                    return config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (url === config.routes.login || url === config.routes.register) {
                    this.accessToken = (response.data as AuthResponse).data.access_token;
                    this.profile = (response.data as AuthResponse).data.user;
                    setAccessTokenToStorage(this.accessToken);
                    setProfileToStorage(this.profile);
                } else if (url === config.routes.logout) {
                    this.accessToken = '';
                    removeAccessTokenFromStorage();
                }
                return response;
            },

            (error: AxiosError) => {
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error.message;
                    toast.error(message);
                }
                return Promise.reject(error);
            }
        );
    }
}

const http = new Http().instance;
export default http;
