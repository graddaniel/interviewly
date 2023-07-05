import express from 'express';
import 'express-async-errors';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { UniqueConstraintError } from 'sequelize';

import AccountsController from './controllers/accounts-controller';
import AccountsService from './services/accounts-service/accounts-service';
import MailService from './services/mail-service/mail-service';
import SequelizeConnection from './services/sequelize-connection';
import { extractCredentials } from './middleware/extract-credentials';
import { requireJWT } from './middleware/require-jwt';
import ValidationError from './controllers/validators/validation-error';

import type { Application, Request, Response, NextFunction } from 'express';
import IncorrectPasswordError from './services/accounts-service/errors/incorrect-password-error';
import AccountNotFoundError from './services/accounts-service/errors/account-not-found-error';
import BussinessLogicError from './generic/business-logic-error';


export default class Appplication {
    private app: Application;

    constructor() {
        console.log("Running as: ", process.env.NODE_ENV)

        const mailService = new MailService();

        const accountsService = new AccountsService(mailService);
        const accountsController = new AccountsController(accountsService);

        SequelizeConnection.instance().sync({
            force: config.get('database.forceSync'),
        });

        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(cors());

        const accountsRouter = express.Router();
        accountsRouter.get('/', extractCredentials, accountsController.login);
        accountsRouter.post('/', extractCredentials, accountsController.register);
        accountsRouter.patch('/:accountId/confirm', accountsController.confirmAccountRegistration);
        accountsRouter.post('/:accountId/password/reset', accountsController.requestPasswordReset);
        accountsRouter.patch('/:accountId/password/reset/confirm', accountsController.confirmPasswordReset);
        accountsRouter.get('/:accountId/introductionVideo', requireJWT, accountsController.getIntroductionVideo);
        accountsRouter.post('/:accountId/introductionVideo', /*require admin*/ accountsController.createIntroductionVideo);
        this.app.use('/accounts', accountsRouter);

        this.app.post('/mailTest', (req: express.Request, res: express.Response) => {
            const { email, message, subject } = req.body;
            const result = mailService.send(email, subject, message);
            res.status(200).send(result);
        });

        this.app.use((
            err: Error,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (res.headersSent) {
                console.log("SENT");
                next(err);
            }

            console.error(err);

            let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            let responseMessage = 'Unknown error';
        
            switch(err.constructor) {
                case ValidationError:
                    statusCode = StatusCodes.BAD_REQUEST;
                    responseMessage = err.message;
                    break;
        
                case UniqueConstraintError:
                    statusCode = StatusCodes.BAD_REQUEST;
                    responseMessage = 'Parameters are not unique';
                    break;
                
                case IncorrectPasswordError:
                case AccountNotFoundError:
                    //TODO make sure this works
                case BussinessLogicError:
                    statusCode = (err as any).statusCode;
                    responseMessage = err.message;
                    break;
        
                default:
                    console.log(err.constructor, err)
            }

            res.status(statusCode).send(responseMessage)
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