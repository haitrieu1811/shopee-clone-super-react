const routes = {
    home: '/',
    login: '/login',
    logout: '/logout',
    register: '/register',
    profile: '/profile',
    productDetail: '/:nameId',
    cart: '/cart',
    notFound: '*'
} as const;

export default routes;
