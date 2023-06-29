import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import TextButton from '../text-button/text-button';

import classes from './subscription-controls.module.css';
import InterviewlyUserIcon from '../../../images/interviewly-user-icon.png';


type SubscriptionControlsProps = {
    className?: string;
    subscriptionsCount: number;
};

const SubscriptionControls = ({
    className,
    subscriptionsCount
}: SubscriptionControlsProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const subscribeToYoutubeChannel = useCallback(() => navigate('http://youtube.com'), []);

    return (
        <div className={classNames(classes.subscribeControls, className)}>
            <div className={classes.subscriptionsCounter}>
                <img className={classes.userLogo} src={InterviewlyUserIcon}/>
                <p className={classes.text}>
                    <span>Interviewly</span>
                    {subscriptionsCount > 0 && (
                        <span>{t('home.tutorialsSection.subscriptionsText', { subscriptionsCount })}</span>
                    )}
                </p>
            </div>
            <TextButton
                className={classes.subscribeButton}
                monochromatic={true}
                text={t('home.tutorialsSection.subscribeButtonText')}
                onClick={subscribeToYoutubeChannel}
            />
        </div>
    );
};

export default SubscriptionControls;