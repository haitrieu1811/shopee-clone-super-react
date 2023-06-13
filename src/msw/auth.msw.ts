import { rest } from 'msw';

import config from 'src/config';
import httpStatusCode from 'src/constants/httpStatusCode';

export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTNUMTc6MzQ6NDMuMzc5WiIsImlhdCI6MTY4NjY3NzY4MywiZXhwIjoyNjg2Njc3NjgyfQ.9mTdoBfZaYMGftlo0TB5H4mMNP-jT0KE2zWL3BvOOt0';

const loginResponse = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTNUMTI6NTY6MDguMjQxWiIsImlhdCI6MTY4NjY2MDk2OCwiZXhwIjoxNjg2NjYwOTc4fQ.oEGxTf5YkC1Vubikqg8htJOqwZ-qhc3lXGaehfPCPDs',
    expires: 10,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTNUMTI6NTY6MDguMjQxWiIsImlhdCI6MTY4NjY2MDk2OCwiZXhwIjoxNjg2NjYwOTg4fQ.3RJ0DCyUAdjHLotpmOYdM63vyriUB4D4B8Fpx06kD4M',
    expires_refresh_token: 20,
    user: {
      _id: '647200871afc2e1a1f967c5c',
      roles: ['User'],
      email: 'haitrieu1811@gmail.com',
      createdAt: '2023-05-27T13:07:19.321Z',
      updatedAt: '2023-06-12T06:34:56.756Z',
      __v: 0,
      address: 'Tiền Giang, Việt Nam',
      avatar: 'aa96a50d-24ee-4dc5-b796-658af0c4cc36.png',
      date_of_birth: '2000-11-17T17:00:00.000Z',
      name: 'Trần Hải Triều',
      phone: '0775939704'
    }
  }
};

const refreshTokenResponse = {
  message: 'Lỗi',
  data: {
    message: 'Token hết hạn',
    name: 'EXPIRED_TOKEN'
  }
};

const loginRequest = rest.post(`${config.app.baseUrl}login`, (_, res, ctx) => {
  return res(ctx.status(httpStatusCode.Ok), ctx.json(loginResponse));
});

const refreshToken = rest.post(`${config.app.baseUrl}refresh-access-token`, (_, res, ctx) => {
  return res(ctx.status(httpStatusCode.Ok), ctx.json(refreshTokenResponse));
});

const authRequests = [loginRequest, refreshToken];
export default authRequests;
