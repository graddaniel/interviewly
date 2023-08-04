import React, { useState } from 'react';
import { Form } from 'react-router-dom';

import Popup from '../../../components/popup/popup';
import IconButton from '../../../components/icon-button/icon-button';
import Avatar from '../../../components/avatar/avatar';
import SubmitButton from '../../../components/submit-button/submit-button';

import classes from './add-topic-popup.module.css';
import CrossIcon from 'images/cross-icon.svg';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import EarthIconPurple from 'images/earth-icon-purple.svg';
import PencilIconBlack from 'images/pencil-icon-black.svg';
import SwitchInput from '../edit-project/switch-input';
import TextButton from '../../../components/text-button/text-button';


type User = {
    name: string;
    surname: string;
    email: string;
    avatarUrl?: string;
};

type AddTopicPopupProps = {
    author: User;
    users: User[];
    onClose: () => void;
};

const AddTopicPopup = ({
    author,
    users,
    onClose,
}: AddTopicPopupProps) => {
    const [ showInitialStep, setShowInitialStep ] = useState(true);
    const [ isVisibilityPublic, setIsVisibilityPublic ] = useState(true);
    const [ topicMembers, setTopicMembers ] = useState<string[]>([]);
    const [ topic, setTopic ] = useState('');
    const [ pickingMembers, setPickingMembers ] = useState(false);

    const toggleTopicMember = (email: string) => {
        const index = topicMembers.indexOf(email);

        const newTopicMembers = [...topicMembers];
        if (index > -1) {
            newTopicMembers.splice(index, 1);
        } else {
            newTopicMembers.push(email);
        }

        setTopicMembers(newTopicMembers);
    }

    return (
        <Popup className={classes.popup}>
            <Form method="post">
                {showInitialStep ? (
                    <div className={classes.initialStep}>
                        <IconButton
                            className={classes.closeButton}
                            icon={CrossIcon}
                            onClick={onClose}
                        />
                        <h4 className={classes.title}>Add topic</h4>
                        <div className={classes.author}>
                            <Avatar url={author.avatarUrl} className={classes.avatar}/>
                            <span className={classes.name}>
                                {author.name} {author.surname}
                            </span>
                        </div>
                        <div className={classes.visibilityControls}>
                            Visibility: {isVisibilityPublic ? "Public" : "Specific members"}
                            <IconButton
                                className={classes.visibilityIcon}
                                icon={EarthIconPurple}
                                onClick={() => {
                                    setPickingMembers(false);
                                    setShowInitialStep(false);
                                }}
                            />
                            <IconButton
                                className={classes.visibilityIcon}
                                icon={PencilIconBlack}
                                onClick={() => {
                                    setPickingMembers(true);
                                    setShowInitialStep(false);
                                }}
                            />
                        </div>
                        <textarea
                            className={classes.topic}
                            name="topicName"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                            rows={3}
                            placeholder="Topic"
                        ></textarea>
                        <input
                            className={classes.fileUpload}
                            type="file"
                            name="attachment"
                            
                        />
                        <SubmitButton
                            className={classes.submitButton}
                            text={"Add topic"}
                        />
                    </div>
                ) : (
                    <div className={classes.visibilityStep}>
                        <IconButton
                            className={classes.backButton}
                            onClick={() => setShowInitialStep(true)}
                            icon={ArrowLeftIconPurple}
                        />
                        <h4 className={classes.title}>Visibility</h4>
                        <SwitchInput
                            className={classes.visibilitySwitch}
                            name="publicVisibility"
                            defaultValue={pickingMembers}
                            leftLabel="Public"
                            rightLabel="Specific members"
                            onChange={(value) => setPickingMembers(value)}
                        />
                        <div className={classes.users}>
                            {pickingMembers && users.map(u => (
                                <div className={classes.user} key={u.email}>
                                    <Avatar url={u.avatarUrl}/>
                                    <span className={classes.userName}>{u.name} {u.surname}</span>
                                    <SwitchInput
                                        name="ignoreThis_user"
                                        onChange={() => toggleTopicMember(u.email)}
                                    />
                                </div>
                            ))}
                        </div>
                        <TextButton
                            className={classes.addButton}
                            text="Save"
                            onClick={() => {
                                setIsVisibilityPublic(pickingMembers);
                                setShowInitialStep(true);
                            }}
                        />
                    </div>
                )}
            </Form>
        </Popup>
    );
};

export default AddTopicPopup;