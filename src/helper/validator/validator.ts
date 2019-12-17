import * as Joi from 'joi';
import {APIError} from '../../core';
import {const_msg} from '../index';

export const schemaValidator = (schema, property) => { 
  return (req, _res, next) => { 
    const { error } = Joi.validate(req[property], schema); 
    const valid = error == null; 
    if (valid) { next(); } 
    else {
      const { details, stack } = error; 
      const message = details.map(i => i.message).join(',') 
      throw new APIError({
        message: const_msg.VALIDATION_ERROR,
        error: message,
        status: const_msg.VALIDATION_ERROR_CODE,
        isPublic: true,
        isOperational: true,
        stack: stack
      })
      // res.status(422).json({ error: message })
    } 
  } 
}
