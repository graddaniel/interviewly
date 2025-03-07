import express from 'express';
import 'express-async-errors';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { StatusCodes } from 'http-status-codes';
import { UniqueConstraintError } from 'sequelize';
import i18next from 'i18next';
import { AccountTypes, ProfileTypes, ValidationSchemas } from 'shared';
import { TokenExpiredError } from 'jsonwebtoken';

import AccountsController from './controllers/accounts-controller';
import AccountsService from './services/accounts-service/accounts-service';
import ProjectsController from './controllers/projects-controller';
import MailService from './services/mail-service/mail-service';
import SequelizeConnection from './services/sequelize-connection';
import { extractCredentials } from './middleware/extract-credentials';
import { requireJWT } from './middleware/require-jwt';
import ValidationError from './controllers/validators/validation-error';
import CompaniesController from './controllers/companies-controller';
import CompaniesService from './services/companies-service/companies-service';
import IncorrectPasswordError from './services/accounts-service/errors/incorrect-password-error';
import BussinessLogicError from './generic/business-logic-error';
import NotPermittedError from './generic/not-permitted-error';
import AuthorizationError from './generic/authorization-error';
import requireAccountType from './middleware/require-account-type';
import requireProfileRoles from './middleware/require-profile-roles';
import ContactRequestController from './controllers/contact-request-controller';

import ProjectsService from './services/projects-service/projects-service';
import LimeSurveyAdapter from './services/lime-survey-adapter';
import LSQBuilder from './services/lsq-builder';
import translations from './i18n';
import TemplatesService from './services/templates-service/templates-service';
import TemplatesController from './controllers/templates-controller';
import NotFoundError from './generic/not-found-error';
import SurveysController from './controllers/surveys-controller';
import SurveysService from './services/surveys-service/surveys-service';
import MeetingsService from './services/meetings-service/meetings-service';
import MeetingsController from './controllers/meetings-controller';
import JanusService from './services/janus-service/janus-service';
import JanusRestApiAdapter from './services/janus-service/janus-rest-api-adapter';
import JanusAdminRestApiAdapter from './services/janus-service/janus-admin-rest-api-adapter';
import MQAdapter from './services/mq-adapter';
import S3Adapter from './services/s3-adapter';
import JWTVerificationFailedError from './services/jwt-service/errors/jwt-verification-failed-error';
import GPTAdapter from './services/gpt-adapter';

import type { Application, Request, Response, NextFunction } from 'express';
import CronScheduler from './services/cron-scheduler';
import sendUpcomingProjectsEmailReminders from './tasks/send-upcoming-projects-email-reminders';
import BulletinBoardsService from './services/bulletin-boards-service/bulletin-boards-service';


export default class Appplication {
    private app: Application;

