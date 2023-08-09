import React from 'react';

import classes from './library-editor-language-button.module.css';
import languageCodeToFlagIcon from '../../../utils/language-code-to-flag-icon';
import classNames from 'classnames';


type LibraryEditorLanguageButtonProps = {
    language: string;
    code: string;
    selected: boolean;
    onClick: () => void;
};

const LibraryEditorLanguageButton = ({
    language,
    code,
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
            {language} <img className={classes.flagIcon} src={languageCodeToFlagIcon(code)}/>
        </button>
    );
};

export default LibraryEditorLanguageButton;