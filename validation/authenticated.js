const Joi = require('joi');

const sign_up_schema = {
  body: {
    name: Joi.string(),
    mobile: Joi.number().integer(),
    password: Joi.string()
      .min(6)
      .max(20)
      .required(),
    email: Joi.string()
      .email({
        minDomainAtoms: 2
      })
      .required(),
    user_type: Joi.any().allow('user', 'supervisor')
  }
};

const login_schema = {
  body: {
    password: Joi.string()
      .required(),
    email: Joi.string()
      .email({
        minDomainAtoms: 2
      })
      .required()
  }
}
module.exports = {
  sign_up_schema,
  login_schema
};