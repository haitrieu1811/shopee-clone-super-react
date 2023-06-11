const routes = {
  home: '/',
  login: '/login',
  logout: '/logout',
  register: '/register',
  productDetail: '/product/:nameId',
  cart: '/cart',
  user: '/user/account',
  profile: '/user/account/profile',
  changePassword: '/user/account/password',
  historyPurchase: '/user/account/purchase',
  notFound: '*'
} as const;

export default routes;
