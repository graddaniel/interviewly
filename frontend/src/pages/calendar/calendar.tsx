import React, { useState } from 'react';
import moment from 'moment';

import classes from './calendar.module.css';
import CalendarIconBlack from 'images/calendar-icon-black.svg';
import { useTranslation } from 'react-i18next';
import DateTile from './date-tile';
import InterviewTile from '../app/my-account/interview-tile';
import DropdownList from '../../components/dropdown-list/dropdown-list';

type CalendarDate = {
    year: number;
    month: number;
    day: number;
    date: Date;
    interviews: any[];
};

function generateMonthPage(month, year, resolvedLanguage) {
    const calendarPage: CalendarDate[] = [];

    const monthStart = moment()
        .locale(resolvedLanguage as string)
        .year(year)
        .month(month - 1)
        .startOf("month")
        .startOf("week");
    const monthEnd = moment()
        .locale(resolvedLanguage as string)
        .year(year)
        .month(month - 1)
        .endOf("month")
        .endOf("week");

    let currentDay = monthStart;
    while (monthEnd.diff(currentDay, 'days') > 0) {
        calendarPage.push({
            year: currentDay.year(),
            month: currentDay.month() + 1,
            day: currentDay.date(),
            date: currentDay.toDate(),
            interviews: [],
        });

        currentDay.add(1, 'day');
    }
    calendarPage.push({
        year: currentDay.year(),
        month: currentDay.month() + 1,
        day: currentDay.date(),
        date: currentDay.toDate(),
        interviews: [],
    });

    return calendarPage;
}

const INTERVIEWS = [{
    date: moment().year(2023).month(7).day(1).toDate(),
    duration: 30,
}, {
    date: moment().year(2023).month(7).day(1).toDate(),
    duration: 90,
}, {
    date: moment().year(2023).month(7).day(1).toDate(),
    duration: 90,
}, {
    date: moment().year(2023).month(7).day(12).toDate(),
    duration: 30,
}, {
    date: moment().year(2023).month(7).day(13).toDate(),
    duration: 90,
}, {
    date: moment().year(2023).month(7).day(22).toDate(),
    duration: 30,
}, {
    date: moment().year(2023).month(7).day(22).toDate(),
    duration: 60,
}];

const CalendarPage = () => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const generateMonth = () => {
        let i = 0;
        return () => moment().locale(resolvedLanguage as string).month(i++).format('MMMM');
    };
    const MONTHS = Array.from({ length: 12 }, generateMonth());
    const YEARS = [2023, 2024];
    
    const today = moment().locale(resolvedLanguage as string);
    
    const [ selectedMonthNumber, setSelectedMonthNumber ] = useState(today.month() + 1);
    const [ selectedYear, setSelectedYear ] = useState(YEARS[YEARS.indexOf(today.year())]);

    const monthPage = generateMonthPage(selectedMonthNumber, selectedYear, resolvedLanguage);
    INTERVIEWS.forEach(interview => {
        const relevantDay = monthPage.find(d => moment(interview.date).isSame(moment(d.date), 'day'));
        relevantDay?.interviews.push(interview);
    })

    const [ selectedIndex, setSelectedIndex ] = useState(
        monthPage.findIndex(({ date }) => today.isSame(moment(date), 'day'))
    );

    return (
        <section className={classes.calendarPage}>
            <header className={classes.header}>
                <img className={classes.headerIcon} src={CalendarIconBlack} />
                <h4 className={classes.title}>{t('calendar.title')}</h4>
            </header>
            <div className={classes.calendar}>
                <div className={classes.calendarControls}>
                    <DropdownList
                        name="month"
                        elementsList={MONTHS}
                        defaultIndex={selectedMonthNumber - 1}
                        allowDeselect={false}
                        onChange={i => setSelectedMonthNumber(i + 1)}
                    />
                    <DropdownList
                        name="year"
                        elementsList={YEARS}
                        defaultIndex={YEARS.indexOf(selectedYear)}
                        allowDeselect={false}
                        onChange={i => setSelectedYear(YEARS[i])}
                    />
                </div>
                <div className={classes.monthPage}>
                    {monthPage.map(({ month, day, interviews, date }, i) => (
                        <DateTile
                            key={`${day}${month}`}
                            day={day}
                            interviewsCount={interviews.length}
                            selected={i === selectedIndex}
                            isToday={today.isSame(moment(date), 'day')}
                            isThisMonth={month === selectedMonthNumber}
                            onClick={() => setSelectedIndex(i)}
                        />
                    ))}
                </div>
            </div>
            <div className={classes.interviews}>
                {monthPage[selectedIndex].interviews.map(({ duration, date }, i) => (
                    <InterviewTile
                        key={i}
                        duration={duration}
                        date={date}
                    />
                ))}
            </div>
        </section>
    );
};

export default CalendarPage;