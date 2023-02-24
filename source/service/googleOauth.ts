import axios from "axios";
import qs from "qs";
import { GoogleUserResult, GoogleOauthToken } from "../utils/interface";



class GoogleService{
    public GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID as unknown as string;
    public GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET as unknown as string;
    public GOOGLE_OAUTH_REDIRECT = process.env.GOOGLE_OAUTH_REDIRECT as unknown as string;

    getGoogleOauthToken = async ({
        code,
      }: {
        code: string;
      }): Promise<GoogleOauthToken> => {
        const rootURl = "https://oauth2.googleapis.com/token";
      
        const options = {
          code,
          client_id: this.GOOGLE_OAUTH_CLIENT_ID,
          client_secret: this.GOOGLE_OAUTH_CLIENT_SECRET,
          redirect_uri: this.GOOGLE_OAUTH_REDIRECT,
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

}