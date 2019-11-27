import Response from 'express';
import * as service from './auth.service';
import {res_send, const_msg} from '../../helper';

export const get = async (_req, res: Response) => {
  // console.log('user call', req.body);
  res_send({msg: 'response'}, const_msg.CREATED_CODE, res);
};

export const register = async (req, res, next) => {
  try {
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
