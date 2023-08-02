

import React, { useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProfileTypes, ResearchTypes } from 'shared';

import MethodologyTile from '../../../../components/methodology-tile/methodology-tile';
import BulletinBoardTile from '../bulletin-board-tile';

import classes from './online-community-section.module.css';
import PlusIconBlack from 'images/plus-icon-black.svg';
import { APP_ROUTES } from '../../../../consts/routes';
import CreateRoomPopup from './create-room-popup';


const ROOM_ID = 123;

const RESPONDENTS = [{
    name: 'Ewelina',
    surname: 'Izbicka',
    age: 24,
    gender: ProfileTypes.Gender.FEMALE,
    email: 'ewelina123@email.fr',
    nationality: ProfileTypes.Nationality.French,
    avatarUrl: 'https://i.pravatar.cc/99',
}, {
    name: 'Karol',
    surname: 'Wiśniewski',
    age: 24,
    gender: ProfileTypes.Gender.MALE,
    email: 'karol321@email.pl',
    nationality: ProfileTypes.Nationality.Polish,
    avatarUrl: 'https://i.pravatar.cc/100',
}, {
    name: 'Malwina',
    surname: 'Kowalska',
    age: 24,
    gender: ProfileTypes.Gender.FEMALE,
    email: 'malwa@email.co.uk',
    nationality: ProfileTypes.Nationality.British,
    avatarUrl: 'https://i.pravatar.cc/101',
}, {
    name: 'Maaaalwina',
    surname: 'Kaaaaowalska',
    age: 24,
    gender: ProfileTypes.Gender.FEMALE,
    email: 'malwaaaa@email.co.uk',
    nationality: ProfileTypes.Nationality.British,
    avatarUrl: 'https://i.pravatar.cc/101',
}];

type OnlineCommunitySectionProps = {

};

const OnlineCommunitySection = ({

}: OnlineCommunitySectionProps) => {
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { projectId } = useParams();

    return (
        <div className={classes.content}>
            <MethodologyTile
                className={classes.methodologyTile}
                mini={true}
                selected={false}
                methodology={ResearchTypes.Methodology.OnlineCommunities}
            />
            <button
                className={classes.createRoomButton}
                onClick={() => setIsPopupOpen(true)}
            >
                <img className={classes.createRoomButtonIcon} src={PlusIconBlack}/>
                Create room
            </button>
            <BulletinBoardTile
                className={classes.bulletinBoardTile}
                startDate={new Date(Date.now() - 1000000000)}
                endDate={new Date()}
                membersCount={7}
                onClick={() => navigate(generatePath(APP_ROUTES.ONLINE_COMMUNITY_ROOM.PATH, { projectId, roomId: ROOM_ID }))}
            />
            {isPopupOpen &&(
                <CreateRoomPopup
                    onClose={() => setIsPopupOpen(false)}
                    respondents={RESPONDENTS}
                />
            )}
        </div>
    );
};

export default OnlineCommunitySection;