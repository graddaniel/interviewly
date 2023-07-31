import React from 'react';
import { ProfileTypes } from 'shared';

import TextButton from '../text-button/text-button';
import IconButton from '../icon-button/icon-button';
import nationalityToFlagIcon from '../../utils/nationality-to-flag-icon';
import genderToIcon from '../../utils/gender-to-icon';

import classes from './respondent-tile.module.css';
import ArrowRightIconPurple from 'images/arrow-right-icon-purple.svg';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '../../consts/routes';


type RespondentTileProps = {
    name: string;
    surname: string;
    age: number;
    gender: ProfileTypes.Gender;
    email: string;
    nationality: ProfileTypes.Nationality;
    avatarUrl: string;
};

const RespondentTile = ({
    name,
    surname,
    age,
    gender,
    email,
    nationality,
    avatarUrl,
}: RespondentTileProps) => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const goToProjectRespondentPage = () => navigate(generatePath(
        APP_ROUTES.PROJECT_RESPONDENT.PATH,
        { projectId, respondentId: 123 }
    ));

    return (
        <section className={classes.respondentsTile}>
            <div className={classes.shortInfo}>
                <img className={classes.avatar} src={avatarUrl}/>
                <img className={classes.flag} src={nationalityToFlagIcon(nationality)} />
                <img className={classes.gender} src={genderToIcon(gender)} />
                <span className={classes.age}>{age}</span>
            </div>
            <span className={classes.name}>{name} {surname}</span>
            <span className={classes.email}>{email}</span>
            <TextButton
                className={classes.detailsTextButton}
                text="See details"
                onClick={goToProjectRespondentPage}
            />
            <IconButton
                className={classes.detailsIconButton}
                icon={ArrowRightIconPurple}
                onClick={goToProjectRespondentPage}
            />
        </section>
    );
};

export default RespondentTile;