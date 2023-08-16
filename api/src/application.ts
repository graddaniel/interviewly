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
import type { Application, Request, Response, NextFunction } from 'express';

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
import AccountNotFoundError from './services/accounts-service/errors/account-not-found-error';
import BussinessLogicError from './generic/business-logic-error';
import NotPermittedError from './generic/not-permitted-error';
import AuthorizationError from './generic/authorization-error';
import requireAccountType from './middleware/require-account-type';
import requireProfileRole from './middleware/require-profile-role';
import ContactRequestController from './controllers/contact-request-controller';

import CompanyNotFound from './services/companies-service/errors/company-not-found-error';
import ProjectNotFoundError from './services/projects-service/errors/project-not-found-error';
import ProfileNotFoundError from './services/accounts-service/errors/profile-not-found-error';
import ProjectsService from './services/projects-service/projects-service';
import LimeSurveyAdapter from './services/lime-survey-adapter';
import LSQBuilder from './services/lsq-builder';
import translations from './i18n';
import TemplatesService from './services/templates-service/templates-service';
import TemplatesController from './controllers/templates-controller';
import { TokenExpiredError } from 'jsonwebtoken';


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
        const companiesService = new CompaniesService();
        const accountsService = new AccountsService(mailService, companiesService);
        const projectsService = new ProjectsService(
            accountsService,
            companiesService,
            limeSurveyAdapter,
            lsqBuilder,
        );
        const templatesService = new TemplatesService(companiesService);

        const contactRequestController = new ContactRequestController(mailService);

        const companiesController = new CompaniesController(accountsService, companiesService);
        const accountsController = new AccountsController(accountsService);

        const projectsController = new ProjectsController(projectsService);

        const templatesController = new TemplatesController(templatesService);

        SequelizeConnection.instance().sync({
            force: config.get('database.forceSync'),
            alter: true,
        });

        const uploadHandler = multer({
            dest: './uploads',
            limits: {
                fileSize: 1048576,
            }
        });
        const projectUpdateFilesMiddleware = uploadHandler.fields([{
            name: 'avatarFile',
            maxCount: 1,
        }, {
            name: 'respondentsFile',
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
        accountsRouter.patch('/:accountId/confirm', accountsController.confirmAccountRegistration);
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
            requireProfileRole(ProfileTypes.Role.Admin),
            companiesController.createCompanysAccount
        );
        companiesRouter.patch(
            '/accounts/:accountId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
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
            requireProfileRole(ProfileTypes.Role.Admin),
            companiesController.editCompany
        );
        this.app.use('/companies', companiesRouter);

        const projectsRouter = express.Router();
        projectsRouter.get('/', requireJWT, requireAccountType(AccountTypes.Type.RECRUITER), projectsController.getAllProjects);
        projectsRouter.post(
            '/',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
            projectsController.createProject
        );
        projectsRouter.get('/:projectId', requireJWT, requireAccountType(AccountTypes.Type.RECRUITER), projectsController.getOneProject);
        projectsRouter.patch(
            '/:projectId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
            projectUpdateFilesMiddleware,
            projectsController.updateProject
        );
        projectsRouter.post(
            '/:projectId/survey',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
            projectsController.addSurveyToProject
        );
        this.app.use('/projects', projectsRouter);

        const templatesRouter = express.Router();

        templatesRouter.get(
            '/',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
            templatesController.getTemplates,
        );
        templatesRouter.post(
            '/',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
            templatesController.postTemplate,
        );
        templatesRouter.get(
            '/:templateId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
            templatesController.getTemplate,
        );
        templatesRouter.patch(
            '/:templateId',
            requireJWT,
            requireAccountType(AccountTypes.Type.RECRUITER),
            requireProfileRole(ProfileTypes.Role.Admin),
            templatesController.patchTemplate,
        );

        this.app.use('/templates', templatesRouter);

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
                || err instanceof AccountNotFoundError
                || err instanceof CompanyNotFound
                || err instanceof ProfileNotFoundError
                || err instanceof ProjectNotFoundError
                || err instanceof NotPermittedError
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
            } else {
                console.log(err.constructor, err);
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