import { waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import config from 'src/config';
import { access_token } from 'src/msw/auth.msw';
import { logScreen, renderWithRouter } from 'src/utils/__test__/testUtils';
import { setAccessTokenToStorage } from 'src/utils/auth';

describe('Profile.tsx', () => {
  test('Hiển thị được trang Profile', async () => {
    setAccessTokenToStorage(access_token);
    const { container } = renderWithRouter({ route: config.routes.profile });
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Tài khoản của tôi');
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe(
        'Trần Hải Triều'
      );
    });
    await logScreen();
  });
});
