import express from 'express';
import {
  createQuestion,
  listOfQuestions,
} from '../controller/questionController.js';

const router = express.Router();

router.get('/', listOfQuestions);
router.post('/create', createQuestion);

export default router;
