import { beforeEach, describe, expect, it } from 'vitest';

import { User } from 'src/types/user.type';
import {
  clearLocalStorage,
  getAccessTokenFromStorage,
  getProfileFromStorage,
  getRefreshTokenFromStorage,
  setAccessTokenToStorage,
  setProfileToStorage,
  setRefreshTokenToStorage
} from '../auth';

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTJUMTQ6MTg6MjEuMDUzWiIsImlhdCI6MTY4NjU3OTUwMSwiZXhwIjoxNjg2NTc5NTExfQ.pTW18XHizq6yOFBGgxPIhgq0l4V7BFDIZGbMKJZfmBY';

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTJUMTM6NTI6MzMuMjU4WiIsImlhdCI6MTY4NjU3Nzk1MywiZXhwIjoxNjg2NTgxNTUzfQ.cIFThCGUZJx6xk2om85IP_GDGJ4ExwHno7vD74g192E';

const profile = {
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
};

beforeEach(() => {
  localStorage.clear();
});

describe('access_token', () => {
  it('Set và lấy được access_token từ localstorage', () => {
    setAccessTokenToStorage(access_token);
    expect(getAccessTokenFromStorage()).toBe(access_token);
  });
});

describe('refresh_token', () => {
  it('Set và lấy được refresh_token từ localstorage', () => {
    setRefreshTokenToStorage(refresh_token);
    expect(getRefreshTokenFromStorage()).toBe(refresh_token);
  });
});

describe('profile', () => {
  it('Set và lấy được profile từ localstorage', () => {
    setProfileToStorage(profile as User);
    expect(getProfileFromStorage()).toEqual(profile);
  });
});

describe('clearLocalStorage', () => {
  it('Clear được access_token refresh_token và profile khỏi localstorage', () => {
    setAccessTokenToStorage(access_token);
    setRefreshTokenToStorage(refresh_token);
    setProfileToStorage(profile as User);
    clearLocalStorage();
    expect(getAccessTokenFromStorage()).toBe('');
    expect(getRefreshTokenFromStorage()).toBe('');
    expect(getProfileFromStorage()).toEqual(null);
  });
});
