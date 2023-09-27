import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './blog-article.module.css';
import Decorator from '../../../images/decorator.svg';


const BlogArticle = () => {
    const { t } = useTranslation();

    const blogArticle = t('blogArticle', { returnObjects: true }) as any;

    return (
        <article className={classes.privacyPolicy}>
            <h4 className={classes.header}>
                {blogArticle.title}
            </h4>
            <nav className={classes.navigation}>
                {t('generic.created')}: 26.09.2023
            </nav>
            <section className={classes.content}>
                <div className={classes.decoratorSection}>
                    <img src={Decorator} />
                    <img src={Decorator} />
                </div>
                {blogArticle.paragraphs.map((paragraph, i) => {
                    if (i === 1 || i == 3) {
                        return (
                            <h4 className={classes.header} key={i}>
                                {paragraph}
                            </h4>
                        );
                    } else if (typeof paragraph === 'string') {
                        return (
                            <p key={i}>
                                {paragraph}
                            </p>
                        );
                    } else if (typeof paragraph === 'object') {
                        return (<React.Fragment key={i}>
                            <span>{paragraph.listHeader}</span>
                            <ul>
                                {paragraph.list.map((li, j) => (
                                    <li key={j}>
                                        {li}
                                    </li>
                                ))}
                            </ul>
                        </React.Fragment>);
                    } else {
                        return null;
                    }
                })}
            </section>
        </article>
    );
};

export default BlogArticle;