import React, { useEffect, useRef, useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';

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
import { useTranslation } from 'react-i18next';
import { useActionHandler } from '../../../hooks/use-handlers';


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
    const { t } = useTranslation();
    const resetFormRef = useRef(null);
    const submit = useSubmit();
    const [ showInitialStep, setShowInitialStep ] = useState(true);
    const [ isVisibilityPublic, setIsVisibilityPublic ] = useState(true);
    const [ topicMembers, setTopicMembers ] = useState<string[]>([]);
    const [ message, setMessage ] = useState('');
    const [ pickingMembers, setPickingMembers ] = useState(false);

    const actionData = useActionHandler(t('viewProject.methodology.onlineCommunity.room.topicAddedSuccessMessage'));
    const errors = actionData?.error ?? {};
    console.log(errors)
    useEffect(() => {
        if (actionData?.success) {
            submit(resetFormRef.current);
            onClose();
        }
    }, [actionData]);

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
            <Form method="POST" ref={resetFormRef}>
                <input type="hidden" name="type" value="reset" />
            </Form>
            <Form method="post">
                <input type="hidden" name="type" value="postThread" />
                {showInitialStep ? (
                    <div className={classes.initialStep}>
                        <IconButton
                            className={classes.closeButton}
                            icon={CrossIcon}
                            onClick={onClose}
                        />
                        <h4 className={classes.title}>
                            {t('viewProject.methodology.onlineCommunity.room.addTopicLabel')}
                        </h4>
                        <div className={classes.author}>
                            <Avatar url={author.avatarUrl} className={classes.avatar}/>
                            <span className={classes.name}>
                                {author.name} {author.surname}
                            </span>
                        </div>
                        <div className={classes.visibilityControls}>
                            {t('viewProject.methodology.onlineCommunity.room.visibilityLabel')}: {
                            isVisibilityPublic
                                ? t('viewProject.methodology.onlineCommunity.room.publicVisibility')
                                : t('viewProject.methodology.onlineCommunity.room.specificMembersVisibility')
                            }
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
                            name="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            rows={3}
                            placeholder={t('viewProject.methodology.onlineCommunity.room.topicInputPlaceholder')}
                        ></textarea>
                        <p className={classes.error}>
                            {errors.messageData}
                        </p>
                        <input
                            className={classes.fileUpload}
                            type="file"
                            name="attachment"
                            
                        />
                        <SubmitButton
                            className={classes.submitButton}
                            text={t('viewProject.methodology.onlineCommunity.room.addTopicLabel')}
                        />
                    </div>
                ) : (
                    <div className={classes.visibilityStep}>
                        <IconButton
                            className={classes.backButton}
                            onClick={() => setShowInitialStep(true)}
                            icon={ArrowLeftIconPurple}
                        />
                        <h4 className={classes.title}>
                            {t('viewProject.methodology.onlineCommunity.room.visibilityLabel')}
                        </h4>
                        <SwitchInput
                            className={classes.visibilitySwitch}
                            name="publicVisibility"
                            defaultValue={pickingMembers}
                            leftLabel={t('viewProject.methodology.onlineCommunity.room.publicVisibility')}
                            rightLabel={t('viewProject.methodology.onlineCommunity.room.specificMembersVisibility')}
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
                            text={t('buttons.save')}
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