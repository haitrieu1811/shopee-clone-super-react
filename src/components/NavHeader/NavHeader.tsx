import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment, memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import authApi from 'src/apis/auth.api';
import config from 'src/config';
import { purchaseStatus } from 'src/constants/purchase';
import { AppContext } from 'src/contexts/app.context';
import { getAvatarUrl, setLanguageToLS } from 'src/utils/utils';
import { ChevronDownIcon, GlobalIcon } from '../Icons';
import Poppover from '../Poppover';
import { locales } from 'src/i18n/i18n';
import classNames from 'classnames';

const NavHeader = () => {
  const queryClient = useQueryClient();

  const { i18n, t } = useTranslation(['pages', 'components']);

  const currentLanguage = locales[i18n.language as keyof typeof locales];

  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext);

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
      setProfile(null);
      queryClient.removeQueries({ queryKey: ['cartList', { status: purchaseStatus.inCart }] });
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleChangeLanguage = (lang: 'vi' | 'en') => {
    i18n.changeLanguage(lang);
    setLanguageToLS(lang);
  };

  return (
    <nav className='py-2'>
      <div className='flex flex-col-reverse flex-wrap items-center justify-center md:flex-row md:justify-end'>
        <div className='flex items-center'>
          <Poppover
            className='mr-6 flex items-center text-white hover:cursor-pointer hover:text-[#ffffffb3]'
            reference={
              <Fragment>
                <GlobalIcon className='h-[15px] w-[15px]' />
                <span className='mx-1 text-[13px]'>{currentLanguage}</span>
                <ChevronDownIcon className='h-[12px] w-[12px]' />
              </Fragment>
            }
            floating={
              <Fragment>
                <div
                  tabIndex={0}
                  role='button'
                  aria-hidden='true'
                  onClick={() => handleChangeLanguage('vi')}
                  className={classNames('min-w-[160px] px-4 py-2 text-sm text-gray-700 ', {
                    'cursor-not-allowed text-orange': currentLanguage === locales.vi,
                    ' hover:cursor-pointer hover:text-orange': currentLanguage !== locales.vi
                  })}
                >
                  {t('components:nav_header.vietnamese')}
                </div>
                <div
                  tabIndex={0}
                  role='button'
                  aria-hidden='true'
                  onClick={() => handleChangeLanguage('en')}
                  className={classNames('min-w-[160px] px-4 py-2 text-sm text-gray-700 ', {
                    'cursor-not-allowed text-orange': currentLanguage === locales.en,
                    ' hover:cursor-pointer hover:text-orange': currentLanguage !== locales.en
                  })}
                >
                  {t('components:nav_header.english')}
                </div>
              </Fragment>
            }
          />
          {isAuthenticated ? (
            <Poppover
              reference={
                <Link
                  to={config.routes.historyPurchase}
                  className='mt-1 flex items-center text-white hover:text-[#ffffffb3] md:mt-0'
                >
                  <img
                    src={getAvatarUrl(profile?.avatar)}
                    alt='Avatar'
                    className='h-5 w-5 flex-shrink-0 rounded-full'
                  />
                  <span className='mb-[3px] ml-[6px] text-sm'>{profile?.email}</span>
                </Link>
              }
              floating={
                <Fragment>
                  <Link
                    to={config.routes.profile}
                    className='block min-w-[160px] px-4 py-2 text-sm font-medium capitalize text-gray-700 hover:cursor-pointer hover:bg-[#fafafa] hover:text-[#00bfa5]'
                  >
                    {t('components:nav_header.my_account')}
                  </Link>
                  <Link
                    to={config.routes.historyPurchase}
                    className='block min-w-[160px] px-4 py-2 text-sm font-medium capitalize text-gray-700 hover:cursor-pointer hover:bg-[#fafafa] hover:text-[#00bfa5]'
                  >
                    {t('components:nav_header.purchases')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block min-w-[160px] px-4 py-2 text-left text-sm font-medium capitalize text-gray-700 hover:cursor-pointer hover:bg-[#fafafa] hover:text-[#00bfa5]'
                  >
                    {t('components:nav_header.logout')}
                  </button>
                </Fragment>
              }
            />
          ) : (
            <Fragment>
              <Link
                to={config.routes.register}
                className='text-[13px] font-medium text-gray-100 hover:text-[#ffffffb3]'
              >
                {t('pages:login_register.register')}
              </Link>
              <div className='mx-2 h-3 w-[1px] bg-gray-100'></div>
              <Link to={config.routes.login} className='text-[13px] font-medium text-gray-100 hover:text-[#ffffffb3]'>
                {t('pages:login_register.login')}
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(NavHeader);
