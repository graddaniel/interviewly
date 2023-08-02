import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Avatar from '../../../components/avatar/avatar';
import Comment from './comment';

import classes from './topic.module.css';
import SendIconBlack from 'images/send-icon-black.svg';


type Postable = {
    author: {
        name: string;
        avatarUrl?: string;
    };
    postDate: Date;
    content: string;
};

type TopicProps = {
    attachment?: {
        url: string;
        type: 'video' | 'image';
    };
    comments?: Postable[];
} & Postable;

const Topic = ({
    author,
    postDate,
    content,
    attachment,
    comments = [],
}: TopicProps) => {
    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const localizedPostDate = moment(postDate)
        .locale(resolvedLanguage as string);

    const [ newComment, setNewComment ] = useState('');

    const generateAttachmentElement = (attachment) => {
        const {
            type,
            url,
        } = attachment;
    
        switch (type) {
            case 'video':
                return (
                    <video controls className={classes.attachment}>
                        <source src={url} />
                    </video>
                );
            case 'image':
                return (
                    <img className={classes.attachment}
                        src={url}
                    />
                );
            default:
        }
    }

    const generateCommentsCounter = (commentsCount: number) => {
        if (commentsCount === 0) {
            return 'No comments';
        } else if (commentsCount === 1) {
            return `${commentsCount} comment`;
        } else {
            return `${commentsCount} comments`;
        }
    }

    return (
        <section className={classes.topic}>
            <div className={classes.header}>
                <Avatar url={author.avatarUrl} className={classes.avatar}/>
                <span className={classNames(classes.text, classes.authorName)}>
                    {author.name}
                </span>
                <span className={classNames(classes.subscript, classes.postDate)}>
                    {localizedPostDate.format('D MMMM')} {localizedPostDate.format('LT')}
                </span>
            </div>
            <div className={classes.content}>
                <span className={classes.text}>{content}</span>
                {attachment && generateAttachmentElement(attachment)}
            </div>
            <div className={classes.comments}>
                <div className={classes.commentsControls}>
                    <span className={classes.text}>
                        {generateCommentsCounter(comments.length)}
                    </span>
                    <div className={classes.addCommentBox}>
                    <Avatar url={author.avatarUrl} className={classes.smallAvatar}/>
                    <input
                        className={classes.addCommentInput}
                        type="text"
                        name="newComment"
                        placeholder="Add comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <img src={SendIconBlack} className={classes.addCommentIcon}/>
                </div>
                </div>
                {comments.map(comment => (
                    <Comment
                        key={comment.postDate.getMilliseconds()}
                        {...comment}
                    />
                ))}
            </div>
        </section>
    );
};

export default Topic;