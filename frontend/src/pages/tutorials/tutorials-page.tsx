import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import SubscriptionControls from '../../components/subscription-controls/subscription-controls';
import TutorialTile from './tutorial-tile';

import classes from './tutorials-page.module.css';


const TUTORIALS = [{
    title: '1 Growth Report #36: Building Up the Network in the Downturn.',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/K4TOrB7at0Y/0.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=K4TOrB7at0Y',
}, {
    title: '2 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/a3ICNMQW7Ok/0.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=a3ICNMQW7Ok',
}, {
    title: '3 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/LXb3EKWsInQ/0.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
}, {
    title: '4 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/BHcAXHfUpyA/0.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=BHcAXHfUpyA',
}, {
    title: '5 Growth Report #33: Did Someone Leak Our Internal Data?',
    date: Date.now(),
    imageUrl: 'https://img.youtube.com/vi/c-YO1MRGl3M/0.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=c-YO1MRGl3M'

}];

const TutorialsPage = () => {
    const { t, i18n } = useTranslation();

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
            </section>
            <section className={classes.content}>
                <div className={classes.latestTutorial}>
                    <TutorialTile
                        onClick={() => console.log("TODO missing implementation")}
                        horizontalFlow={true}
                        viewsCount={123}
                        {...firstTutorial}
                    />
                </div>
                <div className={classes.remainingTutorials}>
                    {remainingTutorials.map(tutorial => (
                        <TutorialTile
                            key={tutorial.imageUrl}
                            onClick={() => console.log("TODO missing implementation")}
                            {...tutorial}
                        />
                    ))}
                </div>
            </section>
        </article>
    );
};

export default TutorialsPage;