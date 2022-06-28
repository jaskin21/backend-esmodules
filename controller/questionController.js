import Question from '../model/QuestionModel.js';
import errorResponseFactory from '../utils/errorResponseFactory.js';
import responseFactory, { responseStatus } from '../utils/responseFactory.js';
import { questionValidation } from '../validation/questionValidation.js';

// list of question get by spicific user
export const listOfQuestions = async (req, res) => {
  try {
    const items = await Question.find().sort({
      date: -1,
    });

    return responseFactory(res, 200, { items });
  } catch (err) {
    return errorResponseFactory(
      res,
      responseStatus.BAD_REQUEST,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

// create question
export const createQuestion = async (req, res) => {
  //VALIDATE THE DATA BEFORE USER
  const { error } = questionValidation(req.body);
  if (error) {
    return errorResponseFactory(
      res,
      responseStatus.BAD_REQUEST,
      error.details[0].message,
      {
        details: error.details,
      }
    );
  }

  const question = new Question({
    question: req.body.question,
    respondent: req.body.respondent,
    questioner: req.body.questioner,
  });
  try {
    const saveQuestion = await question.save();

    return responseFactory(res, 200, { question: saveQuestion });
  } catch (error) {
    return errorResponseFactory(
      res,
      400,
      error?.message ?? 'Something went wrong, please try again'
    );
  }
};
