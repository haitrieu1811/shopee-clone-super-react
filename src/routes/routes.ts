import config from 'src/config';

import { LayoutType } from 'src/types/layout.type';

import RegisterLayout from 'src/layouts/RegisterLayout';

import MainLayout from 'src/layouts/MainLayout';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Profile from 'src/pages/Profile';
import ProductDetail from 'src/pages/ProductDetail';
import Cart from 'src/pages/Cart';
import CartLayout from 'src/layouts/CartLayout';

interface Route {
    path: string;
    page: () => JSX.Element;
    layout: ({ children }: LayoutType) => JSX.Element;
    children?: Route[];
    index?: boolean;
}

export const publicRoutes: Route[] = [
    { path: config.routes.home, page: Home, layout: MainLayout, index: true },
    { path: config.routes.notFound, page: NotFound, layout: MainLayout },
    { path: config.routes.productDetail, page: ProductDetail, layout: MainLayout }
];

export const protectedRoutes: Route[] = [
    { path: config.routes.profile, page: Profile, layout: MainLayout },
    { path: config.routes.cart, page: Cart, layout: CartLayout }
];

export const injectedRoutes: Route[] = [
    { path: config.routes.login, page: Login, layout: RegisterLayout },
    { path: config.routes.register, page: Register, layout: RegisterLayout }
];
