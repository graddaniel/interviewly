import { Errors } from 'shared';
const { ErrorsTranslations } = Errors;

const pl = {
    translation: {
        currentLanguage: 'Polski',
        generic: {
            loading: 'ładowanie',
            created: 'utworzono',
            yes: 'tak',
            no: 'nie',
            saved: 'Zapisano',
        },
        validation: {
            join: {
                repeatPasswordError: 'Hasła się różnią',
            },
        },
        errors: {
            networkError: 'Nie można połączyć z serwerem',
            tokenExpired: 'Sesja wygasła',
            ...ErrorsTranslations.pl.translation,
        },
        links: {
            priceCalculator: 'Kalkulator cen',
            tutorials: 'Poradniki',
            blog: 'Blog',
            contact: 'Kontakt',
            forgotPassword: 'Zapomniałeś hasła?',
            termsAndConditions: 'Regulamin',
            privacyPolicy: 'Polityka prywatności',
            personalDataProcessingAgreement: 'Umowa Powierzenia Przetwarzania Danych Osobowych',
        },
        buttons: {
            signUp: 'Dołącz do Interviewly',
            resign: 'Zrezygnuj',
            logIn: 'Zaloguj się',
            save: 'Zapisz',
            next: 'Dalej',
            back: 'Wstecz',
            add: 'Dodaj',
            download: 'Pobierz',
        },
        menu: {
            home: 'Główna',
            projects: 'Projekty',
            myTeam: 'Mój zespół',
            calendar: 'Kalendarz',
            library: 'Biblioteka',
            createProject: 'Stwórz Projekt',
        },
        dropdownMenu: {
            openUserPanel: 'Panel użytkownika',
            personalData: 'Dane użytkownika',
            companyData: 'Dane firmy',
            myTeam: 'Mój zespół',
            logout: 'Wyloguj',
        },
        inputs: {
            email: 'E-mail',
            password: 'Hasło',
        },
        sorting: {
            newest: 'najnowsze',
            oldest: 'najstarsze',
        },
        dialogs: {
            languageSelection: 'Wybierz język strony',
        },
        pages: {
            notFound: 'Nie znaleziono strony',
        },
        logIn: {
            rememberMe: 'Zapamiętaj mnie',
            joinText: 'Nie masz konta?'
        },
        setPassword: {
            subtitle: 'Ustaw hasło',
            newPassword: 'Nowe hasło',
            repeatPassword: 'Powtórz nowe hasło',
            success: 'Ustawiono hasło',
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
                maleTitleShort: 'Mężczyzna',
                femaleTitleShort: 'Kobieta',
            },
            page3: {
                title: 'Dane personalne',
                inputs: {
                    name: 'Imię*',
                    surname: 'Nazwisko*',
                    email: 'E-mail*',
                    password: 'Hasło*',
                    repeatPassword: 'Powtórz hasło*',
                    companyName: 'Nazwa firmy*',
                    passwordConstraints: '(minimum: 8 znaków, jedna wielka litera, jedna cyfra i jeden znak specjalny)',
                    newsletter: 'Akceptuję wysyłkę newsletter',
                    newsletterDetails:`\
Zgodnie z postanowieniami ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (t.j.: Dz.U. 2020.344) wyrażam zgodę na otrzymywanie od STRATEGA CEE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ z siedzibą w Łodzi, ul. Wólczańska 125, 90-521 Łódź, informacji handlowej o produktach i usługach Serwisu Interviewlyapp.com w formie Newslettera. Zgoda jest dobrowolna i może zostać odwołana w każdym czasie. Odwołanie zgody nie wpływa na zgodność z prawem przetwarzania przed wycofaniem zgody. \
Zgoda nieobowiązkowa`,
                },
                rulesAgreement: {
                    text: 'Akceptuję regulamin usługi wraz z umową powierzenia przetwarzania danych osobowych*',
                    termsAndConditionsKeyword: 'regulamin',
                    privacyPolicyKeyword: 'umową'
                },
            },
            page4: {
                title: 'Nagraj wideo o sobie',
                text: '(max. 10 minut)',
                submissionText: 'Wysyłam formularz',
            },
            interviewDialog: {
                record: 'Nagrywaj',
                stop: 'Zatrzymaj',
                finish: 'Zakończ'
            },
            fakedoor: {
                title: 'Twoje konto zostało stworzone',
                text1: {
                    regular: 'Nasza strona będzie w pełni funkcjonalna  ',
                    strong: 'w ciągu kilku dni',
                },
                subtitle: {
                    regular1: 'Będziesz ',
                    strong: 'pierwszym',
                    regular2: ' który się o tym dowie',
                },
                text2: {
                    regular: 'Będziesz również pierwszym, który skorzysta z naszych ',
                    strong: 'innowacyjnych rozwiązań',
                },
                text3: "Bądźmy w kontakcie!",
            },
        },
        home: {
            initialSection: {
                title: 'Rekrutacja i rozmowy napędzane AI',
                timeBoxText: 'Zmaksymalizuj swój czas',
            },
            stepsSection: {
                header: {
                    firstPart: 'Tylko',
                    secondPart: '3 kroki',
                    thirdPart: 'by',
                    fourthPart: 'znaleźć',
                    fifthPart: 'najlepszego',
                    sixthPart: 'pracownika',
                },
                content: {
                    firstStep: {
                        title: 'Prześlij',
                        text: 'bazę kandydatów'
                    },
                    secondStep: {
                        title: 'Przeprowadź',
                        text1: 'wideorozmowy, programuj kwestionariusze',
                        text2: 'sprawdź umiejętności językowe',
                    },
                    thirdStep: {
                        title: 'Otrzymaj',
                        text: 'ocenę kandydata',
                    },
                },
            },
            worldSection: {
                firstLine: 'Rekrutuj ludzi',
                secondLine: 'z całego świata',
            },
            openAISection: {
                subtitle: 'Wyślij brief i otrzymaj wycenę',
                title: 'w 1 minutę!',
                dashedLabelText: 'Sztuczna Inteligencja',
                buttonText: 'Sprawdź kalkulator kosztów',
            },
            subscriptionSection: {
                subtitle: 'Oferujemy',
                title: '4 plany subskrypcji',
                labelText1: 'Żadnych umów.',
                labelText2: 'Żadnych ukrytych opłat.',
                subscriptionButtonText: 'Zacznij',
            },
            tutorialsSection: {
                title: 'Poradniki',
                subscriptionsText: 'Subskrypcje: {{subscriptionsCount, number}}',
                subscribeButtonText: 'Subskrybuj',
            },
            blogSection: {
                title: 'Blog',
                blogLinkText: 'Przeczytaj więcej',
            },
        },
        methodologies: {
            interviews: {
                title: 'Wywiad',
                text: 'Rozmowa 1:1 z uczestnikiem spotkania.',
            },
            focusGroups: {
                title: 'Grupa Fokusowa',
                text: 'Dyskusja grupowa z udziałem moderatora.',
            },
            onlineCommunities: {
                title: 'Społeczność Internetowa',
                text: 'Wyrażanie opinii przez społeczność internetową z wykorzystaniem forum.',
            },
            uxInterviews: {
                title: 'UX Interviews',
                text: 'Uczestnictwo w wywiadzie z możliwością dzielenia ekranu.',
            },
            productTests: {
                title: 'Product tests',
                text: 'Testy produktowe z potencjalnymi klientami.',
            },
        },
        accountStatuses: {
            active: 'aktywny',
            unconfirmed: 'niepotwierdzony',
            inactive: 'nieaktywny',
        },
        genders: {
            male: 'mężczyzna',
            female: 'kobieta',
        },
        profileRoles: {
            admin: 'admin',
            moderator: 'moderator',
            observer: 'obserwator',
            interviewlyStaff: 'obługa Interviewly',
        },
        projectStatuses: {
            pending: 'oczekujący',
            canceled: 'wycofany',
            finished: 'zakończony',
        },
        languages: {
            bulgarian: 'bułgarski',
            czech: 'czeski',
            dutch: 'holenderski',
            english: 'angielski',
            french: 'francuski',
            german: 'niemiecki',
            greek: 'grecki',
            hungarian: 'węgierski',
            italian: 'włoski',
            polish: 'polski',
            portuguese: 'portugalski',
            romanian: 'romański',
            russian: 'rosyjski',
            slovak: 'słowacki',
            spanish: 'hiszpański',
            swedish: 'szwedzki',
            ukrainian: 'ukraiński',
        },
        surveyTypes: {
            regular: 'Zwykła',
            screening: 'Przesiewowa',
            language: 'Językowa',
        },
        personalData: {
            title: 'Dane osobiste',
            marketingConsentsSubtitle: 'Zgody marketingowe',
            changePasswordSubtitle: 'Zmiana hasła',
            currentPassword: 'Obecne hasło',
            newPassword: 'Nowe hasło',
            repeatPassword: 'Powtórz nowe hasło',
            save: 'Zapisz',
        },
        companyData: {
            title: 'Dane firmy',
            name: 'Nazwa firmy',
            taxIdNumber: 'Numer identyfikacji podatkowej',
            country: 'Kraj',
            city: 'Miasto',
            street: 'Ulica',
            buildingNumber: 'Numer budynku',
            unitNumber: 'Numer lokalu',
            postalCode: 'Kod pocztowy',
            save: 'Zapisz',
            success: 'Zapisano poprawnie',
        },
        myAccount: {
            greeting: 'Cześć',
            latestTeamMembersLabel: 'Najnowsi członkowie zespołu',
            upcomingInterviewsLabel: 'Nadchodzące spotkania',
            projectsLabel: 'Projekty', 
        },
        projects: {
            title: 'Projekty',
            projectsCounterText: 'projektów',
            searchInputPlaceholder: 'Wyszukaj nazwę projektu',
            statusLabel: 'Status',
        },
        viewProject: {
            title: 'Szczegóły projektu',
            edit: 'Edytuj',
            steps: [
                'Ogólne',
                'Metodologia',
                'Respondenci',
                'Ankiety przesiewowe',
                'Szczegóły',
            ],
            general: {
                title: 'PL User Experience in Samsung company',
                description: `\
PLPLPLPL It can be nerve-wracking, vulnerable, and challenging at times, but getting out of our own heads and incorporating collaboration into our design processes can make us all better designers.\n
\n
Over the years, I’ve come to learn that designing collaboratively means putting your egos aside to make something that transcends the sum of its creators.`,
            },
            methodology: {
                interview: {
                    createSurvey: 'Stwórz ankietę',
                    instruction: 'lub wybierz jedną z biblioteki',
                    save: 'Zapisz',
                },
                onlineCommunity: {
                    createBulletinBoardButtonText: 'Stwórz Bulletin Board',
                    membersLabel: 'członków',
                    createRoomButtonText: 'Stwórz pokój',
                    roomName: 'Nazwa pokoju',
                    addMembersLabel: 'Dodaj członków',
                    surveySubtitle: 'lub wybierz ankietę z biblioteki',
                    room: {
                        addTopicLabel: 'Dodaj wątek',
                        visibilityLabel: 'Widoczność',
                        publicVisibility: 'Publiczna',
                        specificMembersVisibility: 'Określenie członkowie',
                        topicInputPlaceholder: 'Wątek',
                        addCommentLabel: 'Dodaj komentarz',
                        noCommentsCabel: 'Brak komenatrzy',
                        commentSingularLabel: 'komentarz',
                        commentPluralLabel: 'komentarze',
                    },
                },
                sessionStartDateLabel: 'Data początku sesji',
                sessionEndDateLabel: 'Data końca sesji',
            },
            respondents: {
                seeDetailsLabel: 'Szczegóły',
                respondentVideoSubtitle: 'Nagranie respondenta',
                upcomingInterviewsSubtitle: 'Nadchodzące spotkania',
                respondentSurveysSubtitle: 'Ankiety respondenta',
            },
            screeningSurveys: {
                resultsTitle: 'Wyniki',
            },
            details: {
                participantsCountInputLabel: 'Liczba uczestników',
                reserveParticipantsCountInputLabel: 'Liczba rezerwowych uczestników',
                interviewDurationLabel: 'Długość spotkania',
                startDateLabel: 'Data rozpoczęcia',
                endDateLabel: 'Data zakończenia',
                transcriptionSubtitle: 'Transkrypcja',
                respondentFeeSubtitle: 'Wynagrodzenie respondenta',
                currencyLabel: 'Waluta',
            },
            respondentPage: {
                surveysSubtitle: 'Ankiety',
                surveysStatuses: {
                    filled: 'wypełniona',
                    ended: 'zakończona',
                    pending: 'oczekująca'
                },
                noResponsesMessage: 'Brak odpowiedzi',
            }
        },
        editProject: {
            title: 'Kreator nowego badania',
            aboutStepTitle: 'O projekcie',
            methodologyStepTitle: 'Metodologia badań',
            respondentsStepTitle: 'Wybór respondentów',
            detailsStepTitle: 'Szczegóły projektu',
            summaryStepTitle: 'Podsumowanie',
            aboutStep: {
                title: 'O projekcie',
                projectNameSubtitle: 'Proszę podać nazwę projektu',
                projectNameInputPlaceholder: 'Nazwa projektu',
                descriptionInputPlaceholder: 'Opis (opcjonalny)',
                avatarSubtitle: 'Wybierz Avatar',
            },
            methodologyStep: {
                title: 'Metodologia badań',
                methodologySubtitle: 'Wybierz metodologię badania',
            },
            respondentsStep: {
                title: 'Wybór respondentów',
                respondentsSelectionSubtitle: 'Wybierz respondentów do tego badania',
                respondentsSelectionInstructionPart1: `\
Jeżeli nie jesteś pewien jak plik z respondentami powinien wyglądać, pobierz nasz przykładowy plik, gdzie znajdziesz wszystkie potrzebne informacje.`,
                respondentsSelectionInstructionPart2: 'lub wybierz pożądany profil respondenta filtrami poniżej',
                genderLabel: 'Płeć',
                otherRequirementsInputPlaceholder: 'Inne wymagania',
                languageTestSubtitle: 'Test językowy dla respondenta',
                screeningSurveySubtitle: 'Czy potrzebujesz ankiety przesiewowej?',
                screeningSurveyDescription: `\
Po opłacie badania, otrzymasz możliwość użycia biblioteki z gotowymi ankietami lub stworzenia własnych.`,
                recordingSubtitle: 'Czy potrzebujesz wstępnego nagrania rekrutacyjnego od respondenta?',
            },
            detailsStep: {
                title: 'Szczegóły projektu',
                participantsCountInputLabel: 'Liczba uczestników',
                reserveParticipantsCountInputLabel: 'Liczba rezerwowych uczestników',
                interviewDurationDropdownName: 'Długość spotkania',
                startDateLabel: 'Data rozpoczęcia',
                endDateLabel: 'Data zakończenia',
                transcriptionSubtitle: 'Potrzebujesz transkrypcji?',
                moderatorSubtitle: 'Potrzebujesz moderatora?',
                paymentSubtitle: 'Wynagrodzenie respondenta',
                paymentInstruction: `\
Proszę podać wartość brutto. Waluta powinna być zgodna z walutą faktury.`,
            },
            summaryStep: {
                title: 'Podsumowanie',
            },
            nameStepTitle: 'Nazwij ankietę',
            questionStepTitle: 'Dodaj pytania',
            nameInputLabel: 'Proszę podać',
            nameInputPlaceholder: 'nazwę ankiety',
            availableLanguagesDropdownName: 'Dostępne Języki',
            addLanguageButtonText: 'Dodaj język',
            addLabel: 'Dodaj',
            openQuestionName: 'pytanie otwarte',
            closedQuestionName: 'pytanie zamknięte',
            multipleChoiceQuestionName: 'pytanie wielokrotnego wyboru',
            singleChoiceQuestionName: 'pytanie jednokrotnego wyboru',
            newQuestionText: 'Nowe pytanie',
            addAnswerButtonText: 'Dodaj odpowiedź',
            newAnswerText: 'Nowa odpowiedź',
            correctAnswerLabel: 'Poprawna odpowiedź',
            correctAnswerDropdownName: 'Poprawna odpowiedź',
        },
        myTeam: {
            title: 'Mój zespół',
            membersLabel: 'członków',
            inviteTeamMemberButton: 'Zaproś członka zespołu',
            administratorsLabel: 'Administratorów',
            moderatorsLabel: 'Moderatorów',
            observersLabel: 'Obserwatorów',
            popup: {
                addLabel: 'Dodaj',
                editLabel: 'Edytuj',
                memberText: 'członka',
                nameInputPlaceholder: 'Imię',
                surnameInputPlaceholder: 'Nazwisko',
                emailInputPlaceholder: 'E-mail',
                roleDropdownName: 'Rola',
                statusDropdownName: 'Status',
                genderDropdownName: 'Płeć',
                saveButtonText: 'Zapisz'
            }
        },
        library: {
            title: 'Biblioteka',
            mySurveys: 'Moje ankiety',
            publicSurveys: 'Publiczne ankiety',
            addNewTemplate: 'Dodaj nowy wzór',
        },
        calendar: {
            title: 'Kalendarz',
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
        contact: {
            getInTouch: 'Skontaktuj się z nami',
            sendUsAMessage: 'Wyślij nam wiadomość',
            quote: '"Interviewly ma wszystko czego potrzebujemy na jednej platformie."',
            messageSent: 'Wysłano wiadomość!',
        },
        registrationConfirmation: {
            header: 'Gotowe!',
            subheader: 'Możesz się teraz zalogować',
            
        },
        termsAndConditions: {
            header: 'Regulamin serwisu',
            generalProvisions: {
                header: 'Postanowienia ogólne',
                main: `\
Dostawcą usługi dostępu do Serwisu Interviewly, zwanym w dalszej części niniejszej umowy \
„Serwisem”, jest STRATEGA CEE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ z siedzibą \
w Łodzi, ul. Wólczańska 125, 90-521 Łódź, zarejestrowana w Krajowym Rejestrze Sądowym – \
rejestrze przedsiębiorców pod numerem KRS: 0000541582, której akta rejestrowe prowadzi \
Sąd Rejonowy dla Łodzi-Śródmieścia w Łodzi, XX Wydział Gospodarczy KRS, NIP: \
7692223109, REGON: 360412382 , zwany w dalszej części niniejszej umowy „Usługodawcą” \
lub „Administratorem”.`,
                listHeader: 'Niniejszy Regulamin (zwany też “Umową”) określa:',
                list: [
                    'rodzaj, zakres i zasady usług świadczonych drogą elektroniczną przez Usługodawcę za pomocą Serwisu,',
                    'obowiązki Usługobiorcy i Usługodawcy,',
                    'warunki zawierania i rozwiązywania umów o świadczenie usług drogą elektroniczną,',
                    'odpowiedzialność oraz obowiązki Usługodawcy,',
                    'tryb postępowania reklamacyjnego,',
                    'przetwarzanie danych osobowych.'
                ],
            },
            definitions: {
                header: 'Definicje',
                list: [{
                    phrase: 'Usługobiorca',
                    definition: `\
przedsiębiorca, zawierający z Usługodawcą umowę o świadczenie Usługi \
Elektronicznej w postaci udostępnienia Serwisu zdefiniowanej w niniejszym Regulaminie,`,
                }, {
                    phrase: 'Serwis',
                    definition: `\
udostępniony Usługobiorcy, drogą elektroniczną przez przeglądarkę internetową \
oprogramowanie umożliwiające w szczególności obsługę rekrutacji HR,`,
                }, {
                    phrase: 'Konto',
                    definition: `\
oznaczony indywidualną nazwą organizacji (organizacja) podaną przez Usługobiorcę, \
zbiór zasobów w systemie teleinformatycznym Usługodawcy, w którym gromadzone są dane \
Usługobiorcy, dzięki któremu Usługobiorca może korzystać z Serwisu,`,
                }, {
                    phrase: 'Administrator konta',
                    definition: `\
należy przez to rozumieć Użytkownika posiadającego prawa \
administracji Kontem. Domyślnie administratorem konta jest osoba, która założyła Konto. W ramach \
usługi, Usługobiorca może zmienić Administratora Konta samodzielnie, korzystając z dostępnej \
funkcji w Serwisie,`,
                }, {
                    phrase: 'Uzytkownik',
                    definition: 'każda osoba, która kiedykolwiek korzystała lub korzysta z Serwisu,',
                }, {
                    phrase: 'Subskrypcja',
                    definition: `\
oświadczenie woli Usługobiorcy na zawarcie umowy o świadczenie usługi \
elektronicznej w postaci prowadzania Konta w Serwisie oraz korzystania z Serwisu. Złożenie \
Subskrypcji następuje poprzez utworzenie Konta za pośrednictwem strony internetowej działającej \
pod adresami www.interviewlyapp.com lub przedłużenie umowy o świadczenie usługi elektronicznej \
w postaci prowadzania Konta w Serwisie oraz korzystania z Serwisu,`,
                }, {
                    phrase: 'Opłata',
                    definition: `\
wynagrodzenie Usługodawcy za Serwis, należne od Usługobiorcy. Opłata uiszczana jest \
jako opłata za Subskrypcję Serwisu w wybranym Okresie Abonamentowym lub Prolongatę \
Subskrypcji w wybranym Okresie Abonamentowym.`,
                }, {
                    phrase: 'Okres abonentowy',
                    definition: `\
należy przez to rozumieć okres działania Konta, za jaki uiszcza opłatę i \
w ramach którego świadczone są przez Usługodawcę na rzecz Usługobiorcy usługi drogą \
elektroniczną w postaci udostępnienia Serwisu. Przyjmuje się okresy abonamentowe: \
jednomiesięczny, sześciomiesięczne, dwunastomiesięczny.`,
                }],
            },
            obligationsOfServiceProvider: {
                header: 'Obowiązki usługodawcy',
                list: [
`Usługodawca deklaruje dostępność Serwisu (SLA) na poziomie 80% czasu w skali roku.`,
`Brak dostępności Serwisu nie wlicza się do rozliczenia dostępności, gdy jakakolwiek Opłata jest \
nieuregulowana przez Usługobiorcę na moment braku dostępności Aplikacji.`,
`Wskaźnik dotyczy dostępności Serwisu z wyłączeniem problemów wynikających z Infrastruktury \
informatycznej dostawców Usługodawcy lub firm trzeciej, infrastruktury informatycznej \
Usługobiorcy lub siły wyższej.`,
`Przerwa techniczna to czas potrzebny na prace konserwacyjne Serwisu lub/i infrastruktury z której \
korzysta Usługodawca.`,
{
text: `Przerwa techniczna i aktualizacje Serwisu`,
sublist: [
`Usługodawca będzie realizował aktualizacje Serwisu w godzinach 19:00 – 7:00 w strefie \
czasowej Usługodawcy lub w czasie przerw technicznych.`,
`Usługodawca ma prawo do wykonania przerwy technicznej w dostępie do Serwisu w \
dowolnych godzinach 19:00 – 7:00 w strefie czasowej Usługodawcy`,
],
},
`Usługodawca zastrzega sobie prawo modyfikacji Serwisu, zwłaszcza rozszerzania zakresu jej \
działania.`,
{
text: `Usługodawca nie ponosi odpowiedzialności za:`,
sublist: [
`skutki niepoprawnego wpisania danych lub przetwarzania danych w Serwisie przez \
Usługobiorcę;`,
`nieprawidłowego korzystania z Serwisu www.interviewlyapp.com;`,
`brak dostępu do sieci Internet po stronie Usługobiorcy albo ograniczenia w jego dostępności;`,
`nieprawidłowe działanie oprogramowania albo urządzeń należących do Usługobiorcy lub \
jego Pracowników z którego korzystają, a które uniemożliwia korzystanie z Serwisu,`,
`poniesione szkody, w tym utracone korzyści, spowodowane przez Usługobiorcę poprzez \
niewłaściwe zabezpieczenie, udostępnianie osobom nieupoważnionym danych \
uwierzytelniających dostęp do Serwisie;`,
`poniesione szkody, w tym utracone korzyści, spowodowane działaniem lub zaniechaniem \
Usługobiorcy, Pracownika Usługobiorcy, w szczególności poprzez korzystanie z Usługi w \
sposób niezgodny z przepisami prawa lub Regulaminu,`,
`poniesione szkody, w tym utracone korzyści, spowodowane wydarzeniami siły wyższej.`,
],
},
`W żadnym razie Usługodawca ani jego podmioty powiązane prawnie nie będą odpowiedzialne za \
jakąkolwiek utratę zysków lub dochodów (utraconych korzyści), oszczędności, utratę lub zniszczenie \
danych, wartości firmy lub reputacji, niedokładność jakichkolwiek danych, ani też nie poniosą \
odpowiedzialności z tytułu jakichkolwiek szkód materialnych/niematerialnych lub strat pośrednich, \
przypadkowych, jakichkolwiek powstałych bez względu na teorię źródeł odpowiedzialności nawet \
jeżeli poinformowano je o możliwości powstania takich szkód lub strat.`,
`Odpowiedzialność Usługodawcy na podstawie Umowy jest ograniczona do kwoty równej wartości \
ostatniej uiszczonej Opłaty przez Usługobiorcę, jednak nie więcej niż wartość Opłaty za dany Okres \
Abonamentowy.`
                ],
            },
            principlesOfApplicationUse: {
                header: 'Zasady korzystania z aplikacji',
                list: [
`Do korzystania z Serwisu konieczne jest posiadanie urządzenia z dostępem do sieci Internet, \
przeglądarki internetowej, a do założenia Konta – oprócz w/w – także konto poczty elektronicznej.`,
`Dostęp do Serwisu możliwy jest poprzez jedną z ogólnie dostępnych przeglądarek internetowych: \
Google Chrome, Mozilla Firefox, Opera, Edge, Safari, w najnowszych \
z dostępnych wersji, z włączoną, w przeglądarce internetowej, obsługą Cookies oraz Javascript.`,
`Usługodawca świadczy usługi informatyczne związane z dostępem i obsługą Serwisu wyłącznie za \
pomocą sieci Internet.`,
`Usługobiorca przyjmuje do wiadomości, że regularne aktualizowanie swoich urządzeń oraz \
oprogramowania w celu obsługi nowoczesnych mechanizmów szyfrowania w trakcie komunikacji z \
Serwisu umożliwia korzystanie z nich. Dostępność rzeczonych aktualizacji może być uzależniona od \
posiadanego przez Użytkownika sprzętu i/bądź oprogramowania i tym samym Usługodawca nie \
odpowiada za ewentualny brak rzeczonych aktualizacji i w konsekwencji niemożność korzystania z \
tego powodu z Serwisu.`,
`Usługobiorca korzystający z Serwisu nie otrzymuje żadnych praw autorskich do Serwisu. \
Usługobiorcy i Użytkownikom udzielana jest jedynie – na warunkach wskazanych w Regulaminie – \
odpłatna, niezbywalna i niewyłączna licencja uprawniająca go do korzystania z Serwisu w zakresie \
jego przeznaczenia.`,
{
    text: `W celu uniknięcia wątpliwości, Usługobiorca nie będzie samodzielnie, ani nie będzie pozwalał lub \
    upoważniał kogokolwiek do:`,
    sublist: [
`rozpowszechniania, przekazywania, pożyczania, udostępniania, sprzedawania, przenoszenia, \
udzielania licencji, wynajmowania lub udostępniania w inny sposób Serwisu.`,
`kopiowania, dekompilacji, rozpracowywania, inżynierii odwrotnej lub innego wyodrębniania \
lub odtwarzania kodu źródłowego ani innych metod, algorytmów lub procesów z Serwisu.`,
`oferowania lub eksploatacji Serwisu w innej przynoszącej dochód formie komercyjnej, \
zwiększającej wartość produktów lub usług na rzecz jakiejkolwiek osoby trzeciej, w tym \
zapewnienia usług hostingowych, usług time-sharing, usług typu SaaS (oprogramowanie jako \
usługa) lub zarządzania usługami, także jeżeli oferowane są łącznie lub w ramach innych \
produktów i usług;`,
`Usuwania wszelkich informacji o prawach autorskich, znakach towarowych z wyjątkiem \
elementów edytowalnych na poziomie funkcji Serwisu.`,
    ],
},
`Usługodawca nie ponosi jakiejkolwiek odpowiedzialności z tytułu naruszenia praw osób trzecich \
oraz wyrządzenia jakiejkolwiek szkody osobom trzecim na skutek oraz w związku z działaniami \
prowadzonymi przez Usługobiorcę, jego Użytkowników lub Pracowników w zakresie korzystania z \
Serwisu.`,
`Jeżeli Usługobiorca poinformuje Usługodawcę o pomysłach i sugestiach związanych z Serwisem, \
Usługobiorca wyraża zgodę na wykorzystanie takich pomysłów i sugestii przez Usługodawcę do \
wszelkich celów, bez ograniczeń, w szczególności rozwijania, modyfikacji, poprawiania z \
wyłączeniem odpowiedzialności jak i odpłatności wobec Usługobiorcy.`,
`Usługobiorca rozumie i zgadza się, że usługi świadczone przez Usługodawcę bazują na jednej, \
podstawowej wersji aplikacji, sprzętu i infrastrukturze i są przeznaczone do świadczenia usługi wielu \
klientom w sposób skalowalny. Usługa nie będzie dostosowywane lub/i dostosowywane do \
Usługobiorcy, chyba że w takim zakresie, w jakim zostało to wyraźnie uzgodnione przez Strony.`
                ]
            },
            feesAndPayments: {
                header: 'Opłaty i płatności',
                list: [
`Cena za Subskrypcję jest opublikowana na stronie internetowej Usługodawcy: \
www.interviewlyapp.com.`,
`Podane ceny są cenami netto (tj. nie zawierają podatku VAT). Ceny wyrażone są w: polskich \
złotych, dolarach amerykańskich.`,
`Opłata uiszcza się z góry i jest obliczona zgodnie z wybranymi modelem Subskrypcji.`,
`Płatności dokonuje się przy użyciu karty kredytowej (Visa, MasterCard, American Express) lub \
przelew bankowy na podstawie wystawionej faktury przez Usługodawcę.`,
`Opłata przelewem bankowym będzie płatna na rachunek bankowy Usługodawcy wskazany na \
fakturze VAT. Usługobiorca zobowiązuje się zapłacić wynagrodzenie w terminie 7 dni od dnia \
doręczenia mu faktury VAT na wskazany adres email. Istnieje możliwość wydłużenia terminu \
przelewu w ramach indywidualnych ustaleń z Usługobiorcą. Ostateczną decyzję podejmuje \
Usługodawca.`,
`Usługodawca może odmówić płatności za pomocą przelewu bankowego w przypadku gdy \
Usługobiorca nie dotrzymuje terminu płatności.`,
`Opłacone faktury dostarczane są pocztą elektroniczną.`,
`Doręczenie faktury przesłanej w formie pliku następuje z chwilą wysłania przez Usługodawcę \
wiadomości e-mail zawierającej plik z fakturą z adresu email na adres email wskazany przez \
Usługobiorcę. W przypadku, gdy wiadomość email zawierająca fakturę nie zostanie dostarczona \
Usługobiorcy, z przyczyn niezależnych od Usługodawcy, na prośbę Usługobiorcy zostanie wystawiony \
duplikat przedmiotowej faktury.`,
`Za dzień zapłaty kwot z tytułu wystawionych przez Usługodawcy faktur Strony przyjmują dzień \
uznania rachunku bankowego Usługodawcy.`,
`Strony zgodnie postanawiają, że Usługodawca będzie zarachowywał wpłaty pochodzące od \
Usługobiorcy w pierwszej kolejności na poczet należności najdawniej wymagalnych, niezależnie od \
treści oświadczeń Usługobiorcy towarzyszących wpłacie.`,
`W przypadku wyboru karty kredytowej lub debetowej jako sposobu opłacenia Opłaty \
Abonamentowej, opłata za każdy kolejny Okres Abonamentowy będzie pobierana automatycznie, do \
momentu zgłoszenia chęci rezygnacji przez Usługobiorcę. Rezygnacja taka powinna być zgłoszona za \
mailem na adres contact@interviewlyapp.com do 7 dni przed początkiem nowego Okresu \
Abonamentowego.`,
`Usługobiorca jest zobowiązany uregulować Opłatę za wybraną Subskrypcję nie później niż w \
terminie 7 dni roboczych od daty złożenia Subskrypcji. Za dzień wpłaty uznaje się dzień \
zaksięgowania wymaganej należności na koncie bankowym Usługodawcy. Brak wpłaty w \
wyznaczonym terminie jest równoznaczny z anulowaniem Subskrypcji.`,
`Zmiana parametrów Subskrypcji jest dokonywane przez Administratora Konta bezpośrednio na \
Koncie w Serwisie i może być przez niego w dowolnej chwili odwołane lub na zlecenie \
Administratora Konta wysłane na adres email podany w pkt. VI ust. 2 przez Usługodawcę.`,
`Administrator Konta ma dostęp w Serwisie do informacji w jaki sposób dokonać Opłaty \
Abonamentowej oraz o aktualnych parametrach Konta.`,
`Usługobiorca wyraża zgodę na przesyłanie przez Usługodawcę faktur VAT w formie \
elektronicznej zgodnie z podstawą prawną wystawiania i przesyłania faktur w formie elektronicznej z \
Ustawy z dnia 11 marca 2004 r. o podatku od towarów i usług (Dz.U. Nr 54, poz. 535). Faktura \
przesyłana w formie elektronicznej zgodnie z Ustawą (Dz.U. Nr 144 poz. 1204, z późn. zm.) jest \
równoznaczna z przesyłaniem faktury wystawionej w formie papierowej i stanowi dokument \
księgowy.`,
`Faktury korygujące i duplikaty do faktur przesyłanych drogą elektroniczną będą także przesyłane \
w formie elektronicznej.`,
`Faktura VAT w postaci papierowej będzie wystawiona oraz dostarczona tylko na wyraźne żądanie \
Usługobiorcy wyrażone w formie elektronicznej na kontaktowy adres email Usługodawcy. Opłata za \
wydrukowanie i dostarczenie faktury VAT w formie papierowej jest uiszczona przez Usługodawcę i \
doliczona do faktury, w wysokości 59 zł netto + podatek VAT.`,
`Usługodawca może w dowolnym momencie, po poinformowaniu Usługobiorców, co najmniej 60 \
dni przed zmianą, jeśli jest to wymagane przez obowiązujące prawo, zmienić Cennik lub jego część \
lub ustanowić nowe opłaty. Zmiany cen i ustanowienie nowych opłat wejdą w życie w odniesieniu do \
kolejnych okresów abonamentowych oraz do wszystkich nowych Usługobiorców po dacie wejścia w \
życie zmiany. Jeśli Usługobiorca nie zgadza się na zmiany cen w Cenniku, może anulować Subskrypcję \
i zaprzestać korzystania z Serwisu przed rozpoczęciem kolejnego Okresu Abonamentowego, od \
którego będą obowiązywać zmienione ceny.`,
                ],
            },
            support: {
                header: 'Wsparcie',
                list: [
`Pomoc techniczna dostępna jest w dni powszednie w godz. 9:00 – 15:00 (CET) dla Usługobiorców z \
uiszczoną Opłatą za obowiązujący Okres Abonamentowy w wybranych modelach Subskrypcji.`,
`Kontakt w ramach pomocy technicznej dostępny jest dla Administratora konta za pomocą \
komunikacji mailowej pod adresem contact@interviewlyapp.com`,
`Usługodawca dołoży wszelkich starań aby na wiadomości email udzielić odpowiedzi w ciągu 72 \
godzin w dni robocze obowiązujące Usługodawcę.`,
                ],
            },
            compliants: {
                header: 'Reklamacje',
                list: [
`Usługodawca zobowiązuje się do niezwłocznego usunięcia wad uniemożliwiających dostęp do \
korzystanie z Serwisu.`,
`Reklamacje związane ze świadczeniem usługi dostępu do Serwisu, Usługobiorca może składać za \
pośrednictwem komunikacji mailowej pod adresem contact@interviewlyapp.com`,
{
    text: 'Zgłoszenie powinno wskazywać:',
    sublist: [
`nazwę organizacji (informacja podana przy założeniu konta) i jego adres e-mail`,
`informację jakiego użytkownika dotyczy,`,
`czas i okoliczności wystąpienia problemu z działaniem Serwisu, adres URL lub nazwę strony,`,
`screen z widocznym adresem URL oraz problemem`,
    ],
},
`Jeżeli do rozpoznania zgłoszenia reklamacyjnego niezbędne będą dodatkowe informacje, przed \
rozpatrzeniem zgłoszenia reklamacyjnego Usługodawca zwraca się o udzielenie tych informacji, a \
czas na rozpoznanie zgłoszenia liczony jest od daty doręczenia Usługodawcy żądanych informacji.`,
`Zaleca się podanie w powyższej wiadomości e-mail jak najwięcej informacji i okoliczności \
dotyczących przedmiotu reklamacji, w szczególności rodzaju i daty wystąpienia nieprawidłowości \
oraz danych kontaktowych – ułatwi to i przyspieszy rozpatrzenie reklamacji przez Usługodawcę.`,
`Rozpatrzenie reklamacji przez Usługodawcę następuje niezwłocznie, nie później niż w terminie do \
14 dni roboczych.`,
`Rozpatrzenie reklamacji przez Usługodawcę jest ostateczne.`,
`Odpowiedź Usługodawcy w sprawie reklamacji jest wysyłana na adres e-mail Usługobiorcy podany \
w zgłoszeniu reklamacyjnym,`,
                ],
            },
            serviceData: {
                header: 'Dane usługobiorcy',
                list: [
`Dane wprowadzone przez Usługobiorcę do Konta Serwisu są własnością Usługobiorcy.`,
`Wszystkie dane wprowadzone do Konta Serwisu będą przechowywane przez Usługodawcę \
zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 \
r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie \
swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (dalej RODO).`,
`Usługodawca przechowuje oraz przetwarza dane udostępnione mu przez Usługobiorcę zgodnie z \
obowiązującymi przepisami prawa oraz zgodnie z Umową Powierzenia Przetwarzania Danych \
Osobowych, która stanowi Załącznik nr 1 do Regulaminu.`,
`Akceptując niniejszy Regulamin Usługobiorca wyraża zgodę na powierzenie danych Usługodawcy \
zgodnie z Umową Powierzenia Przetwarzania Danych Osobowych.`,
                ],
            },
            conditionsOfCeasementOfContract: {
                header: 'Warunki rozwiązania umowy',
                list: [
`Usługobiorca może wypowiedzieć umowę z zachowaniem jednomiesięcznego okresu \
wypowiedzenia i bez wskazywania przyczyn przesyłając stosowne oświadczenie za pośrednictwem \
poczty elektronicznej na adres contact@interviewlyapp.com`,
`Usługobiorca może wypowiedzieć umowę w trybie natychmiastowym w przypadku gdy \
Usługodawca nie zachowa dostępności Serwisu w zakresie podanym SLA w punkcie III ust.1 , \
przesyłając stosowne oświadczenie za pośrednictwem poczty elektronicznej na adres \
contact@interviewlyapp.com`,
{
    text: `\
    Usługodawca może zablokować czasowo lub trwale Konto Usługobiorcy lub wypowiedzieć Umowę \
    w przypadku, gdy Usługobiorca lub Użytkownik pochodzący od niego:`,
    sublist: [
`narusza Regulamin,`,
`dostarcza treści o charakterze bezprawnym, po bezskutecznym wcześniejszym wezwaniu do \
zaprzestania naruszeń z wyznaczeniem odpowiedniego terminu,`,
`działa na szkodę Usługodawcy lub poda nieprawdziwe dane w procesie rejestracji lub nie zaktualizuje niezwłocznie zmiany \
podanych danych odpowiednio do stanu faktycznego,`,
`nie dokonuje terminowo opłat,`,
`dopuszcza się działań zmierzających do naruszenia bezpieczeństwa danych przetwarzanych \
w Serwisie oraz za pomocą Serwisu lub podejmuje nieuprawnioną próbę dostępu do Serwisu \
lub dokonuje innych czynności mających na celu zakłócenie prawidłowego działania Serwisu \
lub wykonuje czynności niezgodne z prawem.`,
    ],
},
`Usługodawca jest uprawniony do wypowiedzenia Umowy z natychmiastowym skutkiem \
rozwiązującym w momencie gdy zajdzie określona jedna z przyczyn określona w ust. 3 niniejszego \
rozdziału.`,
`Usługodawca może w dowolnym momencie wypowiedzieć Umowę, z zachowaniem \
trzymiesięcznego okresu wypowiedzenia.`,
`Oświadczenie woli Usługodawcy dotyczące wypowiedzenia umowy dla swej ważności wymaga \
formy dokumentowej i winno być przesłane odpowiednio na adres email aktualnego Administratora \
Konta Usługobiorcy. Okres wypowiedzenia Umowy rozpoczyna swój bieg począwszy od Dnia \
Doręczenia oświadczenia woli Usługodawcy o wypowiedzeniu Umowy.`,
`Wypowiedzenie prowadzi do ustania stosunku prawnego ze skutkiem na przyszłość.`,
                ],
            },
            finalProvisions: {
                header: 'Postanowienia końcowe',
                list: [
`Umowy zawierane przez Usługodawcę w ramach działalności Aplikacji zawierane są w języku \
polskim, zgodnie z obowiązującym na terytorium Polski prawem.`,
`Usługodawca zastrzega sobie prawo do dokonywania zmian w Regulaminie. Zmiany  \
dokonane w Regulaminie Aplikacji wiążą Usługobiorcę, pod warunkiem iż został on \
prawidłowo poinformowany o zmianach i nie wypowiedział Umowy w terminie 14 dni od \
dnia powiadomienia Usługobiorcy o zmianach przez Usługodawcę.`,
`W przypadku niezgodności jakiejkolwiek części Regulaminu z obowiązującym prawem, w \
miejsce zakwestionowanego przepisu Regulaminu zastosowanie mają właściwe przepisy \
prawa polskiego.`,
`Ewentualne spory powstałe pomiędzy Usługodawcą, a Usługobiorcą, zostają poddane \
sądowi właściwemu ze względu na siedzibę Usługodawcy.`,
                ],
            }
        },
        personalDataProcessingAgreement: {
            header: 'Umowa Powierzenia Przetwarzania Danych Osobowych',
            text: `\
Umowa Powierzenia Przetwarzania Danych Osobowych stanowi integralną część Regulaminu i \
określa zasady przetwarzania przez Usługodawcę na zlecenie Usługobiorcy danych osobowych \
Użytkowników za pośrednictwem Serwisu pod adresem www.interviewlyapp.com.\

Umowa Powierzenia Przetwarzania Danych Osobowych stanowi całość zobowiązań oraz warunków \
powierzenia przetwarzania danych Użytkowników pomiędzy Usługodawcą i Usługobiorcą w związku \
z Usługą SaaS i zastępuje wszelkie dotychczasowe umowy, porozumienia oraz ustalenia pomiędzy \
Usługodawcą i Usługobiorcą w tym zakresie.`,
            rules: [{
                title: 'Definicje',
                list: [
`Administrator – oznacza Usługobiorcę, który samodzielnie lub wspólnie z innymi podmiotami \
ustala cele i sposoby przetwarzania Danych Osobowych;`,
`Podmiot przetwarzający – oznacza Usługodawcę`,
                ],
            }, {
                title: 'Przedmiot przetwarzania danych osobowych',
                list: [
`W związku z realizacją umowy o świadczenie usługi drogą elektroniczną na usługę SaaS \
uregulowaną w Regulaminie (zwana w dalszej części umowy „Umową główną” zawartą \
między Stronami, Administrator powierza Podmiotowi przetwarzającemu w trybie art. 28 \
rozporządzenia, dane osobowe do przetwarzania w imieniu i na rzecz Administratora, na \
zasadach i w celu określonym w Umowie.`,
`Zawarcie Umowy stanowi udokumentowane polecenie Administratora do przetwarzania \
przez Usługodawcę Danych Osobowych, w tym do Przekazywania Danych Osobowych do \
Państw Trzecich, o którym mowa w art. 28 ust. 3 lit. a) RODO.`,
`Administrator oświadcza, że jest administratorem danych osobowych w rozumieniu \
przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 \
kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych \
osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy \
95/46/WE (ogólne rozporządzenie o ochronie`,
                ],
            }, {
                title: 'Zakres i cel przetwarzania danych',
                list: [
`Powierzone przez Administratora dane osobowe będą przetwarzane przez Podmiot \
przetwarzający wyłącznie w celu wykonywania przez Podmiot przetwarzający na rzecz \
Administratora usług szczegółowo opisanych w Umowie głównej, o której mowa w §2 ust. 1 i \
w sposób zgodny z niniejszą Umową oraz właściwymi, powszechnie obowiązującymi \
przepisami prawa.`,
`Kategoria osób: pracownicy i współpracownicy Administratora, kandydaci do pracy, \
użytkownicy Serwisu.`,
{
    text: `Podmiot przetwarzający zobowiązuje się przetwarzać powierzone dane osobowe w następującym zakresie:`,
    sublist: [
`Imię i Nazwisko`,
`Wizerunek – zdjęcie oraz nagrania załadowane do Serwisu`,
`Płeć`,
`Adres`,
`Telefon kontaktowy`,
`Adres e-mail`,
`Data urodzenia`,
`Numer konta bankowego`,
`Profesja`,
`Branża`,
`Stan cywilny`,
`Informacja o posiadaniu dzieci`,
`Inne dane zawarte w przechowywanych plikach lub wpisane w inne miejsca.`,
    ]
},
`Czynności przetwarzania: Zbieranie, utrwalanie, organizowanie, porządkowanie, \
przechowywanie, przeglądanie, przekazywanie, modyfikowanie, usuwanie.`,
`Forma przetwarzania: elektroniczna.`,
                ],
            }, {
                title: 'Obowiązki Podmiotu przetwarzającego',
                list: [
`Podmiot Przetwarzający oświadcza, że zapewnia odpowiednie środki techniczne i \
organizacyjne, aby przetwarzanie spełniało wymogi określone w Rozporządzeniu i chroniło \
prawa osób, których dane dotyczą, co w szczególności oznacza, że Podmiot Przetwarzający \
podejmuje adekwatne środki wymagane na mocy art. 32 Rozporządzenia oraz dokłada \
należytej staranności przy przetwarzaniu powierzonych danych osobowych.`,
`Podmiot przetwarzający zobowiązuje się do nadania upoważnień do przetwarzania danych \
osobowych wszystkim osobom, które będą przetwarzały powierzone dane w celu realizacji \
niniejszej Umowy.`,
`Uwzględniając charakter przetwarzania, Podmiot przetwarzający w miarę możliwości \
pomoże Administratorowi, poprzez odpowiednie środki techniczne i organizacyjne, \
wywiązać się z obowiązku odpowiadania na żądania osoby, której dane dotyczą, w zakresie \
wykonywania jej praw, określonych w III rozdziale Rozporządzenia.`,
`Uwzględniając charakter przetwarzania oraz dostępne mu informacje, Podmiot \
przetwarzający pomoże Administratorowi wywiązać się z obowiązków określonych w art. 32- \
36 Rozporządzenia.`,
`Podmiot przetwarzający zobowiązuje się zapewnić zachowanie w \
tajemnicy, (o której mowa w art. 28 ust 3 pkt b Rozporządzenia) przetwarzanych danych \
przez osoby, które upoważnia do przetwarzania danych osobowych w celu realizacji \
niniejszej umowy, zarówno w trakcie zatrudnienia ich w Podmiocie przetwarzającym, jak i po \
jego ustaniu.`,
`Podmiot przetwarzający po zakończeniu świadczenia usług \
związanych z przetwarzaniem danych usunie wszystkie dane powierzone przez \
Administratora po upływie czasu określonego w umowie głównej.`,
`Podmiot przetwarzający po stwierdzeniu naruszenia ochrony danych osobowych bez \
zbędnej zwłoki zgłasza je Administratorowi.`,
`Podmiot przetwarzający po stwierdzeniu naruszenia ochrony danych osobowych bez \
zbędnej zwłoki, nie później niż w terminie 36 godzin od stwierdzenia naruszenia, zgłasza je \
Administratorowi. Zgłoszenie powinno nastąpić drogą mailową na adres email wpisany przez \
Administratora w danych podczas rejestracji (adres będący jednocześnie loginem \
Administratora).`,
                ],
            }, {
                title: 'Środki techniczne i organizacyjne',
                list: [
`Uwzględniając stan wiedzy technicznej, koszt wdrożenia oraz charakter, zakres, kontekst i \
cele przetwarzania Danych Osobowych oraz ryzyko naruszenia praw osób, których dane \
osobowe dotyczą, Usługodawca zapewni środki techniczne i organizacyjne adekwatne do \
rodzaju danych osobowych oraz ryzyka naruszenia praw osób, których Dane Osobowe \
dotyczą.`,
                ],
            }, {
                title: 'Prawo kontroli przetwarzania',
                list: [
`Administrator zgodnie z art. 28 ust. 3 pkt h) Rozporządzenia ma prawo kontroli, czy środki \
zastosowane przez Podmiot przetwarzający przy przetwarzaniu i zabezpieczeniu \
powierzonych danych osobowych spełniają postanowienia umowy.`,
`Zawiadomienie o zamiarze przeprowadzenia kontroli lub audytu powinno być przekazane \
Podmiotowi przetwarzającemu co najmniej 14 dni kalendarzowych przed rozpoczęciem \
czynności. Ewentualne koszty przeprowadzenia audytu pokrywa Administrator.`,
`Audytorem wyznaczonym przez Administratora nie może być podmiot prowadzący \
działalność konkurencyjną wobec Podmiotu przetwarzającego, ani podmiot z nim \
powiązany, pracownik lub podmiot współpracujący, bez względu na podstawę zatrudnienia \
lub współpracy. Audytor przed przystąpieniem do czynności sprawdzających jest \
zobowiązany do złożenia zapewnienia zachowania pozyskanych informacji w poufności.`,
`Kontrola przetwarzania, w zakresie dotyczącym obszarów przetwarzania danych osobowych, \
nie może trwać dłużej niż 3 dni robocze.`,
`Kontrola przetwarzania zostanie zakończona podpisaniem przez obie Strony protokołu z \
Kontroli Przetwarzania. Protokół będzie zawierał wnioski z Kontroli Przetwarzania oraz \
uzgodniony przez obie Strony zakres ewentualnych zmian w zakresie przetwarzania Danych \
Osobowych przez Podmiot przetwarzający.`,
`Podmiot przetwarzający zobowiązuje się do zastosowania się do zaleceń Administratora lub \
podmiotu przez niego upoważnionego, dotyczących poprawy jakości zabezpieczania danych \
osobowych oraz sposobu ich przetwarzania lub usunięcia uchybień stwierdzonych podczas \
kontroli lub audytu w terminie wskazanym przez Administratora nie dłuższym niż 28 dni.`,
                ],
            }, {
                title: 'Podpowierzenie danych do przetwarzania',
                list: [
`Podmiot przetwarzający może podpowierzać przetwarzanie danych osobowych \
przetwarzanych przez siebie w związku ze świadczeniem usługi objętej umową, o której \
mowa w § 2 ust. 1 Umowy innym podmiotom przetwarzającym (zwanym dalej \
„Podwykonawcami”), zgodnie z warunkami korzystania z usług Podwykonawców \
określonych w Rozporządzeniu.`,
`Administrator wyraża zgodę na podpowierzenie, powierzonych Podmiotowi \
przetwarzającemu do przetwarzania danych na podstawie Umowy wskazanym w załączniku \
nr 1 do Umowy.`,
`Podmioty, którym Podmiot przetwarzający powierzył do dalszego przetwarzania dane \
osobowe zostały określone w Załączniku nr 1 Umowy.`,
`Podmiot przetwarzający może dokonywać zmian aktualnych podwykonawców oraz dodawać \
kolejnych, bez wcześniejszego informowania Administratora.`,
                ],
            }, {
                title: 'Zgłaszanie naruszeń',
                list: [
{
    text: `Po stwierdzeniu naruszenia ochrony powierzonych mu przez Administratora danych \
osobowych Podmiot przetwarzający, bez zbędnej zwłoki, od wykrycia naruszenia, zgłasza je \
Administratorowi. Zgłoszenie powinno zawierać co najmniej informacje o:`,
    sublist: [
`dacie, czasie trwania oraz lokalizacji naruszenia ochrony danych osobowych;`,
`charakterze i skali naruszenia, tj. w szczególności o kategoriach i przybliżonej liczbie osób, \
których dane dotyczą, oraz kategoriach i przybliżonej liczbie wpisów danych osobowych, \
których dotyczy naruszenie, a w razie możliwości, także wskazania podmiotów danych, \
których dotyczyło naruszenie;`,
`przewidywanym czasie potrzebnym do naprawienia szkody spowodowanej naruszeniem;`,
`charakterze i zakresie danych osobowych objętych naruszeniem;`,
`możliwych konsekwencjach naruszenia, z uwzględnieniem konsekwencji dla osób, których \
dane dotyczą;`,
`środkach podjętych w celu zminimalizowania konsekwencji naruszenia oraz \
proponowanych działaniach zapobiegawczych i naprawczych;`,
`danych kontaktowych osoby mogącej udzielić dalszych informacji o naruszeniu.`,
    ],
},
`Jeżeli Podmiot przetwarzający nie jest w stanie w tym samym czasie przekazać \
Administratorowi wszystkich informacji, o których mowa w ust. 1, powinien je udzielać \
sukcesywnie, bez zbędnej zwłoki.`,
`Do czasu uzyskania instrukcji od Administratora, Podmiot przetwarzający podejmuje \
wszelkie rozsądne działania mające na celu ograniczenie i naprawienie negatywnych \
skutków naruszenia.`,
                ],
            }, {
                title: 'Odpowiedzialność Podmiotu przetwarzającego',
                list: [
`Podmiot przetwarzający odpowiada za szkody, jakie powstały wobec Administratora lub \
osób trzecich, spowodowane przetwarzaniem danych osobowych wyłącznie, gdy (I) \
przetwarzał dane osobowe niezgodnie z niniejszą Umową, (II) nie dopełnił obowiązków, \
które Rozporządzenie lub inne przepisy dotyczące ochrony danych osobowych nakładają na \
podmioty przetwarzające lub gdy (III) działał wbrew zgodnym z prawem pisemnym \
instrukcjom Administratora lub poza tymi instrukcjami.`,
`Z zastrzeżeniem bezwzględnie obowiązujących przepisów prawa, Podmiot przetwarzający \
ponosi względem Administratora odpowiedzialność z tytułu niewykonania lub nienależytego \
wykonania niniejszej Umowy wyłącznie do udokumentowanej szkody rzeczywistej (damnum \
emergens) Administratora, ograniczonej do wysokości ostatnio uiszczonej opłaty za \
Subskrypcję Aplikacji jako wynagrodzenia przysługującego Podmiotowi przetwarzającemu od \
Administratora, stosownie do postanowień Umowy głównej.`,
`Ograniczenie odpowiedzialności, o którym mowa w ust. 2, nie znajduje zastosowania przy \
odpowiedzialności wobec osób, których dane dotyczą oraz w sytuacji, gdy szkoda \
spowodowana jest umyślnym działaniem Podmiotu przetwarzającego.`,
`Strona, która zapłaciła odszkodowanie za całą wyrządzoną szkodę, ma prawo do żądania od \
drugiej Strony, która uczestniczyła w tym samym przetwarzaniu, zwrotu części \
odszkodowania odpowiadającej części szkody, za którą druga Strona ponosi \
odpowiedzialność, na podstawie prawa regresu opisanego w art. 82 ust. 5 Rozporządzenia. \
Ograniczenie odpowiedzialności, o którym mowa ust. 2, nie odnosi się do roszczeń \
regresowych opisanych w niniejszym ust. 4.`,
`Podmiot przetwarzający nie ponosi odpowiedzialność za działania lub zaniechania \
Podwykonawcy, dotyczące przetwarzania powierzonych danych osobowych.`,
                ],
            }, {
                title: 'Czas obowiązywania umowy',
                list: [
`Niniejsza Umowa obowiązuje od dnia jej zawarcia przez czas określony związany z \
obowiązywaniem umowy, o której mowa w §2 ust.1.`,
`Podmiot Przetwarzający może przetwarzać dane osobowe powierzone na podstawie \
niniejszej wyłącznie przez okres obowiązywania Umowy Głównej, chyba że Administrator i \
Podmiot Przetwarzający ustalą inny okres przetwarzania danych osobowych w drodze \
odrębnego porozumienia, za odrębnym wynagrodzeniem, albo niniejsza Umowa ulegnie \
rozwiązaniu w przypadkach określonych w §10 niniejszej Umowy.`,
`Umowa ulega rozwiązaniu również w przypadku, gdy do wykonania Umowy Głównej nie jest \
już konieczne przetwarzanie danych osobowych przekazanych Przetwarzającemu przez \
Administratora.`,
`Strony mogą wypowiedzieć niniejszą Umowę z zachowaniem 3-miesięcznego okresu \
wypowiedzenia lub zawierając stosowne porozumienie, zważając iż wypowiedzenie \
niniejszej Umowy może uniemożliwić realizację Umowy Głównej, a tym samym skutkować \
jej rozwiązaniem.`,
                ],
            }, {
                title: 'Rozwiązanie umowy',
                list: [
`Podmiot przetwarzający przyjmuje do wiadomości, że rozwiązanie niniejszej Umowy może \
mieć wpływ na niemożliwość kontynuowania umowy, o której mowa w §2 ust. 1.`,
                ],
            }, {
                title: 'Zasady zachowania poufności',
                list: [
`Wszelkie informacje uzyskane przez strony w trakcie trwania Umowy stanowiące tajemnicę \
przedsiębiorstwa w rozumieniu ustawy z dnia 16 kwietnia 1993 r. o zwalczaniu nieuczciwej \
konkurencji (Dz.U. z 1993r. Nr 47, poz. 211), mogą być wykorzystywane wyłącznie w celu \
prawidłowej realizacji Umowy przez każdą ze stron, chyba że druga strona zwolni ją z \
obowiązku zachowania poufności lub obowiązek ich ujawnienia wynika z obowiązujących \
przepisów prawa.`,
                ]
            }, {
                title: 'Postanowienia końcowe',
                list: [
`Wynagrodzenie z tytułu świadczenia przez Podmiot przetwarzający usług Umowy, obejmuje \
również wynagrodzenie za realizację niniejszej umowy.`,
`W sprawach nieuregulowanych zastosowanie będą miały przepisy Kodeksu cywilnego oraz \
Rozporządzenia.`,
                ],
            }],
            annex: {
                title: 'Załącznik nr 1 – wykaz podmiotów (podwykonawców)',
                table: [
['Podmiot', 'Region', 'Zakres przetwarzania danych'],
['Amazon, Luxemburg', 'UE', `Środowisko serwerowe na którym uruchomiona jest Aplikacja, przechowywane są bazy danych, kopie zapasowe.`],
['OVH S.A., Polska', 'UE', `Środowisko serwerowe wykorzystywane jest do tworzenia kopii zapasowych.`]
],
            }
        },
        privacyPolicy: {
            header: 'Polityka prywatności i cookies',
            chapterOne: 'Postanowienie wstępne',
            paragraphOne: `\
Na podstawie art. 20 ust. 1 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną \
(Dz.U. 2013.1422 – tj. z późn. zm.) oraz na podstawie art. 173 ustawy z dnia 16 lipca 2004 roku \
Prawo telekomunikacyjne (Dz. U. 2014.243 tj. z późn. zm.) STRATEGA CEE SPÓŁKA Z OGRANICZONĄ \
ODPOWIEDZIALNOŚCIĄ z siedzibą w Łodzi, ul. Wólczańska 125, 90-521 Łódź, zarejestrowana w \
Krajowym Rejestrze Sądowym – rejestrze przedsiębiorców pod numerem KRS: 0000541582, której \
akta rejestrowe prowadzi Sąd Rejonowy dla Łodzi-Śródmieścia w Łodzi, XX Wydział Gospodarczy KRS, \
NIP: 7692223109, REGON: 360412382 kapitał zakładowy: 5 000,00 zł w całości wniesiony, e-mail: \
info@strategaresearch.com, zwana dalej „Wykonawcą”, wprowadza niniejszą Politykę Prywatności i \
Plików Cookies, zwaną dalej „Polityką”. \
`,
            paragraphTwo: [
`Pojęcia pisane w Polityce wielką literą, o ile nic innego nie wynika z treści Polityki, mają znaczenie \
określone w Regulaminie Serwisu Internetowego Interviewly (www. interviewlyapp.com).`,
`Pojęcie „Użytkownika” oznacza w zależności od kontekstu Klienta lub osobę chcącą zostać \
Klientem, Kandydata lub osobę chcącą zostać Kandydatem, lub internautę odwiedzającego strony \
Serwisu.`,
            ],
            chapterTwo: 'Dane osobowe',
            paragraphThree: [
`Użytkownik w celu korzystania z usług oferowanych przez Wykonawcę za pośrednictwem Serwisu, \
zobowiązany jest do wypełnienia odpowiedniego formularza rejestracyjnego, w którym należy podać \
określone dane osobowe.`,
`Podanie danych osobowych w formularzu rejestracyjnym jest dobrowolne, jednak konieczne do \
świadczenia usług przez Wykonawcę na rzecz Użytkownika za pośrednictwem Serwisu.`,
`Wszelkie dane osobowe, które Użytkownik wprowadzi do formularza rejestracyjnego lub poda w \
korespondencji z Wykonawcą są przetwarzane w sposób zgodny z wymogami określonymi w \
Rozporządzeniu Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w \
sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie \
swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE zwanego dalej RODO \
oraz ustawie z dnia 18 lipca 2002 roku o świadczeniu usług drogą elektroniczną (Dz.U. 2013.1422 – tj. \
z późn. zm).`,
            ],
            paragraphFour: [
`Administratorem danych osobowych gromadzonych za pośrednictwem formularza rejestracyjnego \
Serwisu internetowego jest Wykonawca. W spółce wyznaczony został Inspektor Ochrony Danych, z \
którym kontakt możliwy jest pod adresem email: inspektor@stratega.pl`,
`Wykonawca może powierzyć przetwarzanie zebranych danych osobowych Użytkowników innemu \
podmiotowi na podstawie zawartej z nim, na zasadzie art. 28 RODO.`,
{
    text: `\
W celu wykonania umów sprzedaży i umów o świadczenie usług zawieranych przez Sprzedawcę z \
Użytkownikami za pośrednictwem Serwisu, dane Użytkowników będą powierzane w szczególności \
następującym podmiotom: \
`,
    sublist: [
`świadczącym usługi pocztowe lub kurierskie, które to podmioty będą dostarczać Użytkownikowi \
testowane towary,`,
`obsługującym transakcje internetowe.`,
    ],
},
            ],
            paragraphFive: `\
Użytkownik ma prawo dostępu do swoich danych osobowych i może dokonać ich weryfikacji lub \
poprawienia, a także do odwołana swojej zgody w każdej chwili, poprzez skierowanie \
odpowiedniego żądania do Wykonawcy. \
`,
            paragraphSix: {
                text: `\
Wykonawca przetwarza dane osobowe Użytkowników i wykorzystuje je w zakresie i w następujących \
celach: \
`,
                sublist: [
`niezbędnym do realizacji usług oferowanych za pośrednictwem Serwisu na podstawie art. 6 ust. 1 \
lit. b) RODO,`,
`na podstawie dodatkowej i opcjonalnej zgody, którą Użytkownik może wyrazić w osobnym \
oświadczeniu, Wykonawca może przetwarzać dane osobowe Użytkowników w celach \
marketingowych na podstawie art. 6 ust. 1 lit. f) RODO. Jeżeli Użytkownik udzieli takiej zgody, to \
może ją następnie w każdej chwili odwołać,`,
`na podstawie udzielonej przez Użytkownika dodatkowej i opcjonalnej zgody ma prawo do \
wysyłania do niego na podane adresy e-mail lub numery telefonu informacji handlowych na \
podstawie art. 6 ust. 1 lit. a) RODO. Zgoda, o której mowa w zdaniu poprzedzającym, może zostać w \
każdej chwili odwołana przez Użytkownika.`,
                ],
            },
            paragraphSeven: `\
Dane osobowe zebrane przez Wykonawcę mogą zostać przekazane upoważnionym, na podstawie \
obowiązujących przepisów prawa, organom państwowym. \
`,
            chapterThree: `Pliki cookies`,
            paragraphEight: [
`Wykonawca wykorzystuje pliki cookies (ciasteczka), czyli niewielkie informacje tekstowe, \
przechowywane na urządzeniu końcowym Użytkownika (np. komputerze, tablecie, smartphonie). \
Cookies mogą być odczytywane przez system teleinformatyczny Wykonawcy.`,
`Wykonawca przechowuje pliki cookies na urządzeniu końcowym Użytkownika, a następnie \
uzyskuje dostęp do informacji w nich zawartych w celach: statystycznych oraz zapewnienia \
prawidłowego działania strony www, a w szczególności utrzymania sesji po zalogowaniu.`,
            ],
            paragraphNine: [
`Wykonawca informuje także Użytkowników, że istnieje możliwość takiej konfiguracji przeglądarki \
internetowej, która uniemożliwia przechowywanie plików cookies na urządzeniu końcowym \
Użytkownika.`,
`Wykonawca wskazuje także, że pliki cookies mogą być przez Użytkownika usunięte po ich \
zapisaniu przez Wykonawcę, poprzez: odpowiednie funkcje przeglądarki internetowej, programy \
służące w tym celu lub skorzystanie z odpowiednich narzędzi dostępnych w ramach systemu \
operacyjnego, z którego korzysta Użytkownik.`,
{
    text: `Pod poniższymi linkami zamieszczone są informacje o sposobach usunięcia cookies w \
najpopularniejszych przeglądarkach internetowych:`,
    sublist:[
        `Firefox: http://support.mozilla.org/pl/kb/delete-cookies`,
        `Opera: http://help.opera.com/Linux/9.60/pl/cookies.html`,
        `Internet Explorer: http://support.microsoft.com / kb/278835/pl`,
        `Chrome: https://suport.google.comhl=pl&amp;answer=95647`,
    ]
}],
            paragraphTen: `\
Wykonawca informuje także Użytkowników, że zmiana konfiguracji przeglądarki internetowej, która \
uniemożliwia lub ogranicza przechowywanie plików cookies na urządzeniu końcowym Użytkownika, \
może spowodować ograniczenia funkcjonalności świadczonych usług. Do podobnych skutków może \
prowadzić wykasowanie plików cookies w trakcie świadczenia usługi. Może to powodować brak \
możliwości zalogowania się do Serwisu lub przerwanie sesji po zalogowaniu.`,
            chapterFour: 'Dane zawarte w logach systemowych.',
            paragraphEleven: `\
Informacje, które są zawierane w logach systemowych w związku z ogólnymi zasadami realizacji \
połączeń w Internecie wykorzystywane są przez firmę hostingową obsługującą Serwis jedynie w \
celach technicznych oraz statystycznych. \
`,
            chapterFive: 'Środki techniczne stosowane przez Wykonawcę.',
            paragraphTwelve: `\
Wykonawca stosuje wymagane aktualnymi przepisami o ochronie danych osobowych środki \
techniczne zapobiegające pozyskiwaniu i modyfikowaniu przez osoby nieuprawnione danych \
osobowych przesyłanych drogą elektroniczną. \
`,
            paragraphThirteen: [
`W przypadku pytań i opinii dotyczących stosowanej przez Wykonawcy Polityki prosimy o ich \
przesyłanie na adres e-mail: inspektor@stratega.pl`,
`Polityka znajduje się na stronie www.interviewlyapp.com`,
            ],
        }
    }
};

export default pl;