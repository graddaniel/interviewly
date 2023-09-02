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
import ProjectService from '../../../services/project-service';

const ROLES = [
    ProfileTypes.Role.Admin,
    ProfileTypes.Role.Moderator,
    ProfileTypes.Role.Observer,
    ProfileTypes.Role.Translator,
];
const STATUSES = Object.values(AccountTypes.Status);


type EditTeamMemberPopupProps = {
    onClose: () => void;
    memberData: {
        uuid: string;
        name: string;
        surname: string;
        email: string;
        status: AccountTypes.Status;
        role: ProfileTypes.Role;
        gender: ProfileTypes.Gender;
    };
    errors?: any;
};

const EditTeamMemberPopup = ({
    onClose,
    memberData,
    errors,
}: EditTeamMemberPopupProps) => {
    const formRef = useRef(null);
    const submit = useSubmit();
    const { t } = useTranslation();
    const [ role, setRole ] = useState(memberData.role || '');
    const [ status, setStatus ] = useState(memberData.status || '');
    const [ userProjects, setUserProjects ] = useState<any[]>([]);
    const [ companyProjects, setCompanyProjects ] = useState<any[]>([]);
    const [ newUserProjects, setNewUserProjects ] = useState<any[]>([]);

    const getProjects = async () => {
        const userProjects = await ProjectService.getProjects(memberData.uuid);
        const companyProjects = await ProjectService.getProjects();

        setUserProjects(userProjects);
        setCompanyProjects(companyProjects);
        setNewUserProjects(userProjects);
    }

    const toggleProject = (i: number) => {
        const toggledProject = companyProjects[i];

        const newerUserProjects = [...newUserProjects];
        const projectToToggleIndex = newerUserProjects.findIndex(p => p.uuid === toggledProject.uuid);

        if (projectToToggleIndex < 0) {
            newerUserProjects.push(toggledProject);
        } else {
            newerUserProjects.splice(projectToToggleIndex, 1);
        }

        setNewUserProjects(newerUserProjects);
    }

    useEffect(() => {
        getProjects();
    }, []);

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
                <input type="hidden" name="uuid" value={memberData?.uuid} />
                <span className={classes.username}>
                    {memberData?.name} {memberData?.surname}
                </span>
                <span className={classes.email}>
                    {memberData?.email}
                </span>
                <DropdownList
                    className={classNames(
                        classes.roleDropdown,
                        errors?.role && classes.dropdownError,
                    )}
                    name={t('myTeam.popup.roleDropdownName')}
                    elementsList={ROLES.map(r => t(`profileRoles.${r}`))}
                    onChange={i => setRole(ROLES[i])}
                    defaultIndex={memberData.role ? ROLES.indexOf(memberData.role) : -1}
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
                    defaultIndex={memberData.status ? STATUSES.indexOf(memberData.status) : -1}
                />
                <input type="hidden" name="status" value={status} />
                {companyProjects.length > 0
                && (role === ProfileTypes.Role.Moderator
                    || role === ProfileTypes.Role.Observer 
                    || role === ProfileTypes.Role.Translator
                ) && (
                    <DropdownList
                        className={classNames(
                            classes.projectDropdown,
                            errors?.status && classes.dropdownError,
                        )}
                        name={t('myTeam.popup.projectsDropdownName')}
                        elementsList={companyProjects.map(p => p.title)}
                        onChange={i => toggleProject(i)}
                        defaultIndex={userProjects.map(p => companyProjects.findIndex(cp => cp.uuid === p.uuid))}
                        multiselect={true}
                        allowDeselect={true}
                    />
                )}
                <input type="hidden" name="projects" value={newUserProjects.map(p => p.uuid)} />
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

export default EditTeamMemberPopup;