import { beforeAll, describe, expect, test } from 'vitest';
import { waitFor, screen, fireEvent } from '@testing-library/react';

import config from 'src/config';
import { logScreen, renderWithRouter } from 'src/utils/__test__/testUtils';

describe('Login.tsx', () => {
  let inputEmail: HTMLInputElement;
  let inputPassword: HTMLInputElement;
  let formLogin: HTMLFormElement;

  beforeAll(async () => {
    renderWithRouter({ route: config.routes.login });
    await waitFor(async () => {
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Mật khẩu/i)).toBeInTheDocument();
    });
    inputEmail = document.querySelector('input[placeholder="Email"]') as HTMLInputElement;
    inputPassword = document.querySelector('input[placeholder="Mật khẩu"]') as HTMLInputElement;
    formLogin = document.querySelector('form') as HTMLFormElement;
  });

  test('Hiển thị lỗi required khi không nhập gì vào input', async () => {
    fireEvent.submit(formLogin);
    await waitFor(() => {
      expect(screen.queryByText(/Email không được để trống/i)).toBeTruthy();
      expect(screen.queryByText(/Mật khẩu không được để trống/i)).toBeTruthy();
    });
  });

  test('Hiển thị lỗi nhập Email và Password không đúng định dạng', async () => {
    fireEvent.change(inputEmail, {
      target: {
        value: 'haitrieu1811'
      }
    });
    fireEvent.change(inputPassword, {
      target: {
        value: '132'
      }
    });
    fireEvent.submit(formLogin);
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy();
      expect(screen.queryByText('Mật khẩu phải có độ dài từ 6 đến 160 kí tự')).toBeTruthy();
    });
  });

  test('Không hiển thị lỗi khi nhập lại vào input đúng định dạng', async () => {
    fireEvent.change(inputEmail, {
      target: {
        value: 'haitrieu1811@gmail.com'
      }
    });
    fireEvent.change(inputPassword, {
      target: {
        value: '132456'
      }
    });
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy();
      expect(screen.queryByText('Mật khẩu phải có độ dài từ 6 đến 160 kí tự')).toBeFalsy();
    });
    fireEvent.submit(formLogin);
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone');
    });
    await logScreen();
  });
});
