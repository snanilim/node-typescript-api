import * as config from 'config';
import {Winston, Logger} from '../../helper';
import {resEnd} from '../logger/logger.util';
import {APIError} from '../../core';
import {const_msg} from '../utils/const-msg.util';

const handeler = async (err, req, res, _next) => {
  const logger = new Logger('Error');
  const winstonInit = new Winston();
  const winston = winstonInit.logger('response.ts');

  const errorMessage = {
    message: err.message,
    error: err.error,
    isOperational: err.isOperational !== undefined? err.isOperational : false,
    stack: err.stack
  };

  if (config.util.getEnv('NODE_ENV') !== 'development') {
    delete errorMessage.stack;
  }

  logger.error({
    status: err.status || 500,
    message: errorMessage,
    transactionID: req.uniqID
  });

  winston.error({
    status: err.status || 500,
    message: errorMessage,
    transactionID: req.uniqID
  });




  // winston.exitOnError = true

  res.status(err.status || 500);
  res.json(errorMessage);
  resEnd(req);
  return res.end();
};

export const errorHandler = handeler;

export const notFound = (req, res, next) => {
  const err = new APIError({
    message: const_msg.NOT_FOUND,
    status: const_msg.NOT_FOUND_CODE,
    // isOperational: true
  });
  return handeler(err, req, res, next);
};
