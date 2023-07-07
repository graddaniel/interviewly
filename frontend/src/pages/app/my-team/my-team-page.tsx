import React from 'react';
import { ProfileTypes } from 'shared';

import classes from './my-team-page.module.css'
import PeopleIconBlack from '~/images/people-icon-black.svg';
import PlusIconBlack from '~/images/plus-icon-black.svg';


const TEAM_MEMBERS = [{
    name: 'Karolina',
    surname: 'Izbicka',
    email: 'ewelina.izbicka@o2.pl',
    role: 'moderator',
    status: 'active',    
}, {
    name: 'Karol',
    surname: 'Walewski',
    email: 'walewski.k @o2.pl',
    role: 'administrator',
    status: 'pending',    
}, {
    name: 'Malwina',
    surname: 'Kowalska',
    email: 'mal34@gmail.com',
    role: 'observer',
    status: 'inactive',    
}, {
    name: 'Patrycjusz',
    surname: 'Ziembkiewicz',
    email: 'patrycjusz235@o2.pl',
    role: 'moderator',
    status: 'active',    
}, {
    name: 'Marek',
    surname: 'Kowal',
    email: 'kowal.marek@wp.pl',
    role: 'observer',
    status: 'inactive',    
}, {
    name: 'Iwona',
    surname: 'Kizior',
    email: 'kizior1993@gmail.com',
    role: 'moderator',
    status: 'active',    
}];


const MyTeamPage = () => {
    const membersCount = TEAM_MEMBERS.length;
    const adminsCount = TEAM_MEMBERS.filter(m => m.status === ProfileTypes.Role.Admin).length;
    const moderatorsCount = TEAM_MEMBERS.filter(m => m.status === ProfileTypes.Role.Moderator).length;
    const observersCount = TEAM_MEMBERS.filter(m => m.status === ProfileTypes.Role.Observer).length;
    
    return (
        <section>
            <div className={classes.header}>
                <div className={classes.labels}>
                    <img className={classes.headerIcon} src={PeopleIconBlack}/>
                    <h4 className={classes.title}>My team</h4>
                    <div className={classes.membersCountLabel}></div>
                </div>
                <button>
                    <img className={classes.addMembersButton} src={PlusIconBlack}/>
                    Invite team member
                </button>
                <ul className={classes.counters}>
                    <li>
                        <Counter value={adminsCount}/>
                        Administrators
                    </li>
                    <li>
                        <Counter value={moderatorsCount}/>
                        Moderators
                    </li>
                    <li>
                        <Counter value={observersCount}/>
                        Observers
                    </li>
                </ul>
            </div>
            <div className={classes.tiles}>

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