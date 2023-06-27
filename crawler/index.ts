import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import { object, string, ValidationError } from 'yup';
import {
  UniqueConstraintError,
} from 'sequelize';

import LimeSurveyAccountCreationJob, { JOB_STATUS } from './lime-survey-account-creation-job-model';
import { createLimeSurveyUser } from './create-lime-survey-user';

import type {
  Request,
  Response,
  NextFunction,
} from 'express';



const PORT = 8081;

const paramsSchema = object({
  username: string().required().min(8).max(32),
  email: string().required().email().max(32),
  password: string().required().min(12).max(32),
});

function setupExpress () {
  const app = express();
  app.use(bodyParser.json());

  app.post('/limeSurveyUser', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    await paramsSchema.validate({
      username,
      email,
      password,
    }, {
      strict: true
    });

    const job = await LimeSurveyAccountCreationJob.create({
      username,
      password,
      jobStatus: JOB_STATUS.STARTED,
    });

    res.status(StatusCodes.ACCEPTED).send({ jobId: job.id })

    await createLimeSurveyUser(username, email, password);

    await LimeSurveyAccountCreationJob.update({
      jobStatus: JOB_STATUS.FINISHED,
    }, {
      where: {
        username,
      },
    });
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