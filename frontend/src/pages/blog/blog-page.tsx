import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import classNames from 'classnames';

import IconButton from '../../components/icon-button/icon-button';

import classes from './blog-page.module.css';
import ArrowRightIconPurple from '../../../images/arrow-right-icon-purple.svg';
import ArrowRightIcon from '../../../images/arrow-right-icon.svg';

const POSTS = [{
    title: 'Sprint 2023: Braintrust talent all hands recap',
    date: Date.now(),
    image: 'https://picsum.photos/1400/1200',
}, {
    title: 'Binance.US Announces BTRST Token Listing.',
    date: Date.now(),
}, {
    title: 'Growth Report #32: Turning the...',
    date: Date.now(),
    image: 'https://picsum.photos/1000/600',
}, {
    title: 'Braintrust Adds Grant Job Type, Partnerships to Become the...',
    date: Date.now(),
    image: 'https://picsum.photos/1001/600',
}, {
    title: 'How Web3 Makes Hiring (And Getting Hired) Better. ',
    date: Date.now(),
    image: 'https://picsum.photos/1002/600',
}, {
    title: 'Braintrust Adds Grant Job Type, Partnerships to Become the...',
    date: Date.now(),
    image: 'https://picsum.photos/1003/600',
}, {
    title: 'How Web3 Makes Hiring (And Getting Hired) Better. ',
    date: Date.now(),
    image: 'https://picsum.photos/1004/600',
}, {
    title: 'This is some random post, and there are no more available.',
    date: Date.now(),
    image: 'https://picsum.photos/1005/600',
}];

const BlogPage = () => {
    const { t, i18n } = useTranslation();

    const { resolvedLanguage } = i18n;

    const postsWithFormattedDate = POSTS.map(post => ({
        ...post,
        date: moment(post.date)
            .locale(resolvedLanguage as string)
            .format('L')
    }));
    const latestPost = postsWithFormattedDate[0];
    const otherNewPosts = postsWithFormattedDate.slice(1, 3);
    const remainingPosts = postsWithFormattedDate.slice(3, 7);

    return (
        <main className={classes.blog}>
            <header className={classes.header}>
                <h1 className={classes.title}>Explore our stories</h1>
                <span className={classes.subtitle}>Blog</span>
            </header>
            <article className={classes.content}>
                <section className={classes.newestPosts}>
                    <div className={classes.latestPost}>
                        <NewestBlogPost
                            title={latestPost.title}
                            date={latestPost.date}
                            image={latestPost.image}
                        />
                    </div>
                    <div className={classes.otherNewPosts}>
                        {otherNewPosts.map(post => (
                            <NewestBlogPost
                                key={post.title}
                                title={post.title}
                                date={post.date}
                                image={post.image}
                            />
                        ))}
                    </div>
                </section>
                <section className={classes.remainingPosts}>
                    {remainingPosts.map(post => (
                        <RegularBlogPost
                            key={post.title}
                            title={post.title}
                            date={post.date}
                            image={post.image}
                        />
                    ))}    
                </section>
            </article>
        </main>
    );
};

export default BlogPage;

const NewestBlogPost = ({
    title,
    date,
    image,
}) => {
    return (
        <article
            style={{
                background: image ? `url(${image})` : `var(--COLOR3)`,
            }}
            className={classes.newestBlogPost}
        >
            <div
                className={classNames(
                    image ? classes.whiteText : classes.blackText,
                    classes.newestPostHeader
                )}
            >
                <h4 className={classes.newestPostTitle}>{title}</h4>
                <span className={classes.date}>{date}</span>
            </div>
            <IconButton
                className={classNames(
                    classes.postButton,
                    image ? '' : classes.blackButton
                )}
                icon={image ? ArrowRightIconPurple : ArrowRightIcon}
                onClick={() => console.log('Open blog article')}
            />
        </article>
    );
};

const RegularBlogPost = ({
    title,
    date,
    image,
}) => {
    return (
        <article
            className={classes.regularBlogPost}
        >
            <img className={classes.regularPostImage} src={image} />
            <h4 className={classes.regularPostTitle}>{title}</h4>
            <div className={classes.navigation}>
                <span className={classes.date}>{date}</span>
                <IconButton
                    className={classNames(
                        classes.postButton,
                        image ? '' : classes.blackButton
                    )}
                    icon={image ? ArrowRightIconPurple : ArrowRightIcon}
                    onClick={() => console.log('Open blog article')}
                />
            </div>
        </article>
    );
}