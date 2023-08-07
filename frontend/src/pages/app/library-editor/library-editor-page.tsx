import React, { useCallback, useRef, useState } from 'react';
import { Form, useNavigate, useSubmit } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import CloseControls from '../../../components/close-controls/close-controls';
import TextButton from '../../../components/text-button/text-button';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import LibraryEditorStepper from './library-editor-stepper';
import LibraryEditorLanguageButton from './library-editor-language-button';
import AddQuestionButton from './add-question-button';
import languageToFlagIcon from '../../../utils/language-to-flag-icon';

import classes from './library-editor-page.module.css';
import InterviewlyLogo from 'images/logo.svg';
import PlusIconBlack from 'images/plus-icon-black.svg';
import ParagraphIconBlack from 'images/paragraph-icon-black.svg';
import PlusIconPurple from 'images/plus-icon-purple.svg';


const LANGUAGES = [{
    name: 'English',
    code: 'en',
}, {
    name: 'Polish',
    code: 'pl',
}, {
    name: 'French',
    code: 'fr',
}];
const DEFAULT_LANGUAGE = LANGUAGES[0];
const INTITIAL_AVAILABLE_LANGUAGES = LANGUAGES.filter(l => l.code !== DEFAULT_LANGUAGE.code);


const LibraryEditorPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const formRef = useRef(null);

    const [ showTitleStep, setShowTitleStep ] = useState(true);

    const [ surveyTitle, setSurveyTitle ] = useState('');
    const [ questions, setQuestions ] = useState<any>([]);
    
    const [ availableLanguages, setAvailableLanguages ] = useState(INTITIAL_AVAILABLE_LANGUAGES);
    const [ currentAvailableLanguageIndex, setCurrentAvailableLanguageIndex ] = useState(-1);
    const [ selectedLanguages, setSelectedLanguages ] = useState<typeof LANGUAGES>([DEFAULT_LANGUAGE]);
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
        const newState = JSON.parse(JSON.stringify(questions));
        newState.forEach(question => {
            question.text[newLanguage.code] = `New question (${newLanguage.code})`;

            question.answers.forEach(
                answer => answer[newLanguage.code] = `New answer (${newLanguage.code})`
            );
        });
        
        setAvailableLanguages(newAvailableLangugages);
        setSelectedLanguages(newSelectedLanguages);
        setQuestions(newState);
        setCurrentAvailableLanguageIndex(-1);
    };

    const handleLanguageChange = (i) => {
        setCurrentSelectedLanguageIndex(i);
    };

    const addNewQuestion = (type: string) => {
        const newState = JSON.parse(JSON.stringify(questions));

        const text = Object.values(selectedLanguages).reduce((acc, cur) => ({
            ...acc,
            [cur.code]: `New question (${cur.code})`,
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
                return 'open question'
            case 'Y':
                return 'Closed question'; 
            case 'M':
                return 'Multiple-choice question';
            case '!':
                return 'Single-choice question';
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
            [cur.code]: `New answer (${cur.code})`,
        }), {});

        question.answers.push(newAnswer);

        setQuestions(newState);
    };

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

    const selectCorrectAnswer = (
        questionCode: string,
        index: number,
    ) => {
        const newState = JSON.parse(JSON.stringify(questions));

        const question = newState.find(
            question => question.code === questionCode
        );

        question.correntAnswerIndex = index;

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
                    title: 'Name the survey'
                }, {
                    title: 'Add questions'
                }]}
                currentStep={showTitleStep ? 0 : 1}
            />
            <div className={classNames(classes.titleStep, !showTitleStep && classes.hidden)}>
                <div className={classes.titleStepTitleWrapper}>
                    <img className={classes.titleStepTitleIcon} src={ParagraphIconBlack}/>
                    <h6 className={classes.titleStepTitle}>
                        Please provide the
                    </h6>
                </div>
                <input
                    className={classes.titleStepInput}
                    type="text"
                    name="surveyTitle"
                    placeholder="survey title"
                    value={surveyTitle}
                    onChange={e => setSurveyTitle(e.target.value)}
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
                                language={language.name}
                                onClick={() => handleLanguageChange(i)}
                                selected={currentSelectedLanguageIndex === i}
                            />
                        ))}
                    </div>
                    <DropdownList
                        className={classes.availableLanguagesDropdown}
                        listClassName={classes.dropdownList}
                        name="Available Languages"
                        elementsList={availableLanguages.map(l => (
                            <div className={classes.languageDropdownElement} key={l.name}>
                                <img
                                    className={classes.flagIcon}
                                    src={languageToFlagIcon(l.name)}
                                /> {l.name}
                            </div>
                        ))}
                        onChange={(i) => setCurrentAvailableLanguageIndex(i)}
                        index={currentAvailableLanguageIndex}
                    />
                    <span className={classes.addLanguage} onClick={addLanguage}>
                        <img src={PlusIconBlack} className={classes.addLanguageIcon}/>
                        Add language
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
                            text={`Add ${questionTypeToName(questionType)?.toLowerCase()}`}
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
                                        Add answer
                                    </li>
                                )}
                            </ul>
                            {['Y', 'M', '!'].includes(q.type) && (
                                <div className={classes.correctAnswerWrapper}>
                                    Correct answer:
                                    <DropdownList
                                        className={classes.correctAnswerDropdown}
                                        name="correctAnswer"
                                        elementsList={q.answers.map(
                                            a => a[currentLanguageCode]
                                        )}
                                        onChange={(i) => selectCorrectAnswer(
                                            q.code,
                                            i,
                                        )}
                                        ellipsis={true}
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