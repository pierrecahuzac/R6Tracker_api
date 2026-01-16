/**
 * Standardized API Response Handler
 * Centralizes success and error response formatting
 */

const respondSuccess = (res, data, message = "", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const respondError = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export { respondSuccess, respondError };
