import User from '../model/UserModel.js';
import bcrypt from 'bcrypt';
import debugLib from 'debug';
import {
  registerValidation,
  loginValidation,
} from '../validation/userValidation.js';
import errorResponseFactory from '../utils/errorResponseFactory.js';
import responseFactory from '../utils/responseFactory.js';
import signToken from '../utils/signToken.js';

const debug = debugLib('sernver:user-controller');

// register a user
export const registerUser = async (req, res) => {
  // Validate the data before user
  const { error } = registerValidation(req.body);
  if (error) {
    return errorResponseFactory(res, 400, error.details[0].message, {
      details: error.details,
    });
  }
  // Chesking if email is unique
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) {
    return errorResponseFactory(res, 400, 'Email already exists');
  }

  // Chesking if email is unique
  const userName = await User.findOne({ username: req.body.username }).exec();
  if (userName) {
    return errorResponseFactory(res, 400, 'Username already exists');
  }

  // Create a new user
  const userDetails = new User(req.body);

  try {
    await userDetails.save();

    return responseFactory(res, 201, { message: 'Successfully registered' });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

//login a job seeker
export const loginUser = async (req, res) => {
  //VALIDATE THE DATA BEFORE USER
  const { error } = loginValidation(req.body);
  if (error) {
    return errorResponseFactory(res, 400, error.details[0].message, {
      details: error.details,
    });
  }
  //Checking if email exist
  const searchUser = await User.findOne({ email: req.body.email })
    .select(['email', 'password', 'username'])
    .exec();

  debug('User email', searchUser);

  if (!searchUser) {
    return errorResponseFactory(res, 400, 'Email or password is wrong');
  }

  //Check if password is correct
  const validPassword = bcrypt.compareSync(
    req.body.password,
    searchUser.password
  );

  if (!validPassword) {
    return errorResponseFactory(res, 400, 'Email or password is wrong');
  }

  try {
    // Create and assign a token
    const { _id, username, email } = searchUser;
    const token = signToken(_id, username, email);

    return responseFactory(res, 200, { token });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};
