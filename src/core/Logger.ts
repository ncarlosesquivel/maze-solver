import {createLogger, transports, format} from 'winston';
import {config} from '../config';

const logLevel = config.environment === 'development' ? 'debug' : 'warn';

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({stack: true}),
        format.prettyPrint()
      ),
    }),
  ],
  exceptionHandlers: [],
  exitOnError: false,
});
