import Logger from './core/Logger';
import {config} from './config';
import app from './app';

app
  .listen(config.port, () => {
    Logger.info(`server running on port : ${config.port}`);
  })
  .on('error', e => Logger.error(e));
