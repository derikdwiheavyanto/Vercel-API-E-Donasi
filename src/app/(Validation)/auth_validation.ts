import Joi from "joi";

export const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const registerValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const validation = { loginValidation, registerValidation };

export default validation;
