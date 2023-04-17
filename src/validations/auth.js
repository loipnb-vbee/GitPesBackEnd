const { Joi, validate } = require('express-validation');
const { BIRTH_DATE, TLDS_EMAIL } = require('./../constants/register');
const register = {
  body: Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().max(128).optional(),
    password: Joi.string().trim().required(),
    repeatPassword: Joi.ref('password'),
    birthDate: Joi.date().max(BIRTH_DATE), //mm-dd-yy
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: TLDS_EMAIL },
      })
      .required(),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().trim().required(),
  }),
};

module.exports = {
  registerValidate: validate(register, { keyByField: true }),
  loginValidate: validate(login, { keyByField: true }),
};
