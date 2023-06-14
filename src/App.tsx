import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import { AppContext } from './contexts/app.context.tsx';
import useRouteElements from './hooks/useRouteElements';
import './i18n/i18n.ts';
import './index.css';
import { localStorageEventTarget } from './utils/auth';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.tsx';

const App = () => {
  const element = useRouteElements();
  const { reset } = useContext(AppContext);

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ScrollToTop>
          {element}
          <ToastContainer position='top-center' autoClose={2000} />
        </ScrollToTop>
      </ErrorBoundary>
      <ReactQueryDevtools />
    </HelmetProvider>
  );
};

export default App;
