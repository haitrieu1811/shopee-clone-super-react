import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import config from 'src/config';
import { AppContext } from 'src/contexts/app.context';
import { RouteType } from 'src/routes';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={config.routes.login} />;
};
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={config.routes.home} />;
};

const useRenderRoutes = (routes: RouteType[], type: 'public' | 'protected' | 'injected') => {
  switch (type) {
    case 'public':
      return routes.map((route) => {
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
    case 'protected':
      return [
        {
          path: '',
          element: <ProtectedRoute />,
          children: routes.map((route) => {
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
              path: route.path,
              element: (
                <Layout>
                  <Page />
                </Layout>
              )
            };
          })
        }
      ];
    case 'injected':
      return [
        {
          path: '',
          element: <RejectedRoute />,
          children: routes.map((route) => {
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
              path: route.path,
              element: (
                <Layout>
                  <Page />
                </Layout>
              )
            };
          })
        }
      ];
    default:
      return [];
  }
};

export default useRenderRoutes;
