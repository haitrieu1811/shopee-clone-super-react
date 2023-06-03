const routes = {
    home: '/',
    login: '/login',
    logout: '/logout',
    register: '/register',
    profile: '/profile',
    productDetail: '/products/:productId',
    cart: '/cart',
    notFound: '*'
} as const;

export default routes;
