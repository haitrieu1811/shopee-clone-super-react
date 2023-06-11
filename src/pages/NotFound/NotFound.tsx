import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import pageNotFoundImage from 'src/assets/images/page-not-found.svg';
import config from 'src/config';

const NotFound = () => {
  const { t } = useTranslation('pages');

  return (
    <div className=' bg-white pb-[50px] pt-[70px]'>
      <div className='flex flex-col items-center justify-center'>
        <img src={pageNotFoundImage} alt='Page not found' className='mx-auto h-[120px] w-[120px] object-contain' />
        <h2 className='mb-2 mt-4 font-medium text-black/[0.65]'>404</h2>
        <div className='text-sm text-black/[0.54]'>{t('not_found.missing')}</div>
        <Link
          to={config.routes.home}
          className='mx-auto mt-4 inline-flex h-9 items-center justify-center rounded-sm bg-orange px-4 text-sm text-white hover:bg-orange/90'
        >
          {t('not_found.back_home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
