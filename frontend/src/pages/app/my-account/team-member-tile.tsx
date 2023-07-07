import React from 'react';
import classNames from 'classnames';

import IconButton from '../../../components/icon-button/icon-button';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';

import classes from './team-member-tile.module.css';
import PencilIconBlack from '~/images/pencil-icon-black.svg'; 


const TeamMemberTile = ({
    avatarUrl,
    name,
    surname,
    status,
    onEdit,
}) => {
    return (
        <div className={classes.tile}>
            <img className={classes.avatar} src={avatarUrl} />
            <IconButton
                className={classes.editButton}
                icon={PencilIconBlack}
                onClick={onEdit}
            />
            <p className={classes.user}>
                <span>{name}</span>
                <span>{surname}</span>
            </p>
            <div className={classNames(classes.status, classes[status])}>
                {capitalizeFirstLetter(status)}
            </div>
        </div>
    );
};

export default TeamMemberTile;