import {Request, Response, NextFunction } from 'express';
import {validate} from 'class-validator';
import { BadRequestError } from '../middleware/error';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export default class RequestValidator{
    static validate = <T extends object>(classInstance: ClassConstructor<T>)=>{
        return async(req: Request, res: Response, next: NextFunction)=>{
            const objectClass = plainToInstance(classInstance, req.body);
            await validate(objectClass).then((errors)=>{
                if (errors.length > 0){
                    let rawErrors: string[] = []
                    for (const error of errors){
                        rawErrors = rawErrors.concat(...rawErrors, Object.values(error.constraints?? []))
                    }
                    console.log(rawErrors)
                    next(new BadRequestError('Request validation failed!', rawErrors))
                }
            })
            next()
        }
    }
}
