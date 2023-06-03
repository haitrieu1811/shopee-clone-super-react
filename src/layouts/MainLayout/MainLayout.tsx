import { Fragment } from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

import { LayoutType } from 'src/types/layout.type';

const MainLayout = ({ children }: LayoutType) => {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
};

export default MainLayout;
