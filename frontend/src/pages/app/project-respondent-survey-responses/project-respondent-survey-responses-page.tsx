import React, { useState } from 'react';
import xlsx from "json-as-xlsx";
import { useNavigate } from 'react-router-dom';

import IconButton from '../../../components/icon-button/icon-button';

import classes from './project-respondent-survey-responses-page.module.css';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import { useTranslation } from 'react-i18next';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import TextButton from '../../../components/text-button/text-button';
import { useLoaderHandler } from '../../../hooks/use-handlers';

const ProjectRespondenSurveyResponsestPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ languageIndex, setLanguageIndex ] = useState(0);
    const { data } = useLoaderHandler();

    if (!data) {
        return null;
    }
    const { surveyResponse } = data;

    const languages = Object.keys(surveyResponse);

    const currentLanguageAnswers = Object.entries(
        surveyResponse[languages[languageIndex]].length > 0
        ? surveyResponse[languages[languageIndex]][0]
        : [],
    ) as [string, string][];
    const downloadResults = () => {
        const data = Object.keys(surveyResponse).map(language => {
            const {
                ...questions
            } = surveyResponse[language][0];

            return {
                sheet: language,
                columns: Object
                    .keys(questions)
                    .map(questionKey => ({ label: questionKey, value: questionKey })),
                content: surveyResponse[language],
            };
        });
        
        let settings = {
            fileName: "results", // Name of the resulting spreadsheet
            extraLength: 5, // A bigger number means that columns will be wider
            writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
            writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
            RTL: false, // Display the columns from right-to-left (the default value is false)
        }
        
        xlsx(data, settings)
    }

    return (
        <section className={classes.page}>
            <header className={classes.header}>
                <IconButton
                    className={classes.backButton}
                    onClick={() => navigate(-1)}
                    icon={ArrowLeftIconPurple}
                />
                <DropdownList
                    listClassName={classes.dropdownList}
                    name="language"
                    elementsList={languages}
                    defaultIndex={languageIndex}
                    onChange={i => setLanguageIndex(i)}
                    allowDeselect={false}
                />
                <TextButton
                    text={t('buttons.download')}
                    onClick={downloadResults}
                />
            </header>
            {currentLanguageAnswers.length > 0 && (
                <div className={classes.table}>
                    {currentLanguageAnswers.map(([question, response]) => (
                        <React.Fragment key={question}>
                            <div
                                className={classes.cell} 
                                key={question}
                            >
                                {question}
                            </div>
                            <div
                                className={classes.cell} 
                                key={response}
                            >
                                {response}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            )}
            {currentLanguageAnswers.length < 1 && (
                <h6 className={classes.subtitle}>
                    {t('viewProject.respondentPage.noResponsesMessage')}
                </h6>
            )}
        </section>
    );
};

export default ProjectRespondenSurveyResponsestPage;