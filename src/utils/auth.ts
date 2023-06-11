import { User } from 'src/types/user.type';

export const localStorageEventTarget = new EventTarget();

export const getAccessTokenFromStorage = () => {
  return localStorage.getItem('access_token') || '';
};

export const getRefreshTokenFromStorage = () => {
  return localStorage.getItem('refresh_token') || '';
};

export const setAccessTokenToStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const setRefreshTokenToStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token);
};

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('profile');
  const clearLSEvent = new Event('clearLS');
  localStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getProfileFromStorage = () => {
  const profile = localStorage.getItem('profile');
  return profile ? JSON.parse(profile) : null;
};

export const setProfileToStorage = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};
