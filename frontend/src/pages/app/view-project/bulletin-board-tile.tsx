import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import Pill from '../../../components/pill/pill';

import classes from './bulletin-board-tile.module.css';
import classNames from 'classnames';
import TextButton from '../../../components/text-button/text-button';
import CreateRoomPopup from './methodology-step-sections/create-room-popup';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '../../../consts/routes';
import useAuth from '../../../hooks/useAuth';
import { AccountTypes } from 'shared';


type BulletinBoardTileProps = {
    className?: string;
    uuid: string;
    startDate: Date;
    endDate: Date;
    members: any[];
    rooms: any[];
};

const BulletinBoardTile = ({
    className,
    uuid,
    startDate,
    endDate,
    members,
    rooms,
}: BulletinBoardTileProps) => {
    const { i18n, t } = useTranslation();
    const { resolvedLanguage } = i18n;
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const auth = useAuth();
    const params = useParams();
    const navigate = useNavigate();

    const start = moment(startDate).locale(resolvedLanguage as string);
    const end = moment(endDate).locale(resolvedLanguage as string);

    const recruiterView = auth.type === AccountTypes.Type.RECRUITER;

    return (
        <div className={classNames(classes.tile, className)}>
            <header className={classes.tileHeader}>
                <span className={classes.title}>Bulletin Board</span>
                {recruiterView && (
                    <Pill
                        className={classes.pill}
                        text={`${members.length} ${t('viewProject.methodology.onlineCommunity.membersLabel')}`}
                    />
                )}
                <div className={classes.date}>
                    <span className={classes.datePart}>{start.format('D MMMM')}</span>
                    <span className={classes.datePart}>{start.format('h:mm a')}</span>
                </div>
                <div className={classes.date}>
                    <span className={classes.datePart}>{end.format('D MMMM')}</span>
                    <span className={classes.datePart}>{end.format('h:mm a')}</span>
                </div>
            </header>
            <main className={classes.rooms}>
                {rooms.map(room => (
                    <div
                        className={classes.roomEntry}
                        key={room.uuid}
                    >
                        <span
                            className={classes.roomName}
                            onClick={() => navigate(generatePath(
                                APP_ROUTES.BULLETIN_BOARD_ROOM.PATH, {
                                    roomId: room.uuid,
                                    projectId: params.projectId,
                                },
                            ))}
                        >
                            {room.name}
                        </span>
                        {recruiterView && (
                            <Pill
                                className={classes.pill}
                                text={`${room.membersCount} ${t('viewProject.methodology.onlineCommunity.membersLabel')}`}
                            />
                        )}
                    </div>
                ))}
            </main>
            {recruiterView && (
                <footer>
                    <TextButton
                        className={classes.createRoomButton}
                        text='Create room'
                        onClick={() => setIsPopupOpen(true)}
                    />
                </footer>
            )}
            {isPopupOpen &&(
                <CreateRoomPopup
                    onClose={() => setIsPopupOpen(false)}
                    respondents={members}
                    bulletinBoardUuid={uuid}
                />
            )}
        </div>
    );
};

export default BulletinBoardTile;