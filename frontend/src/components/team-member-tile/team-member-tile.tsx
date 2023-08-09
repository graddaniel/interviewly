import React from 'react';
import classNames from 'classnames';
import { AccountTypes, ProfileTypes } from 'shared';

import IconButton from '../icon-button/icon-button';
import capitalizeFirstLetter from '../../utils/capitalize-first-letter';

import classes from './team-member-tile.module.css';
import PencilIconBlack from 'images/pencil-icon-black.svg'; 
import AccountIcon from 'images/account-icon.svg';
import { useTranslation } from 'react-i18next';


type TeamMemberTileProps = {
    className?: string;
    name: string;
    surname: string;
    status: AccountTypes.Status;
    onEdit: () => void;
    avatarUrl?: string;
    email?: string;
    role?: ProfileTypes.Role;
    small?: boolean;
};

const TeamMemberTile = ({
    className,
    avatarUrl,
    name,
    surname,
    email,
    role,
    status,
    small,
    onEdit,
}: TeamMemberTileProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(
            classes.tile,
            small ? classes.smallTile : '',
            className
        )}>
            {avatarUrl ? (
                <img className={classes.avatar} src={avatarUrl} />
            ) : (
                <div className={classes.avatarPlaceholder}>
                    <img src={AccountIcon}/>
                </div>
            )}
            <IconButton
                className={classes.editButton}
                icon={PencilIconBlack}
                onClick={onEdit}
            />
            <p className={classes.user}>
                <span>{name}</span>
                <span>{surname}</span>
            </p>
            {email && !small && (
                <span className={classes.email}>
                    {email}
                </span>
            )}
            {role && !small && (
                <span className={classes.role}>
                    {capitalizeFirstLetter(role)}
                </span>
            )}
            <div className={classNames(classes.status, classes[status])}>
                {capitalizeFirstLetter(t(`accountStatuses.${status}`))}
            </div>
        </div>
    );
};

export default TeamMemberTile;