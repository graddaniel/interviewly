import React, { useCallback, useRef, useState } from 'react';
import { Form, useNavigate, useSubmit } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CloseControls from '../../../components/close-controls/close-controls';
import TextButton from '../../../components/text-button/text-button';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import TextInput from '../../../components/text-input/text-input';
import IconButton from '../../../components/icon-button/icon-button';
import NumericalInput from '../../../components/numerical-input/numerical-input';
import { APP_ROUTES } from '../../../consts/routes';

import classes from './library-editor-page.module.css';
import InterviewlyLogo from '~/images/logo.svg';
import PlusIconBlack from '~/images/plus-icon-black.svg';
import MinusIconBlack from '~/images/minus-icon-black.svg';


const LANGUAGES = [{
    name: 'Polish',
    code: 'pl',
}, {
    name: 'German',
    code: 'de',
}, {
    name: 'French',
    code: 'fr',
}, {
    name: 'Spanish',
    code: 'es',
}];

const QUESTION_TYPES = [{
    name: 'Yes/No',
    code: 'Y'
}, {
    name: 'Freetext',
    code: 'T'
}, {
    name: 'Numerical',
    code: 'N'
}, {
    name: 'Multiple choice',
    code: 'M'
}, {
    name: 'Dropdown',
    code: '!'
}];
const DEFAULT_QUESTION_TYPE_INDEX = 1;

const OBLIGATORY_TYPES = [{
    name: 'Yes',
    code: 'Y',
}, {
    name: 'Soft',
    code: 'S',
}, {
    name: 'No',
    code: 'N',
}];
const DEFAULT_OBLIGATORY_TYPE_INDEX = 2;

const INITIAL_CURRENTLY_EDITED_QUESTION = {
    //text: '', use questionText instead
    correctnessConditions: {
        N: {
            min: 0,
            max: 0,
        }
    },
    answers: [],
    //type: ''; use selectedQuestionType instead
    //obligatory; use selectedObligatory instead
};

const INITIAL_TEXTS = {
    en: '', // base this default value on selectedLanguages default value; TODO calculate that
};

