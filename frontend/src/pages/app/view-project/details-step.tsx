import React from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import NumericalInput from '../../../components/numerical-input/numerical-input';
import StepTitle from '../edit-project/step-title';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import Pill from '../../../components/pill/pill';

import classes from './details-step.module.css';
import LanguagesIconBlack from 'images/languages-icon-black.svg';
import DollarSignIconBlack from 'images/dollar-sign-icon-black.svg';
import moment from 'moment';


type DetailsStepProps = {
    participantsCount: number;
    reserveParticipantsCount: number;
    interviewDuration: number;
    startDate: Date;
    endDate: Date;
    transcriptionAvailable: boolean;
    respondentFee: number;
    currency: string;
};

const DetailsStep = ({
    participantsCount,
    reserveParticipantsCount,
    interviewDuration,
    startDate,
    endDate,
    transcriptionAvailable,
    respondentFee,
    currency,
}: DetailsStepProps) => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    return (
        <section className={classes.detailsStep}>
            <NumericalInput
               name="participantsCount"
               label={t('viewProject.details.participantsCountInputLabel')}
               defaultValue={participantsCount}
            />
            <NumericalInput
               name="reserveParticipantsCount"
               label={t('viewProject.details.reserveParticipantsCountInputLabel')}
               defaultValue={reserveParticipantsCount}
            />
            <div className={classes.interviewDurationWrapper}>
                <label className={classes.interviewDurationLabel}>
                {t('viewProject.details.interviewDurationLabel')}
                </label>
                <DropdownList
                    className={classes.interviewDurationDropdown}
                    name="interviewDuration"
                    elementsList={[interviewDuration]}
                    onChange={() => {}}
                    defaultIndex={0}
                    allowDeselect={false}
                />
            </div>
            <div className={classes.dateTimePickers}>
                <label className={classNames(classes.withMargin, classes.label)}>
                    {t('viewProject.details.startDateLabel')}
                </label>
                <DatePicker
                    className={classes.datePickerInput}
                    wrapperClassName={classes.withMargin}
                    selected={startDate}
                    onChange={(date) => {}}
                    locale={resolvedLanguage}
                    dateFormat="dd.MM.yyyy"
                />
                <DropdownList
                    className={classNames(
                        classes.dropdown,
                        classes.endTimeDropdown,
                    )}   
                    name="startTime"
                    onChange={(i) => {}}
                    elementsList={[
                        moment(startDate).locale(resolvedLanguage as string).hour()
                    ]}
                    defaultIndex={0}
                    allowDeselect={false}
                />
            </div>
            <div className={classes.dateTimePickers}>
                <label className={classNames(classes.withMargin, classes.label)}>
                {t('viewProject.details.endDateLabel')}
                </label>
                <DatePicker
                    className={classes.datePickerInput}
                    wrapperClassName={classes.withMargin}
                    selected={endDate}
                    onChange={(date) => {}}
                    locale={resolvedLanguage}
                    dateFormat="dd.MM.yyyy"
                />
                <DropdownList
                    className={classNames(
                        classes.dropdown,
                        classes.endTimeDropdown,
                    )}   
                    name="endTime"
                    onChange={(i) => {}}
                    elementsList={[
                        moment(endDate).locale(resolvedLanguage as string).hour()
                    ]}
                    defaultIndex={0}
                    allowDeselect={false}
                />
            </div>
            <StepTitle
                icon={LanguagesIconBlack}
                title={t('viewProject.details.transcriptionSubtitle')}
            />
            <Pill
                className={transcriptionAvailable ? classes.yes : classes.no}
                text={transcriptionAvailable ? t('generic.yes') : t('generic.no')}
            />
            <StepTitle
                icon={DollarSignIconBlack}
                title={t('viewProject.details.respondentFeeSubtitle')}
            />
            <div className={classes.fee}>
                <NumericalInput
                    name="respondentFee"
                    label=""
                    defaultValue={respondentFee}
                />
                <DropdownList
                    className={classes.feeCurrencyDropdown}
                    name={t('viewProject.details.currencyLabel')}
                    elementsList={[currency]}
                    allowDeselect={false}
                    onChange={() => {}}
                    defaultIndex={0}
                />
            </div>
        </section>
    );
};

export default DetailsStep;