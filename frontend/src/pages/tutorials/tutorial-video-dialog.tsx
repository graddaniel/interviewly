import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from '../../components/dialog/dialog';

import classes from './tutorial-video-dialog.module.css';


const TutorialVideoDialog = ({
    isOpen,
    onClose,
    videoUrl,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            {isLoading && (
                <div className={classes.video}>
                    {t('generic.loading').toUpperCase()}
                </div>
            )}
            <iframe
                className={isLoading ? classes.hidden: classes.video}
                src={videoUrl}
                onLoad={() => setIsLoading(false)}
            >
            </iframe>
        </Dialog>
    );
};

export default TutorialVideoDialog;