import React from 'react';
import classNames from 'classnames';

import IconButton from '../../../components/icon-button/icon-button';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';

import classes from './team-member-tile.module.css';
import PencilIconBlack from 'images/pencil-icon-black.svg'; 
import { AccountTypes, ProfileTypes } from 'shared';

type TeamMemberTileProps = {
    className?: string;
    avatarUrl: string;
    name: string;
    surname: string;
    email: string;
    role: ProfileTypes.Role;
    status: AccountTypes.Status;
    onEdit: () => void;
};

const TeamMemberTile = ({
    className,
    avatarUrl,
    name,
    surname,
    email,
    role,
    status,
    onEdit,
}: TeamMemberTileProps) => {
    return (
        <div className={classNames(classes.tile, className)}>
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
            <span className={classes.email}>{email}</span>
            <span className={classes.role}>{capitalizeFirstLetter(role)}</span>
            <div className={classNames(classes.status, classes[status])}>
                {capitalizeFirstLetter(status)}
            </div>
        </div>
    );
};

export default TeamMemberTile;