import { describe, expect, test } from 'vitest';

import { delay, logScreen, renderWithRouter } from 'src/utils/__test__/testUtils';

describe('ProductDetail', () => {
  test('Render thành công giao diện chi tiết sản phẩm', async () => {
    renderWithRouter({
      route: '/product/Điện-Thoại-Xiaomi-Redmi-9A-2GB32GB--Hàng-Chính-Hãng-i-60afb07e6ef5b902180aacb6'
    });
    await delay(1000);
    expect(document.body).toMatchSnapshot();
  });
});
