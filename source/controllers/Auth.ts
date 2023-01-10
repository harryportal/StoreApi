import prisma from '../utils/db'
import { Request, Response } from 'express';
import { comparePassword, createJWT, hashPassword } from '../utils/auth';
import { BadRequestError } from '../middleware/error';

export default class AuthController{
    static signUp = async (req: Request, res: Response)=>{
            let user = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            });
            if (user) { throw new BadRequestError('Email already exists!') }
            user = await prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: await hashPassword(req.body.password)
                }
            })
        const token = createJWT(user);
        res.json({token});
        };
    

    static signIn = async (req: Request, res: Response) =>{
        const user = await prisma.user.findUniqueOrThrow({
            where: {email: req.body.email}
        })

        const isValid = await comparePassword(req.body.password, user?.password);

        if (!isValid) { throw new BadRequestError('Authentication Failed!') }
        const token = createJWT(user);
        res.json({token});
    };

    static addProfile = async (req: Request, res: Response)=>{

    }
}



