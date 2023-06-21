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
                    links: {
                        priceCalculator: 'Price calculator',
                        tutorials: 'Tutorials',
                        blog: 'Blog',
                        contact: 'Contact',
                        forgotPassword: 'Forgot password?',
                    },
                    buttons: {
                        signUp: 'Join Interviewly',
                        resign: 'Resign',
                        logIn: 'Log in',
                    },
                    inputs: {
                        email: 'E-mail',
                        password: 'Password',
                    },
                    dialogs: {
                        languageSelection: 'Select the language',
                    },
                    pages: {
                        notFound: 'Page not Found',
                    },
                    logIn: {
                        rememberMe: 'Remember me'
                    },
                    passwordReset: {
                        request: {
                            header: 'Create new password',
                            subheader: 'Enter your e-mail address, and we will send you a message with instructions on how to create a new password.',
                            submitButton: 'Send',
                        },
                        confirmation: {
                            header: 'We have it!',
                            subheader: 'We have sent you a message with a new password.',
                            submitButton: 'Back to home page',
                        },
                    },
                    currentLanguage: 'English',
                }
            },
            pl: {
                translation: {
                    links: {
                        priceCalculator: 'Kalkulator cen',
                        tutorials: 'Poradniki',
                        blog: 'Blog',
                        contact: 'Kontakt',
                        forgotPassword: 'Zapomniałeś hasła?',
                    },
                    buttons: {
                        signUp: 'Dołącz do Interviewly',
                        resign: 'Zrezygnuj',
                        logIn: 'Zaloguj się',
                    },
                    inputs: {
                        email: 'E-mail',
                        password: 'Hasło',
                    },
                    dialogs: {
                        languageSelection: 'Wybierz język strony',
                    },
                    pages: {
                        notFound: 'Nie znaleziono strony',
                    },
                    logIn: {
                        rememberMe: 'Zapamiętaj mnie'
                    },
                    passwordReset: {
                        request: {
                            header: 'Stwórz nowe hasło',
                            subheader: 'Wprowadź swój adres e-mail, a my wyślemy Ci instrukcję jak wygenerować nowe hasło.',
                            submitButton: 'Wyślij',
                        },
                        confirmation: {
                            header: 'Mamy to!',
                            subheader: 'Wysłaliśmy Ci wiadomość z nowym hasłem.',
                            submitButton: 'Wróć na stronę główną',
                        },
                    },
                    currentLanguage: 'Polski',
                }
            },
        },
    });

export default i18n;