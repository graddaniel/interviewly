import React, { useState } from 'react';
import classNames from 'classnames';
import { generatePath, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import VideoDialog from '../../../components/video-dialog/video-dialog';
import standardizeAndFormatDate from '../../../utils/standardize-and-format-date';
import TextButton from '../../../components/text-button/text-button';
import { APP_FORMS_ROUTES } from '../../../consts/routes';

import classes from './project-meeting-tile.module.css';
import BlankSurveyIconBlack from 'images/blank-survey-icon-black.svg';
import FilledSurveyIconBlack from 'images/filled-survey-icon-black.svg';
import PlayIconNarrow from 'images/play-icon-narrow.svg';
import xlsx from 'json-as-xlsx';
import SurveyService from '../../../services/survey-service';


type ProjectMeeting = {
    uuid: string;
    date: Date;
    respondent: {
        uuid: string;
        name: string;
        surname: string;
        email: string;
        recruitmentVideoUrl?: string;
        surveys?: {
            uuid: string;
            name: string;
            startDate: Date;
            endDate: Date;
            hasFinished: boolean;
            results: any;
        }[];
    };
    hasFinished: boolean;
    transcriptUrl?: string;
    recordingUrl?: string;
}

type ProjectMeetingTileProps = {
    meeting: ProjectMeeting,
};

const ProjectMeetingTile = ({
    meeting
}: ProjectMeetingTileProps) => {
    const navigate = useNavigate();
    const [ displayedVideoUrl, setDisplayedVideoUrl] = useState('');

    const {
        uuid,
        date,
        respondent,
        hasFinished,
        transcriptUrl,
        recordingUrl,
    } = meeting;
    const {
        uuid: respondentUuid,
        recruitmentVideoUrl,
        surveys,
        name,
        surname,
        email,
    } = respondent;


    const {
        date: formattedDate,
        time: formattedTime,
    } = standardizeAndFormatDate(date);

    const downloadSurveyResults = async (surveyId, respondentId) => {
        //Workaround!
        const surveyResponse = await SurveyService.getRespondentsSurveyResponse(surveyId, respondentId);

        const data = Object.keys(surveyResponse).map(language => {
            const {
                ...questions
            } = surveyResponse[language][0];

            return {
                sheet: language,
                columns: Object
                    .keys(questions)
                    .map(questionKey => ({ label: questionKey, value: questionKey })),
                content: surveyResponse[language],
            };
        });
        
        let settings = {
            fileName: "results", // Name of the resulting spreadsheet
            extraLength: 5, // A bigger number means that columns will be wider
            writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
            writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
            RTL: false, // Display the columns from right-to-left (the default value is false)
        }
        
        xlsx(data, settings)
    }

    return (
        <section className={classNames(
            classes.projectMeetingTile,
            hasFinished && classes.whiteBackground,
        )}>
            <section className={classes.header}>
                <span className={classes.respondentDetails}>
                    {(name && surname)
                        ? `${name} ${surname.slice(0, 1).toUpperCase()}.`
                        : email
                    }
                </span>
                <span className={classNames(
                    classes.dateLabel,
                    hasFinished && classes.greyText
                )}>
                    Interview date:
                </span>
                <span className={classNames(
                    classes.date,
                    hasFinished && classes.greyText
                )}>
                    <span>{formattedDate}</span>
                    <span>{formattedTime}</span>
                </span>
            </section>
            {hasFinished ? (
                <div className={classes.finishedContent}>
                    <div className={classes.videoDetails}>
                        {recordingUrl && (
                            <div
                                className={classes.cover}
                                onClick={() => setDisplayedVideoUrl(recordingUrl)}
                            >
                                <div className={classes.playButton}>
                                    <img
                                        className={classes.playIcon}
                                        src={PlayIconNarrow}
                                    />
                                </div>
                            </div>
                        )}
                        {transcriptUrl && (
                            <a
                                className={classes.scriptDownloadButton}
                                href={transcriptUrl}
                            >
                                Download transcript
                            </a>
                        )}
                        {recruitmentVideoUrl && (
                            <TextButton
                                className={classes.recruitmentVideoButton}
                                text={"Respondent recruitment video"}
                                onClick={() => console.log("navigate to video")}
                            />
                        )}
                    </div>
                    {surveys && surveys.length > 0 && (
                        <div className={classes.surveys}>
                            <span className={classes.surveyTitle}>
                                <img
                                    className={classes.surveyTitleicon}
                                    src={FilledSurveyIconBlack}
                                />
                                Results from the questionnaire survey
                            </span>
                            {surveys.map(survey => {
                                const {
                                    date: startDate,
                                    time: startTime
                                } = standardizeAndFormatDate(survey.startDate);
                                const {
                                    date: endDate,
                                    time: endTime,
                                } = standardizeAndFormatDate(survey.endDate);

                                return (
                                    <div className={classes.survey} key={survey.uuid}>
                                        <div className={classNames(
                                            classes.surveyIconWrapper,
                                            survey.hasFinished && classes.greenBackground, 
                                        )}>
                                            <img
                                                className={classes.surveyIcon}
                                                src={survey.hasFinished 
                                                    ? FilledSurveyIconBlack
                                                    : BlankSurveyIconBlack
                                                }
                                            />
                                        </div>
                                        <span className={classes.surveyName}>
                                            {survey.name}
                                        </span>
                                        <div className={classes.dates}>
                                            <span className={classes.startTime}>
                                                {startDate} {startTime}
                                            </span>
                                            <span className={classes.endTime}>
                                                {endDate} {endTime}
                                            </span>
                                        </div>
                                        <TextButton
                                            className={classes.surveyResultsButton}
                                            text={"Download results"}
                                            onClick={() => downloadSurveyResults(survey.uuid, respondentUuid)}
                                            disabled={!survey.hasFinished}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div className={classes.upcomingContent}>
                    <TextButton
                        className={classes.joinButton}
                        text="Join"
                        onClick={() => navigate(generatePath(
                            APP_FORMS_ROUTES.MEETING.PATH,
                            { meetingId: uuid }
                        ))}
                    />
                </div>
            )}
            <VideoDialog
                isOpen={!!displayedVideoUrl}
                onClose={() => setDisplayedVideoUrl('')}
                videoUrl={displayedVideoUrl}
            />
        </section>
    );
};

export default ProjectMeetingTile;