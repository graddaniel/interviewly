import React from 'react';

import classes from './library-editor-language-button.module.css';
import languageToFlagIcon from '../../../utils/language-to-flag-icon';
import classNames from 'classnames';


type LibraryEditorLanguageButtonProps = {
    language: string;
    selected: boolean;
    onClick: () => void;
};

const LibraryEditorLanguageButton = ({
    language,
    selected,
    onClick,
}: LibraryEditorLanguageButtonProps) => {
    return (
        <button
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
            className={classNames(
                classes.languageButton,
                selected && classes.purpleBorder
            )}
        >
            {language} <img className={classes.flagIcon} src={languageToFlagIcon(language)}/>
        </button>
    );
};

export default LibraryEditorLanguageButton;