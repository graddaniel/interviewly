import React from 'react';
import { AccountTypes, ProfileTypes } from 'shared';

import classes from './my-team-page.module.css'
import PeopleIconBlack from '~/images/people-icon-black.svg';
import PlusIconBlack from '~/images/plus-icon-black.svg';
import TeamMemberTile from './team-member-tile';


const TEAM_MEMBERS = [{
    avatarUrl: 'https://i.pravatar.cc/100',
    name: 'Ewelina',
    surname: 'Izbicka',
    email: 'ewelina.izbicka@o2.pl',
    role: ProfileTypes.Role.Moderator,
    status: AccountTypes.Status.ACTIVE,    
}, {
    avatarUrl: 'https://i.pravatar.cc/100',
    name: 'Karol',
    surname: 'Walewski',
    email: 'walewski.k @o2.pl',
    role: ProfileTypes.Role.Admin,
    status: AccountTypes.Status.UNCONFIRMED,    
}, {
    avatarUrl: 'https://i.pravatar.cc/100',
    name: 'Malwina',
    surname: 'Kowalska',
    email: 'mal34@gmail.com',
    role: ProfileTypes.Role.Observer,
    status: AccountTypes.Status.INACTIVE,    
}, {
    avatarUrl: 'https://i.pravatar.cc/100',
    name: 'Patrycjusz',
    surname: 'Ziembkiewicz',
    email: 'patrycjusz235@o2.pl',
    role: ProfileTypes.Role.Moderator,
    status: AccountTypes.Status.ACTIVE,    
}, {
    avatarUrl: 'https://i.pravatar.cc/100',
    name: 'Marek',
    surname: 'Kowal',
    email: 'kowal.marek@wp.pl',
    role: ProfileTypes.Role.Observer,
    status: AccountTypes.Status.INACTIVE,    
}, {
    avatarUrl: 'https://i.pravatar.cc/100',
    name: 'Iwona',
    surname: 'Kizior',
    email: 'kizior1993@gmail.com',
    role: ProfileTypes.Role.Moderator,
    status: AccountTypes.Status.ACTIVE,    
}];


const MyTeamPage = () => {
    const membersCount = TEAM_MEMBERS.length;
    const adminsCount = TEAM_MEMBERS.filter(m => m.role === ProfileTypes.Role.Admin).length;
    const moderatorsCount = TEAM_MEMBERS.filter(m => m.role === ProfileTypes.Role.Moderator).length;
    const observersCount = TEAM_MEMBERS.filter(m => m.role === ProfileTypes.Role.Observer).length;

    return (
        <section>
            <div className={classes.header}>
                <div className={classes.labels}>
                    <img className={classes.headerIcon} src={PeopleIconBlack}/>
                    <h4 className={classes.title}>My team</h4>
                    <span className={classes.membersCountLabel}>{membersCount} members</span>
                </div>
                <button className={classes.addMembersButton}>
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
                {TEAM_MEMBERS.map(m => (
                    <TeamMemberTile
                        className={classes.tile}
                        key={m.email}
                        {...m}
                        onEdit={() => console.log(`Editing: ${m.email}`)}
                    />
                ))}
            </div>
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