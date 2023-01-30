import prisma from '../utils/db'
import { Request, Response } from 'express';
import { comparePassword, createJWT, hashPassword } from '../utils/auth';
import { BadRequestError } from '../middleware/error';
import {AuthRequest} from '../utils/interface';


export default class AuthController{
    static signUp = async (req: Request, res: Response)=>{
        const {username, email} = req.body
        let user = await prisma.user.findUnique({
            where: { email: req.body.email }
        });
        if (user) { throw new BadRequestError('Email already exists!') }
        user = await prisma.user.create({
            data: {
                username, email, password: await hashPassword(req.body.password)
            }
        })
        const token = createJWT(user);
        res.json({token});
        };
    

    static signIn = async (req: Request, res: Response) =>{
        const user = await prisma.user.findUniqueOrThrow({
            where: {email: req.body.email}
        })

        const isValid = await comparePassword(req.body.password, user.password);

        if (!isValid) { throw new BadRequestError('Authentication Failed!') }
        const token = createJWT(user);
        res.json({token});
    };


    static addProfile = async (req: AuthRequest, res: Response)=>{
        let {firstname, lastname, address, phone} = req.body
        const id = req.user.id
        const profile = await prisma.profile.create({ 
            data:{
                firstname, lastname, address,phone,
                user: {
                    connect: { id },
                }}, 
                include:{
                    user: {
                        select: { id: true, username: true,  email: true }
                }} })
        res.json({data: profile, message: "Profile Added", success: true})
        }

    static getProfile = async(req: AuthRequest, res: Response)=>{
        const profile = await prisma.user.findUnique({
            where:{
                id: req.user.id
            }, select:{ id:true, username:true, email:true, profile: true},
            })
        res.json({data:profile, message:"Success", success: true})
    }

    static editProfile = async (req: AuthRequest, res: Response)=>{
        const userId = req.user.id
        let {firstname, lastname, address, phone} = req.body
        const profile = await prisma.profile.update({ 
            where:{ userId },
            data:{ 
                firstname, lastname, address, phone
            }, 
            include:{
                user: {
                    select: { id: true, username: true,  email: true }
            }} 
        })
        res.json({data: profile, message: "Profile Edited", success: true})
        }
}
