import {Winston} from '../../helper';
// const { resEnd } = require('./util');

export const res_send = (sendMsg, status, res) => {
  const winstonInit = new Winston();
  const winston = winstonInit.logger('response.ts');

  const message = sendMsg;
  message.result = 'success';

  winston.info({status, message, transactionID: res.uniqID});

  res.status(status);
  res.json(message);
  // resEnd(req);
  return res.end();
};
