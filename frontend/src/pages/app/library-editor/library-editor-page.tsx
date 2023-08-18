import React, { useCallback, useRef, useState } from 'react';
import { Form, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import CloseControls from '../../../components/close-controls/close-controls';
import TextButton from '../../../components/text-button/text-button';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import LibraryEditorStepper from './library-editor-stepper';
import LibraryEditorLanguageButton from './library-editor-language-button';
import AddQuestionButton from './add-question-button';
import languageCodeToFlagIcon from '../../../utils/language-code-to-flag-icon';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';

import classes from './library-editor-page.module.css';
import InterviewlyLogo from 'images/logo.svg';
import PlusIconBlack from 'images/plus-icon-black.svg';
import MinusIconBlack from 'images/minus-icon-black.svg';
import ParagraphIconBlack from 'images/paragraph-icon-black.svg';
import PlusIconPurple from 'images/plus-icon-purple.svg';


const LibraryEditorPage = () => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const LANGUAGES = [{
        name: capitalizeFirstLetter(t('languages.bulgarian')),
        code: 'bg',
    }, {
        name: capitalizeFirstLetter(t('languages.czech')),
        code: 'cz',
    }, {
        name: capitalizeFirstLetter(t('languages.dutch')),
        code: 'nl',
    }, {
        name: capitalizeFirstLetter(t('languages.english')),
        code: 'en',
    }, {
        name: capitalizeFirstLetter(t('languages.french')),
        code: 'fr',
    }, {
        name: capitalizeFirstLetter(t('languages.german')),
        code: 'de',
    }, {
        name: capitalizeFirstLetter(t('languages.greek')),
        code: 'gr',
    }, {
        name: capitalizeFirstLetter(t('languages.hungarian')),
        code: 'hu',
    }, {
        name: capitalizeFirstLetter(t('languages.italian')),
        code: 'it',
    }, {
        name: capitalizeFirstLetter(t('languages.polish')),
        code: 'pl',
    }, {
        name: capitalizeFirstLetter(t('languages.portuguese')),
        code: 'pt',
    }, {
        name: capitalizeFirstLetter(t('languages.romanian')),
        code: 'ro',
    }, {
        name: capitalizeFirstLetter(t('languages.russian')),
        code: 'ru',
    }, {
        name: capitalizeFirstLetter(t('languages.slovak')),
        code: 'sk',
    }, {
        name: capitalizeFirstLetter(t('languages.spanish')),
        code: 'es',
    }, {
        name: capitalizeFirstLetter(t('languages.swedish')),
        code: 'se',
    }, {
        name: capitalizeFirstLetter(t('languages.ukrainian')),
        code: 'ua',
    }];
    
    const DEFAULT_LANGUAGE = LANGUAGES.find(l => l.code === resolvedLanguage) as typeof LANGUAGES[number];
    const INTITIAL_AVAILABLE_LANGUAGES = LANGUAGES.filter(l => l.code !== DEFAULT_LANGUAGE.code);
    const navigate = useNavigate();
    const submit = useSubmit();
    const formRef = useRef(null);

    const currentTemplate = useLoaderData() as any;
    console.log(currentTemplate)

    const [ showTitleStep, setShowTitleStep ] = useState(true);

    const [ templateName, setTemplateName ] = useState(currentTemplate?.name ?? '');
    const [ questions, setQuestions ] = useState<any>(currentTemplate?.questions ?? []);
    
    const [ availableLanguages, setAvailableLanguages ] = useState(
        currentTemplate?.languages
        ? INTITIAL_AVAILABLE_LANGUAGES.filter(l => !currentTemplate?.languages.includes(l.code))
        : INTITIAL_AVAILABLE_LANGUAGES
    );
    const [ currentAvailableLanguageIndex, setCurrentAvailableLanguageIndex ] = useState(-1);
    const [ selectedLanguages, setSelectedLanguages ] = useState<typeof LANGUAGES>(
        currentTemplate?.languages
        ? currentTemplate.languages.map(language => ({
            code: language,
            name: LANGUAGES.find(
                languageDefinition => languageDefinition.code === language
            )?.name,
        }))
        : [DEFAULT_LANGUAGE]
    );
    const [ currentSelectedLanguageIndex, setCurrentSelectedLanguageIndex ] = useState(0);
    
    const currentLanguageCode = selectedLanguages[currentSelectedLanguageIndex].code;

    const goBack = useCallback(() => navigate(-1), []);

    const addLanguage = () => {
        if (currentAvailableLanguageIndex < 0) {
            return;
        }

        const newAvailableLangugages = [...availableLanguages];
        const newLanguage = newAvailableLangugages.splice(currentAvailableLanguageIndex, 1)[0];     

        const newSelectedLanguages = [...selectedLanguages, newLanguage];

        //TODO i18n
        const newQuestions = JSON.parse(JSON.stringify(questions));
        newQuestions.forEach(question => {
            question.text[newLanguage.code] = `New question (${newLanguage.code})`;

            question.answers?.forEach(
                answer => answer[newLanguage.code] = `New answer (${newLanguage.code})`
            );
        });
        
        setAvailableLanguages(newAvailableLangugages);
        setSelectedLanguages(newSelectedLanguages);
        setQuestions(newQuestions);
        setCurrentAvailableLanguageIndex(-1);
    };

    const handleLanguageChange = (i) => {
        setCurrentSelectedLanguageIndex(i);
    };

    const addNewQuestion = (type: string) => {
        const newState = JSON.parse(JSON.stringify(questions));

        const text = Object.values(selectedLanguages).reduce((acc, cur) => ({
            ...acc,
            [cur.code]: t('editProject.newQuestionText'),
        }), {});

        const newQuestion: any = {
            code: 'Q' + questions.length,
            text,
            type,
            obligatory: 'Y',
        };

        if (['M', '!'].includes(type)) {
            newQuestion.answers = [];
        }

        newState.push(newQuestion);
        setQuestions(newState);
    }

    const removeQuestion = (index: number) => {
        const newState = JSON.parse(JSON.stringify(questions));

        newState.splice(index, 1);

        setQuestions(newState);
    }

    const handleQuestionChange = (
        questionCode: string,
        newValue: string,
    ) => {
        const newState = JSON.parse(JSON.stringify(questions));

        const question = newState.find(
            question => question.code === questionCode
        );

        question.text[currentLanguageCode] = newValue;

        setQuestions(newState);
    }

    const questionTypeToName = (type: string) => {
        switch (type) {
            case 'T':
                return t('editProject.openQuestionName')
            case 'Y':
                return t('editProject.closedQuestionName'); 
            case 'M':
                return t('editProject.multipleChoiceQuestionName');
            case '!':
                return t('editProject.singleChoiceQuestionName');
            default:
                console.error('Unknown question type');
                return null;
        }
    }

    const addNewAnswer = (questionCode: string) => {
        const newState = JSON.parse(JSON.stringify(questions));
        const question = newState.find(question => question.code === questionCode);

        const newAnswer = Object.values(selectedLanguages).reduce((acc, cur) => ({
            ...acc,
            [cur.code]: t('editProject.newAnswerText'),
        }), {});

        question.answers.push(newAnswer);

        setQuestions(newState);
    };

    const removeAnswer = (
        questionCode: string,
        index: number,
    ) => {
        const newState = JSON.parse(JSON.stringify(questions));
        const question = newState.find(question => question.code === questionCode);

        question.answers.splice(index, 1);

        setQuestions(newState);
    }

    const handleAnswerChange = (
        questionCode: string,
        index: number,
        value: string,
    ) => {
        const newState = JSON.parse(JSON.stringify(questions));

        const question = newState.find(
            question => question.code === questionCode
        );

        question.answers[index][currentLanguageCode] = value;

        setQuestions(newState);
    }

    const toggleCorrectAnswer = (
        questionCode: string,
        index: number,
        useArray: boolean,
    ) => {
        const newState = JSON.parse(JSON.stringify(questions));

        const question = newState.find(
            question => question.code === questionCode
        );

        if (useArray) {
            if (question.correctAnswerIndexes?.includes(index)) {
                question.correctAnswerIndexes.splice(
                    question.correctAnswerIndexes.indexOf(index),
                    1,
                );

                if (question.correctAnswerIndexes.length < 1) {
                    delete question.correctAnswerIndexes;
                }
            } else {
                if (!question.correctAnswerIndexes) {
                    question.correctAnswerIndexes = []
                } 

                question.correctAnswerIndexes.push(index);
            }
        } else {
            if (question.correctAnswerIndex === index) {
                delete question.correctAnswerIndex;
            } else {
                question.correctAnswerIndex = index;
            }
        }

        setQuestions(newState);
    }

    console.log(questions);

    return (
        <Form method="post" className={classes.page} ref={formRef}>
            <header className={classes.header}>
                <img src={InterviewlyLogo} className={classes.logo}/>
                <h1 className={classes.title}>{t('editProject.title')}</h1>
                <CloseControls
                    className={classes.closeControls}
                    text={t('buttons.resign')}
                    onClose={goBack}
                />
            </header>
            <LibraryEditorStepper
                className={classes.stepper}
                steps={[{
                    title: t('editProject.nameStepTitle'),
                }, {
                    title: t('editProject.questionStepTitle'),
                }]}
                currentStep={showTitleStep ? 0 : 1}
            />
            <div className={classNames(classes.titleStep, !showTitleStep && classes.hidden)}>
                <div className={classes.titleStepTitleWrapper}>
                    <img className={classes.titleStepTitleIcon} src={ParagraphIconBlack}/>
                    <h6 className={classes.titleStepTitle}>
                        {t('editProject.nameInputLabel')}
                    </h6>
                </div>
                <input
                    className={classes.titleStepInput}
                    type="text"
                    name="templateName"
                    placeholder={t('editProject.nameInputPlaceholder')}
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                />
                <TextButton
                    className={classes.nextButton}
                    text={t('buttons.next')}
                    onClick={() => setShowTitleStep(false)}
                />
            </div>
            <div className={classNames(showTitleStep && classes.hidden, classes.questionsStep)}>
                <div className={classes.languageControls}>
                    <div className={classes.languages}>
                        {selectedLanguages.map((language, i) => (
                            <LibraryEditorLanguageButton
                                key={language.code}
                                code={language.code}
                                language={language.name}
                                onClick={() => handleLanguageChange(i)}
                                selected={currentSelectedLanguageIndex === i}
                            />
                        ))}
                    </div>
                    <DropdownList
                        className={classes.availableLanguagesDropdown}
                        listClassName={classes.dropdownList}
                        name={t('editProject.availableLanguagesDropdownName')}
                        elementsList={availableLanguages.map(l => (
                            <div className={classes.languageDropdownElement} key={l.name}>
                                <img
                                    className={classes.flagIcon}
                                    src={languageCodeToFlagIcon(l.code)}
                                /> {l.name}
                            </div>
                        ))}
                        onChange={(i) => setCurrentAvailableLanguageIndex(i)}
                        index={currentAvailableLanguageIndex}
                    />
                    <span className={classes.addLanguage} onClick={addLanguage}>
                        <img src={PlusIconBlack} className={classes.addLanguageIcon}/>
                        {t('editProject.addLanguageButtonText')}
                    </span>
                    <input
                        type="hidden"
                        name="languages"
                        value={JSON.stringify(selectedLanguages.map(l => l.code))}
                    />
                </div>
                <div className={classes.questionControls}>
                    {['T', 'Y', 'M', '!'].map(questionType => (
                        <AddQuestionButton
                            key={questionType}
                            text={`${t('editProject.addLabel')} ${questionTypeToName(questionType)?.toLowerCase()}`}
                            onClick={() => addNewQuestion(questionType)}
                        />
                    ))}
                </div>
                <ol className={classes.questions}>
                    {questions.map((q, i) => (
                        <li
                            className={classes.question}
                            key={q.code}
                        >
                            <div className={classes.questionHeader}>
                                <img className={classes.paragraphIcon} src={ParagraphIconBlack} />
                                <span className={classes.questionIdentifier}>
                                    <span className={classes.questionNumber}>{i+1}.{q.code}</span>
                                    <span className={classes.questionType}>{questionTypeToName(q.type)}</span>
                                </span>
                                <div
                                    className={classes.removeButton}
                                    onClick={() => removeQuestion(i)}
                                >
                                    <img
                                        className={classes.removeButtonIcon}
                                        src={MinusIconBlack}
                                    />
                                </div>
                            </div>
                            <input
                                className={classes.questionInput}
                                value={q.text[currentLanguageCode]}
                                onChange={(e) => handleQuestionChange(q.code, e.target.value)}
                            />
                            <ul className={classes.answers}>
                                {q.answers?.map((a, i) => (
                                    <li key={i} className={classes.answer}>
                                        <input
                                            className={classes.answerInput}
                                            type="text"
                                            value={a[currentLanguageCode]}
                                            onChange={(e) => handleAnswerChange(
                                                q.code,
                                                i,
                                                e.target.value
                                            )}
                                        />
                                        <div
                                            className={classes.removeButton}
                                            onClick={() => removeAnswer(q.code, i)}
                                        >
                                            <img
                                                className={classes.removeButtonIcon}
                                                src={MinusIconBlack}
                                            />
                                        </div>
                                    </li>
                                ))}
                                {['M', '!'].includes(q.type) && (
                                    <li
                                        className={classes.addAnswer}
                                        onClick={() => addNewAnswer(q.code)}
                                    >
                                        <img
                                            className={classes.addAnswerIcon}
                                            src={PlusIconPurple}
                                        />
                                        {t('editProject.addAnswerButtonText')}
                                    </li>
                                )}
                            </ul>
                            {['Y', 'M', '!'].includes(q.type) && (
                                <div className={classes.correctAnswerWrapper}>
                                    {t('editProject.correctAnswerLabel')}:
                                    <DropdownList
                                        className={classes.correctAnswerDropdown}
                                        name={t('editProject.correctAnswerDropdownName')}
                                        elementsList={
                                            q.type === 'Y'
                                                ? [
                                                    t('generic.no'),
                                                    t('generic.yes'),
                                                ]
                                                : q.answers.map(
                                                    a => a[currentLanguageCode]
                                                )    
                                        }
                                        onChange={(i) => toggleCorrectAnswer(
                                            q.code,
                                            i,
                                            q.type === 'M'
                                        )}
                                        ellipsis={true}
                                        multiselect={q.type === 'M'}
                                        defaultIndex={
                                            q.type === 'M'
                                                ? q.correctAnswerIndexes
                                                : q.correctAnswerIndex
                                        }
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
                <input type="hidden" name="questions" value={JSON.stringify(questions)} />
                <nav className={classes.questionsNavigation}>
                    <TextButton
                        className={classes.backButton}
                        text={t('buttons.back')}
                        onClick={() => setShowTitleStep(true)}
                        monochromatic={true}
                    />
                    <TextButton
                        className={classes.saveButton}
                        text={t('buttons.save')}
                        onClick={() => {
                            submit(formRef.current);
                        }}
                    />
                </nav>
            </div>
        </Form>
    );
};

export default LibraryEditorPage;