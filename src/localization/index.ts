import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import engTranslation from "./eng.json";
import uaTranslation from "./ua.json";

const resources = {
  en: {
    translation: engTranslation,
  },
  ua: {
    translation: uaTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
});

export default i18n;
