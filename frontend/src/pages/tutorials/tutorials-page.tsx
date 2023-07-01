import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import SubscriptionControls from '../../components/subscription-controls/subscription-controls';
import TutorialTile from './tutorial-tile';
import TextButton from '../../components/text-button/text-button';
import { FORMS_ROUTES } from '../../consts/routes';

import classes from './tutorials-page.module.css';
import TutorialVideoDialog from './tutorial-video-dialog';


const TUTORIALS = [{
    title: '1 Growth Report #36: Building Up the Network in the Downturn.',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/K4TOrB7at0Y/0.jpg',
    videoUrl: 'https://www.youtube.com/embed/K4TOrB7at0Y',
}, {
    title: '2 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/a3ICNMQW7Ok/0.jpg',
    videoUrl: 'https://www.youtube.com/embed/a3ICNMQW7Ok',
}, {
    title: '3 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/LXb3EKWsInQ/0.jpg',
    videoUrl: 'https://www.youtube.com/embed/LXb3EKWsInQ',
}, {
    title: '4 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/BHcAXHfUpyA/0.jpg',
    videoUrl: 'https://www.youtube.com/embed/BHcAXHfUpyA',
}, {
    title: '5 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/c-YO1MRGl3M/0.jpg',
    videoUrl: 'https://www.youtube.com/embed/c-YO1MRGl3M',

}];

const TutorialsPage = () => {
    const [ openedVideo, setOpenedVideo ] = useState<string>('');
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const goToJoin = useCallback(() => navigate(FORMS_ROUTES.JOIN.PATH), []);

    const { resolvedLanguage } = i18n;

    const subscriptionsCount = 1;
    const tutorialsWithFormattedDate = TUTORIALS.map(tutorial => ({
        ...tutorial,
        date: moment(tutorial.date)
            .locale(resolvedLanguage as string)
            .format('L')
    }));
    const firstTutorial = tutorialsWithFormattedDate[0];
    const remainingTutorials = tutorialsWithFormattedDate.slice(1);

    return (
        <article className={classes.tutorials}>
            <section className={classes.header}>
                <h1 className={classes.title}>Tutorials</h1>
                <SubscriptionControls
                    className={classes.subscriptionControls}
                    subscriptionsCount={subscriptionsCount}
                />
                <h4 className={classes.subtitle}>Latest</h4>
                <a className={classes.headerLink}href="http://youtube.com">Go to the YouTube channel</a>
                <TextButton
                    className={classes.joinButton}
                    text={t('buttons.signUp')}
                    onClick={goToJoin}
                />
            </section>
            <section className={classes.content}>
                <div className={classes.latestTutorial}>
                    <TutorialTile
                        onClick={() => setOpenedVideo(firstTutorial.videoUrl)}
                        horizontalFlow={true}
                        viewsCount={123}
                        {...firstTutorial}
                    />
                </div>
                <div className={classes.remainingTutorials}>
                    {remainingTutorials.map(tutorial => (
                        <TutorialTile
                            key={tutorial.imageUrl}
                            onClick={() => setOpenedVideo(tutorial.videoUrl)}
                            viewsCount={123}
                            {...tutorial}
                        />
                    ))}
                </div>
            </section>
            <TutorialVideoDialog
                isOpen={!!openedVideo}
                onClose={() => setOpenedVideo('')}
                videoUrl={openedVideo}
            />
        </article>
    );
};

export default TutorialsPage;