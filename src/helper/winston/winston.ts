/* tslint:disable:no-var-requires */
import {transports, createLogger} from 'winston';
import 'winston-daily-rotate-file';
import * as config from 'config';
import {commonInfo, options, formatInfo} from './winston-config';

export class Winston {
  private readonly logDir: string;

  constructor() {
    this.logDir = config.get('logDir');
    // this.logDir = 'logs';
  }

  private errorTransport() {
    const common = commonInfo();
    common.filename = `${this.logDir}/%DATE%-error.log`;
    common.level = 'error';
    return new (transports as any).DailyRotateFile(common);
  }

  private combineTransport() {
    return new (transports as any).DailyRotateFile(commonInfo());
  }

  logger(fileName) {
    return createLogger({
      levels: options(),
      level: 'custom',
      format: formatInfo(fileName),
      transports: [this.errorTransport(), this.combineTransport()],
      exitOnError: false // do not exit on handled exceptions
    });
  }
}
