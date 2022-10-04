import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from './translaition/en.json';
import lt from './translaition/lt.json';
import languageDetector from 'i18next-browser-languagedetector';
i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init(
        {
            resources: {
                en, lt
            },
            whiteList: ['en', 'lt'],
            lang: "en",
            fallbackLng: "en",
            interpolation: {
                escapeValue: false
            }
        }
    );

export default i18n;