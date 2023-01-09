import { Response, NextFunction } from 'express';
import AuthRequest from '../utils/userRequest';
import jwt from 'jsonwebtoken';
import { AuthError} from './error';
import { asyncWrapper } from '../utils/asyncwrapper';


export const protect = asyncWrapper((req: AuthRequest,res: Response,next: NextFunction)=>{
    const bearer = req.headers.authorization;
    if(!bearer){
        throw new AuthError('No Authentication Provided');
    }

    const [, token] = bearer.split(" ");  // destructuring
    if (!token){
      throw new AuthError('Bearer has no token');
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();

    }catch(e){
        throw new AuthError('Invalid Token Provided');
    }

});
 
