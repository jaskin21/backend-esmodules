import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';
import errorResponseFactory from '../utils/errorResponseFactory.js';
import { responseStatus } from '../utils/responseFactory.js';

export default async (req, res, next) => {
  const token =
    req.token || // Check BearerTokenMiddleware what is this
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];

  if (!token) {
    return errorResponseFactory(
      res,
      responseStatus.FORBIDDEN,
      'A token is required for authentication'
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    if (decoded.sub !== undefined) {
      // Will check if the decoded sub or User Id exists
      // Else it will throw an error
      await User.findById(decoded.sub).exec();
    }

    req.user = decoded;
  } catch (err) {
    return errorResponseFactory(
      res,
      responseStatus.UNAUTHORIZED,
      'Invalid Token',
      {
        details: err?.message,
      }
    );
  }

  next();
};
