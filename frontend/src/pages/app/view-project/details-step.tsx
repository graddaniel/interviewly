import React from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ProjectTypes } from 'shared';

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
    interviewDuration: ProjectTypes.Duration;
    startDate: Date;
    endDate: Date;
    transcriptionAvailable: boolean;
    participantsPaymentValue: number;
    participantsPaymentCurrency: ProjectTypes.PaymentCurrency;
};

const DetailsStep = ({
    participantsCount,
    reserveParticipantsCount,
    interviewDuration,
    startDate,
    endDate,
    transcriptionAvailable,
    participantsPaymentValue,
    participantsPaymentCurrency,
}: DetailsStepProps) => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    return (
        <section className={classes.detailsStep}>
            <NumericalInput
               name="participantsCount"
               label={t('viewProject.details.participantsCountInputLabel')}
               defaultValue={participantsCount}
               immutable={true}
            />
            <NumericalInput
               name="reserveParticipantsCount"
               label={t('viewProject.details.reserveParticipantsCountInputLabel')}
               defaultValue={reserveParticipantsCount}
               immutable={true}
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
                    immutable={true}
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
                    disabled={true}
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
                    immutable={true}
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
                    disabled={true}
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
                    immutable={true}
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
                    defaultValue={participantsPaymentValue}
                />
                <DropdownList
                    className={classes.feeCurrencyDropdown}
                    name={t('viewProject.details.currencyLabel')}
                    elementsList={[participantsPaymentCurrency]}
                    allowDeselect={false}
                    onChange={() => {}}
                    defaultIndex={0}
                    immutable={true}
                />
            </div>
        </section>
    );
};

export default DetailsStep;