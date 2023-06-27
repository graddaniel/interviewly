import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import { object, string, ValidationError } from 'yup';
import {
  UniqueConstraintError,
} from 'sequelize';

import JanusRestApiAdapter from './src/janus-rest-api-adapter';
import JanusError from './src/janus-error';

import type {
  Request,
  Response,
  NextFunction,
} from 'express';
import JanusAdminRestApiAdapter from './src/janus-admin-rest-api-adapter';
import InterviewService from './src/interview-service';
 

const PORT = process.env.PORT;

const paramsSchema = object({
  username: string().required().min(8).max(32),
  email: string().required().email().max(32),
  password: string().required().min(12).max(32),
});

async function setupExpress () {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const adminApiAdapter = new JanusAdminRestApiAdapter('janusoverlord');

  const token = 'token1234';

  let tokens = await adminApiAdapter.listTokens();
  if (!tokens.includes(token)) {
    await adminApiAdapter.addToken(token);

    tokens = await adminApiAdapter.listTokens();
    if (!tokens.includes(token)) {
      throw new Error('Failed to initialize the token.');
    }
  }

  const restApiAdapter = new JanusRestApiAdapter(token);

  const interviewService = new InterviewService({
    restApiAdapter,
    adminApiAdapter,
  });

  app.post('/createRoom', async (req: Request, res: Response) => {
    const { room }: { room: number } = req.body;

    // await paramsSchema.validate({
    //   username,
    //   email,
    //   password,
    // }, {
    //   strict: true
    // });

    await restApiAdapter.connect();

    const createdRoom = await restApiAdapter.createRoom({
      room,
    });

    res.status(StatusCodes.ACCEPTED).send({ room: createdRoom })
  });

  app.post('/initializeRecording', async (req: Request, res: Response) => {
    await restApiAdapter.connect();

    const interviewInfo = await interviewService.createInterview();

    res.status(StatusCodes.ACCEPTED).send(interviewInfo)
  });

  app.get('/admin/tokens', async (req: Request, res: Response) => {
    const tokens = await adminApiAdapter.listTokens();

    res.status(StatusCodes.OK).send(tokens);
  });
  app.post('/admin/tokens', async (req: Request, res: Response) => {
    const { token }: { token: string } = req.body;

    await adminApiAdapter.addToken(token);

    res.status(StatusCodes.CREATED).send();
  });

  app.use((
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err.message);

    switch(err.constructor) {
      case ValidationError:
        res.status(StatusCodes.BAD_REQUEST).send(err.message);
        break;

      case UniqueConstraintError:
        res.status(StatusCodes.BAD_REQUEST).send('Parameters are not unique');
        break;

      case JanusError:
        res.status((err as JanusError).code).send(err.message);
        break;

      default:
        console.log(err.constructor, err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Unknown error');
    }
  });

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

(async () => {
  setupExpress();
})();