import { Request, Response, NextFunction } from "express";


// This eliminates the use of a try catch block in most handlers
export const asyncWrapper = (fn: any)=> (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err)=>next(err))
}
