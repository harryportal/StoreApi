import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { BadRequestError } from '../middleware/error';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import logger from '../utils/winston';

// a middleware to validate the user input
export default class RequestValidator {
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const objectClass = plainToInstance(classInstance, req.body);
      await validate(objectClass).then((errors) => {
        if (errors.length > 0) {
          let rawErrors: string[] = [];
          for (const error of errors) {
            rawErrors = rawErrors.concat(...rawErrors, Object.values(error.constraints ?? []));
          }
          logger.error(rawErrors);
          next(new BadRequestError('Input validation failed!', rawErrors));
        }
      });
      next();
    };
  };
}
