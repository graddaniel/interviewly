import React, { useEffect, useState } from 'react';
import { ProfileTypes } from 'shared';
import { useTranslation } from 'react-i18next';

import AddTeamMemberPopup from './add-team-member-popup';
import EditTeamMemberPopup from './edit-team-member-popup';
import TeamMemberTile from '../../../components/team-member-tile/team-member-tile';
import { useActionHandler, useLoaderHandler } from '../../../hooks/use-handlers';

import classes from './my-team-page.module.css'
import PeopleIconBlack from 'images/people-icon-black.svg';
import PlusIconBlack from 'images/plus-icon-black.svg';


const MyTeamPage = () => {
    const { t } = useTranslation();

    const { data } = useLoaderHandler();
    const actionData = useActionHandler(t('generic.saved'));

    const [ addMemberPopupOpen, setAddMemberPopupOpen ] = useState(false);
    const [ selectedMember, setSelectedMember ] = useState(null);
    const [ errors, setErrors ] = useState<any>(null);

    useEffect(() => {
        if (actionData?.errors) {
            setErrors(actionData.errors);
        }
    }, [actionData]);

    if (!data) {
        return null;
    }
    const { teamMembers } = data;

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
                    onClick={() => setAddMemberPopupOpen(true)}
                >
                    <img className={classes.addMembersButtonIcon} src={PlusIconBlack}/>
                    {t('myTeam.inviteTeamMemberButton')}
                </button>
                <ul className={classes.counters}>
                    <li className={classes.counterWrapper}>
                        <Counter value={adminsCount} />
                        {t('myTeam.administratorsLabel')}
                    </li>
                    <li className={classes.counterWrapper}>
                        <Counter value={moderatorsCount} />
                        {t('myTeam.moderatorsLabel')}
                    </li>
                    <li className={classes.counterWrapper}>
                        <Counter value={observersCount} />
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
                        }}
                    />
                ))}
            </div>
            {addMemberPopupOpen && (
                <AddTeamMemberPopup
                    onClose={() => {
                        setSelectedMember(null);
                        setAddMemberPopupOpen(false);
                        setErrors(null);
                    }}
                    errors={errors}
                />
            )}
            {!!selectedMember && (
                <EditTeamMemberPopup
                    onClose={() => {
                        setSelectedMember(null);
                        setErrors(null);
                    }}
                    memberData={selectedMember}
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