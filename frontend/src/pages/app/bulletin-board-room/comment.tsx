import React from 'react';

import classes from './comment.module.css';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Avatar from '../../../components/avatar/avatar';


type CommentProps = {
    author: {
        name: string;
        surname: string;
        avatarUrl?: string;
    },
    postDate: string;
    message: string;
};

const Comment = ({
    author,
    postDate,
    message
}: CommentProps) => {
    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const localizedPostDate = moment(postDate)
        .locale(resolvedLanguage as string);

    return (
        <section className={classes.comment}>
            <div className={classes.commentBox}>
                <Avatar url={author.avatarUrl} className={classes.avatar}/>
                <span className={classes.authorName}>{author.name} {author.surname}</span>
                <span className={classes.content}>{message}</span>
            </div>
            <span className={classes.date}>
                {localizedPostDate.format('D MMMM')} {localizedPostDate.format('LT')}
            </span>
        </section>
    );
};

export default Comment;