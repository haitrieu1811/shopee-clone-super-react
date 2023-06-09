import config from 'src/config';

import { LayoutType } from 'src/types/layout.type';

import RegisterLayout from 'src/layouts/RegisterLayout';

import CartLayout from 'src/layouts/CartLayout';
import MainLayout from 'src/layouts/MainLayout';
import Cart from 'src/pages/Cart';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductDetail from 'src/pages/ProductDetail';
import Register from 'src/pages/Register';
import User from 'src/pages/User/User';
import ChangePassword from 'src/pages/User/pages/ChangePassword/ChangePassword';
import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase/HistoryPurchase';
import Profile from 'src/pages/User/pages/Profile';

export interface RouteType {
  path: string;
  page: () => JSX.Element;
  layout: ({ children }: LayoutType) => JSX.Element;
  children?: RouteType[];
  index?: boolean;
}

export const publicRoutes: RouteType[] = [
  { path: config.routes.home, page: Home, layout: MainLayout, index: true },
  { path: config.routes.notFound, page: NotFound, layout: MainLayout },
  { path: config.routes.productDetail, page: ProductDetail, layout: MainLayout }
];

export const protectedRoutes: RouteType[] = [
  {
    path: config.routes.user,
    page: User,
    layout: MainLayout,
    children: [
      { path: config.routes.profile, page: Profile, layout: MainLayout },
      { path: config.routes.changePassword, page: ChangePassword, layout: MainLayout },
      { path: config.routes.historyPurchase, page: HistoryPurchase, layout: MainLayout }
    ]
  },
  { path: config.routes.cart, page: Cart, layout: CartLayout }
];

export const injectedRoutes: RouteType[] = [
  { path: config.routes.login, page: Login, layout: RegisterLayout },
  { path: config.routes.register, page: Register, layout: RegisterLayout }
];
