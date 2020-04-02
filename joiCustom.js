const Joi = require('@hapi/joi')

const coerce = (value) => {
  if (!value) return null

  if (value[0] !== '{' && !/^\s*\{/.test(value)) {
    return null
  }

  try {
    return { value: JSON.parse(value) }
  } catch (err) {
    console.log('validation error***', err)
    return null 
  }
}

const custom = Joi.extend(joi => ({
  base: joi.object(),
  coerce,
  type: 'object',
}))

module.exports = custom
