import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import xlsx from "json-as-xlsx";
import { useTranslation } from 'react-i18next';

import IconButton from '../../../components/icon-button/icon-button';
import TextButton from '../../../components/text-button/text-button';
import StepTitle from '../edit-project/step-title';

import classes from './project-survey.module.css';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import MetricsIconBlack from 'images/metrics-icon-black.svg';


const ProjectSurveyPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const surveyResponses = useLoaderData() as any;

    const downloadResults = () => {
        const data = Object.keys(surveyResponses).map(language => {
            const {
                __email: email,
                ...questions
            } = surveyResponses[language][0];

            return {
                sheet: language,
                columns: [
                    { label: 'email', value: 'email' },
                    ...Object.keys(questions).map(questionKey => ({ label: questionKey, value: questionKey }))
                ],
                content: surveyResponses[language].map(response => {
                    const { __email: email, ...actualResponse} = response;
                    return {
                        email, 
                        ...actualResponse,
                    };
                }),
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
        <section className={classes.projectRespondent}>
            <IconButton
                className={classes.backButton}
                onClick={() => navigate(-1)}
                icon={ArrowLeftIconPurple}
            />
            <StepTitle
                title={t('viewProject.screeningSurveys.resultsTitle')}
                icon={MetricsIconBlack}
            />
            <TextButton
                text={t('buttons.download')}
                onClick={downloadResults}
            />
        </section>
    );
};

export default ProjectSurveyPage;