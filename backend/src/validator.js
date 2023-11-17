const Joi = require('joi');

async function loginSchema(req, res, next) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  let validation = loginSchema.validate(req.body);
  console.log("Validation >>>>", validation);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
  } else {
    next();
  }
}

async function signupSchema(req, res, next) {
  const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  let validation = signupSchema.validate(req.body);
  console.log("Validation >>>>", validation);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
  } else {
    next();
  }
}

module.exports = {
  signupSchema,
  loginSchema,
};