//TODO allow to unclick Y/N key
const LibraryEditorPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const formRef = useRef(null);

    const [ questions, setQuestions ] = useState<any>([]);
    const [ currentlyEditedQuestion, setCurrentlyEditedQuestion ] = useState<any>(INITIAL_CURRENTLY_EDITED_QUESTION);
    
    const [ availableLanguages, setAvailableLanguages ] = useState(LANGUAGES);
    const [ currentAvailableLanguageIndex, setCurrentAvailableLanguageIndex ] = useState(-1);
    const [ selectedLanguages, setSelectedLanguages ] = useState<typeof LANGUAGES>([{
        name: 'English',
        code: 'en',
    }]);
    const [ currentSelectedLanguageIndex, setCurrentSelectedLanguageIndex ] = useState(0);
    
    const [ questionTexts, setQuestionTexts ] = useState<{ [k: string]: string }>(INITIAL_TEXTS);
    const [ currentlyEditedAnswers, setCurrentlyEditedAnswers ] = useState<{ [k: string]: string }>(INITIAL_TEXTS);
    const [ selectedQuestionType, setSelectedQuestionType ] = useState<typeof QUESTION_TYPES[number]>(QUESTION_TYPES[DEFAULT_QUESTION_TYPE_INDEX]);
    const [ selectedObligatory, setSelectedObligatory ] = useState<typeof OBLIGATORY_TYPES[number]>(OBLIGATORY_TYPES[DEFAULT_OBLIGATORY_TYPE_INDEX]);

    const currentLanguageCode = selectedLanguages[currentSelectedLanguageIndex].code;

    const goToProjects = useCallback(() => navigate(APP_ROUTES.LIBRARY.PATH), []);

    const addLanguage = (e: React.MouseEvent) => {
        e.preventDefault();

        if (currentAvailableLanguageIndex < 0) {
            return;
        }

        const newAvailableLangugages = [...availableLanguages];
        const newLanguage = newAvailableLangugages.splice(currentAvailableLanguageIndex, 1)[0];     

        const newSelectedLanguages = [...selectedLanguages, newLanguage];

        const newQuestionTexts = JSON.parse(JSON.stringify(questionTexts));
        newQuestionTexts[newLanguage.code] = '';

        const newCurrentlyEditedAnswers = JSON.parse(JSON.stringify(currentlyEditedAnswers));
        newCurrentlyEditedAnswers[currentLanguageCode] = '';
        
        setAvailableLanguages(newAvailableLangugages);
        setSelectedLanguages(newSelectedLanguages);
        setQuestionTexts(newQuestionTexts);
        setCurrentlyEditedAnswers(newCurrentlyEditedAnswers);
        setCurrentAvailableLanguageIndex(-1);
    };

    const removeLanguage = (e: React.MouseEvent) => {
        e.preventDefault();

        if (currentSelectedLanguageIndex < 0) {
            return;
        }

        const newSelectedLanguages = [...selectedLanguages];
        const removedLanguage = newSelectedLanguages.splice(currentSelectedLanguageIndex, 1)[0];     

        const newAvailableLangugages = [...availableLanguages, removedLanguage];

        const newQuestionTexts = JSON.parse(JSON.stringify(questionTexts));
        delete newQuestionTexts[removedLanguage.code];

        const newCurrentlyEditedAnswers = JSON.parse(JSON.stringify(currentlyEditedAnswers));
        delete newCurrentlyEditedAnswers[currentLanguageCode];

        setAvailableLanguages(newAvailableLangugages);
        setSelectedLanguages(newSelectedLanguages);
        setQuestionTexts(newQuestionTexts);
        setCurrentlyEditedAnswers(newCurrentlyEditedAnswers);
        setCurrentSelectedLanguageIndex(-1);
    };

    const handleLanguageChange = (i) => {
        setCurrentSelectedLanguageIndex(i);
    };

    const handleQuestionTextChange = (value: string) => {
        const newQuestionTexts = JSON.parse(JSON.stringify(questionTexts));

        newQuestionTexts[currentLanguageCode] = value;

        setQuestionTexts(newQuestionTexts);
    };
    const handleCurrentlyEditedAnswerChange = (value: string) => {
        const newCurrentlyEditedAnswers = JSON.parse(JSON.stringify(currentlyEditedAnswers));

        newCurrentlyEditedAnswers[currentLanguageCode] = value;

        setCurrentlyEditedAnswers(newCurrentlyEditedAnswers);
    };
    const handleQuestionTypeChange = (i: number) => {
        setSelectedQuestionType(QUESTION_TYPES[i]);

        const newCurrentlyEditedAnswers = {};
        selectedLanguages.forEach(l => newCurrentlyEditedAnswers[l.code] = '');

        setCurrentlyEditedAnswers(newCurrentlyEditedAnswers);
    };

    //TODO clear answers also
    const addQuestion = (e: React.MouseEvent) => {
        e.preventDefault();

        const newState = JSON.parse(JSON.stringify(questions));

        const newQuestion: any = {
            code: 'Q' + questions.length,
            text: questionTexts,
            type: selectedQuestionType?.code,
            obligatory: selectedObligatory?.code,
        };

        if (['Y', 'T', 'N'].includes(selectedQuestionType?.code || '')) {
            const key = currentlyEditedQuestion.correctnessConditions[selectedQuestionType?.code || ''];

            if (selectedQuestionType?.code === 'N') {
                const numericalKey: any = {};
                if (key.min > 0) {
                    numericalKey.min = key.min;
                }
                if (key.max > 0) {
                    numericalKey.max = key.max;
                }
                if (Object.keys(numericalKey).length > 0) {
                    newQuestion.key = key;
                }

            } else if (key) {
                newQuestion.key = key;
            }
        }

        if (['M', '!'].includes(selectedQuestionType?.code || '')) {
            const answers = JSON.parse(JSON.stringify(currentlyEditedQuestion.answers));
            
            newQuestion.answers = answers;
        }

        newState.push(newQuestion);
        setQuestions(newState);
        
        const newQuestionTexts = {};
        const newCurrentlyEditedAnswers = {};
        selectedLanguages.forEach(l => {
            newQuestionTexts[l.code] = '';
            newCurrentlyEditedAnswers[l.code] = '';
        });
        setQuestionTexts(newQuestionTexts);
        setCurrentlyEditedAnswers(newCurrentlyEditedAnswers);
        setCurrentlyEditedQuestion(INITIAL_CURRENTLY_EDITED_QUESTION);
    };


    const setNewCorrectnessCondition = (questionType, value) => {
        const newState = JSON.parse(JSON.stringify(currentlyEditedQuestion));

        newState.correctnessConditions[questionType] = value;

        setCurrentlyEditedQuestion(newState);
    };
    const selectYesForCorrectAnswerOfYesNoQuestion = () => setNewCorrectnessCondition('Y', 'Y');
    const selectNoForCorrectAnswerOfYesNoQuestion = () => setNewCorrectnessCondition('Y', 'N');
    const setCorrectnessConditionFilterOfTextQuestion = (filter: string) => setNewCorrectnessCondition('T', filter);
    const setCorrectnessConditionMinOfNumericalQuestion = (min: number) => setNewCorrectnessCondition('N', {
        min,    
        max: currentlyEditedQuestion.correctnessConditions['N'].max,
    });
    const setCorrectnessConditionMaxOfNumericalQuestion = (max: number) => setNewCorrectnessCondition('N', {
        min: currentlyEditedQuestion.correctnessConditions['N'].min,
        max,
    });

    const addAnswer = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!currentlyEditedAnswers[currentLanguageCode]) {
            return;
        }

        const newState = JSON.parse(JSON.stringify(currentlyEditedQuestion));
        newState.answers.push({
            text: currentlyEditedAnswers,
            correctnessCondition: false,
        });
        setCurrentlyEditedQuestion(newState);

        const newCurrentlyEditedAnswers = {};
        selectedLanguages.forEach(l => {
            newCurrentlyEditedAnswers[l.code] = '';
        });
        setCurrentlyEditedAnswers(newCurrentlyEditedAnswers);
    };
    const removeAnswer = (e, index: number) => {
        e.preventDefault();

        const newState = JSON.parse(JSON.stringify(currentlyEditedQuestion));
        newState.answers.splice(index, 1);

        setCurrentlyEditedQuestion(newState);
    };
    const setCorrectnessConditionOfAnswer = (i, value) => {
        const newState = JSON.parse(JSON.stringify(currentlyEditedQuestion));
        newState.answers[i].correctnessCondition = value;

        setCurrentlyEditedQuestion(newState);
    };

    console.log(questions);

    return (
        <Form method="post" className={classes.page} ref={formRef}>
            <input
                type="hidden"
                name="languages"
                value={JSON.stringify(selectedLanguages.map(l => l.code))}
            />
            <header className={classes.header}>
                <img src={InterviewlyLogo} className={classes.logo}/>
                <h1 className={classes.title}>{t('editProject.title')}</h1>
                <CloseControls
                    className={classes.closeControls}
                    text={t('buttons.resign')}
                    onClose={goToProjects}
                />
            </header>
            <div className={classes.content}>
                <div className={classes.surveySettings}>
                    <TextInput
                        className={classes.templateNameInput}
                        name="templateName"
                        placeholder="Template name"
                    />
                    <IconButton
                        className={classes.addLanguageButton}
                        icon={PlusIconBlack}
                        onClick={addLanguage}
                    />
                    <DropdownList
                        className={classes.availableLanguagesDropdown}
                        listClassName={classes.dropdownList}
                        name="Available Languages"
                        elementsList={availableLanguages.map(l => l.name)}
                        onChange={(i) => setCurrentAvailableLanguageIndex(i)}
                        index={currentAvailableLanguageIndex}
                    />
                    <DropdownList
                        className={classes.selectedLanguagesDropdown}
                        listClassName={classes.dropdownList}
                        name="Selected Languages"
                        elementsList={selectedLanguages.map(l => l.name)}
                        onChange={handleLanguageChange}
                        index={currentSelectedLanguageIndex}
                    />
                    <IconButton
                        className={classes.removeLanguageButton}
                        icon={MinusIconBlack}
                        onClick={removeLanguage}
                    />
                </div>
                <div className={classes.questionControls}>
                    <TextInput
                        className={classes.questionTextInput}
                        name="questionText"
                        placeholder="Question"
                        onChange={handleQuestionTextChange}
                        value={questionTexts[currentLanguageCode]}
                    />
                    <DropdownList
                        className={classes.selectQuestionTypeDropdown}
                        listClassName={classes.dropdownList}
                        name="Question Type"
                        elementsList={QUESTION_TYPES.map(t => t.name)}
                        onChange={handleQuestionTypeChange}
                        defaultIndex={DEFAULT_QUESTION_TYPE_INDEX}
                    />
                    <DropdownList
                        className={classes.selectObligatoryDropdown}
                        listClassName={classes.dropdownList}
                        name="Obligatory"
                        elementsList={OBLIGATORY_TYPES.map(t => t.name)}
                        onChange={(i) => setSelectedObligatory(OBLIGATORY_TYPES[i])}
                        defaultIndex={DEFAULT_OBLIGATORY_TYPE_INDEX}
                    />
                    <IconButton
                        icon={PlusIconBlack}
                        onClick={addQuestion}
                    />
                </div>
                <ul>
                    {questions.map(q => (
                        <li
                            className={classes.question}
                            key={q.code}
                        >
                            {q.code}: {q.text[currentLanguageCode]}
                            <ul>
                                {q.answers?.map((a, i) => (
                                    <li key={i}>
                                        {a.text[currentLanguageCode]}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <input type="hidden" name="questions" value={JSON.stringify(questions)} />
                {selectedQuestionType?.code === 'Y' && (
                    <div className={classes.conditionalQuestionControlsSmall}>
                        <span className={classes.conditionalHeader}>
                            Correctness condition
                        </span>
                        <div className={classes.conditionalPrimaryRow}>
                            <TextButton
                                text="Yes"
                                onClick={selectYesForCorrectAnswerOfYesNoQuestion}
                                monochromatic={true}
                                className={
                                    currentlyEditedQuestion.correctnessConditions['Y'] === 'Y'
                                    ? classes.selectedButton
                                    : ''
                                }
                            />
                            <TextButton
                                text="No"
                                onClick={selectNoForCorrectAnswerOfYesNoQuestion}
                                monochromatic={true}
                                className={
                                    currentlyEditedQuestion.correctnessConditions['Y'] === 'N'
                                    ? classes.selectedButton
                                    : ''
                                }

                            />
                        </div>
                    </div>
                )}
                {selectedQuestionType?.code === 'T' && (
                    <div className={classes.conditionalQuestionControlsSmall}>
                        <span className={classes.conditionalHeader}>
                            Correctness condition
                        </span>
                        <TextInput
                            name="correctnessConditionForTextQuestion"
                            placeholder="filter"
                            onChange={setCorrectnessConditionFilterOfTextQuestion}
                        />
                    </div>
                )}
                {selectedQuestionType?.code === 'N' && (
                    <div className={classes.conditionalQuestionControlsSmall}>
                        <span className={classes.conditionalHeader}>
                            Correctness condition
                        </span>
                        <div className={classes.conditionalPrimaryRow}>
                            <NumericalInput
                                name="minCorrectnessConditionForNumericalQuestion"
                                placeholder="Min"
                                onChange={setCorrectnessConditionMinOfNumericalQuestion}
                            />
                            <NumericalInput
                                name="maxCorrectnessConditionForNumericalQuestion"
                                placeholder="Max"
                                onChange={setCorrectnessConditionMaxOfNumericalQuestion}
                            />
                        </div>
                    </div>
                )}
                {(selectedQuestionType?.code === 'M' || selectedQuestionType?.code === '!') && (
                    <div className={classes.conditionalQuestionControlsBig}>
                        <span className={classes.conditionalHeaderTwo}>
                            Answers
                        </span>
                        <span className={classes.conditionalHeaderOne}>
                            Correctness condition
                        </span>
                        <div className={classes.conditionalPrimaryRow}>
                            <IconButton
                                icon={PlusIconBlack}
                                onClick={addAnswer}
                            />
                            <TextInput
                                className={classes.answerInput}
                                name="newAnswer"
                                placeholder="Answer"
                                onChange={handleCurrentlyEditedAnswerChange}
                                value={currentlyEditedAnswers[currentLanguageCode]}
                            />
                        </div>
                        {currentlyEditedQuestion.answers.map((answer, i) => (<React.Fragment key={i}>
                            <IconButton
                                icon={MinusIconBlack}
                                onClick={(e) => removeAnswer(e, i)}
                            />
                            <span>
                                {answer.text[currentLanguageCode]}
                            </span>
                            <input
                                className={classes.secondaryRowCheckbox}
                                type="checkbox"
                                checked={answer.correctnessCondition}
                                onChange={(e) => setCorrectnessConditionOfAnswer(i, e.target.checked)}
                            />
                        </React.Fragment>))}
                    </div>
                )}
            </div>
            <nav className={classes.navigation}>
                <TextButton
                    className={classes.nextButton}
                    text={t('buttons.save')}
                    onClick={() => {
                        submit(formRef.current);
                    }}
                    monochromatic={false}
                />
            </nav>
        </Form>
    );
};

export default LibraryEditorPage;