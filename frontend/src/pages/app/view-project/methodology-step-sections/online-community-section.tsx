

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {  ProjectTypes } from 'shared';

import MethodologyTile from '../../../../components/methodology-tile/methodology-tile';
import BulletinBoardTile from '../bulletin-board-tile';

import classes from './online-community-section.module.css';
import { useLoaderHandler } from '../../../../hooks/use-handlers';


const ROOM_ID = 123;

const OnlineCommunitySection = () => {
    // const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const { t } = useTranslation();

    const { data } = useLoaderHandler();
    if (!data) {
        return null;
    }

    const {
        project: {
            bulletinBoards,
            respondents,
        },
    } = data;

    return (
        <div className={classes.content}>
            <MethodologyTile
                className={classes.methodologyTile}
                mini={true}
                selected={false}
                methodology={ProjectTypes.Methodology.OnlineCommunities}
            />
            {/* <button
                className={classes.createRoomButton}
                onClick={() => setIsPopupOpen(true)}
            >
                <img className={classes.createRoomButtonIcon} src={PlusIconBlack}/>
                {t('viewProject.methodology.onlineCommunity.createRoomButtonText')}
            </button> */}
            <div className={classes.boardsList}>
                {bulletinBoards.map(board => (
                    <BulletinBoardTile
                        key={board.uuid}
                        className={classes.bulletinBoardTile}
                        uuid={board.uuid}
                        startDate={board.startDate}
                        endDate={board.endDate}
                        members={respondents}
                        rooms={board.rooms}
                    />
                ))}
            </div>
        </div>
    );
};

export default OnlineCommunitySection;