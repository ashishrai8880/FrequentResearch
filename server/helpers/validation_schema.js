const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  first_name: Joi.string().regex(/^[a-zA-Z]+$/).messages({
    'string.pattern.base': 'first_name should only contain alphabets.',
  }).required(),
  last_name: Joi.string().regex(/^[a-zA-Z]+$/).messages({
    'string.pattern.base': 'last_name should only contain alphabets.',
  }),
  email: Joi.string().email().messages({
    'string.pattern.base': 'This is not valid email.',
  }).lowercase().required(),
  country: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  gender: Joi.string(),
  date_of_birth: Joi.string(),
  age: Joi.string(),
  password: Joi.string().min(2).required(),
})

module.exports = {
  authSchema,
}
