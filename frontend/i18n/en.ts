import { Errors } from 'shared';
const { ErrorsTranslations } = Errors;

const en = {
    translation: {
        currentLanguage: 'English',
        generic: {
            loading: 'loading',
            created: 'created',
            yes: 'yes',
            no: 'no',
        },
        validation: {
            join: {
                repeatPasswordError: 'Passwords do not match',
            },
        },
        errors: {
            networkError: 'Cannot connect to the server',
            ...ErrorsTranslations.en.translation,
        },
        links: {
            priceCalculator: 'Price calculator',
            tutorials: 'Tutorials',
            blog: 'Blog',
            contact: 'Contact',
            forgotPassword: 'Forgot password?',
            termsAndConditions: 'Terms and conditions',
            privacyPolicy: 'Privacy Policy',
            personalDataProcessingAgreement: 'Agreement on the Processing of Personal Data',
        },
        buttons: {
            signUp: 'Join Interviewly',
            resign: 'Resign',
            logIn: 'Log in',
            save: 'Save',
            next: 'Next',
            back: 'Back',
            add: 'Add',
        },
        menu: {
            home: 'Home',
            projects: 'Projects',
            myTeam: 'My Team',
            calendar: 'Calendar',
            library: 'Library',
            createProject: 'Create Project',
        },
        dropdownMenu: {
            openUserPanel: 'Open user panel',
            personalData: 'Personal data',
            companyData: 'Company data',
            myTeam: 'My team',
            logout: 'Logout',
        },
        inputs: {
            email: 'E-mail',
            password: 'Password',
        },
        sorting: {
            newest: 'newest',
            oldest: 'oldest',
        },
        dialogs: {
            languageSelection: 'Select the language',
        },
        pages: {
            notFound: 'Page not Found',
        },
        logIn: {
            rememberMe: 'Remember me',
            joinText: 'Don\'t have an account?'
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
                maleTitleShort: 'Man',
                femaleTitleShort: 'Woman',
            },
            page3: {
                title: 'Personal data',
                inputs: {
                    name: 'Name*',
                    surname: 'Surname*',
                    email: 'E-mail*',
                    password: 'Password*',
                    repeatPassword: 'Repeat password*',
                    companyName: 'Company name*',
                    passwordConstraints: '(minimum: 8 characters, one capital letter, one number and one special character)',
                    newsletter: 'I accept sending newsletter',
                    newsletterDetails: `\
In accordance with the provisions of the Act of 18 July 2002 on the provision of electronic services (d. 2020.344) I agree to receive from STRATEGA CEE, COMPANY WITH LIMITED RESPONSIBILITY with headquarters in Łódź, ul. Wólczańska 125, 90-521 Łódź, commercial information about products and services of the Service Interviewlyapp.com in the form of a newsletter. This consent is voluntary and can be revoked at any time. Withdrawal of consent does not affect the lawfulness of processing before withdrawing consent.`,
                },
                rulesAgreement: {
                    text: 'I accept the regulations of the service together with the contract for entrusting the processing of personal data*',
                    termsAndConditionsKeyword: 'regulations',
                    privacyPolicyKeyword: 'contract'
                },
            },
            page4: {
                title: 'Record a video about yourself',
                text: '(max. 10 minutes)',
                submissionText: 'Submitting the form',
            },
            page5: {
                title: 'You are almost a part of out family!',
                text: 'We have sent you an email with a confirmation link.',
                homeButton: 'Home',
            },
            interviewDialog: {
                record: 'Record',
                stop: 'Stop',
                finish: 'Finish'
            },
            fakedoor: {
                title: 'Your account has been created',
                text1: {
                    regular: 'Our website will be fully operational ',
                    strong: 'in a few days',
                },
                subtitle: {
                    regular1: 'You will be the ',
                    strong: 'first',
                    regular2: ' to be informed',
                },
                text2: {
                    regular: 'You also will be the first to take full advantage of our ',
                    strong: 'innovative solutions',
                },
                text3: "Let's stay in touch!",
            },
        },
        home: {
            initialSection: {
                title: 'AI Powered recruitment and interviewing',
                timeBoxText: 'Maximize your time',
            },
            stepsSection: {
                header: {
                    firstPart: 'Only',
                    secondPart: '3 steps',
                    thirdPart: 'to',
                    fourthPart: 'find the',
                    fifthPart: 'best',
                    sixthPart: 'employee',
                },
                content: {
                    firstStep: {
                        title: 'Upload',
                        text: 'the candidates database'
                    },
                    secondStep: {
                        title: 'Conduct',
                        text1: 'video call, program surveys',
                        text2: 'check language skills',
                    },
                    thirdStep: {
                        title: 'Receive',
                        text: 'candidate\'s assesment',
                    },
                },
            },
            worldSection: {
                firstLine: 'Recruit people from',
                secondLine: 'all over the world',
            },
            openAISection: {
                subtitle: 'Upload the brief and get a quote',
                title: 'in 1 minute!',
                dashedLabelText: 'Artificial Intelligence',
                buttonText: 'Go to price calculator',
            },
            subscriptionSection: {
                subtitle: 'We offer',
                title: '4 subscription plans',
                labelText1: 'No contracts.',
                labelText2: 'No surprise fees.',
                subscriptionButtonText: 'Get started',
            },
            tutorialsSection: {
                title: 'Tutorials',
                subscriptionsText: 'Subscriptions count: {{subscriptionsCount, number}}',
                subscribeButtonText: 'Subscribe',
            },
            blogSection: {
                title: 'Blog',
                blogLinkText: 'Read more',
            },
        },
        methodologies: {
            interviews: {
                title: 'Interviews',
                text: '1:1 conversation with the participant.',
            },
            focusGroups: {
                title: 'Focus Groups',
                text: 'Group discussion with a moderator.',
            },
            onlineCommunities: {
                title: 'Online Communities',
                text: 'Online community using Bulletin Board.',
            },
            uxInterviews: {
                title: 'UX Interviews',
                text: 'Participant interview with screen sharing.',
            },
            productTests: {
                title: 'Product tests',
                text: 'Testing products with potential customers.',
            },
        },
        accountStatuses: {
            active: 'active',
            unconfirmed: 'unconfirmed',
            inactive: 'inactive',
        },
        genders: {
            male: 'male',
            female: 'female',
        },
        profileRoles: {
            admin: 'admin',
            moderator: 'moderator',
            observer: 'observer',
            interviewlyStaff: 'Interviewly staff',
        },
        projectStatuses: {
            pending: 'pending',
            canceled: 'canceled',
            finished: 'finished',
        },
        surveyStatuses: {
            pending: 'pending',
            finished: 'finished',
            seeResultsLabel: 'See results'
        },
        languages: {
            bulgarian: 'bulgarian',
            czech: 'czech',
            dutch: 'dutch',
            english: 'english',
            french: 'french',
            german: 'german',
            greek: 'greek',
            hungarian: 'hungarian',
            italian: 'italian',
            polish: 'polish',
            portuguese: 'portuguese',
            romanian: 'romanian',
            russian: 'russian',
            slovak: 'slovak',
            spanish: 'spanish',
            swedish: 'swedish',
            ukrainian: 'ukrainian',
        },
        personalData: {
            title: 'Personal data',
            marketingConsentsSubtitle: 'Marketing consents',
            changePasswordSubtitle: 'Password change',
            currentPassword: 'Current password',
            newPassword: 'New password',
            repeatedNewPassword: 'Repeat new password',
            save: 'Save',
        },
        companyData: {
            title: 'Company data',
            name: 'Company name',
            taxIdNumber: 'Tax ID number',
            country: 'Country',
            city: 'City',
            street: 'Street',
            buildingNumber: 'Building number',
            unitNumber: 'Unit number',
            postalCode: 'Postal code',
            save: 'Save',
            success: 'Saved succesfully',
        },
        myAccount: {
            greeting: 'Hi',
            latestTeamMembersLabel: 'Latest team members',
            upcomingInterviewsLabel: 'Upcoming interviews',
            projectsLabel: 'Projects', 
        },
        projects: {
            title: 'Projects',
            projectsCounterText: 'projects',
            searchInputPlaceholder: 'Search by project name',
            statusLabel: 'Status',
        },
        viewProject: {
            title: 'Project details',
            edit: 'Edit',
            steps: [
                'General',
                'Methodology',
                'Respondents',
                'Screening survey',
                'Details',
            ],
            general: {
                title: 'User Experience in Samsung company',
                description: `\
It can be nerve-wracking, vulnerable, and challenging at times, but getting out of our own heads and incorporating collaboration into our design processes can make us all better designers.\n
\n
Over the years, I’ve come to learn that designing collaboratively means putting your egos aside to make something that transcends the sum of its creators.`,
            },
            methodology: {
                interview: {
                    createSurvey: 'Create Survey',
                    instruction: 'or choose a survey from the library',
                    save: 'Save',
                },
                onlineCommunity: {
                    createBulletinBoardButtonText: 'Create Bulletin Board',
                    membersLabel: 'members',
                    createRoomButtonText: 'Create room',
                    roomName: 'Room name',
                    addMembersLabel: 'Add members',
                    surveySubtitle: 'or choose survey from the library',
                    room: {
                        addTopicLabel: 'Add topic',
                        visibilityLabel: 'Visibility',
                        publicVisibility: 'Public',
                        specificMembersVisibility: 'Specific members',
                        topicInputPlaceholder: 'Topic',
                        addCommentLabel: 'Add comment',
                        noCommentsCabel: 'No comments',
                        commentSingularLabel: 'comment',
                        commentPluralLabel: 'comments',
                    },
                }
            },
            respondents: {
                seeDetailsLabel: 'See details',
                respondentVideoSubtitle: 'Respondent Video',
                upcomingInterviewsSubtitle: 'Upcoming interviews',
                respondentSurveysSubtitle: 'Respondent\'s surveys',
            },
        },
        editProject: {
            title: 'New research creator',
            aboutStepTitle: 'About project',
            methodologyStepTitle: 'Research methodology',
            respondentsStepTitle: 'Selection of respondents',
            detailsStepTitle: 'Project details',
            summaryStepTitle: 'Summary',
            aboutStep: {
                title: 'About project',
                projectNameSubtitle: 'Please provide the project name',
                projectNameInputPlaceholder: 'Project name',
                descriptionInputPlaceholder: 'Description (optional)',
                avatarSubtitle: 'Upload the Avatar',
            },
            methodologyStep: {
                title: 'Research methodology',
                methodologySubtitle: 'Choose the research methodology.',
            },
            respondentsStep: {
                title: 'Selection of respondents',
                respondentsSelectionSubtitle: 'Select respondents for this research',
                respondentsSelectionInstructionPart1: `\
If you're unsure how the respondents file should look like, download our sample file, where you will find all the necessary information.`,
                respondentsSelectionInstructionPart2: 'or specify the desired respondents profile with the filters below',
                genderLabel: 'Gender',
                otherRequirementsInputPlaceholder: 'Other requirements',
                languageTestSubtitle: 'Language test for the respondent',
                screeningSurveySubtitle: 'Do you need a screening survey?',
                screeningSurveyDescription: `\
After paying for the survey, you will have an option to use a ready-made surveys library or two create your own.`,
                recordingSubtitle: 'Do you need a preliminary respondent recruitment recording?',
            },
            detailsStep: {
                title: 'Project details',
                participantsCountInputLabel: 'Number of participants',
                reserveParticipantsCountInputLabel: 'Number of reserve participants',
                interviewDurationDropdownName: 'Interview duration',
                startDateLabel: 'Start date',
                endDateLabel: 'End date',
                transcriptionSubtitle: 'Do you need transcription?',
                moderatorSubtitle: 'Do you need a moderator?',
                paymentSubtitle: 'Payment for the respondent',
                paymentInstruction: `\
Please enter gross amount. The currency should match the currency used for the invoice payment.`,
            },
            summaryStep: {
                title: 'Summary',
            },
            nameStepTitle: 'Name the survey',
            questionStepTitle: 'Add questions',
            nameInputLabel: 'Please provide the',
            nameInputPlaceholder: 'survey title',
            availableLanguagesDropdownName: 'Available Languages',
            addLanguageButtonText: 'Add language',
            addLabel: 'Add',
            openQuestionName: 'open question',
            closedQuestionName: 'closed question',
            multipleChoiceQuestionName: 'multiple-choice question',
            singleChoiceQuestionName: 'single-choice question',
            newQuestionText: 'New question',
            addAnswerButtonText: 'Add answer',
            newAnswerText: 'New answer',
            correctAnswerLabel: 'Correct answer',
            correctAnswerDropdownName: 'Correct answer',
        },
        myTeam: {
            title: 'My team',
            membersLabel: 'members',
            inviteTeamMemberButton: 'Invite team member',
            administratorsLabel: 'Administrators',
            moderatorsLabel: 'Moderators',
            observersLabel: 'Observers',
            popup: {
                addLabel: 'Add',
                editLabel: 'Edit',
                memberText: 'member',
                nameInputPlaceholder: 'Name',
                surnameInputPlaceholder: 'Surname',
                emailInputPlaceholder: 'E-mail',
                roleDropdownName: 'Role',
                statusDropdownName: 'Status',
                genderDropdownName: 'Gender',
                saveButtonText: 'Save'
            }
        },
        library: {
            title: 'Library',
            mySurveys: 'My surveys',
            publicSurveys: 'Public surveys',
            addNewTemplate: 'Add new template',
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
        contact: {
            getInTouch: 'Get in touch',
            sendUsAMessage: 'Send us a message',
            quote: '"Interviewly has everything we need on a single platform."',
            messageSent: 'Message sent!',
        },
        registrationConfirmation: {
            header: 'It\'s ready!',
            subheader: 'You may now log in',
            
        },
        termsAndConditions: {
            header: 'Terms of service',
            generalProvisions: {
                header: 'General provisions',
                main: `\
The service provider of access to the Interviewly Service, hereinafter referred to as the “Service”, is\n
STRATEGA CEE COMPANY WITH LIMITED LIABILITY with headquarters in Łódź, ul. Wólczańska 125,\n
90-521 Łódź, registered in the National Court Register – Register of Entrepreneurs under KRS\n
number: 0000541582, whose registration records areined by the District Court for ŁÓDŹ-Śródmieście\n
IN ŁÓDŹ, XX Economic Division KRS, NIP: 7692223109, REGON: 360412382, hereinafter referred to as\n
“Service Provider” or “Administrator”.`,
                listHeader: 'This Regulation (also referred to as “the Agreement”) stipulates:',
                list: [
                    'the type, scope and rules of services provided electronically by the Service Provider using the Service,',
                    'Responsibilities of Service Recipients and Service Providers,',
                    'the conclusion and termination of contracts for the provision of electronic services,',
                    'Responsibilities and responsibilities of the Service Provider,',
                    'method of advertising,',
                    'Processing of personal data.'
                ],
            },
            definitions: {
                header: 'Definitions',
                list: [{
                    phrase: 'Service provider',
                    definition: `\
an entrepreneur who concludes an agreement with the Provider \
for the provision of the Electronic Service in the form \
of the availability of the Service as defined in this Regulation,`,
                }, {
                    phrase: 'Service',
                    definition: `\
software made available to the Service Recipient, electronically through the web \
browser, enabling in particular the service of HR recruitment,`,
                }, {
                    phrase: 'Account',
                    definition: `\
marked by the individual name of the organization (organization) provided by the \
Service Recipient, a collection of resources in the IT system of the Service Provider, \
in which the Data are collected, thanks to which the Service User can use the Service,`,
                }, {
                    phrase: 'Account administrator',
                    definition: `\
this should be understood as the User who has the rights to \
administer the Account. By default, the account administrator is the person who created the \
Account. As part of the Service, the Service Recipient can change the Account Administrator \
independently, using the functionality available on the Service.`,
                }, {
                    phrase: 'User',
                    definition: 'any person who has ever used or uses the Service',
                }, {
                    phrase: 'Subscription',
                    definition: `\
a declaration of the Service Recipient’s will to conclude an agreement on the \
provision of an electronic service in the form of running an Account on the Service and using the \
Service. Submission is made by creating an Account through the website operating at \
www.interviewlyapp.com or by extending the contract for the provision of an electronic service in \
the form of running an Account on the Service and using the Service,`,
                }, {
                    phrase: 'Fee',
                    definition: `\
remuneration of the Service Provider for the Service due from the Service Recipient. The fee
is paid as a Service Subscription fee during the selected Subscriptions Period or Extended Subscript
during the Selected Subscribership Period.`,
                }, {
                    phrase: 'Subscription period',
                    definition: `\
this should be understood as the period of operation of the Account, for
which a fee is paid and within which services are provided by the Service Provider to the Service
Recipient electronically in the form of the availability of the Service. Subscription periods are
accepted: one month, six months, twelve months.`,
                }],
            },
            obligationsOfServiceProvider: {
                header: 'Obligations of service provider',
                list: [
`The Service Provider declares availability of the Service (SLA) at 80% of the time of the year.`,
`The non-availability of the Service shall not be included in the availability billing when any Fees are \
not paid by the Service Recipient at the time of the Non-available Application.`,
`The indicator refers to the availability of the Website, excluding problems arising from the IT \
infrastructure of the Service Provider or third-party companies, information infrastructure or force \
majeure.`,
`Technical break is the time required for maintenance of the Service and/or the infrastructure used \
by the Service Provider.`,
{
text: `Technical Interruption and Service Updates`,
sublist: [
`The Service Provider will carry out updates of the Service from 19:00 – 7:00 in the Time Zone of the
Services Provider or during technical breaks.`,
`The Service Provider is entitled to make a technical interruption in access to the Service at any time
from 19:00 to 7:00 in the Time Zone of the Service provider.`,
],
},
`The Service Provider reserves the right to modify the Service, in particular to extend its scope.`,
{
text: `The Service Provider is not responsible for:`,
sublist: [
`the consequences of incorrect entry of data or processing of data in the Service by the \
Service Recipient;`,
`improper use of the Service www.interviewlyapp.com;`,
`lack of access to the Internet by the Service Recipient or limitation in its availability;`,
`incorrect operation of software or devices belonging to the Service Recipient or its \
employees which they use and which prevents the use of the Service,`,
`damages incurred, including lost benefits, caused by the Service Recipient by improper \
security, the provision to unauthorized persons of authentication data for access to the Service;`,
`damages incurred, including lost benefits, caused by actions or omissions of the Service \
Recipient, in particular by using the Service in a manner inconsistent with the provisions of \
the law or the Regulations,`,
`damages, including lost benefits, caused by force majeure events.`,
],
},
`Under no circumstances will the Service Provider or its legally affiliated entities be liable for any \
loss of profits or income (lost profits), savings, loss or destruction of data, the value of the company \
or reputation, the inaccuracy of any data, nor will they be responsible for any material / intangible \
damage or indirect, accidental loss, any incurred regardless of the theory of the sources of liability, \
even if they have been informed of the possibility of such damage or loss.`,
`The Service Provider’s liability under the Agreement is limited to the amount equal to the value of \
the last Payment paid by the Service Recipient, but not more than the amount of the Payment for \
the given Subscription Period.`
                ],
            },
            principlesOfApplicationUse: {
                header: 'Principles of application use',
                list: [
`To use the Service it is necessary to have a device with access to the Internet, a web browser, and \
to establish an Account – in addition to in/in – also an e-mail account.`,
`Access to the Website is possible through one of the generally available web browsers: Google \
Chrome, Mozilla Firefox, Opera, Edge, Safari, in the latest versions.\
From the available versions, with enabled, in the web browser, the support of Cookies and Javascript.`,
`The Service Provider provides IT services related to the access and service of the Service only via \
the Internet.`,
`The User acknowledges that regular updating of their devices and software to support modern \
encryption mechanisms during communication from the Website makes it possible to use them. The \
availability of said updates may depend on the hardware and / or software owned by the User and \
therefore the Service Provider is not responsible for the possible absence of the said updates and \
consequently the inability to use the Service for this reason.`,
`The User who uses the Service does not receive any copyrights to the Service. The Service
Recipient and Users are granted only – under the conditions indicated in the Regulations – a paid, \
non-transferable and non-exclusive license entitling him to use the Service in the scope of its \
purpose.`,
{
    text: 'In order to avoid any doubt, you will not, on your own, nor allow or authorize anyone to:',
    sublist: [
`Distributing, transferring, borrowing, sharing, selling, transmitting, licensing, renting or \
otherwise making available the Service.`,
`copying, decompiling, redrawing, reverse engineering or other extraction or reproduction of \
source code or other methods, algorithms or processes from the Website.`,
`to offer or operate the Service in any other profitable commercial form that adds value to \
products or services to any third party, including providing hosting services, time-sharing \
services, SaaS (Software as a Service) services or managing services, even if offered together \
or as part of other products and services;`,
`Remove all copyright information, trademarks with the exception of editable elements at \
the level of functionality of the Website.`,
    ],
},
`The Service Provider shall not bear any responsibility for infringement of the rights of third parties \
and for causing any damage to third parties as a result of and in connection with the activities \
carried out by the Service Recipient, its Users or Employees in the use of the Service.`,
`If the Service User informs the Service Provider of ideas and suggestions related to the Service,\
the Service Recipient agrees to the use of such ideas and suggestion by the Service Provider for any \
purpose, without limitation, in particular, development, modification, correction with exclusion of \
liability as well as remuneration to the User.`,
`The User understands and agrees that the services provided by the Service Provider are based on \
a single, basic version of the application, hardware and infrastructure and are intended to provide \
the service to multiple customers in a scalable way. The Service will not be adapted or / or adapted \
to the Service Recipient, unless to the extent expressly agreed by the Parties.`
                ]
            },
            feesAndPayments: {
                header: 'Fees and payments',
                list: [
`The subscription price is published on the Service Provider’s website: www.interviewlyapp.com.`,
`The prices indicated are net prices (i.e. do not include VAT). Prices are expressed in Polish zloty, \
US dollars.`,
`The fee is paid in advance and is calculated according to the selected subscription model.`,
`Payments are made by credit card (Visa, MasterCard, American Express) or bank transfer on the \
basis of an invoice issued by the Service Provider.`,
`The fee by bank transfer will be paid to the bank account of the Service Provider indicated on the \
VAT invoice. The Customer undertakes to pay the fee within 7 days from the date of delivery of the \
VAT invoice to the specified email address. There is a possibility to extend the transfer period as part \
of individual arrangements with the Service Recipient. The final decision is made by the provider.`,
`The Service Provider may refuse payment by bank transfer if the Service Recipient fails to comply \
with the payment deadline.`,
`Paid invoices are delivered by e-mail.`,
`Delivery of the invoice sent in the form of a file occurs as soon as the Service Provider sends an e-\
mail containing a file of invoicing from the email address to the address indicated by the Service \
Recipient. In the event that the e-mail containing the invoice is not delivered to the Service \
Recipient, for reasons independent of the Service Provider, a duplicate of this invoicing will be issued \
at the request of the Client.`,
`For the day of payment of amounts on the basis of invoices issued by the Service Provider, the \
Parties accept the date of recognition of the Bank account of the Service provider.`,
`The Parties agree that the Service Provider will account for payments originating from the \
Service Recipient in the first place on account of the debts previously due, regardless of the content \
of the Statements accompanying the payment.`,
`If you choose a credit or debit card as the method of payment of the Subscription Fee, the fee for \
each subsequent Subscriptions Period will be charged automatically until the Service Recipient \
declares the desire to withdraw. Such resignation should be reported by e-mail to the address \
contact@interviewlyapp.com up to 7 days before the beginning of the new Subscription Period.`,
`The Service Recipient is obliged to pay the Fee for the selected Subscription not later than within \
7 working days from the date of submission of the Subscription. The day of payment is considered \
the day of accounting of the required debt on the Bank account of the Service Provider. Failure to \
pay within the specified timeframe is equivalent to cancellation of the subscription.`,
`The change of the Parameters of the Subscription is made by the Account Administrator directly \
on the Account in the Service and can be cancelled by him at any time or on the order of the \
Account administrator sent to the email address specified in the paragraph. 2 of the Service \
Provider.`,
`The Account Administrator has access in the Service to`,
`The Service Recipient agrees to send VAT invoices by the Service Provider in electronic form in \
accordance with the legal basis for issuing and sending invoice in electronic format. \
Act of 11 March 2004 on the tax on goods and services (Dz.U. Chapter 54, Pos. and 535). Invoice sent \
in electronic form in accordance with the Act (Dz.U. No. 144 item 1204, as amended) is equivalent to \
sending a invoice issued in paper form and constitutes an accounting document. \
\n
Corrective invoices and duplicates for invoice sent electronically will also be sent in electronic form.`,
`The VAT invoice in paper form will be issued and delivered only at the express request of the \
Service Recipient expressed in electronic form to the contact email address of the Provider. The fee \
for printing and delivery of VAT in paper form is paid by the Service Provider and added to the \
invoice, in the amount of 59 PLN net + VAT.`,
`The Service Provider may at any time, after informing the Service Recipients, at least 60 days \
before the change, if this is required by applicable law, change the Price List or part thereof or \
establish new fees. Changes in prices and the establishment of new fees will come into effect for \
subsequent subscription periods and for all new Service Recipients after the date of entry into force \
of the change. If the Service Recipient does not agree to the price changes in the Tariff, he/she may \
cancel the Subscription and stop using the Service before the beginning of the next Period, from \
which the changed prices will apply.`,
                ],
            },
            support: {
                header: 'Support',
                list: [
`Technical support is available every day. 9:00 – 15:00 (CET) for Service Recipients with a Fee paid \
for the Applicable Subscription Period for selected subscription models.`,
`Contact for technical support is available to the Account Administrator by email at \
contact@interviewlyapp.com`,
`The Service Provider will make every effort to reply to the emails within 72 hours within the \
working days applicable to the Service provider.`,
                ],
            },
            compliants: {
                header: 'Compliants',
                list: [
`The Service Provider undertakes to immediately remove defects that prevent access to the use of \
the Service.`,
`Complaints related to the provision of the service of access to the Service, the Service Recipient \
may submit by e-mail at contact@interviewlyapp.com`,
{
    text: 'The report should indicate:',
    sublist: [
`the name of the organization (information provided when creating the account) and its \
email address`,
`information about the user concerned,`,
`the time and circumstances of the occurrence of the problem with the operation of the \
Service, the URL or the name of the page,`,
`Screen with visible URL and problem`,
    ],
},
`If additional information is necessary for the examination of the complaint, the Service Provider \
requests that you provide this information before considering the complainant, and the time for \
examining the claim is counted from the date of delivery of the requested information.`,
`It is recommended to provide in the above e-mail as much information and circumstances as \
possible regarding the subject of the complaint, in particular the type and date of occurrence of the \
irregularity and contact details – this will facilitate and speed up the processing of complaints by the \
Service Provider.`,
`The complaint is handled by the Service Provider immediately, not later than within 14 working \
days.`,
`The consideration of the complaint by the Service Provider is final.`,
`The Service Provider’s response to the complaint is sent to the Service Recipient’s e-mail address \
indicated in the claim notification,`,
                ],
            },
            serviceData: {
                header: 'Service data',
                list: [
`The data entered by the Service Recipient into the Service Account is the property of the Service \
recipient.`,
`All data entered into the Service Account will be stored by the Service Provider in accordance with \
Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the \
protection of individuals with regard to the processing of personal data and on the free movement \
of such data and repealing Directive 95/46/EC. (dalej RODO).`,
`The Service Provider stores and processes the data made available to him by the Service Recipient \
in accordance with applicable legal provisions and according to the Personal Data Processing Trust \
Agreement, which constitutes Appendix No. 1 to the Regulations.`,
`By accepting these Terms of Service, the Service Recipient agrees to entrust the data to the \
Service Provider in accordance with the Personal Data Processing Trust Agreement.`,
                ],
            },
            conditionsOfCeasementOfContract: {
                header: 'Conditions of ceasement of contract',
                list: [
`The Customer may terminate the contract with a one-month notice period and without giving \
reasons by sending a relevant statement by e-mail to contact@interviewlyapp.com.`,
`The Service Recipient may terminate the contract immediately if the Service Provider does not \
maintain the availability of the Service within the scope specified in the SLA in paragraph III.1, by \
sending a relevant statement by e-mail to contact@interviewlyapp.com.`,
{
    text: `\
The Service Provider may temporarily or permanently block the Account of the Service Recipient \
or terminate the Agreement in the event that the User:`,
    sublist: [
`violates the Rules,`,
`provides content of an unlawful nature, after an ineffective prior call to cease the violations \
with a fixed time limit;`,
`is detrimental to the Service Provider or will provide false data during the registration process or will not immediately update \
changes to the data provided according to the actual state,`,
`does not pay on time.`,
`is committing actions aimed at violating the security of data processed in the Service and \
using the Service or makes an unauthorized attempt to access the Service, or performs other \
actions designed to interfere with the proper functioning of the Service.`,
    ],
},
`The Service Provider is entitled to terminate the Agreement with immediate terminating effect \
when one of the reasons specified in paragraph 3 of this chapter occurs.`,
`The Service Provider may terminate the Agreement at any time, with a three-month notice \
period.`,
`The Service Provider’s declaration of will regarding the termination of the contract for its validity \
requires a documentary form and should be sent respectively to the email address of the current \
Account Administrator of the Service Recipient. The period of termination of the Agreement starts \
from the Day of Delivery of the declaration of will of the Service Provider to terminate the Contract.`,
`This termination leads to the termination of the legal relationship with effect for the future.`,
                ],
            },
            finalProvisions: {
                header: 'Final provisions',
                list: [
`Contracts concluded by the Service Provider within the scope of the Application’s activities are \
concluded in Polish, in accordance with the law in force on the territory of Poland.`,
`The Service Provider reserves the right to make changes to the Regulations. Changes made to the \
Terms of Use shall bind the Service Recipient, provided that he has been properly informed of the \
changes and has not terminated the Agreement within 14 days from the date of notification of the \
change by the Service Provider.`,
`In case of non-compliance of any part of the Regulations with applicable law, the relevant provisions \
of Polish law shall apply in place of the contested provision of the regulations.`,
`Any disputes arising between the Service Provider and the Service Recipient shall be submitted to \
the court competent on the basis of the seat of the Service Provider.`,
                ],
            }
        },
        personalDataProcessingAgreement: {
            header: 'Agreement on the Processing of Personal Data',
            text: `\
The Agreement on the Processing of Personal Data is an integral part of the Regulations and sets out \
the rules for the processing by the Service Provider on behalf of the Service Recipient of the User’s \
personal data through the Service at www.interviewlyapp.com. \

The Agreement for the Processing of Personal Data constitutes the whole of the obligations and \
conditions of the User’s data processing between the Service Provider and the Service Recipient in \
connection with the SaaS Service and replaces all previous agreements, agreements and \
arrangements between the Services Provider and the service recipient in this respect.`,
            rules: [{
                title: 'Definitions',
                list: [
`Administrator – means the Service Recipient, who, alone or jointly with other entities, determines \
the purposes and methods of processing Personal Data;`,
`Processor – means Service Provider`,
                ],
            }, {
                title: 'Subject of personal data processing',
                list: [
`In connection with the implementation of the contract for the provision of services by electronic \
means for the SaaS service regulated in the Regulations (hereinafter referred to as the &quot;Main \
Agreement&quot; concluded between the Parties, the Controller entrusts to the Processor in accordance \
with Article 28 of the Regulation, personal data to be processed on behalf of the Administrator, on \
the terms and for the purposes specified in the Contract.`,
`The conclusion of the Agreement constitutes a documented instruction of the Administrator to \
process Personal Data by the Service Provider, including the Transfer of Personal Data to Third \
Countries, as referred to in Article 28 (3) (a) of the GDPR.`,
`The Controller declares that he is the controller of personal data within the meaning of the \
provisions of Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April \
2016 on the protection of natural persons with regard to the processing of Personal Data and on the \
free movement of such data and repealing Directive 95/46/EC (General Data Protection Regulation), \
(hereinafter the “Regulation”), which he entrusts to the Processor.`,
                ],
            }, {
                title: 'Scope and purpose of data processing',
                list: [
`Personal data entrusted to the Controller will be processed by the Processor only for the purpose of \
performing the services described in detail in the Main Agreement referred to in § 2 paragraph 1 and \
in a manner consistent with this Agreements and relevant, generally applicable legal provisions.`,
`Category of persons: employees and co-workers of the Administrator, candidates for employment, \
users of the Service.`,
{
    text: `The processor undertakes to process the entrusted personal data to the following extent:`,
    sublist: [
`Name and Surname`,
`Image – photo and recordings uploaded to the Service`,
`Gender`,
`Address`,
`Contact Phone`,
`E-mail address`,
`Date of birth`,
`Bank Account Number`,
`Professions`,
`Industry`,
`Civil state`,
`Information about having children`,
`Other data contained in stored files or entered elsewhere.`,
    ]
},
`Processing activities: Collecting, recording, organizing, arranging, storing, viewing, transferring, \
modifying, deleting.`,
`Form of processing: Electronic`,
                ],
            }, {
                title: 'Obligations of the Processor',
                list: [
`The Processor declares that it provides appropriate technical and organizational measures to ensure \
that the processing complies with the requirements set out in the Regulation and protects the rights \
of data subjects, which in particular means that the Processor takes the appropriate measures \
required by art. 32 of the Regulation and is due diligence in the processing of entrusted personal \
data.`,
`The processor undertakes to authorize the processing of personal data to all persons who will \
process the entrusted data for the purposes of this Agreement.`,
`Taking into account the nature of the processing, the Processor shall, as far as possible, assist the \
Controller, by means of appropriate technical and organizational measures, to fulfill the obligation to \
respond to the requests of the data subject in the exercise of his or her rights, specified in Chapter III \
of the Regulation.`,
`Taking into account the nature of the processing and the information available to it, the processor \
will assist the controller in fulfilling the obligations specified in art. 32 to 36 of the Regulations.`,
`The processor undertakes to ensure the confidentiality of the processed data (as referred to in \
Article 28(3)(b) of the Regulation) by persons whom it authorizes to process personal data for the \
purpose of the execution of this contract, both during their employment with the processor and \
after its termination.`,
`The processor after the completion of the provision of services related to data processing will delete \
all data entrusted by the Controller after the expiry of the time specified in the main contract.`,
`The processor after finding a violation of the protection of personal data without undue delay \
reports it to the Controller.`,
`The processor, after finding a violation of the protection of personal data without undue delay, no \
later than within 36 hours of the violation, shall report it to the Controller. The application should be \
submitted by e-mail to the email address entered by the Administrator in the data during \
registration (the address is also the administrator&#39;s login).`,
                ],
            }, {
                title: 'Technical and organizational measures',
                list: [
`Taking into account the state of the technical knowledge, the cost of implementation and the \
nature, scope, context and purposes of the processing of Personal Data and the risk of infringement \
of the rights of persons whose personal data are concerned, the Service Provider shall provide \
technical and organizational measures appropriate to the type of personal data and risk of violation \
of rights of individuals whom the Personal Data is concerned.`,
                ],
            }, {
                title: 'Right to control of processing',
                list: [
`In accordance with Article 28(3)(h) of the Regulation, the Controller has the right to control whether \
the measures applied by the Processor when processing and securing the personal data entrusted \
are in compliance with the provisions of the contract.`,
`The notification of the intention to carry out the inspection or audit should be sent to the processor \
at least 14 calendar days before the start of the activity. The costs of the audit are covered by the \
administrator.`,
`The auditor appointed by the Controller may not be an entity conducting competitive activities with \
the Processor, nor an entities related to it, an employee or a cooperating entity, regardless of the \
basis of employment or cooperation. Before carrying out audit activities, the auditor is obliged to \
ensure that the information obtained is kept confidential.`,
`The control of the processing, insofar as it relates to the areas of processing of personal data, may \
not last more than 3 working days.`,
`The control of processing will be completed by the signing of the protocol of Control of Processing by \
both Parties. The protocol will contain conclusions from the Control of Processing and the scope \
agreed by both Parties of possible changes in the processing of Personal Data by the Processor.`,
`The processor undertakes to comply with the recommendations of the Controller or the entity \
authorized by him, regarding the improvement of the quality of the security of personal data and the \
method of their processing or the removal of defects found during the inspection or audit within a \
period specified by the controller not longer than 28 days.`,
                ],
            }, {
                title: 'Delivery of data for processing',
                list: [
`The processor may subcontract the processing of personal data processed by him in connection with \
the provision of the service covered by the contract referred to in § 2 paragraph. 1 contracts with \
other processors (hereinafter referred to as “Subcontractors”), in accordance with the terms of use \
of Subcontractor services specified in the Regulation.`,
`The Controller agrees to subordinate, entrusted to the Processor to process data on the basis of the \
Agreement specified in Appendix No. 1 to the Contract.`,
`The entities to which the processor has entrusted the further processing of personal data are \
specified in Annex 1 to the Agreement.`,
`The processor may make changes to current subcontractors and add additional, without prior notice \
to the Controller.`,
                ],
            }, {
                title: 'Notification of violations',
                list: [
{
    text: `Upon finding a violation of the protection of the personal data entrusted to it by the Controller, the \
    Processor, without undue delay, from the detection of the violation, reports it to the Administrator. \
    The report shall contain at least information on:`,
    sublist: [
`the date, duration and location of the personal data breach;`,
`the nature and scale of the infringement, i.e. in particular the categories and approximate \
number of data subjects and the types and approximately number of personal data entries \
affected by the violation, and, where possible, also the identification of the persons \
concerned;`,
`the expected time needed to repair the damage caused by the infringement;`,
`the nature and scope of the personal data subject to the infringement;`,
`the possible consequences of the breach, including the consequences for data subjects;`,
`the measures taken to minimize the consequences of the infringement and the proposed \
preventive and corrective measures;`,
`contact details of the person who may provide further information about the infringement.`,
    ],
},
`If the processor is not able to provide the controller with all the information referred to in paragraph \
1 at the same time, it shall provide it successively without undue delay.`,
`Until receipt of instructions from the Controller, the Processor shall take all reasonable measures to \
limit and remedy the negative effects of the infringement.`,
                ],
            }, {
                title: 'Responsibility of the Processor',
                list: [
`The processor is liable for damages incurred to the Controller or third parties caused by the \
processing of personal data only if (i) it has processed personal data contrary to this Agreement, (ii) \
it fails to comply with the obligations that the Regulation or other provisions on the protection of \
Personal Data impose on the processors or (iii) it acts in violation of the lawful written instructions of \
the Administrator or beyond these instructions.`,
`Subject to the strictly applicable provisions of the law, the Processor shall be liable to the Controller \
for non-performance or improper performance of this Agreement only to documented actual \
damage (damnum emergens) of the Administrator, limited to the amount of the latest payment for \
the Subscription of the Application as a remuneration due to the Processing Entity from the \
Manager, in accordance with the provisions.`,
`The limitation of liability referred to in paragraph 2 does not apply to liability towards data subjects \
and where the damage is caused by the intentional action of the processor.`,
`The Party which has paid compensation for the entire damage caused shall have the right to request \
that the other Party which participated in the same processing reimburse the part of the \
compensation corresponding to the portion of the damage for which the other party is liable, on the \
basis of the right of regression described in Article 82(2). 5 of the Regulation. The limitation of \
liability referred to in paragraph 2 shall not apply to regressive claims described in this paragraph. 4.`,
`The processor is not responsible for the actions or omissions of the subcontractor regarding the \
processing of the personal data entrusted.`,
                ],
            }, {
                title: 'Duration of the agreement',
                list: [
`This Agreement shall be in force from the date of its conclusion for a specified period of time related \
to the validity of the agreement referred to in § 2 paragraph 1.`,
`The Processor may process the personal data entrusted under this Agreement only for the period of \
validity of the Main Contract, unless the Controller and the Processor determine a different period \
for the processing of personal data by means of a separate agreement, for a separate remuneration, \
or this Contract will be terminated in the cases specified in § 10 of this agreement.`,
`The contract is also terminated when the processing of personal data provided to the Processor by \
the Controller is no longer necessary for the performance of the Main Contract.`,
`The Parties may terminate this Agreement with a three-month notice period or by concluding a \
corresponding agreement, considering that the termination of this agreement may prevent the \
execution of the Main agreement and thus result in its termination.`,
                ],
            }, {
                title: 'Termination of agreement',
                list: [
`The processor acknowledges that the termination of this Agreement may affect the impossibility of \
continuing the agreement referred to in § 2 paragraph. 1.`,
                ],
            }, {
                title: 'Rules of Confidentiality',
                list: [
`All information obtained by the parties during the duration of the Agreement constituting business \
secret within the meaning of the Act of 16 April 1993 on combating unfair competition (Journal of \
Laws of 1993r. No. 47, item 211), may be used only for the proper execution of the Agreement by \
either party, unless the other party exempts it from the obligation to maintain confidentiality or the \
duty to disclose them arises from applicable legal provisions.`,
                ]
            }, {
                title: 'Final provisions',
                list: [
`The remuneration for the provision by the Processor of the Services of the Agreement, also includes \
the reward for the execution of this agreement.`,
`In unregulated matters the provisions of the Civil Code and the Regulations shall apply.`,
                ],
            }],
            annex: {
                title: 'Annex 1 – List of subcontractors',
                table: [
['Subject', 'Region', 'Scope of data processing'],
['Amazon, Luxemburg', 'EU', `The server environment on which the Application is run, databases, backups are stored.`],
['OVH S.A., Polska', 'EU', `The server environment is used to create backup copies.`]
],
            }
        },
        privacyPolicy: {
            header: 'Privacy Policy and Cookies',
            chapterOne: 'Preliminary provisions',
            paragraphOne: `\
1 of the Act of 18 July 2002 on the provision of electronic services (Dz. In accordance with Article 173 \
of the Act of 16 July 2004 Telecommunications Law (Dz. U. 2014.243 i.e. from later. The company is a \
limited liability company with headquarters in Łódź, ul. Wólczańska 125, 90-521 Łódź, registered in \
the National Court Register – register of entrepreneurs under KRS number: 0000541582, whose \
registration records areined by the District Court for Łódź-Śródmieście in Łódź, XX Economic \
Department KRS, NIP: 7692223109, REGON: 360412382 share capital: 5 000,00 PLN submitted fully, \
e-mail: info@strategaresearch.com, hereinafter referred to as “the Contractor”, introduces this \
Privacy Policy and Cookies, herein referred as “Policy”. \
`,
            paragraphTwo: [
`The terms written in the Policy with the capital letter, unless otherwise stated in the content of \
the Policy, have the meaning specified in the Regulations of the Website. \
(www.interviewlyapp.com).`,
`The term “User” means, depending on the context of the Customer or the person who wishes to \
become a Customer, a Candidate or a person wishing to be a Candidate, or an Internet user visiting \
the Website.`,
            ],
            chapterTwo: 'Personal data',
            paragraphThree: [
`The User, in order to use the services offered by the Contractor through the Website, is obliged to \
fill out the appropriate registration form, in which specific personal data must be entered.`,
`Providing personal data in the registration form is voluntary, but necessary for the provision of \
services by the Provider to the User through the Website.`,
`All personal data that the User enters in the registration form or submits in correspondence with \
the Contractor are processed in a manner that complies with the requirements laid down in \
Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the \
protection of individuals with regard to the processing of personal data and on the free movement \
of such data and repealing Directive 95/46/EC, hereinafter referred to as the GDPR and the Act of 18 \
July 2002 on the provision of electronic services (Journal of Laws of the Russian Federation). 2013 – \
1422 – i.e. from later.`,
            ],
            paragraphFour: [
`The controller of the personal data collected through the registration form of the Website is the \
Contractor. In the company a Data Protection Inspector has been appointed, with whom contact is \
possible at the email address: inspektor@stratega.pl`,
`The Contractor may entrust the processing of the collected personal data of the Users to another \
entity on the basis concluded with him, pursuant to art. 28 GDPR.`,
{
    text: `\
In order to execute sales and service contracts concluded by the Seller with Users through the \
Service, User data will be entrusted in particular to the following entities: \
`,
    sublist: [
`providers of postal or courier services, which will provide the User with the tested goods,`,
`managing online transactions.`,
    ],
},
            ],
            paragraphFive: `\
The user has the right to access their personal data and can verify or correct them, as well as to \
withdraw their consent at any time, by addressing the appropriate request to the Contractor. \
`,
            paragraphSix: {
                text: `\
The Service Provider processes the User’s personal data and uses it to the extent and for the \
following purposes: \
`,
                sublist: [
`necessary for the performance of services offered through the Service pursuant to Article 6 (1) (b) \
GDPR,`,
`on the basis of additional and optional consent, which the User may express in a separate \
statement, the Contractor may process the User’s personal data for marketing purposes under \
Article 6 (1) (f) GDPR. If the User gives such consent, he may then revoke it at any time.`,
`on the basis of the additional and optional consent given by the User has the right to send to him \
to the given e-mail addresses or telephone numbers commercial information pursuant to Art. 6 (1) \
(a) GDPR. The consent referred to in the previous sentence may be revoked by the User at any time.`,
                ],
            },
            paragraphSeven: `\
Personal data collected by the Contractor may be transferred to authorized, on the basis of \
applicable legislation, state authorities. \
`,
            chapterThree: `The cookies`,
            paragraphEight: [
`The Provider uses cookies, i.e. small text information, stored on the User’s terminal device. (i.e. \
computer, tablet, smartphone). Cookies can be read by the IT system of the Provider.`,
`The Provider stores cookies on the User’s terminal device and then obtains access to the \
information contained therein for statistical purposes and to ensure the correct operation of the \
website, and in particular to maintain the session after logging in.`,
            ],
            paragraphNine: [
`The Provider also informs Users that there is a possibility of such a configuration of the web \
browser that prevents the storage of cookies on the User’s terminal device.`,
`The Provider also indicates that cookies may be deleted by the User after they have been saved by \
the Provider, through: appropriate functions of the web browser, programs serving for this purpose \
or the use of appropriate tools available within the operating system that the User uses.`,
{
    text: `The following links provide information on how to delete cookies in the most popular web \
browsers:`,
    sublist:[
        `Firefox: http://support.mozilla.org/pl/kb/delete-cookies`,
        `Opera: http://help.opera.com/Linux/9.60/pl/cookies.html`,
        `Internet Explorer: http://support.microsoft.com / kb/278835/pl`,
        `Chrome: https://suport.google.comhl=pl&amp;answer=95647`,
    ]
}],
            paragraphTen: `\
The contractor also informs Users that changing the internet browser settings to disable or limit the \
storage of cookies on the User&#39;s end device may result in a limitation of the functionality of the \
provided services. Similar consequences may occur if the cookies are deleted during the service \
provision. This may result in the inability to log into the Service or the interruption of a session after \
logging in.`,
            chapterFour: 'Data contained in system logs',
            paragraphEleven: `\
The information contained in the system logs in connection with the general rules for the \
implementation of Internet connections is used by the hosting company operating the Service only \
for technical and statistical purposes. \
`,
            chapterFive: 'Technical measures used by the contractor',
            paragraphTwelve: `\
The Contractor shall apply the technical measures required by the current legislation on the \
protection of personal data to prevent the acquisition and modification by unauthorized persons of \
the personal data transmitted electronically. \
`,
            paragraphThirteen: [
`In case of questions and opinions regarding the Policy applied by the Contractor, please send \
them to the email address: inspektor@stratega.pl`,
`The policy can be found at www.interviewlyapp.com`,
            ],
        }
    }
};

export default en;