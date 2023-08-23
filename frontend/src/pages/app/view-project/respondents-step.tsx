import React from 'react';
import { ProfileTypes } from 'shared';

import classes from './respondents-step.module.css';
import RespondentTile from '../../../components/respondent-tile/respondent-tile';


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