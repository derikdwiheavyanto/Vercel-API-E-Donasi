import Joi from "joi";

export const loginValidation = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username wajib diisi",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password wajib diisi",
  }),
});

export const registerValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Nama wajib diisi",
  }),
  username: Joi.string().required().messages({
    "any.required": "Username wajib diisi",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password minimal 8 karakter, terdiri dari kombinasi huruf dan angka",
      "any.required": "Password wajib diisi",
    }),
});

const validation = { loginValidation, registerValidation };

export default validation;
