import Response from 'express';
import * as service from './auth.service';
import {res_send, const_msg} from '../../helper';
// import {APIError} from '../../core';
import * as Joi from 'joi';

export const get = async (_req, res: Response, _next) => {
  // console.log('user call', req.body);
  // throw new APIError({
  //   message: const_msg.EMAIL_EXIST,
  //   error: {
  //     field: 'email',
  //     location: 'body',
  //     message: [const_msg.EMAIL_EXIST]
  //   },
  //   status: const_msg.CONFLICT_CODE,
  //   isPublic: true
  // });
  // next({'error':'error'});
  // return next('error')
  res_send({msg: 'response'}, const_msg.CREATED_CODE, res);
};

export const register = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({ 
      name: Joi.string().alphanum().min(3).max(30).required(),
      birthyear: Joi.number().integer().min(1970).max(2013), 
    }); 
    const result = Joi.validate(req.body, schema);
    console.log('result', result)
    const response = await service.register(req.body);
    res_send(response, const_msg.CREATED_CODE, res);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const response = await service.login(req.body);
    res_send(response, const_msg.CREATED_CODE, res);
  } catch (error) {
    return next(error);
  }
};
