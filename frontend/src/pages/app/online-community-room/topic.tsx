import React, { useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Avatar from '../../../components/avatar/avatar';
import Comment from './comment';

import classes from './topic.module.css';
import SendIconBlack from 'images/send-icon-black.svg';
import TextButton from '../../../components/text-button/text-button';
import Dialog from '../../../components/dialog/dialog';


type Postable = {
    author: {
        name: string;
        surname: string;
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
    const { t } = useTranslation();
    const [ isMobileCommentsDialogOpen, setIsMobileCommentsDialogOpen ] = useState(false);
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
            return t('viewProject.methodology.onlineCommunity.room.noCommentsCabel');
        } else if (commentsCount === 1) {
            return `${commentsCount} ${t('viewProject.methodology.onlineCommunity.room.commentSingularLabel')}`;
        } else {
            return `${commentsCount} ${t('viewProject.methodology.onlineCommunity.room.commentPluralLabel')}`;
        }
    }

    return (
        <section className={classes.topic}>
            <div className={classes.header}>
                <Avatar url={author.avatarUrl} className={classes.avatar}/>
                <span className={classNames(classes.text, classes.authorName)}>
                    {author.name} {author.surname}
                </span>
                <span className={classNames(classes.subscript, classes.postDate)}>
                    {localizedPostDate.format('D MMMM')} {localizedPostDate.format('LT')}
                </span>
            </div>
            <div className={classes.content}>
                <span className={classes.text}>{content}</span>
                {attachment && generateAttachmentElement(attachment)}
            </div>
            <div className={classes.nonMobileComments}>
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
                            placeholder={t('viewProject.methodology.onlineCommunity.room.addCommentLabel')}
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
            <div className={classes.mobileComments}>
                <span className={classes.text}>
                    {generateCommentsCounter(comments.length)}
                </span>
                <TextButton
                    className={classes.addCommentButton}
                    text={t('viewProject.methodology.onlineCommunity.room.addCommentLabel')}
                    onClick={() => setIsMobileCommentsDialogOpen(true)}
                />
                <Dialog
                    isOpen={isMobileCommentsDialogOpen}
                    onClose={() => setIsMobileCommentsDialogOpen(false)}
                >
                    <div className={classes.commentsWrapper}>
                        {comments.map(comment => (
                            <Comment
                                key={comment.postDate.getMilliseconds()}
                                {...comment}
                            />
                        ))}
                        <div className={classes.addCommentBox}>
                            <Avatar url={author.avatarUrl} className={classes.smallAvatar}/>
                            <input
                                className={classes.addCommentInput}
                                type="text"
                                name="newComment"
                                placeholder={t('viewProject.methodology.onlineCommunity.room.addCommentLabel')}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <img src={SendIconBlack} className={classes.addCommentIcon}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        </section>
    );
};

export default Topic;