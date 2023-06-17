/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api';
import config from 'src/config';
import HttpStatusCode from 'src/constants/httpStatusCode';
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type';
import { User } from 'src/types/user.type';
import { ErrorResponse } from 'src/types/utils.type';
import {
  clearLocalStorage,
  getAccessTokenFromStorage,
  getProfileFromStorage,
  getRefreshTokenFromStorage,
  setAccessTokenToStorage,
  setProfileToStorage,
  setRefreshTokenToStorage
} from './auth';
import { isExpiredError, isUnauthorizedError } from './utils';

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private profile: User;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;

  constructor() {
    this.accessToken = getAccessTokenFromStorage() || '';
    this.refreshToken = getRefreshTokenFromStorage() || '';
    this.refreshTokenRequest = null;
    this.profile = getProfileFromStorage() || null;
    this.instance = axios.create({
      baseURL: config.app.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10,
        'expire-refresh-token': 60 * 60
      }
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
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
        if (url === URL_LOGIN || url === URL_REGISTER) {
          this.accessToken = (response.data as AuthResponse).data.access_token;
          this.refreshToken = (response.data as AuthResponse).data.refresh_token;
          this.profile = (response.data as AuthResponse).data.user;
          setAccessTokenToStorage(this.accessToken);
          setRefreshTokenToStorage(this.refreshToken);
          setProfileToStorage(this.profile);
        } else if (url === URL_LOGOUT) {
          this.accessToken = '';
          this.refreshToken = '';
          clearLocalStorage();
        }
        return response;
      },

      (error: AxiosError) => {
        // Lỗi 422
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        // Lỗi 401 (Sai, thiếu hoặc hết hạn access token)
        if (isUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig);
          const { url } = config;
          // Khi access token hết hạn và không phải request từ refresh access token
          if (isExpiredError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });
            return this.refreshTokenRequest?.then((access_token) => {
              config.headers.Authorization = access_token;
              // Tiếp tục request cũ nếu bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: access_token }
              });
            });
          }
          clearLocalStorage();
          this.accessToken = '';
          this.refreshToken = '';
          toast.error(error.response?.data.data?.message || error.response?.data.message);
        }
        return Promise.reject(error);
      }
    );
  }

  private handleRefreshToken = () => {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, { refresh_token: this.refreshToken })
      .then((res) => {
        const { access_token } = res.data.data;
        setAccessTokenToStorage(access_token);
        this.accessToken = access_token;
        return access_token;
      })
      .catch((error) => {
        clearLocalStorage();
        this.accessToken = '';
        this.refreshToken = '';
        throw error;
      });
  };
}

const http = new Http().instance;
export default http;
