import React from 'react';
import classNames from 'classnames';

import classes from './tile.module.css';


type TileProps = {
    className?: string;
    title: string;
    icon: string;
    subtitle?: string;
    onClick: () => void;
};

const Tile = ({
    className,
    title,
    icon,
    subtitle,
    onClick,
}: TileProps) => {
    return (
        <button
            className={classNames(classes.tile, className)}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.iconWrapper}>
                <img className={classes.iconImage} src={icon} />
            </div>
            {subtitle && (
                <p className={classes.subtitle}>{subtitle}</p>
            )}
        </button>
    );
};

export default Tile;