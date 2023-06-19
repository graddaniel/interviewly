import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    test: "testEn",
                    links: {
                        priceCalculator: 'Price calculator',
                        tutorials: 'Tutorials',
                        blog: 'Blog',
                        contact: 'Contact'
                    },
                    buttons: {
                        signUp: 'Join Interviewly',
                        resign: 'Resign',
                    },
                    dialogs: {
                        languageSelection: 'Select the language',
                    },
                    currentLanguage: 'English',
                }
            },
            pl: {
                translation: {
                    test: "testPl",
                    links: {
                        priceCalculator: 'Kalkulator cen',
                        tutorials: 'Poradniki',
                        blog: 'Blog',
                        contact: 'Kontakt'
                    },
                    buttons: {
                        signUp: 'Dołącz do Interviewly',
                        resign: 'Zrezygnuj',
                    },
                    dialogs: {
                        languageSelection: 'Wybierz język strony',
                    },
                    currentLanguage: 'Polski',
                }
            },
        },
    });

export default i18n;