import React, { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useSubmit } from 'react-router-dom';
import { AccountTypes, ProfileTypes } from 'shared';

import Popup from '../../../components/popup/popup';
import IconButton from '../../../components/icon-button/icon-button';
import Pill from '../../../components/pill/pill';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import TextInput from '../../../components/text-input/text-input';
import TextButton from '../../../components/text-button/text-button';

import classes from './edit-team-member-popup.module.css';
import CrossIcon from 'images/cross-icon.svg';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const ROLES = [
    ProfileTypes.Role.Admin,
    ProfileTypes.Role.Moderator,
    ProfileTypes.Role.Observer,
];
const STATUSES = Object.values(AccountTypes.Status);
const GENDERS = Object.values(ProfileTypes.Gender);


type TeamMemberPopupProps = {
    onClose: () => void;
    defaultValues?: {
        uuid: string;
        name: string;
        surname: string;
        email: string;
        status: AccountTypes.Status;
        role: ProfileTypes.Role;
        gender: ProfileTypes.Gender;
    } | null;
    errors,
};

const TeamMemberPopup = ({
    onClose,
    defaultValues,
    errors,
}: TeamMemberPopupProps) => {  
    const formRef = useRef(null);
    const submit = useSubmit();
    const { t } = useTranslation();
    const [ role, setRole ] = useState(defaultValues?.role || '');
    const [ status, setStatus ] = useState(defaultValues?.status || '');
    const [ projects, setProjects ] = useState([]);

    return (
        <Popup className={classes.popup}>
            <div className={classes.header}>
                <h4 className={classes.title}>
                    {t('myTeam.popup.editLabel')} {t('myTeam.popup.memberText')}
                </h4>
                <IconButton
                    className={classes.closeButton}
                    icon={CrossIcon}
                    onClick={onClose}
                />
            </div>
            <Form className={classes.content} ref={formRef} method="post">
                <input type="hidden" name="action" value={"edit"} />
                <input type="hidden" name="uuid" value={defaultValues?.uuid} />
                <span className={classes.username}>
                    {defaultValues?.name} {defaultValues?.surname}
                </span>
                <span className={classes.email}>
                    {defaultValues?.email}
                </span>
                <DropdownList
                    className={classNames(
                        classes.roleDropdown,
                        errors?.role && classes.dropdownError,
                    )}
                    name={t('myTeam.popup.roleDropdownName')}
                    elementsList={ROLES.map(r => t(`profileRoles.${r}`))}
                    onChange={i => setRole(ROLES[i])}
                    defaultIndex={defaultValues?.role ? ROLES.indexOf(defaultValues.role) : -1}
                />
                <input type="hidden" name="role" value={role} />
                <DropdownList
                    className={classNames(
                        classes.statusDropdown,
                        errors?.status && classes.dropdownError,
                    )}
                    name={t('myTeam.popup.statusDropdownName')}
                    elementsList={STATUSES.map(status => (
                        <Pill
                            key={status}
                            className={classes[status]}
                            text={t(`accountStatuses.${status}`)}
                        />
                    ))}
                    onChange={i => setStatus(STATUSES[i])}
                    defaultIndex={defaultValues?.status ? STATUSES.indexOf(defaultValues.status) : -1}
                />
                <input type="hidden" name="status" value={status} />
                <DropdownList
                    className={classNames(
                        classes.projectDropdown,
                        errors?.status && classes.dropdownError,
                    )}
                    name={t('myTeam.popup.statusDropdownName')}
                    elementsList={STATUSES.map(status => (
                        <Pill
                            key={status}
                            className={classes[status]}
                            text={t(`accountStatuses.${status}`)}
                        />
                    ))}
                    onChange={i => setStatus(STATUSES[i])}
                    defaultIndex={defaultValues?.status ? STATUSES.indexOf(defaultValues.status) : -1}
                />
                <input type="hidden" name="projects" value={projects} />
                <TextButton
                    className={classes.saveButton}
                    text={t('myTeam.popup.saveButtonText')}
                    onClick={() => {
                        submit(formRef.current);
                    }}
                />
            </Form>
        </Popup>
    );
};

export default TeamMemberPopup;