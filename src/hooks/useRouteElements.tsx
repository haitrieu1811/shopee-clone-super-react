import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { injectedRoutes, protectedRoutes, publicRoutes } from 'src/routes';
import useRenderRoutes from './useRenderRoutes';

const useRouteElements = () => {
  // PUBLIC ROUTES
  const publicRouteElements = useRenderRoutes(publicRoutes, 'public');

  // PROTECTED ROUTES
  const protectedRouteElements = useRenderRoutes(protectedRoutes, 'protected');

  // INJECTED ROUTES
  const injectedRouteElements = useRenderRoutes(injectedRoutes, 'injected');

  const element = useRoutes([...publicRouteElements, ...protectedRouteElements, ...injectedRouteElements]);
  return element;
};

export default useRouteElements;
