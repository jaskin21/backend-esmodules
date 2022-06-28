import { response } from 'express';
import responseFactory from './ResponseFactory.js';

const errorResponseFactory = (
  response,
  statusCode,
  errorMessage,
  otherDetails = undefined
) => {
  return responseFactory(response, statusCode, {
    error: errorMessage,
    ...otherDetails,
  });
};

export default errorResponseFactory;
