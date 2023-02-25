import axios from "axios";
import qs from "qs";
import { GoogleUserResult, GoogleOauthToken } from "../utils/interface";
import logger from "../utils/winston";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


export default class GoogleService{
    public client_id: string
    public redirect_url: string
    public client_secret: string

    constructor(){
      this.client_id = process.env.GOOGLE_OAUTH_CLIENT_ID
      this.redirect_url = process.env.GOOGLE_OAUTH_REDIRECT
      this.client_secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
      if(!this.client_id || !this.client_secret || !this.redirect_url){
        logger.error("Google Oauth Credentials not Found or not Complete!")
      }
    }

    getAuthCode = ():string=>{
    const baseUrl = "https://accounts.google.com/o/oauth2/auth"
    const scopes = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
    const authUrl = `${baseUrl}?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_url}&scope=${scopes}`
    return authUrl
    }
    

    getToken = async ({  // get Authorization Token
        code,
      }: {
        code: string;
      }): Promise<GoogleOauthToken> => {
        const rootURl = "https://oauth2.googleapis.com/token";
      
        const options = {
          code,
          client_id: this.client_id,
          client_secret: this.client_secret,
          redirect_uri: this.redirect_url,
          grant_type: "authorization_code",
        };

        try {
          const { data } = await axios.post<GoogleOauthToken>(
            rootURl,
            qs.stringify(options),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
      
          return data;
        } catch (err: any) {
          console.log("Failed to fetch Google Oauth Tokens");
          throw new Error(err);
        }
      };
      
      getUser = async ({
        id_token,
        access_token,
      }: {
        id_token: string;
        access_token: string;
      }): Promise<GoogleUserResult> =>{
        try {
          const { data } = await axios.get<GoogleUserResult>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
              headers: {
                Authorization: `Bearer ${id_token}`,
              },
            }
          );
      
          return data;
        } catch (err: any) {
          console.log(err);
          throw Error(err);
        }
      }

}