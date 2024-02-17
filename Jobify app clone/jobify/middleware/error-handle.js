import { StatusCodes } from 'http-status-codes';

const errorhandleMiddleware = (error, req, res, next) => {
  console.log(error.message);

  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || 'Something went wrong, try again',
  };

  if (error.name == 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(error.errors)
      .map((err) => err.message)
      .join(', ');
  }

  if (error.code && error.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(error.keyValue)} fields has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
  //   res.status(defaultError.statusCode).json({ msg: error });
};

export default errorhandleMiddleware;
