import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import zh from './locales/zh/common.json';
import ms from './locales/ms/common.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

const detectDefaultLang = () => {
  if (savedLang) return savedLang;
  const lang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ms') || lang.startsWith('id') || lang.startsWith('bm')) return 'ms';
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      zh: { common: zh },
      ms: { common: ms },
    },
    lng: detectDefaultLang(),
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18n;