import { LANGUAGE_LIST } from "components/Header/LangDropdown";
import { useEffect } from "react";

export default function useGoogleTranslateScript() {
  useEffect(() => {
      const addScript = document.createElement('script');
      addScript.setAttribute(
          'src',
          '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      );
      document.body.appendChild(addScript);
    // @ts-ignore
      window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
              {
                  includedLanguages: 'ru,uz',
                  autoDisplay: false
              },
              'translateWrapper'
          );
      };
  }, []);
}