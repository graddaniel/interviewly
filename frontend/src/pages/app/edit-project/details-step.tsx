import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { ResearchTypes } from 'shared';

import StepTitle from './step-title';
import SwitchInput from './switch-input';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import NumericalInput from '../../../components/numerical-input/numerical-input';

import classes from './details-step.module.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../../../lib/react-timepicker.css';
import QuestionMarkIconBlack from 'images/question-mark-icon-black.svg';
import LanguagesIconBlack from 'images/languages-icon-black.svg';
import DollarSignIconBlack from 'images/dollar-sign-icon-black.svg';
import { useActionData } from 'react-router-dom';
import classNames from 'classnames';


const DURATIONS = Object.values(ResearchTypes.Duration);
const CURRENCIES = Object.values(ResearchTypes.PaymentCurrency);

const DetailsStep = ({
    project,
}) => {
    const actionData = useActionData() as any;

    const [ duration, setDuration ] = useState(project?.meetingDuration || '');
    const [ currency, setCurrency ] = useState(project?.participantsPaymentCurrency || '');

    const [ datetime, setDatetime ] = useState<any>();
    const [ time, setTime ] = useState<any>('12:00');
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
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
                    title="Project details"
                    icon={QuestionMarkIconBlack}
                />
                <NumericalInput
                    className={classes.participants}
                    name="participantsCount"
                    placeholder="Number of participants"
                    error={errors.participantsCount}
                    defaultValue={project.participantsCount}
                />
                <NumericalInput
                    className={classes.reserveParticipants}
                    name="reserveParticipantsCount"
                    placeholder="Number of reserve participants"
                    error={errors.reserveParticipantsCount}
                    defaultValue={project.reserveParticipantsCount}
                />
                <label className={classes.label}>
                    Interview duration:
                    <DropdownList
                        className={classNames(
                            classes.dropdown,
                            errors.meetingDuration && classes.dropdownError
                        )}
                        name="Duration"
                        elementsList={DURATIONS}
                        onChange={(index: number) => setDuration(DURATIONS[index])}
                        defaultIndex={DURATIONS.indexOf(project.meetingDuration)}
                    />
                    <input type="hidden" name="meetingDuration" value={duration}/>
                </label>
                <DatePicker selected={date} onChange={(date) => setDate(date)} />
                <TimePicker value={time} onChange={setTime}/>
            </div>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title="Do you need transcription?"
                    icon={LanguagesIconBlack}
                />
                <SwitchInput
                    name="transcription"
                    leftLabel="No"
                    rightLabel="Yes"
                />
            </div>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title="Do you need a moderator?"
                    icon={LanguagesIconBlack}
                />
                <SwitchInput
                    name="moderator"
                    leftLabel="No"
                    rightLabel="Yes"
                />
            </div>
            <div className={classes.questionsGroup}>
                <StepTitle
                    title="Payment for the respondent"
                    icon={DollarSignIconBlack}
                />
                <span>Please enter gross amount. The currency should match the currency used for the invoice payment.</span>
                <NumericalInput
                    className={classes.payment}
                    name="participantsPaymentValue"
                    placeholder=""
                    error={errors.participantsPaymentValue}
                    defaultValue={project.participantsPaymentValue}
                />
                <DropdownList
                    className={classNames(
                        classes.dropdown,
                        errors.participantsPaymentCurrency && classes.dropdownError
                    )}                
                    name="Currency"
                    elementsList={CURRENCIES}
                    onChange={(index: number) => setCurrency(CURRENCIES[index])}
                    defaultIndex={CURRENCIES.indexOf(project.participantsPaymentCurrency)}
                />
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