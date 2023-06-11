import config from 'src/config';

import { LayoutType } from 'src/types/layout.type';

import CartLayout from 'src/layouts/CartLayout';
import MainLayout from 'src/layouts/MainLayout';
import OnlyContent from 'src/layouts/OnlyContent/OnlyContent';
import RegisterLayout from 'src/layouts/RegisterLayout';

import Cart from 'src/pages/Cart';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductDetail from 'src/pages/ProductDetail';
import Register from 'src/pages/Register';
import ChangePassword from 'src/pages/User/pages/ChangePassword/ChangePassword';
import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase/HistoryPurchase';
import Profile from 'src/pages/User/pages/Profile';
import User from 'src/pages/User/User';

// const CartLayout = lazy(() => import('src/layouts/CartLayout'));
// const MainLayout = lazy(() => import('src/layouts/MainLayout'));
// const OnlyContent = lazy(() => import('src/layouts/OnlyContent/OnlyContent'));
// const RegisterLayout = lazy(() => import('src/layouts/RegisterLayout'));

// const Cart = lazy(() => import('src/pages/Cart'));
// const Home = lazy(() => import('src/pages/Home'));
// const Login = lazy(() => import('src/pages/Login'));
// const NotFound = lazy(() => import('src/pages/NotFound'));
// const ProductDetail = lazy(() => import('src/pages/ProductDetail'));
// const Register = lazy(() => import('src/pages/Register'));
// const User = lazy(() => import('src/pages/User/User'));
// const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword/ChangePassword'));
// const HistoryPurchase = lazy(() => import('src/pages/User/pages/HistoryPurchase/HistoryPurchase'));
// const Profile = lazy(() => import('src/pages/User/pages/Profile'));

export interface RouteType {
  path: string;
  page: () => JSX.Element;
  layout: ({ children }: LayoutType) => JSX.Element;
  children?: RouteType[];
  index?: boolean;
}

export const publicRoutes: RouteType[] = [
  { path: config.routes.home, page: Home, layout: MainLayout, index: true },
  { path: config.routes.notFound, page: NotFound, layout: OnlyContent },
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
