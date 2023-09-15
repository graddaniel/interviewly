import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from '../dialog/dialog';

import classes from './video-dialog.module.css';


const VideoDialog = ({
    onClose,
    videoUrl,
    useIframe = false,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    return (
        <Dialog
            isOpen={true}
            onClose={onClose}
        >
            {isLoading && useIframe && (
                <div className={classes.video}>
                    {t('generic.loading').toUpperCase()}
                </div>
            )}
            {useIframe ? (
                <iframe
                    className={isLoading ? classes.hidden: classes.video}
                    src={videoUrl}
                    onLoad={() => setIsLoading(false)}
                >
                </iframe>
            ) : (
                <video
                    className={classes.video}
                    controls
                    key={videoUrl}
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            )}

        </Dialog>
    );
};

export default VideoDialog;