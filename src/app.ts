import express, {Request, Response, NextFunction} from 'express';
import Logger from './core/Logger';
import cors from 'cors';
import {config} from './config';
import {
  NotFoundError,
  ApiError,
  InternalError,
  ErrorType,
} from './core/ApiError';
import routes from './routes';

process.on('uncaughtException', e => {
  Logger.error(e);
});

const app = express();

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '2mb', extended: true, parameterLimit: 20}));

const whitelist = ['http://localhost', '186.99.121.82'];
const corsOptions = {
  origin: function (origin: string, callback: Function) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use('/api', routes);

app.use((req, res, next) => next(new NotFoundError()));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);

    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    Logger.error(err);

    if (config.environment === 'development') {
      return res.status(500).send(err);
    }

    ApiError.handle(new InternalError(), res);
  }
});

export default app;
