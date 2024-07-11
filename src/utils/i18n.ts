import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enJson from '../i18n/en.json';
import ruJson from '../i18n/ru.json';
import uzJson from '../i18n/uz.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enJson,
      },
      ru: {
        translation: ruJson,
      },
      uz: {
        translation: uzJson,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
