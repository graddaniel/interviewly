import React, { useEffect, useRef, useState } from 'react';
import { Form, useActionData, useSubmit } from 'react-router-dom';
import { AccountTypes, ProfileTypes } from 'shared';

import Popup from '../../../components/popup/popup';
import IconButton from '../../../components/icon-button/icon-button';
import Pill from '../../../components/pill/pill';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import TextInput from '../../../components/text-input/text-input';
import TextButton from '../../../components/text-button/text-button';

import classes from './team-member-popup.module.css';
import CrossIcon from 'images/cross-icon.svg';
import classNames from 'classnames';

const ROLES = [
    ProfileTypes.Role.Admin,
    ProfileTypes.Role.Moderator,
    ProfileTypes.Role.Observer,
];
const STATUSES = Object.values(AccountTypes.Status);
const GENDERS = Object.values(ProfileTypes.Gender);


type TeamMemberPopupProps = {
    onClose: () => void;
    edit?: boolean;
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
    edit,
    errors,
}: TeamMemberPopupProps) => {
    console.log("ERRORS", errors)
    
    const formRef = useRef(null);
    const submit = useSubmit();
    const [ role, setRole ] = useState(defaultValues?.role || '');
    const [ status, setStatus ] = useState(defaultValues?.status || '');
    const [ gender, setGender ] = useState(defaultValues?.gender || '');

    return (
        <Popup>
            <div className={classes.header}>
                <h4 className={classes.title}>{edit ? 'Edit' : 'Add'} member</h4>
                <IconButton
                    className={classes.closeIcon}
                    icon={CrossIcon}
                    onClick={onClose}
                />
            </div>
            <Form className={classes.content} ref={formRef} method="post">
                <input type="hidden" name="action" value={edit ? "edit" : "add"} />
                <input type="hidden" name="uuid" value={defaultValues?.uuid} />
                <TextInput
                    name="name"
                    placeholder="Name"
                    className={classes.nameInput}
                    error={errors?.name}
                    defaultValue={defaultValues?.name}
                />
                <TextInput
                    name="surname"
                    placeholder="Surname"
                    className={classes.surnameInput}
                    error={errors?.surname}
                    defaultValue={defaultValues?.surname}
                />
                <TextInput
                    name="email"
                    placeholder="E-mail"
                    className={classes.emailInput}
                    error={errors?.email}
                    defaultValue={defaultValues?.email}
                />
                <DropdownList
                    className={classNames(
                        classes.roleDropdown,
                        errors?.role && classes.dropdownError,
                    )}
                    name="Role"
                    elementsList={ROLES}
                    onChange={i => setRole(ROLES[i])}
                    defaultIndex={defaultValues?.role ? ROLES.indexOf(defaultValues.role) : -1}
                />
                <input type="hidden" name="role" value={role} />
                <DropdownList
                    className={classNames(
                        classes.statusDropdown,
                        errors?.status && classes.dropdownError,
                    )}
                    name="Status"
                    elementsList={STATUSES.map(status => (
                        <Pill
                            key={status}
                            className={classes[status]}
                            text={status}
                        />
                    ))}
                    onChange={i => setStatus(STATUSES[i])}
                    defaultIndex={defaultValues?.status ? STATUSES.indexOf(defaultValues.status) : -1}
                />
                <input type="hidden" name="status" value={status} />
                <DropdownList
                    className={classNames(
                        classes.genderDropdown,
                        errors?.gender && classes.dropdownError,
                    )}
                    name="Gender"
                    elementsList={GENDERS}
                    onChange={i => setGender(GENDERS[i])}
                    defaultIndex={defaultValues?.gender ? GENDERS.indexOf(defaultValues?.gender) : -1}
                />
                <input type="hidden" name="gender" value={gender} />
                <TextButton
                    className={classes.saveButton}
                    text="Save"
                    onClick={() => {
                        submit(formRef.current);
                    }}
                />
            </Form>
        </Popup>
    );
};

export default TeamMemberPopup;