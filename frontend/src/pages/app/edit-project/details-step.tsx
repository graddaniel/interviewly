import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ProjectTypes } from 'shared';
import classNames from 'classnames';
import moment from 'moment';

import StepTitle from './step-title';
import SwitchInput from './switch-input';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import NumericalInput from '../../../components/numerical-input/numerical-input';

import classes from './details-step.module.css';
import '../../../lib/react-datepicker.css';
import '../../../lib/react-timepicker.css';
import QuestionMarkIconBlack from 'images/question-mark-icon-black.svg';
import LanguagesIconBlack from 'images/languages-icon-black.svg';
import DollarSignIconBlack from 'images/dollar-sign-icon-black.svg';

import { useTranslation } from 'react-i18next';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';
import HOURS from '../../../consts/hours';
import { useActionHandler } from '../../../hooks/use-handlers';

const DURATIONS = Object.values(ProjectTypes.Duration);
const CURRENCIES = Object.values(ProjectTypes.PaymentCurrency);

const DetailsStep = ({
    project,
}) => {
    const {
        participantsCount,
        reserveParticipantsCount,
        meetingDuration,
        startDate: currentStartDate,
        endDate: currentEndDate,
        transcriptionNeeded,
        moderatorNeeded,
        participantsPaymentValue,
        participantsPaymentCurrency,
    } = project;

    const { t } = useTranslation();

    const actionData = useActionHandler();

    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const [ duration, setDuration ] = useState(meetingDuration || '');
    const [ currency, setCurrency ] = useState(participantsPaymentCurrency || '');
    const [ startDate, setStartDate] = useState(
        new Date(currentStartDate
        || Date.now())
    );
    const [ startTime, setStartTime ] = useState(
        HOURS.find(h => h === ''+moment(currentStartDate).hours())
        || HOURS[0]
    );
    const [ endDate, setEndDate] = useState(
        currentEndDate
            ? new Date(currentEndDate)
            : moment().add(7, 'days').toDate()
    );
    const [ endTime, setEndTime ] = useState(
        HOURS.find(h => h === ''+moment(currentEndDate).hours())
        || HOURS[0]
    );
    const [ startDateAndTime, setStartDateAndTime ] = useState<Date>(new Date(currentStartDate));
    const [ endDateAndTime, setEndDateAndTime ] = useState<Date>(new Date(currentEndDate));

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

    const errors = actionData?.errors ?? {};

    return (
        <section className={classes.detailsStep}>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title={t('editProject.detailsStep.title')}
                    icon={QuestionMarkIconBlack}
                />
                <NumericalInput
                    className={classes.participants}
                    name="participantsCount"
                    label={t('editProject.detailsStep.participantsCountInputLabel')}
                    error={errors.participantsCount}
                    defaultValue={participantsCount}
                />
                <NumericalInput
                    className={classes.reserveParticipants}
                    name="reserveParticipantsCount"
                    label={t('editProject.detailsStep.reserveParticipantsCountInputLabel')}
                    error={errors.reserveParticipantsCount}
                    defaultValue={reserveParticipantsCount}
                />
                <label className={classes.label}>
                    {t('editProject.detailsStep.interviewDurationDropdownName')}:
                    <DropdownList
                        className={classNames(
                            classes.dropdown,
                            classes.meetingDurationDropdown,
                            errors.meetingDuration && classes.error
                        )}
                        name="Duration"
                        elementsList={DURATIONS}
                        onChange={(index: number) => setDuration(DURATIONS[index])}
                        defaultIndex={DURATIONS.indexOf(project.meetingDuration)}
                        allowDeselect={false}
                    />
                    <input type="hidden" name="meetingDuration" value={duration}/>
                </label>
                <div className={classes.dateTimePickers}>
                    <label className={classNames(classes.withMargin, classes.label)}>
                        {t('editProject.detailsStep.startDateLabel')}
                    </label>
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
                            errors.startDate && classes.error
                        )}
                        name="startTime"
                        onChange={(i) => setStartTime(HOURS[i])}
                        elementsList={HOURS}
                        defaultIndex={HOURS.indexOf(startTime)}
                        allowDeselect={false}
                    />
                </div>
                {errors.startDate && (
                    <div className={classes.errorText}>
                        {errors.startDate}
                    </div>
                )}
                <div className={classes.dateTimePickers}>
                    <label className={classNames(classes.withMargin, classes.label)}>
                        {t('editProject.detailsStep.endDateLabel')}
                    </label>
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
            </div>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title={t('editProject.detailsStep.transcriptionSubtitle')}
                    icon={LanguagesIconBlack}
                />
                <SwitchInput
                    name="transcriptionNeeded"
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                    defaultValue={transcriptionNeeded}
                />
            </div>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title={t('editProject.detailsStep.moderatorSubtitle')}
                    icon={LanguagesIconBlack}
                />
                <SwitchInput
                    name="moderatorNeeded"
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                    defaultValue={moderatorNeeded}
                />
            </div>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title={t('editProject.detailsStep.paymentSubtitle')}
                    icon={DollarSignIconBlack}
                />
                <span>{t('editProject.detailsStep.paymentInstruction')}</span>
                <div className={classes.paymentWrapper}>
                    <NumericalInput
                        className={classes.payment}
                        name="participantsPaymentValue"
                        label=""
                        error={errors.participantsPaymentValue}
                        defaultValue={participantsPaymentValue}
                    />
                    <DropdownList
                        className={classNames(
                            classes.dropdown,
                            classes.currencyDropdown,
                            errors.participantsPaymentCurrency && classes.error
                        )}                
                        name="Currency"
                        elementsList={CURRENCIES}
                        onChange={(index: number) => setCurrency(CURRENCIES[index])}
                        defaultIndex={CURRENCIES.indexOf(participantsPaymentCurrency)}
                    />
                </div>
                <input type="hidden" name="participantsPaymentCurrency" value={currency}/>
            </div>
        </section>
    );
};

export default DetailsStep;

/*
start/end - kalendarz
transkrypcja - bool
moderacja - bool
translacja - bool
zapłata - number/select - jakie waluty? jak pokazać to na rachunku gdy zapłata jest w innej walucie niż całość?
ilość uczestników - number
ilość rezerwowych - number
długość wywiadu - select

strefa czasowa - select
*/