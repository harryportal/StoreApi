import { Request, Response } from "express";
import GoogleService from "../service/googleOauth";
import { createJWT } from "../utils/auth";
import {prisma } from "../utils/db";


const googleService = new GoogleService();

export default class GoogleOauthController {
    static getAuthorizationCode = async (req: Request, res: Response)=>{
      const authUrl = googleService.getAuthCode();

      res.status(200).json({
        redirect_link: authUrl, success: true
      })
    }

    static googleOauthHandler = async (req: Request, res: Response) => {
        const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;
      
        try {
          const code = req.query.code as string;
          const pathUrl = (req.query.state as string) || "/";
      
          if (!code) {
            return res.status(401).json({
              status: "fail",  
              message: "Authorization code not provided!",  
            });
          }
      
          const { id_token, access_token } = await googleService.getToken({code});
      
          const { name, verified_email, email}  = await googleService.getUser({
            id_token,
            access_token,
          });
        

          if (!verified_email) {
            return res.status(403).json({
              status: "fail",
              message: "Google account not verified",
            });
          }
      
          const user = await prisma.user.upsert({
            where: { email },
            create: {
              username:name,
              email,
              password: "",

            },
            update: {username:name, email},
          });
      
          if (!user) return res.redirect(`${FRONTEND_ORIGIN}/oauth/error`);
      
          const token = createJWT(user)
          res.redirect(`${FRONTEND_ORIGIN}/${token}`); // come back to this

        } catch (err: any) {
          console.log("Failed to authorize Google User", err);
          return res.redirect(`${FRONTEND_ORIGIN}/oauth/error`);
        }
      };









}
