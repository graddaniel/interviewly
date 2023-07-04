import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import TextButton from '../../../components/text-button/text-button';

import classes from './subscriptions-section.module.css';
import ButtonCheckDashedIcon from '../../../../images/button-check-dashed-icon.svg';
import FeaturePuzzleIcon from '../../../../images/feature-puzzle-icon.svg';
import FeatureChatIcon from '../../../../images/feature-chat-icon.svg';
import FeatureAIIcon from '../../../../images/feature-ai-icon.svg';
import FeatureSquaresIcon from '../../../../images/feature-squares-icon.svg';
import FeaturePersonIcon from '../../../../images/feature-person-icon.svg';
import IconButton from '../../../components/icon-button/icon-button';
import ArrowLeftIconPurple from '../../../../images/arrow-left-icon-purple.svg';
import ArrowRightIconPurple from '../../../../images/arrow-right-icon-purple.svg';


const SUBSCRIPTION_PLANS = [{
    name: 'Starter',
    price: 'Free Trial',
    features: [{
        icon: FeaturePuzzleIcon,
        name: 'Basic functionalities',
    }, {
        icon: FeatureChatIcon,
        name: 'up to 5 interviews (per month)'
    }],
}, {
    name: 'Professional',
    price: '$99',
    period: 'Month',
    label: 'Popular',
    features: [{
        icon: FeaturePuzzleIcon,
        name: 'Enhanced features',
    }, {
        icon: FeatureAIIcon,
        name: 'AI tools',
    }, {
        icon: FeatureChatIcon,
        name: '20 interviews (per month)',
    }],
}, {
    name: 'Business',
    price: '$299',
    period: 'Month',
    features: [{
        icon: FeaturePuzzleIcon,
        name: 'Advanced tools',
    }, {
        icon: FeatureSquaresIcon,
        name: 'Integrations',
    }, {
        icon: FeatureChatIcon,
        name: '50 interviews (per month)',
    }],
}, {
    name: 'Enterprise',
    price: 'Custom',
    period: 'Month',
    features: [{
        icon: FeaturePuzzleIcon,
        name: 'Fully integrated solutions',
    }, {
        icon: FeaturePersonIcon,
        name: 'Dedicated account manager',
    }, {
        icon: FeatureChatIcon,
        name: 'Unlimited interviews (per month)',
    }],
}];

type SubscriptionTileProps = {
    className?: string;
    name: string;
    price: string;
    period?: string;
    label?: string;
    features: {
        icon: string;
        name: string;
    }[];
};

const SubscriptionTile = ({
    className,
    name,
    price,
    period,
    label,
    features,
}: SubscriptionTileProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(classes.tile, className)}>
            <header>
                <div className={classes.tileName}>{name}</div>
                <div className={classes.priceWrapper}>
                    <span className={classes.tilePrice}>
                        <span className={classes.tilePriceValue}>{price}</span>
                        {period && (
                            <span>/{period}</span>
                        )}
                    </span>
                    {label && (
                        <div className={classes.label}>
                            {label}
                        </div>
                    )}
                </div>
            </header>
            <hr className={classes.divider}/>
            <ul className={classes.features}>
                {features.map(({
                    icon,
                    name,
                }) => (
                    <li className={classes.feature} key={name}>
                        <img className={classes.icon} src={icon} />
                        <span>{name}</span>
                    </li>
                ))}
            </ul>
            <TextButton
                className={classes.subscribeButton}
                text={t('home.subscriptionSection.subscriptionButtonText')}
                onClick={() => console.log('TODO implement')}
            />
        </div>
    );
}

const SubscriptionsSection = () => {
    const { t } = useTranslation();
    const [ subscriptionIndex, setSubscriptionIndex ] = useState(0);
    const tabletSubscriptionsBoxRef = useRef(null);

    const showNextSubscription = useCallback(
        () => setSubscriptionIndex(
            index => index === SUBSCRIPTION_PLANS.length - 1
             ? 0
             : index + 1
        ),
    []);
    const showPreviousSubscription = useCallback(
        () => setSubscriptionIndex(
            index => index === 0
             ? SUBSCRIPTION_PLANS.length - 1
             : index - 1
        ),
    []);

    return (
        <section className={classes.section}>
            <header className={classes.header}>
                <div className={classes.leftSide}>
                    <h4 className={classes.subtitle}>
                        {t('home.subscriptionSection.subtitle')}
                    </h4>
                    <h2 className={classes.title}>
                        {t('home.subscriptionSection.title')}
                    </h2>
                </div>
                <div className={classes.rightSide}>
                    <img className={classes.dashedTick} src={ButtonCheckDashedIcon} />
                    <div className={classes.textWrapper}>
                        <p className={classes.text}>
                            {t('home.subscriptionSection.labelText1')}
                        </p>
                        <p className={classes.text}>
                            {t('home.subscriptionSection.labelText2')}
                        </p>
                    </div>
                    <div className={classes.mobileSubscriptionButtons}>
                        <IconButton
                            className={classes.mobileSubscriptionButton}
                            onClick={showPreviousSubscription}
                            icon={ArrowLeftIconPurple}
                        />
                        <IconButton
                            className={classes.mobileSubscriptionButton}
                            onClick={showNextSubscription}
                            icon={ArrowRightIconPurple}
                        />
                    </div>
                </div>
            </header>
            <div className={classes.subscriptions}>
                {SUBSCRIPTION_PLANS.map(({
                    name,
                    price,
                    period,
                    label,
                    features,
                }) => (
                    <SubscriptionTile
                        key={name}
                        name={name}
                        price={price}
                        period={period}
                        label={label}
                        features={features}
                    />
                ))}
            </div>
            <div className={classes.mobileSubscriptions}>
                <SubscriptionTile
                    name={SUBSCRIPTION_PLANS[subscriptionIndex].name}
                    price={SUBSCRIPTION_PLANS[subscriptionIndex].price}
                    period={SUBSCRIPTION_PLANS[subscriptionIndex].period}
                    label={SUBSCRIPTION_PLANS[subscriptionIndex].label}
                    features={SUBSCRIPTION_PLANS[subscriptionIndex].features}
                />
            </div>
        </section>
    );
};

export default SubscriptionsSection;