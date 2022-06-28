/**
 * Response
 */
export const responseStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 *
 * @param {string} statusCode Status reponse HTTP Status Code
 * @returns {string} Response Details
 */
const statusMessageResolver = (statusCode) => {
  switch (statusCode) {
    case responseStatus.OK:
      return 'Success';
    case responseStatus.CREATED:
      return 'New resource was created';
    case responseStatus.BAD_REQUEST:
      return 'Cannot process the request';
    case responseStatus.UNAUTHORIZED:
      return 'You must authenticate';
    case responseStatus.FORBIDDEN:
      return 'Does not have access rights';
    case responseStatus.NOT_FOUND:
      return 'Cannot find the requested resource';
    case responseStatus.INTERNAL_SERVER_ERROR:
      return 'Something went wrong, please try again';
    default:
      return statusCode;
  }
};

/**
 * Response factory for consistency of error format
 *
 * @param {Response} response Response Object
 * @param {string} statusCode HTTP Status Code
 * @param {object} details Details about the response
 * @returns
 */
const responseFactory = (response, statusCode, details) => {
  return response.status(statusCode).json({
    status: statusMessageResolver(statusCode),
    ...details,
  });
};

export default responseFactory;
