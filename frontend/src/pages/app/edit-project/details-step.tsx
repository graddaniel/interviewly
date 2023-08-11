import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ProjectTypes } from 'shared';
import classNames from 'classnames';
import { useActionData } from 'react-router-dom';
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

import { registerLocale, setDefaultLocale } from  "react-datepicker";
//import pl from 'date-fns/locale/pl';
import { pl } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';
registerLocale('pl', pl)

const DURATIONS = Object.values(ProjectTypes.Duration);
const CURRENCIES = Object.values(ProjectTypes.PaymentCurrency);
const HOURS = [] as string[];
for (let i = 0; i < 24; i += 1) HOURS.push(`${i}`);

const DetailsStep = ({
    project,
}) => {
    const { t } = useTranslation();

    const actionData = useActionData() as any;

    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const [ duration, setDuration ] = useState(project?.meetingDuration || '');
    const [ currency, setCurrency ] = useState(project?.participantsPaymentCurrency || '');
    const [ startDate, setStartDate] = useState(new Date());
    const [ endDate, setEndDate] = useState(new Date(parseInt(moment(Date.now()).add(7, 'days').format('x'), 10)));
    const [ startTime, setStartTime ] = useState(HOURS[0]);
    const [ endTime, setEndTime ] = useState(HOURS[0]);

    const handleChange = (range) => {
      const [startDate, endDate] = range;
      setStartDate(startDate);
      setEndDate(endDate);
    };

    const errors = actionData?.errors || {};

    //console.log("DateTime", datetime)

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
                    defaultValue={project.participantsCount}
                />
                <NumericalInput
                    className={classes.reserveParticipants}
                    name="reserveParticipantsCount"
                    label={t('editProject.detailsStep.reserveParticipantsCountInputLabel')}
                    error={errors.reserveParticipantsCount}
                    defaultValue={project.reserveParticipantsCount}
                />
                <label className={classes.label}>
                    {t('editProject.detailsStep.interviewDurationDropdownName')}:
                    <DropdownList
                        className={classNames(
                            classes.dropdown,
                            classes.meetingDurationDropdown,
                            errors.meetingDuration && classes.dropdownError
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
                    <DatePicker
                        className={classes.datePickerInput}
                        wrapperClassName={classes.withMargin}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        locale={resolvedLanguage}
                        dateFormat="dd.MM.yyyy"
                    />
                    <input type="hidden" value={startTime} name="startTime" />
                    <DropdownList
                        className={classNames(
                            classes.dropdown,
                            classes.startTimeDropdown,
                            errors.participantsPaymentCurrency && classes.dropdownError
                        )}
                        name="startTime"
                        onChange={(i) => setStartTime(HOURS[i])}
                        elementsList={HOURS}
                        defaultIndex={HOURS.indexOf(startTime)}
                        allowDeselect={false}
                    />
                </div>
                <div className={classes.dateTimePickers}>
                    <label className={classNames(classes.withMargin, classes.label)}>
                        {t('editProject.detailsStep.endDateLabel')}
                    </label>
                    <DatePicker
                        className={classes.datePickerInput}
                        wrapperClassName={classes.withMargin}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        locale={resolvedLanguage}
                        dateFormat="dd.MM.yyyy"
                    />
                    <input type="hidden" value={endTime} name="endTime" />
                    <DropdownList
                        className={classNames(
                            classes.dropdown,
                            classes.endTimeDropdown,
                            errors.participantsPaymentCurrency && classes.dropdownError
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
                    name="transcription"
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                />
            </div>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title={t('editProject.detailsStep.moderatorSubtitle')}
                    icon={LanguagesIconBlack}
                />
                <SwitchInput
                    name="moderator"
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
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
                        defaultValue={project.participantsPaymentValue}
                    />
                    <DropdownList
                        className={classNames(
                            classes.dropdown,
                            classes.currencyDropdown,
                            errors.participantsPaymentCurrency && classes.dropdownError
                        )}                
                        name="Currency"
                        elementsList={CURRENCIES}
                        onChange={(index: number) => setCurrency(CURRENCIES[index])}
                        defaultIndex={CURRENCIES.indexOf(project.participantsPaymentCurrency)}
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