import React from 'react';

import classes from './selectable-respondent-tile.module.css';
import SwitchInput from '../../edit-project/switch-input';
import Avatar from '../../../../components/avatar/avatar';

type SelectableRespondentTileProps = {
    avatarUrl?: string;
    name: string;
    surname: string;
    email: string;
    onSelect: () => void;
};

const SelectableRespondentTile = ({
    avatarUrl,
    name,
    surname,
    email,
    onSelect,
}: SelectableRespondentTileProps) => {
    return (
        <div className={classes.tile}>
            <SwitchInput
                className={classes.switchInput}
                name="selection"
                onChange={onSelect}
            />
            <Avatar url={avatarUrl} className={classes.avatar} />
            <span className={classes.name}>{name} {surname}</span>
            <span className={classes.email}>{email}</span>
        </div>
    );
};

export default SelectableRespondentTile;