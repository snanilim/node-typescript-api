// const logger = require('../settings/winston')(__filename);
// const { resEnd } = require('./util');

export const res_send = (sendMsg, status, res) => {
  const message = sendMsg;
  message.result = 'success';

  // logger.success({ status, message, transactionID: req.uniqID });

  res.status(status);
  res.json(message);
  // resEnd(req);
  return res.end();
};
