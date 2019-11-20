import * as service from './auth.service';
import {res_send, const_msg} from '../../helper';

export const register = async (req, res, next) => {
  try {
    const response = await service.register(req.body);
    res_send(response, const_msg.CREATED_CODE, req, res, next);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const response = await service.login(req.body);
    res_send(response, const_msg.CREATED_CODE, req, res, next);
  } catch (error) {
    return next(error);
  }
};
