

import React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResearchTypes } from 'shared';

import MethodologyTile from '../../../../components/methodology-tile/methodology-tile';
import BulletinBoardTile from '../bulletin-board-tile';

import classes from './online-community-section.module.css';
import PlusIconBlack from 'images/plus-icon-black.svg';
import { APP_ROUTES } from '../../../../consts/routes';


const ROOM_ID = 123;

type OnlineCommunitySectionProps = {

};

const OnlineCommunitySection = ({

}: OnlineCommunitySectionProps) => {
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
                onClick={() => console.log('open create room popup')}
            >
                <img className={classes.createRoomButtonIcon} src={PlusIconBlack}/>
                Create room
            </button>
            <BulletinBoardTile
                startDate={new Date(Date.now() - 1000000000)}
                endDate={new Date()}
                membersCount={7}
                onClick={() => navigate(generatePath(APP_ROUTES.ONLINE_COMMUNITY_ROOM.PATH, { projectId, roomId: ROOM_ID }))}
            />
        </div>
    );
};

export default OnlineCommunitySection;