const Joi = require('joi');

const tweat_schema = {
  body: {
     text: Joi.string().max(150, 'utf8').required(),
  }
}
module.exports = {
  tweat_schema
};