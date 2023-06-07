import { ReactNode, Fragment } from 'react';
import CartHeader from '../components/CartHeader';
import Footer from 'src/components/Footer';

const CartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <CartHeader />
      {children}
      <Footer />
    </Fragment>
  );
};

export default CartLayout;
