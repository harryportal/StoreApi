import prisma from '../utils/db'
import { comparePassword, createJWT, hashPassword } from '../utils/auth';
import { asyncWrapper } from '../utils/asyncwrapper';

export default class AuthController{
    static signUp = asyncWrapper(async (req, res)=>{
            const user = await prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: await hashPassword(req.body.password)
                }
            })
        
            const token = createJWT(user);
            res.json({token});
        });
    

    static signIn = asyncWrapper(async (req, res) =>{
        const user = await prisma.user.findUniqueOrThrow({
            where: {email: req.body.email}
        })
        const isValid = await comparePassword(req.body.password, user?.password);
        if (!isValid){
            res.status(400).json({message: "Authentication Failed"});
        }
        const token = createJWT(user);
        res.json({token});
    });
}



