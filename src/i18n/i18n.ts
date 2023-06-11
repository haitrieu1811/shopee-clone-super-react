import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import COMPONENTS_EN from 'src/locales/en/components.json';
import COMPONENTS_VI from 'src/locales/vi/components.json';
import PAGES_EN from 'src/locales/en/pages.json';
import PAGES_VI from 'src/locales/vi/pages.json';
import LAYOUTS_EN from 'src/locales/en/layouts.json';
import LAYOUTS_VI from 'src/locales/vi/layouts.json';
import { getLanguageFromLS } from 'src/utils/utils';

const defaultLang = getLanguageFromLS();

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
};

export const defaultNS = 'components';

export const resources = {
  en: {
    components: COMPONENTS_EN,
    pages: PAGES_EN,
    layouts: LAYOUTS_EN
  },
  vi: {
    components: COMPONENTS_VI,
    pages: PAGES_VI,
    layouts: LAYOUTS_VI
  }
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  ns: ['components', 'pages', 'layouts'],
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;
