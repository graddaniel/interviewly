import React from 'react';
import classNames from 'classnames';

import classes from './add-topic-box.module.css';
import Avatar from '../../../components/avatar/avatar';


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
    return (
        <div className={classNames(classes.addTopicBox, className)}>
            <Avatar url={avatarUrl}/>
            <div className={classes.input} onClick={onClick}>
                Add Topic
            </div>
        </div>
    );
};

export default AddTopicBox;