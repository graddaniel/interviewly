import { Errors } from 'shared';
const { ErrorsTranslations } = Errors;

const pl = {
    translation: {
        email: {
            accountCreated_fakedoor: {
                subject: 'Witamy w serwisie Interviewly! Aktywuj swoje konto i odkryj świat rekrutacji pracowników!',
                welcome: 'Witaj',
                paragraphs: {
                    first: `Serdecznie witamy Cię jako nowego użytkownika platformy Interviewly! Dziękujemy za rejestrację i zaufanie, jakim zostaliśmy obdarzeni. Jesteśmy przekonani, że nasz serwis pomoże Ci w osiągnięciu sukcesu w rekrutacji pracowników z całego świata.`,
                    second: `Teraz, gdy Twoje konto zostało zarejestrowane, wystarczy jedno kliknięcie, aby aktywować swoje konto, kliknij w poniższy link:`,
                    third: `Aktualnie pracujemy nad kluczowymi funkcjonalnościami naszego serwisu, które skutecznie zminimalizują czas na rekrutację pracowników. Na dobre rzeczy należy jednak poczekać :) Nasz serwis jest w trakcie przygotowania, Ciebie jako pierwszą osobę poinformujemy, gdy zaczniemy już działać kompleksowo. W najbliższych dniach oczekuj zatem od nas maila z informacjami.`,
                },
                signature: `Pozdrawiamy,\nZespół Interviewly`
            },
            accountCreated_setPassword: {
                subject: 'Witamy w serwisie Interviewly! Aktywuj swoje konto i odkryj świat rekrutacji pracowników!',
                welcome: 'Witaj',
                paragraphs: {
                    first: `Został(e/a)ś zaproszony do Interviewly! Serdecznie witamy Cię jako nowego użytkownika platformy Interviewly!`,
                    second: `Teraz, gdy Twoje konto zostało zarejestrowane, wystarczy jedno kliknięcie, aby ustawić hasło i aktywować swoje konto, kliknij w poniższy link:`,
                },
                signature: `Pozdrawiamy,\nZespół Interviewly`
            },
            projectInvitation: {
                newRespondent: {
                    subject: 'Zaproszenie do udziału w Badaniu {{project_name}}',
                    welcomeMessage: 'Witaj {{email}}!',
                    mainMessagePart1: 'Zostałeś zaproszony do badania {{project_name}}. Twoje konto jest już gotowe, wystarczy tylko, że stworzysz hasło. W celu stworzenia hasła skorzystaj z formularza tworzenia',
                    passwordFormKeyword: 'hasła',
                    mainMessagePart2: 'lub skopiuj poniższy link do przeglądarki.',
                    signature: `Pozdrawiamy,\nZespół Interviewly`
                },
                existingRespondent: {
                    subject: 'Zaproszenie do udziału w badaniu {{project_name}} w serwisie Interviewly',
                    welcomeMessage: 'Witaj {{name}}!',
                    mainMessage: 'Miło nam poinformować, że zostałeś zaproszony przez firmę {{company_name}} do wzięcia udziału w procesie rekrutacyjnym.  Zaloguj się do swojego konta i sprawdź szczegóły dotyczące rekturacji.',
                    signature: `Pozdrawiamy,\nZespół Interviewly`
                },
            },
        },
        errors: {
            ...ErrorsTranslations.pl.translation,
        },
    }
};

export default pl;