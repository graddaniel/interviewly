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
import { useTranslation } from 'react-i18next';


type CreateRoomPopupProps = {
    onClose: () => void;
    respondents: any[];
    bulletinBoardUuid;
};

const CreateRoomPopup = ({
    onClose,
    respondents,
    bulletinBoardUuid,
}: CreateRoomPopupProps) => {
    const { t } = useTranslation();
    const [ selectedRespondentUuids, setSelectedRespondentUuids ] = useState<string[]>([]);
    const toggleRespondentSelection = (uuid: string) => {
        const index = selectedRespondentUuids.indexOf(uuid);

        const newSelectedRespondents = [...selectedRespondentUuids];
        if (index > -1) {
            newSelectedRespondents.splice(index, 1);
        } else {
            newSelectedRespondents.push(uuid);
        }

        setSelectedRespondentUuids(newSelectedRespondents);
    };

    console.log(selectedRespondentUuids)

    return (
        <Popup className={classes.createRoomPopup}>
            <Form className={classes.form} method="POST">
                <input type="hidden" name="type" value="createRoom" />
                <input type="hidden" name="bulletinBoardUuid" value={bulletinBoardUuid} />
                <input type="hidden" name="respondentUuids" value={JSON.stringify(selectedRespondentUuids)} />
                <IconButton
                    className={classes.closeButton}
                    icon={CrossIcon}
                    onClick={onClose}
                />
                <h4 className={classes.title}>
                    {t('viewProject.methodology.onlineCommunity.createRoomButtonText')}
                </h4>
                <TextInput
                    className={classes.roomNameInput}
                    inputProps={{
                        input: {
                            className: classes.roomNameInternalInput
                        }
                    }}
                    name="roomName"
                    placeholder={t('viewProject.methodology.onlineCommunity.roomName')}
                />
                <h6 className={classes.subtitle}>
                    {t('viewProject.methodology.onlineCommunity.addMembersLabel')}:
                </h6>
                <div className={classes.desktopRespondents}>
                    {respondents.map(respondent => (
                        <RespondentTile
                            className={classNames(
                                classes.respondentTile,
                                selectedRespondentUuids.includes(respondent.uuid) && classes.selectedRespondentTile,
                            )}
                            key={respondent.uuid}
                            {...respondent}
                            onClick={() => toggleRespondentSelection(respondent.uuid)}
                        />
                    ))}
                </div>
                <div className={classes.nonDesktopRespondents}>
                    {respondents.map(respondent => (
                        <SelectableRespondentTile
                            className={classNames(
                                classes.respondentTile,
                            )}
                            key={respondent.uuid}
                            {...respondent}
                            onSelect={() => toggleRespondentSelection(respondent.uuid)}
                        />
                    ))}
                </div>
                <SubmitButton
                    className={classes.createRoomButton}
                    text={t('viewProject.methodology.onlineCommunity.createRoomButtonText')}
                />
            </Form>
        </Popup>
    );
};

export default CreateRoomPopup;