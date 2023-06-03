import { Link, useMatch } from 'react-router-dom';

import Logo from 'src/components/Logo';
import config from 'src/config';

const RegisterHeader = () => {
    const match = useMatch(config.routes.register);
    const isRegister = Boolean(match);

    return (
        <header className='py-5'>
            <div className='container'>
                <nav className='flex items-end'>
                    <Link to={config.routes.home}>
                        <Logo className='block w-32 fill-orange' />
                    </Link>
                    <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
                </nav>
            </div>
        </header>
    );
};

export default RegisterHeader;
