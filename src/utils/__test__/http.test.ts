import { beforeEach, describe, expect, it } from 'vitest';

import http, { Http } from '../http';
import HttpStatusCode from 'src/constants/httpStatusCode';
import { setAccessTokenToStorage, setRefreshTokenToStorage } from '../auth';

describe('Http Axios', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Gọi API', async () => {
    const res = await http.get('products');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it('Auth Request', async () => {
    await http.post('login', {
      email: 'haitrieu1811@gmail.com',
      password: '01225939704a'
    });
    const res = await http.get('me');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it('Refresh Token', async () => {
    const access_token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTJUMTU6NTQ6MjQuMjY3WiIsImlhdCI6MTY4NjU4NTI2NCwiZXhwIjoxNjg2NTg1MjY1fQ.M0vptZZCAxnR2oYBFTgBZ22dp8eNT5LXpPVln6axO9M';
    const refresh_token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTJUMTU6NTQ6MjQuMjY3WiIsImlhdCI6MTY4NjU4NTI2NCwiZXhwIjoxNjg3MTg1MjY0fQ.nN_iuINHihkSv9H-cDXhrFM6lSTZETnO5g9OVqbjzjs';
    setAccessTokenToStorage(access_token);
    setRefreshTokenToStorage(refresh_token);
    const newHttp = new Http().instance;
    const res = await newHttp.get('me');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });
});
