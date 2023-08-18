import React from 'react';
import { ProfileTypes } from 'shared';

import classes from './respondents-step.module.css';
import RespondentTile from '../../../components/respondent-tile/respondent-tile';


const RESPONDENTS = [{
    name: 'Ewelina',
    surname: 'Izbicka',
    age: 24,
    gender: ProfileTypes.Gender.FEMALE,
    email: 'ewelina123@email.fr',
    nationality: ProfileTypes.Nationality.French,
    avatarUrl: 'https://i.pravatar.cc/99',
}, {
    name: 'Karol',
    surname: 'Wiśniewski',
    age: 24,
    gender: ProfileTypes.Gender.MALE,
    email: 'karol321@email.pl',
    nationality: ProfileTypes.Nationality.Polish,
    avatarUrl: 'https://i.pravatar.cc/100',
}, {
    name: 'Malwina',
    surname: 'Kowalska',
    age: 24,
    gender: ProfileTypes.Gender.FEMALE,
    email: 'malwa@email.co.uk',
    nationality: ProfileTypes.Nationality.British,
    avatarUrl: 'https://i.pravatar.cc/101',
}];

type Respondent = {
    name: string;
    surname: string;
    email: string;
    gender: ProfileTypes.Gender;
};

type RespondentsStepProps = {
    respondents: Respondent[],
};

const RespondentsStep = ({
    respondents,
}: RespondentsStepProps) => {
    return (
        <section className={classes.responsentsStep}>
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