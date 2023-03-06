import { Request, Response } from "express";
import { AuthError } from "../middleware/error";
import GoogleService from "../service/googleOauth";
import { createJWT } from "../utils/auth";
import {prisma } from "../utils/db";
import logger from "../utils/winston";


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
            throw new AuthError("Authorization code not provided!") ;
          }
      
          const { id_token, access_token } = await googleService.getToken({code});
      
          const { name, verified_email, email}  = await googleService.getUser({
            id_token,
            access_token,
          });
        

          if (!verified_email) {
            throw new AuthError("Google Account not Verified!");
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
          logger.error(`Failed to authorize Google User, error: ${err}`);
          return res.redirect(`${FRONTEND_ORIGIN}/oauth/error`);
        }
      };









}
