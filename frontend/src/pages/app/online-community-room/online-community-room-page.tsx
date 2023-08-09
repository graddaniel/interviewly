import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '../../../components/icon-button/icon-button';
import AddTopicBox from './add-topic-box';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import Topic from './topic';
import AddTopicPopup from './add-topic-popup';

import classes from './online-community-room-page.module.css';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import PlusIconBlack from 'images/plus-icon-black.svg';
import { useTranslation } from 'react-i18next';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';


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

type OnlineCommunityRoomPageProps = {

};

const OnlineCommunityRoomPage = ({

}: OnlineCommunityRoomPageProps) => {
    const { t } = useTranslation();
    const SORTING = [
        capitalizeFirstLetter(t('sorting.newest')),
        capitalizeFirstLetter(t('sorting.oldest')),
    ];

    const [ sorting, setSorting ] = useState(SORTING[0]);
    const [ isTopicPopupOpen, setIsTopicPopupOpen ] = useState(false);
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section className={classes.onlineCommunityRoom}>
            <IconButton
                className={classes.backIcon}
                icon={ArrowLeftIconPurple}
                onClick={goBack}
            />
            <h4 className={classes.title}>
                {t('viewProject.methodology.onlineCommunity.roomName')}
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
                <AddTopicBox className={classes.addTopicBox} onClick={() => setIsTopicPopupOpen(true)} />
                <Topic
                    author={{
                        name: 'Ewelina',
                        surname: 'Zalewska',
                        avatarUrl: 'https://i.pravatar.cc/75',
                    }}
                    postDate={new Date()}
                    content={'Are you also having trouble creating the questionnaire?'}
                    attachment={{
                        type: 'video',
                        url: 'https://media.istockphoto.com/id/1490029320/pl/filmy/niszczarka-papieru-niszczy-dokumenty-poufne-lub-niejawne.mp4?s=mp4-640x640-is&k=20&c=pmtycuwWk0aLpJUDhAeSLL26MPSNFFyvbISTugHpL68=',
                    }}
                />
                <Topic
                    author={{
                        name: 'Karol',
                        surname: 'Walewski',
                    }}
                    postDate={new Date()}
                    content={'How can I add members to my team...'}
                    attachment={{
                        type: 'image',
                        url: 'https://picsum.photos/200/300',
                    }}
                />
                <Topic
                    author={{
                        name: 'Karol',
                        surname: 'Walewski',
                    }}
                    postDate={new Date()}
                    content={'How can I add members to my team...'}
                    comments={[{
                        author: {
                            name: 'Ewelina',
                            surname: 'Zalewska',
                            avatarUrl: 'https://i.pravatar.cc/75',
                        },
                        postDate: new Date(),
                        content: 'The attachment is missing!',
                    }]}
                />
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

export default OnlineCommunityRoomPage;