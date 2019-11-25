import uuidv1 from 'uuid/v1';
import {Winston} from '../../helper';

const winstonInit = new Winston();
const winston = winstonInit.logger('Logger.Util');

export const resStart = (req, next) => {
  // console.log(req.get('User-Agent'));
  req.startTime = Date.now();
  req.uniqID = uuidv1();
  winston.info({
    message: req.body,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    transactionID: req.uniqID
  });
  next();
};

export const resEnd = (req) => {
  const time = Date.now() - req.startTime;
  return winston.end({resTime: time, transactionID: req.uniqID});
};
