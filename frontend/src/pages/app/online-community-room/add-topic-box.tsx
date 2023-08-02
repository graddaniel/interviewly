import React from 'react';

import classes from './add-topic-box.module.css';
import Avatar from '../../../components/avatar/avatar';


type AddTopicBoxProps = {
    avatarUrl?: string;
};

const AddTopicBox = ({
    avatarUrl,
}: AddTopicBoxProps) => {
    return (
        <div className={classes.addTopicBox}>
            <Avatar url={avatarUrl}/>
            <div className={classes.input}>
                Add Topic
            </div>
        </div>
    );
};

export default AddTopicBox;