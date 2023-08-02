import React from 'react';
import classNames from 'classnames';

import classes from './avatar.module.css';
import AccountIcon from 'images/account-icon.svg';

type AvatarProps = {
    className?: string;
    placeholderIconClassName?: string;
    url?: string;
};

const Avatar = ({
    className,
    placeholderIconClassName,
    url,
}: AvatarProps) => {
    return (
        <div className={classNames(classes.avatar, className)}>
            {url ? (
                <img className={classes.avatarImage} src={url} />
            ) : (
                <div className={classes.avatarPlaceholder}>
                    <img
                        className={classNames(classes.placeholderIcon, placeholderIconClassName)}
                        src={AccountIcon}
                    />
                </div>
            )}
        </div>
    );
};

export default Avatar;