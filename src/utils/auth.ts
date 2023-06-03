import { User } from 'src/types/user.type';

export const getAccessTokenFromStorage = () => {
    return localStorage.getItem('access_token') || '';
};

export const setAccessTokenToStorage = (access_token: string) => {
    localStorage.setItem('access_token', access_token);
};

export const removeAccessTokenFromStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
};

export const getProfileFromStorage = () => {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
};

export const setProfileToStorage = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile));
};
