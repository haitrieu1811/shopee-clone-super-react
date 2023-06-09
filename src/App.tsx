import { Fragment, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContext } from './contexts/app.context';
import useRouteElements from './hooks/useRouteElements';
import { localStorageEventTarget } from './utils/auth';

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
    <Fragment>
      {element}
      <ToastContainer position='top-center' autoClose={2000} />
    </Fragment>
  );
};

export default App;
