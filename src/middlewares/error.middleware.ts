import { Response, Request, ErrorRequestHandler, NextFunction } from 'express';

export class AppError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
    this.stack = process.env.NODE_ENV === 'production' ? '' : this.stack;
  }
}

const errorHandler: ErrorRequestHandler = (
  error: any | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let code = error.code || 500;
  let message = error.message;

  if (!(error instanceof AppError)) {
    message = 'The problem is on our end.';
  }

  return res.status(code).send({
    message,
  });
};

export default errorHandler;
