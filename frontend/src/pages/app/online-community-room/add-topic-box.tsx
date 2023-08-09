import React from 'react';
import classNames from 'classnames';

import classes from './add-topic-box.module.css';
import Avatar from '../../../components/avatar/avatar';
import { useTranslation } from 'react-i18next';


type AddTopicBoxProps = {
    className?: string;
    avatarUrl?: string;
    onClick: () => void;
};

const AddTopicBox = ({
    className,
    avatarUrl,
    onClick,
}: AddTopicBoxProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(classes.addTopicBox, className)}>
            <Avatar url={avatarUrl}/>
            <div className={classes.input} onClick={onClick}>
                {t('viewProject.methodology.onlineCommunity.room.addTopicLabel')}
            </div>
        </div>
    );
};

export default AddTopicBox;