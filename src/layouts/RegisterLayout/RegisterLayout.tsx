import { Fragment } from 'react';

import { LayoutType } from 'src/types/layout.type';
import RegisterHeader from '../components/RegisterHeader';
import Footer from 'src/components/Footer';

const RegisterLayout = ({ children }: LayoutType) => {
  return (
    <Fragment>
      <RegisterHeader />
      {children}
      <Footer />
    </Fragment>
  );
};

export default RegisterLayout;
