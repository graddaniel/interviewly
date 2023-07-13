import React, { useEffect, useState } from 'react';
import { ProfileTypes } from 'shared';
import { useActionData, useLoaderData } from 'react-router-dom';

import TeamMemberTile from './team-member-tile';
import TeamMemberPopup from './team-member-popup';

import classes from './my-team-page.module.css'
import PeopleIconBlack from '~/images/people-icon-black.svg';
import PlusIconBlack from '~/images/plus-icon-black.svg';


const MyTeamPage = () => {
    const teamMembers = useLoaderData() as any;
    const actionData = useActionData() as { [k: string]: any };

    const [ popupOpen, setPopupOpen ] = useState(false);
    const [ selectedMember, setSelectedMember ] = useState(null);
    const [ errors, setErrors ] = useState<any>(null);

    useEffect(() => {
        console.log("UPDATING ERRORS", actionData)
        setErrors(actionData);
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
                    <h4 className={classes.title}>My team</h4>
                    <span className={classes.membersCountLabel}>{membersCount} members</span>
                </div>
                <button
                    className={classes.addMembersButton}
                    onClick={() => setPopupOpen(true)}
                >
                    <img className={classes.addMembersButtonIcon} src={PlusIconBlack}/>
                    Invite team member
                </button>
                <ul className={classes.counters}>
                    <li className={classes.counterWrapper}>
                        <Counter value={adminsCount}/>
                        Administrators
                    </li>
                    <li className={classes.counterWrapper}>
                        <Counter value={moderatorsCount}/>
                        Moderators
                    </li>
                    <li className={classes.counterWrapper}>
                        <Counter value={observersCount}/>
                        Observers
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