    constructor() {
        console.log("Running as: ", process.env.NODE_ENV)
        ValidationSchemas.instance();

        i18next.init({
            lng: 'en',
            debug: true,
            resources: translations,
        });

        const mailService = new MailService();
        const limeSurveyAdapter = new LimeSurveyAdapter();
        const lsqBuilder = new LSQBuilder();
        const janusRestApiAdapter = new JanusRestApiAdapter();
        const mqAdapter = new MQAdapter();
        const s3Adapter = new S3Adapter();
        const gptAdapter = new GPTAdapter(s3Adapter);
        
        mqAdapter.init().then(async () => {
            console.log("Creating channels")
            await mqAdapter.createChannelWithQueueListeners([{
                queueName: config.get('rabbitMq.readyRecordingsQueueName') as string,
                handler: meetingsService.addRecording,
            }, {
                queueName: config.get('rabbitMq.readyTranscriptionsQueue') as string,
                handler: meetingsService.addTranscription,
            }, {
                queueName: config.get('rabbitMq.readyInterviewRecordingsQueueName') as string,
                handler: accountsService.addInterviewRecording,
            }, {
                queueName: config.get('rabbitMq.readyInterviewTranscriptsQueueName') as string,
                handler: accountsService.addInterviewTranscript,
            }, {
                queueName: 'test',
                handler: async msg => console.log("test", msg),
            }]);

            await mqAdapter.createChannelWithQueueListeners([{
                queueName: config.get('rabbitMq.emailNotificationsQueueName') as string,
                handler: mailService.sendEmailNotifications,
                messagesLimit: 1,
            }], true);
        });

        const janusAdminRestApiAdapter = new JanusAdminRestApiAdapter();
        const janusService = new JanusService(
            janusRestApiAdapter,
            janusAdminRestApiAdapter,
        );
        const companiesService = new CompaniesService();
        const accountsService = new AccountsService(
            mailService,
            companiesService,
            s3Adapter,
            mqAdapter,
            gptAdapter,
        );
        const templatesService = new TemplatesService(companiesService);
        const surveysService = new SurveysService(accountsService, limeSurveyAdapter);
        const bulletinBoardsService = new BulletinBoardsService(accountsService);
        const projectsService = new ProjectsService(
            accountsService,
            companiesService,
            templatesService,
            surveysService,
            limeSurveyAdapter,
            lsqBuilder,
            s3Adapter,
            mailService,
            mqAdapter,
            bulletinBoardsService,
        );

        const meetingsService = new MeetingsService(
            accountsService,
            janusService,
            mqAdapter,
            s3Adapter,
        );

        const contactRequestController = new ContactRequestController(mailService);
        const companiesController = new CompaniesController(accountsService, companiesService);
        const accountsController = new AccountsController(accountsService);
        const projectsController = new ProjectsController(projectsService);
        const surveysController = new SurveysController(surveysService);
        const templatesController = new TemplatesController(templatesService);
        const meetingsController = new MeetingsController(meetingsService);

        SequelizeConnection.instance().sync({
            force: config.get('database.forceSync'),
            alter: config.get('database.alterSync'),
        });

        const cronScheduler = new CronScheduler([{
            taskName: 'upcomingProjectEmailReminder',
            task: () => sendUpcomingProjectsEmailReminders(
                mqAdapter,
            ),
        }]);

        const fileUploadConfig = config.get('fileUpload') as any;
        const uploadHandler = multer({
            dest: process.cwd() + fileUploadConfig.directory,
            limits: {
                fileSize: fileUploadConfig.sizeLimit,
            }
        });
        const projectUpdateFilesMiddleware = uploadHandler.fields([{
            name: 'avatarFile',
            maxCount: 1,
        }]);

        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(cors());

        const contactRequestRouter = express.Router();
        contactRequestRouter.post('/', contactRequestController.send);
        this.app.use('/contactRequest', contactRequestRouter);

        const accountsRouter = express.Router();
        accountsRouter.get('/', extractCredentials, accountsController.login);
        accountsRouter.post('/', extractCredentials, accountsController.register);
        accountsRouter.patch('/:accountId/confirm', accountsController.patchAccountConfirmed);
        accountsRouter.patch('/:accountId/password', accountsController.patchAccountPassword);
        accountsRouter.patch(
            '/password',
            requireJWT,
            accountsController.patchCurrentAccountPassword
        );

        accountsRouter.get(
            '/profile',
            requireJWT,
            accountsController.getAccountProfile,
        );
        accountsRouter.patch(
            '/profile',
            requireJWT,
            accountsController.updateAccountProfile,
        );
        accountsRouter.put(
            '/profile/cv',
            requireJWT,
            requireAccountType(AccountTypes.Type.RESPONDENT),
            accountsController.cvUploaded,
        );
        accountsRouter.get(
            '/profile/cv/uploadLink',
            requireJWT,
            requireAccountType(AccountTypes.Type.RESPONDENT),
            accountsController.getCVUploadUrl,
        );
        accountsRouter.put(
            '/profile/otherFiles',
            requireJWT,
            requireAccountType(AccountTypes.Type.RESPONDENT),
            accountsController.otherFilesUploaded,
        );
        accountsRouter.get(
            '/profile/otherFiles/uploadLink',
            requireJWT,
            requireAccountType(AccountTypes.Type.RESPONDENT),
            accountsController.getOtherFilesUploadUrl,
        );
        accountsRouter.post('/:accountId/password/reset', accountsController.requestPasswordReset);
        accountsRouter.patch('/:accountId/password/reset/confirm', accountsController.confirmPasswordReset);
        accountsRouter.get('/:accountId/introductionVideo', requireJWT, accountsController.getIntroductionVideo);
        accountsRouter.post('/:accountId/introductionVideo', /*require admin*/ accountsController.createIntroductionVideo);
        this.app.use('/accounts', accountsRouter);

        const companiesRouter = express.Router();
        companiesRouter.get(
            '/accounts',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            companiesController.getCompanysAccounts
        );
        companiesRouter.post(
            '/accounts',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.InterviewlyStaff,
            ]),
            companiesController.createCompanysAccount
        );
        companiesRouter.patch(
            '/accounts/:accountId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.InterviewlyStaff,
            ]),
            companiesController.editCompanysAccount
        );
        companiesRouter.get(
            '/current',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            companiesController.getCompany
        );
        companiesRouter.patch(
            '/current',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.InterviewlyStaff,
            ]),
            companiesController.editCompany
        );
        this.app.use('/companies', companiesRouter);

        const projectsRouter = express.Router();
        projectsRouter.get('/', requireJWT, projectsController.getAllProjects);
        projectsRouter.post(
            '/',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.InterviewlyStaff,
            ]),
            projectsController.createProject
        );
        projectsRouter.get(
            '/:projectId',
            requireJWT,
            projectsController.getOneProject
        );
        projectsRouter.patch(
            '/:projectId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.InterviewlyStaff,
            ]),
            projectUpdateFilesMiddleware,
            projectsController.updateProject
        );
        projectsRouter.patch(
            '/:projectId/status',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
            ]),
            projectsController.markProjectAsPaid
        );
        projectsRouter.post(
            '/:projectId/surveys',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Moderator,
            ]),
            projectsController.addSurveyToProject
        );
        projectsRouter.get(
            '/:projectId/respondents/:respondentId',
            requireJWT,
            projectsController.getProjectRespondent
        );
        projectsRouter.get(
            '/:projectId/meetings',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            projectsController.getProjectMeetings,
        );
        projectsRouter.put(
            '/:projectId/respondents/:respondentId/meetings',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            projectsController.putProjectRespondentMeeting,
        );
        projectsRouter.post(
            '/:projectId/bulletinBoards/:bulletinBoardId/rooms',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            projectsController.postBulletinBoardRoom,
        );
        projectsRouter.get(
            '/:projectId/bulletinBoardRooms/:roomId',
            requireJWT,
            projectsController.getBulletinBoardRoom,
        );
        projectsRouter.post(
            '/:projectId/bulletinBoardRooms/:roomId/threads',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            projectsController.postBulletinBoardRoomThread,
        );
        projectsRouter.post(
            '/:projectId/bulletinBoardThreads/:threadId',
            requireJWT,
            projectsController.postBulletinBoardResponse,
        );
        this.app.use('/projects', projectsRouter);

        const surveysRouter = express.Router();
        surveysRouter.get(
            '/:surveyId/responses',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            surveysController.getSurveyResponses,
        );
        surveysRouter.get(
            '/:surveyId/responses/:respondentId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            surveysController.getRespondentsSurveyResponses,
        );
        // webhook executed by lime survey
        surveysRouter.patch(
            '/:surveyId/complete',
            requireJWT,
            requireAccountType(AccountTypes.Type.RESPONDENT),
            surveysController.patchSurveyComplete,
        );
        this.app.use('/surveys', surveysRouter);

        const templatesRouter = express.Router();
        templatesRouter.get(
            '/',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            templatesController.getTemplates,
        );
        templatesRouter.post(
            '/',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            templatesController.postTemplate,
        );
        templatesRouter.get(
            '/:templateId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            templatesController.getTemplate,
        );
        templatesRouter.patch(
            '/:templateId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            templatesController.patchTemplate,
        );
        this.app.use('/templates', templatesRouter);

        const meetingsRouter = express.Router();
        meetingsRouter.get(
            '/',
            requireJWT,
            meetingsController.getMeetings,
        );
        meetingsRouter.get(
            '/:meetingId/room',
            requireJWT,
            meetingsController.getMeetingRoom,
        );
        meetingsRouter.delete(
            '/:meetingId/room',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRoles([
                ProfileTypes.Role.InterviewlyStaff,
                ProfileTypes.Role.Admin,
                ProfileTypes.Role.Moderator,
            ]),
            meetingsController.deleteMeetingRoom,
        );
        this.app.use('/meetings', meetingsRouter);

        this.app.use((
            err: Error,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (res.headersSent) {
                console.error("Headers are already sent!");
                next(err);
            }

            //TODO debugging purposes only
            console.error(err);

            let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            let response: any = {
                error: {
                    type: 'generic',
                    message: 'Unknown error',
                }
            };

            if (err instanceof BussinessLogicError
                || err instanceof IncorrectPasswordError
                || err instanceof NotPermittedError
                || err instanceof NotFoundError
                || err instanceof AuthorizationError) {
                    statusCode = (err as any).statusCode;
                    response.error.message = err.message;

            } else if (err instanceof UniqueConstraintError) {
                statusCode = StatusCodes.BAD_REQUEST;
                response.error.message = 'Parameters are not unique';

            } else if (err instanceof ValidationError) {
                statusCode = StatusCodes.BAD_REQUEST;
                response.error.message = err.message;
                response.error.type = 'validation';
                response.error.path = err.path;
                response.error.code = err.errorCode;

            } else if (err instanceof TokenExpiredError) {
                statusCode = StatusCodes.UNAUTHORIZED;
                response.error.message = 'JWT expired';
                response.error.type = 'tokenExpired';

            } else if (err instanceof JWTVerificationFailedError) {
                statusCode = StatusCodes.UNAUTHORIZED;
                response.error.message = 'Invalid JWT';
                response.error.type = 'invalidToken';

            } else {
                console.log("Unrecognized error", err.constructor, err);
            }

            res.status(statusCode).send(response)
          });
    }

    start = async (callback?: () => void | undefined) => {
        const API_PORT = config.get('api.port') as number;

        this.app.listen(
            API_PORT,
            callback || (() => console.log(`API is listening on port: ${API_PORT}`))
        );
    }
}