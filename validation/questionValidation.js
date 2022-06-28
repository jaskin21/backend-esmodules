import Joi from 'joi';

//register input validation
export const questionValidation = (data) => {
  const schema = Joi.object({
    question: Joi.string().required().max(500),
    respondent: Joi.string().required(),
    questioner: Joi.string().required(),
    answer: Joi.string().max(700),
  });
  console.log('user question validated');
  return schema.validate(data);
};
