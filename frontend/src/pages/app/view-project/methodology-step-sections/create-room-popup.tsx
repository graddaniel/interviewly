import React, { useState } from 'react';

import Popup from '../../../../components/popup/popup';
import IconButton from '../../../../components/icon-button/icon-button';

import classes from './create-room-popup.module.css';
import CrossIcon from 'images/cross-icon.svg';
import TextInput from '../../../../components/text-input/text-input';
import SubmitButton from '../../../../components/submit-button/submit-button';
import { Form } from 'react-router-dom';
import RespondentTile from '../../../../components/respondent-tile/respondent-tile';
import classNames from 'classnames';
import SelectableRespondentTile from './selectable-respondent-tile';


type CreateRoomPopupProps = {
    onClose: () => void;
    respondents: any[];
};

const CreateRoomPopup = ({
    onClose,
    respondents,
}: CreateRoomPopupProps) => {
    const [ selectedRespondents, setSelectedRespondents ] = useState<string[]>([]);
    const toggleRespondentSelection = (email: string) => {
        const index = selectedRespondents.indexOf(email);

        const newSelectedRespondents = [...selectedRespondents];
        if (index > -1) {
            newSelectedRespondents.splice(index, 1);
        } else {
            newSelectedRespondents.push(email);
        }

        setSelectedRespondents(newSelectedRespondents);
    };

    return (
        <Popup className={classes.createRoomPopup}>
            <Form className={classes.form} method="post">
                <IconButton
                    className={classes.closeButton}
                    icon={CrossIcon}
                    onClick={onClose}
                />
                <h4 className={classes.title}>Create room</h4>
                <TextInput
                    className={classes.roomNameInput}
                    inputProps={{
                        input: {
                            className: classes.roomNameInternalInput
                        }
                    }}
                    name="roomName"
                    placeholder="Room name"
                />
                <h6 className={classes.subtitle}>Add members:</h6>
                <div className={classes.desktopRespondents}>
                    {respondents.map(respondent => (
                        <RespondentTile
                            className={classNames(
                                classes.respondentTile,
                                selectedRespondents.includes(respondent.email) && classes.selectedRespondentTile,
                            )}
                            key={respondent.email}
                            {...respondent}
                            onClick={() => toggleRespondentSelection(respondent.email)}
                        />
                    ))}
                </div>
                <div className={classes.nonDesktopRespondents}>
                    {respondents.map(respondent => (
                        <SelectableRespondentTile
                            className={classNames(
                                classes.respondentTile,
                            )}
                            key={respondent.email}
                            {...respondent}
                            onSelect={() => toggleRespondentSelection(respondent.email)}
                        />
                    ))}
                </div>
                <SubmitButton
                    className={classes.createRoomButton}
                    text="Create room"
                />
            </Form>
        </Popup>
    );
};

export default CreateRoomPopup;