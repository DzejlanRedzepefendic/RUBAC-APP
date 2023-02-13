import { NextFunction, Request, Response } from 'express';
import { AppError } from './error.middleware';

export const notFound = (
  _request: Request,
  _response: Response,
  _next: NextFunction
) => {
  throw new AppError(404, 'Route does not exist');
};
