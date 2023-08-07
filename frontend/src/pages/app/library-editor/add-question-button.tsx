import React from 'react';

import classes from './add-question-button.module.css';
import PlusIconBlack from 'images/plus-icon-black.svg';


type AddQuestionButtonProps = {
    text: string;
    onClick: () => void;
};

const AddQuestionButton = ({
    text,
    onClick,
}: AddQuestionButtonProps) => {
    return (
        <button
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
            className={classes.addQuestionButton}
        >
            <img
                className={classes.icon}
                src={PlusIconBlack}
            />
            {text} 
        </button>
    );
};

export default AddQuestionButton;