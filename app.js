import express from 'express';
import path from 'path';

import __dirname from './dirname.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import 'dotenv/config';
import connectDb from './connect-db.js';

import authRouter from './routes/authRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

//db connecition code
connectDb(process.env.DB_CONNECTION, process.env.DB_Name);

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/questions', questionRoutes);

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
