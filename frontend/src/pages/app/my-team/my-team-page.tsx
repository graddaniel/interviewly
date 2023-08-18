import React, { useEffect, useState } from 'react';
import { ProfileTypes } from 'shared';
import { useActionData, useLoaderData, useRouteError } from 'react-router-dom';

import TeamMemberPopup from './team-member-popup';
import TeamMemberTile from '../../../components/team-member-tile/team-member-tile';

import classes from './my-team-page.module.css'
import PeopleIconBlack from 'images/people-icon-black.svg';
import PlusIconBlack from 'images/plus-icon-black.svg';
import { useTranslation } from 'react-i18next';
import useErrorHandler from '../../../hooks/use-error-handler';
import useSuccessFeedback from '../../../hooks/use-success-feedback';


const MyTeamPage = () => {
    const teamMembers = useLoaderData() as any || [];
    useErrorHandler(useRouteError());
    const actionData = useActionData() as { [k: string]: any };
    const { t } = useTranslation();
    useSuccessFeedback(actionData, t('generic.saved'));

    const [ popupOpen, setPopupOpen ] = useState(false);
    const [ selectedMember, setSelectedMember ] = useState(null);
    const [ errors, setErrors ] = useState<any>(null);

    useEffect(() => {
        if (actionData?.errors) {
            setErrors(actionData.errors);
        }
    }, [actionData]);

    const membersCount = teamMembers.length;
    const adminsCount = teamMembers.filter(m => m.role === ProfileTypes.Role.Admin).length;
    const moderatorsCount = teamMembers.filter(m => m.role === ProfileTypes.Role.Moderator).length;
    const observersCount = teamMembers.filter(m => m.role === ProfileTypes.Role.Observer).length;

    return (
        <section>
            <div className={classes.header}>
                <div className={classes.labels}>
                    <img className={classes.headerIcon} src={PeopleIconBlack}/>
                    <h4 className={classes.title}>{t('myTeam.title')}</h4>
                    <span className={classes.membersCountLabel}>{membersCount} {t('myTeam.membersLabel')}</span>
                </div>
                <button
                    className={classes.addMembersButton}
                    onClick={() => setPopupOpen(true)}
                >
                    <img className={classes.addMembersButtonIcon} src={PlusIconBlack}/>
                    {t('myTeam.inviteTeamMemberButton')}
                </button>
                <ul className={classes.counters}>
                    <li className={classes.counterWrapper}>
                        <Counter value={adminsCount}/>
                        {t('myTeam.administratorsLabel')}
                    </li>
                    <li className={classes.counterWrapper}>
                        <Counter value={moderatorsCount}/>
                        {t('myTeam.moderatorsLabel')}
                    </li>
                    <li className={classes.counterWrapper}>
                        <Counter value={observersCount}/>
                        {t('myTeam.observersLabel')}
                    </li>
                </ul>
            </div>
            <div className={classes.tiles}>
                {teamMembers.map(m => (
                    <TeamMemberTile
                        key={m.email}
                        className={classes.tile}
                        {...m}
                        onEdit={() => {
                            setSelectedMember(m);
                            setPopupOpen(true);
                        }}
                    />
                ))}
            </div>
            {popupOpen && (
                <TeamMemberPopup
                    onClose={() => {
                        setSelectedMember(null);
                        setPopupOpen(false);
                        setErrors(null);
                    }}
                    defaultValues={selectedMember}
                    edit={!!selectedMember}
                    errors={errors}
                />
            )}
        </section>
    );
};

const Counter = ({
    value,
}) => {
    return (
        <div className={classes.counter}>
            {value}
        </div>
    );
};

export default MyTeamPage;