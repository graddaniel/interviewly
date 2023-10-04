import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '../../../components/icon-button/icon-button';
import AddTopicBox from './add-topic-box';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import Topic from './topic';
import AddTopicPopup from './add-topic-popup';

import classes from './bulletin-board-room-page.module.css';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import PlusIconBlack from 'images/plus-icon-black.svg';
import { useTranslation } from 'react-i18next';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';
import { useLoaderHandler } from '../../../hooks/use-handlers';


const ROOM_MEMBERS = [{
    name: 'Mateusz',
    surname: 'Kościński',
    email: 'mat@kos.pl',
    avatarUrl: 'https://i.pravatar.cc/75',
}, {
    name: 'Ignacy',
    surname: 'Marecki',
    email: 'ig@mar.pl',
    avatarUrl: '',
}, {
    name: 'Adrian',
    surname: 'Kowalski',
    email: 'ad@kow.pl',
}];

const CURRENT_USER = {
    name: 'Ewelina',
    surname: 'Zalewska',
    email: 'ew@zal.pl',
    avatarUrl: 'https://i.pravatar.cc/75',
};


const BulletinBoardRoom = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const { data } = useLoaderHandler();
    const SORTING = [
        capitalizeFirstLetter(t('sorting.newest')),
        capitalizeFirstLetter(t('sorting.oldest')),
    ];
    const [ sorting, setSorting ] = useState(SORTING[0]);
    const [ isTopicPopupOpen, setIsTopicPopupOpen ] = useState(false);
    const goBack = () => navigate(-1);

    if (!data) {
        return null;
    }

    const { room } = data;
    const { name, threads } = room;

    return (
        <section className={classes.bulletinBoardRoom}>
            <IconButton
                className={classes.backIcon}
                icon={ArrowLeftIconPurple}
                onClick={goBack}
            />
            <h4 className={classes.title}>
                {name}
            </h4>
            <DropdownList
                className={classes.sortDropdown}
                name="sort"
                elementsList={SORTING}
                onChange={(i) => setSorting(SORTING[i])}
                defaultIndex={SORTING.indexOf(sorting)}
                allowDeselect={false}
            />
            <button
                className={classes.addTopicButton}
                onClick={() => setIsTopicPopupOpen(true)}
            >
                <img className={classes.addTopicButtonIcon} src={PlusIconBlack}/>
                {t('viewProject.methodology.onlineCommunity.room.addTopicLabel')}
            </button>
            <div className={classes.content}>
                <AddTopicBox
                    className={classes.addTopicBox}
                    onClick={() => setIsTopicPopupOpen(true)}
                />
                {threads.map(thread => (
                    <Topic
                        key={thread.uuid}
                        uuid={thread.uuid}
                        author={thread.author}
                        postDate={thread.postDate}
                        message={thread.message}
                        responses={thread.responses}
                    />
                ))}
            </div>
            {isTopicPopupOpen && (
                <AddTopicPopup
                    author={CURRENT_USER}
                    users={ROOM_MEMBERS}
                    onClose={() => setIsTopicPopupOpen(false)}
                />
            )}
        </section>
    );
};

export default BulletinBoardRoom;