import Joi from '@hapi/joi';

export const createUserRequestSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
}).required();

export const createUserResponseSchema = Joi.object({
  id: Joi.string()
    .uuid()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  role: Joi.string()
    .valid('USER', 'ADMIN')
    .required(),
  lastAction: Joi.string().isoDate()
}).required();
