import React from 'react';
import classNames from 'classnames';

import classes from './dashed-round-label.module.css';


type DashedRoundLabelProps = {
    className?: string;
    text: string;
    round?: boolean;
};

const DashedRoundLabel = ({
    className,
    text,
    round,
}: DashedRoundLabelProps) => {
    return (
        <div className={classNames(
            classes.label,
            round ? classes.round : '',
            className,
        )}>
            {text}
        </div>
    );
};

export default DashedRoundLabel;