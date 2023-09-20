import React, { useCallback, useEffect, useState } from 'react';
import { ProfileTypes } from 'shared';

import classes from './respondents-step.module.css';
import RespondentTile from '../../../components/respondent-tile/respondent-tile';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import IconButton from '../../../components/icon-button/icon-button';
import ArrowUpIcon from 'images/arrow-up-icon.svg';
import ArrowDownIcon from 'images/arrow-down-icon.svg';
import { useTranslation } from 'react-i18next';


type Respondent = {
    uuid: string;
    name: string;
    surname: string;
    email: string;
    gender: ProfileTypes.Gender;
};

type RespondentsStepProps = {
    respondents: Respondent[],
};

const GENDERS = Object.values(ProfileTypes.Gender);

const RespondentsStep = ({
    respondents: inputRespondents,
}: RespondentsStepProps) => {
    const { t } = useTranslation();
    const [ sorting, setSorting ] = useState('');
    const [ genderFilter, setGenderFilter ] = useState('');
    const [ respondents, setRespondents ] = useState(inputRespondents);

    const selectGenderFilter = useCallback((i) => {
        if (genderFilter === GENDERS[i]) {
            return setGenderFilter('');
        }

        return setGenderFilter(GENDERS[i]);
    }, [genderFilter]);

    useEffect(() => {
        let transformedRespondents = [...inputRespondents];

        if (genderFilter) {
            transformedRespondents = transformedRespondents.filter(
                r => r.gender === genderFilter
            );
        }

        if (sorting) {
            transformedRespondents.sort(
                (a,b) => a.email.localeCompare(b.email) * (sorting === 'asc' ? 1 : -1)
            );
        }

        setRespondents(transformedRespondents);
    }, [sorting, genderFilter]);

    return (
        <section className={classes.responsentsStep}>
            <div className={classes.filters}>
                <DropdownList
                    name={t('viewProject.respondents.genderDropdownLabel')}
                    onChange={selectGenderFilter}
                    elementsList={GENDERS.map(g => t(`genders.${g}`))}
                    listClassName={classes.dropdownList}
                    allowDeselect={true}
                />
                <IconButton
                    icon={ArrowUpIcon}
                    onClick={() => setSorting(sorting === 'asc' ? '' : 'asc')}
                />
                <IconButton
                    icon={ArrowDownIcon}
                    onClick={() => setSorting(sorting === 'desc' ? '' : 'desc')}
                />
            </div>
            {respondents.map(respondent => (
                <RespondentTile
                    key={respondent.email}
                    nationality={ProfileTypes.Nationality.Polish}
                    avatarUrl={'https://i.pravatar.cc/100'}
                    age={0}
                    {...respondent}
                />
            ))}
        </section>
    );
};

export default RespondentsStep;