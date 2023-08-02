import React, { useState } from 'react';

import IconButton from '../../../components/icon-button/icon-button';
import AddTopicBox from './add-topic-box';
import DropdownList from '../../../components/dropdown-list/dropdown-list';

import classes from './online-community-room-page.module.css';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import { useNavigate } from 'react-router-dom';
import Topic from './topic';

const SORTING = [
    'Newest',
    'Oldest',
];

type OnlineCommunityRoomPageProps = {

};

const OnlineCommunityRoomPage = ({

}: OnlineCommunityRoomPageProps) => {
    const [ sorting, setSorting ] = useState(SORTING[0]);
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
                Room name
            </h4>
            <DropdownList
                className={classes.sortDropdown}
                name="sort"
                elementsList={SORTING}
                onChange={(i) => setSorting(SORTING[i])}
                defaultIndex={SORTING.indexOf(sorting)}
            />
            <div className={classes.content}>
                <AddTopicBox />
                <Topic
                    author={{
                        name: 'Ewelina Zalewska',
                        avatarUrl: 'https://i.pravatar.cc/75'
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
                        name: 'Karol Walewski',
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
                        name: 'Karol Walewski',
                    }}
                    postDate={new Date()}
                    content={'How can I add members to my team...'}
                    comments={[{
                        author: {
                            name: 'Ewelina Zalewska',
                            avatarUrl: 'https://i.pravatar.cc/75',
                        },
                        postDate: new Date(),
                        content: 'The attachment is missing!',
                    }]}
                />
            </div>
        </section>
    );
};

export default OnlineCommunityRoomPage;