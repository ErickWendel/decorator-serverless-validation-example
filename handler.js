const Joi = require('./joiCustom')

const decoratorValidator = (fn, schema) => async function decorator(event) {
  const { error, value } = await schema.validate(event, { abortEarly: false })
  Object.keys(value).map(key => event[key] = value[key])

  if (!error) return fn.apply(this, arguments)

  return {
    body: error.message,
    statusCode: 402,
  }
}


const schema = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required()
  }).unknown().required(),

  body: Joi.object({
    name: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    age: Joi.number().min(18).required() 
  }).required()

}).unknown()

const create = async (event) => {
  const { body, headers }= event

  return {
    body: `Validation has succeeded: ${JSON.stringify({ body, headers })}`,
    statusCode: 200
  }
} 

module.exports = {
  create: decoratorValidator(create, schema)
}