import React from 'react';
import { useTranslation } from 'react-i18next';


import classes from './tutorials-section.module.css';
import InterviewlyUserIcon from '../../../../images/interviewly-user-icon.png';
import YoutubeIcon from '../../../../images/youtube-icon.svg';
import ButtonArrowLeft from '../../../../images/button-arrow-left-icon.svg';
import ButtonArrowRight from '../../../../images/button-arrow-right-icon.svg';
import SubscriptionControls from '../../../components/subscription-controls/subscription-controls';


const ARTICLES = [{
    title: 'Connector Spotlight: How Kurt',
    author: {
        name: 'Interviewly',
        logo: InterviewlyUserIcon,
    }
}, {
    title: 'A Message From Our Co-Founder',
    author: {
        name: 'Interviewly',
        logo: InterviewlyUserIcon,
    }
}, {
    title: 'Introducing the Professional Network',
    author: {
        name: 'Interviewly',
        logo: InterviewlyUserIcon,
    }
}, {
    title: 'New Direct Placement Option looooooooooooooooooooooooooooooong',
    author: {
        name: 'Interviewly',
        logo: InterviewlyUserIcon,
    }
}];

const TutorialsSection = () => {
    const { t } = useTranslation();

    const subscriptionsCount = 1;

    return (
        <section className={classes.section}>
            <nav className={classes.navigation}>
                <h4 className={classes.title}>{t('home.tutorialsSection.title')}</h4>
                <div className={classes.buttons}>
                    <button className={classes.navigationButton}>
                        <img src={ButtonArrowLeft} />
                    </button>
                    <button className={classes.navigationButton}>
                        <img src={ButtonArrowRight} />
                    </button>
                </div>
            </nav>
            <div className={classes.tiles}>
                {ARTICLES.map(article => (
                    <button
                        key={article.title}
                        className={classes.tile}
                        onClick={(e) => e.preventDefault()}
                    >
                        <div className={classes.videoCover}>
                            <img className={classes.youtubeIcon} src={YoutubeIcon} />
                        </div>
                        <h5 className={classes.tileTitle}>{article.title}</h5>
                        <div className={classes.userDetails}>
                            <img className={classes.userLogo} src={article.author.logo} />
                            <p className={classes.username}>{article.author.name}</p>
                        </div>
                    </button>
                ))}
            </div>
            <div className={classes.links}>
                <a className={classes.link}href="http://youtube.com">Go to the channel on YouTube</a>
                <SubscriptionControls subscriptionsCount={subscriptionsCount} />
            </div>
        </section>
    );
};

export default TutorialsSection;