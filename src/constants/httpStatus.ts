/**
 * HTTP Status Codes Contants
 */

const HttpStatus = Object.freeze({
  // Success codes
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  CONFLICT: 409,

  // Client error codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUESTS: 429,

  // Server Error codes
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
});

export default HttpStatus;
