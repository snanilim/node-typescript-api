import * as Joi from 'joi';

export const authSchemas = { 
  register: Joi.object().keys({ 
    email: Joi.string().email().required(),
    password: Joi.string().required() 
  }) 
  // define all the other schemas below 
}; 