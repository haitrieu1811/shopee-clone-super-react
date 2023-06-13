import { rest } from 'msw';

import config from 'src/config';
import httpStatusCode from 'src/constants/httpStatusCode';

const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTJUMTU6NTQ6MjQuMjY3WiIsImlhdCI6MTY4NjU4NTI2NCwiZXhwIjoxNjg2NTg1MjY1fQ.M0vptZZCAxnR2oYBFTgBZ22dp8eNT5LXpPVln6axO9M';
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzIwMDg3MWFmYzJlMWExZjk2N2M1YyIsImVtYWlsIjoiaGFpdHJpZXUxODExQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDYtMTJUMTU6NTQ6MjQuMjY3WiIsImlhdCI6MTY4NjU4NTI2NCwiZXhwIjoxNjg3MTg1MjY0fQ.nN_iuINHihkSv9H-cDXhrFM6lSTZETnO5g9OVqbjzjs';

const meResponse = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '647200871afc2e1a1f967c5c',
    roles: ['User'],
    email: 'haitrieu1811@gmail.com',
    createdAt: '2023-05-27T13:07:19.321Z',
    updatedAt: '2023-06-12T06:34:56.756Z',
    address: 'Tiền Giang, Việt Nam',
    avatar: 'aa96a50d-24ee-4dc5-b796-658af0c4cc36.png',
    date_of_birth: '2000-11-17T17:00:00.000Z',
    name: 'Trần Hải Triều',
    phone: '0775939704'
  }
};

const meRequest = rest.get(`${config.app.baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get('Authorization');
  if (access_token === access_token_1s) {
    return res(
      ctx.status(httpStatusCode.Unauthorized),
      ctx.json({
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN'
        }
      })
    );
  }
  return res(ctx.status(httpStatusCode.Ok), ctx.json(meResponse));
});

const userRequests = [meRequest];
export default userRequests;
