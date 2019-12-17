import * as Joi from 'joi';

export const authSchemas = { 
  register: Joi.object().keys({ 
    title: Joi.string().required(),
    description: Joi.string().required() 
  }) 
  // define all the other schemas below 
}; 