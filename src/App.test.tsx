import { screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import config from './config';
import { logScreen, renderWithRouter } from './utils/__test__/testUtils';

describe('App', () => {
  test('App render và chuyển trang được', async () => {
    const { user } = renderWithRouter();
    // Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone');
    });
    // Verify chuyển trang sang Login
    await user.click(screen.getByText(/Đăng nhập/i));
    await waitFor(() => {
      expect(screen.queryByText('Bạn mới biết đến Shopee?')).toBeInTheDocument();
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone');
    });
  });

  test('Test trang Not Found', async () => {
    renderWithRouter({ route: '/some/bad/route' });
    await waitFor(() => {
      expect(screen.queryByText(/404/i)).toBeInTheDocument();
      expect(document.querySelector('title')?.textContent).toBe('404 Not Found');
    });
  });

  test('Test trang Register', async () => {
    renderWithRouter({ route: config.routes.register });
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument();
      expect(document.querySelector('title')?.textContent).toBe('Đăng ký | Shopee Clone');
    });
    await logScreen();
  });
});
