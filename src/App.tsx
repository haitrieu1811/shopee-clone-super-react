import { Fragment, useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from './config';
import { injectedRoutes, protectedRoutes, publicRoutes } from './routes';
import { AppContext } from './contexts/app.context';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={config.routes.login} />;
};
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={config.routes.home} />;
};

const App = () => {
  // PUBLIC ROUTES
  const publicRouteElements = publicRoutes.map((route) => {
    const Layout = route.layout;
    const Page = route.page;

    if (route.children) {
      return {
        path: route.path,
        element: (
          <Layout>
            <Page />
          </Layout>
        ),
        children: route.children.map((childrenRoute) => {
          const ChildrenPage = childrenRoute.page;
          return {
            path: childrenRoute.path,
            element: <ChildrenPage />
          };
        })
      };
    }

    return {
      index: route.index,
      path: route.path,
      element: (
        <Layout>
          <Page />
        </Layout>
      )
    };
  });

  // PROTECTED ROUTES
  const protectedRouteElements =
    protectedRoutes && protectedRoutes.length > 0
      ? [
          {
            path: '',
            element: <ProtectedRoute />,
            children: protectedRoutes.map((route) => {
              const Layout = route.layout;
              const Page = route.page;
              return {
                path: route.path,
                element: (
                  <Layout>
                    <Page />
                  </Layout>
                )
              };
            })
          }
        ]
      : [];

  // INJECTED ROUTES
  const injectedRouteElements =
    injectedRoutes && injectedRoutes.length > 0
      ? [
          {
            path: '',
            element: <RejectedRoute />,
            children: injectedRoutes.map((route) => {
              const Layout = route.layout;
              const Page = route.page;
              return {
                path: route.path,
                element: (
                  <Layout>
                    <Page />
                  </Layout>
                )
              };
            })
          }
        ]
      : [];

  const element = useRoutes([...publicRouteElements, ...protectedRouteElements, ...injectedRouteElements]);

  return (
    <Fragment>
      {element}
      <ToastContainer position='top-center' />
    </Fragment>
  );
};

export default App;
