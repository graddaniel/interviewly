
import React, { useEffect, useState } from 'react';
import { Form, useActionData, useLoaderData, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectTypes } from 'shared';
import DatePicker from 'react-datepicker';

import MethodologyTile from '../../../../components/methodology-tile/methodology-tile';
import TextButton from '../../../../components/text-button/text-button';
import SurveyTile from '../../../../components/survey-tile/survey-tile';
import { APP_FORMS_ROUTES } from '../../../../consts/routes';

import classes from './interview-section.module.css';
import SubmitButton from '../../../../components/submit-button/submit-button';
import useSuccessFeedback from '../../../../hooks/use-success-feedback';
import classNames from 'classnames';
import moment from 'moment';
import DropdownList from '../../../../components/dropdown-list/dropdown-list';
import HOURS from '../../../../consts/hours';
import useErrorHandler from '../../../../hooks/use-error-handler';

const InterviewSection = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const {
        templates,
    } = useLoaderData() as {
        templates: any[];
    };
    
    const actionData = useActionData() as any;
    useSuccessFeedback(actionData, t('generic.saved'));

    const [ selectedTemplateUuid, setSelectedTemplateUuid ] = useState('');

    const [ startDate, setStartDate] = useState(new Date());
    const [ startTime, setStartTime ] = useState(HOURS[0]);
    const [ endDate, setEndDate] = useState(moment().add(7, 'days').toDate());
    const [ endTime, setEndTime ] = useState(HOURS[0]);
    const [ startDateAndTime, setStartDateAndTime ] = useState<Date>(new Date());
    const [ endDateAndTime, setEndDateAndTime ] = useState<Date>(moment().add(7, 'days').toDate());
    useEffect(() => {
        setStartDateAndTime(
            moment(startDate)
                .hour(parseInt(startTime, 10))
                .toDate()
        );
    }, [startDate, startTime]);
    useEffect(() => {
        setEndDateAndTime(
            moment(endDate)
                .hour(parseInt(endTime, 10))
                .toDate()
        );
    }, [endDate, endTime]);

    const errors = actionData?.errors || {};

    return (
        <Form className={classes.content} method="post">
            <MethodologyTile
                className={classes.methodologyTile}
                mini={true}
                selected={false}
                methodology={ProjectTypes.Methodology.Interview}
            />
            <TextButton
                className={classes.createSurveyButton}
                text={t('viewProject.methodology.interview.createSurvey')}
                onClick={() => navigate(APP_FORMS_ROUTES.NEW_TEMPLATE.PATH)}
            />
            <h6 className={classes.instruction}>{t('viewProject.methodology.interview.instruction')}</h6>
            <div className={classes.tiles}>
                {templates.map(template => (
                    <SurveyTile
                        key={template.uuid}
                        name={template.name}
                        onClick={() => setSelectedTemplateUuid(template.uuid)}
                        selected={template.uuid === selectedTemplateUuid}
                    />
                ))}
            </div>
            <input type="hidden" name="selectedTemplateUuid" value={selectedTemplateUuid} />
            <h6 className={classes.dateLabel}>
                {t('viewProject.methodology.sessionStartDateLabel')}
            </h6>
            <div className={classes.dateSelectorWrapper}>
                <input
                    type="hidden"
                    value={startDateAndTime.getTime()}
                    name="startDate"
                />
                <DatePicker
                    className={classNames(
                        classes.datePickerInput,
                        errors.startDate && classes.error
                    )}
                    wrapperClassName={classes.withMargin}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale={resolvedLanguage}
                    dateFormat="dd.MM.yyyy"
                />
                <DropdownList
                    className={classNames(
                        classes.dropdown,
                        classes.startTimeDropdown,
                        classes.withMargin,
                        errors.startDate && classes.error
                    )}
                    name="startTime"
                    onChange={(i) => setStartTime(HOURS[i])}
                    elementsList={HOURS}
                    defaultIndex={HOURS.indexOf(startTime)}
                    allowDeselect={false}
                />
                {errors.startDate && (
                    <div className={classes.errorText}>
                        {errors.startDate}
                    </div>
                )}
            </div>
            <h6 className={classes.dateLabel}>
                {t('viewProject.methodology.sessionEndDateLabel')}
            </h6>
            <div className={classes.dateSelectorWrapper}>
                <input
                    type="hidden"
                    value={endDateAndTime.getTime()}
                    name="endDate"
                />
                <DatePicker
                    className={classes.datePickerInput}
                    wrapperClassName={classes.withMargin}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    locale={resolvedLanguage}
                    dateFormat="dd.MM.yyyy"
                />
                <DropdownList
                    className={classNames(
                        classes.dropdown,
                        classes.endTimeDropdown,
                    )}   
                    name="endTime"
                    onChange={(i) => setEndTime(HOURS[i])}
                    elementsList={HOURS}
                    defaultIndex={HOURS.indexOf(endTime)}
                    allowDeselect={false}
                />
            </div>
            <SubmitButton
                className={classes.saveSurveySelectionButton}
                text={t('viewProject.methodology.interview.save')}
            />
        </Form>
    );
};

export default InterviewSection;