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
                    join: {
                        joinControl: 'Do you already have an account?',
                        back: 'Back',
                        next: 'Next',
                        skip: 'Skip',
                        page1: {
                            title: 'Join Interviewly',
                            respondentTitle: 'I am a respondent',
                            respondentSubtitle: 'I want to take part in market researches',
                            recruiterTitle: 'I am a recruiter',
                            recruiterSubtitle: 'I want access the respondents database',
                        },
                        page2: {
                            title: 'Choose your gender',
                            maleTitle: 'I am a man',
                            femaleTitle: 'I am a woman',
                        },
                        page3: {
                            title: 'Personal data',
                            inputs: {
                                name: 'Name',
                                surname: 'Surname',
                                email: 'E-mail',
                                password: 'Password',
                                repeatPassword: 'Repeat password',
                                passwordConstraints: '(minimum: 8 characters, one capital letter, one number and one special character)',
                            },
                            rulesAgreement: 'By singing up, I agree to Interviewly Terms and Privacy Policy.',
                        },
                        page4: {
                            title: 'Record a video about yourself',
                            text: '(max. 10 minutes)',
                        },
                        page5: {
                            title: 'You are almost a part of out family!',
                            text: 'We have sent you an email with a confirmation link.',
                            homeButton: 'Home',
                        },
                    },
                    home: {
                        worldSection: {
                            firstLine: 'Recruit people from',
                            secondLine: 'all over the world',
                        },
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
                    join: {
                        joinControl: 'Masz już konto?',
                        back: 'Wróć',
                        next: 'Dalej',
                        skip: 'Pomiń',
                        page1: {
                            title: 'Dołącz do Interviewly',
                            respondentTitle: 'Jestem respondentem',
                            respondentSubtitle: 'Chcę brać udział w badaniach rynku',
                            recruiterTitle: 'Jestem rekruterem',
                            recruiterSubtitle: 'Chcę uzyskać dostęp do bazy danych respondentów',
                        },
                        page2: {
                            title: 'Wybierz swoją płeć',
                            maleTitle: 'Jestem mężczyzną',
                            femaleTitle: 'Jestem kobietą',
                        },
                        page3: {
                            title: 'Dane personalne',
                            inputs: {
                                name: 'Imię',
                                surname: 'Nazwisko',
                                email: 'E-mail',
                                password: 'Hasło',
                                repeatPassword: 'Powtórz hasło',
                                passwordConstraints: '(minimum: 8 znaków, jedna wielka litera, jedna cyfra i jeden znak specjalny)',
                            },
                            rulesAgreement: 'Rejestrując się potwierdzam, że przeczytałem Regulamin i Politykę Prywatności.',
                        },
                        page4: {
                            title: 'Nagraj wideo o sobie',
                            text: '(max. 10 minut)',
                        },
                    },
                    home: {
                        worldSection: {
                            firstLine: 'Rekrutuj ludzi',
                            secondLine: 'z całego świata',
                        },
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