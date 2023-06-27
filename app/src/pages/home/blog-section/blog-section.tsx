import React from 'react';
import { useHref } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import IconButton from '../../../components/icon-button/icon-button';
import ROUTES from '../../../consts/routes';

import classes from './blog-section.module.css';
import ButtonArrowRightIcon from '../../../../images/button-arrow-right-icon.svg';

const ARTICLES = [{
    title: 'How Web3 makes hiring (and getting more revenue) much easier',
    date: Date.now(),
}, {
    title: 'Web3 transparency and the most profitable unicorns',
    date: Date.now(),
}, {
    title: 'Growth Report #32: Turning the tide around',
    date: Date.now(),
}];

const BlogSection = () => {
    const blogLink = useHref(ROUTES.BLOG.PATH);
    const { t, i18n } = useTranslation();

    const { resolvedLanguage } = i18n;

    return (
        <section>
            <h4 className={classes.title}>{t('home.blogSection.title')}</h4>
            <div className={classes.tiles}>
                {ARTICLES.map(article => (
                    <div key={article.title} className={classes.tile}>
                        <div className={classes.leftColumn}>
                            <h5 className={classes.tileTitle}>{article.title}</h5>
                            <p className={classes.tileDate}>
                                {moment(article.date)
                                    .locale(resolvedLanguage as string)
                                    .format('L')
                                }
                                </p>
                        </div>
                        <IconButton
                            icon={ButtonArrowRightIcon}
                            onClick={() => console.log('TODO Implement blog article navigation!')}
                        />
                    </div>
                ))}
            </div>
            <a className={classes.blogLink} href={blogLink}>{t('home.blogSection.blogLinkText')}</a>
        </section>
    );
};

export default BlogSection;