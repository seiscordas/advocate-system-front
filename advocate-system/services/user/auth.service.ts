import { cookies } from 'next/headers'
import { AccessToken, DecodedToken, User, UserCredentials, userSession } from '@/resources';
import { jwtDecode } from 'jwt-decode';
import { z } from 'zod';
import { encrypt, decrypt } from '../security/crypto';

class AuthService {
    baseURL: string = `${process.env.API_URL}:${process.env.API_PORT}/${process.env.VERSION}/auth/login`;
    static AUTH_PARAM: string = "auth.session.token";

    async authenticate(formData: FormData) {

        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse({email: formData.get("email"), password: formData.get("password")});
        
        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;

            const userCredentials: UserCredentials = { login: email, password: password };
            
            const response = await fetch(this.baseURL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userCredentials)
            });
  
            if (!response.ok) {
              console.log("Error: ", response)
              return
            }
            
            const token: AccessToken = await response.json();
            console.log("token - API: ", token)

            this.initSession(token);
        }
    }

    initSession(token: AccessToken) {
        if (token.accessToken) {
            
            const decodedToken: DecodedToken = jwtDecode(token.accessToken);
            
            console.log("decodedToken: ", decodedToken);

            const userSession: userSession = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                name: decodedToken.name,
                rules: decodedToken.rules,
            };
            
            this.setUserSession(userSession);
        }
    }

    setUserSession(userSession: userSession) {
        try {
            
            console.log("userSession: ", userSession)
            
            const token = "";//this.jwt.generateToken(userSession);
            console.log("encrypt(JSON.stringify(userSession)): ", encrypt(JSON.stringify(userSession)))
            
            cookies().set(AuthService.AUTH_PARAM, encrypt(JSON.stringify(userSession)), { expires: 7 });
        } catch (error) {
            console.error('Error to define session:', error);
        }
    }

    getUserSession(): UserSessionToken | null {
        console.log("getUserSession()");
        try {
                const authString = cookies().get(AuthService.AUTH_PARAM);

                if (!authString) {
                    return null;
                }

                const token: UserSessionToken = JSON.parse(authString);
                return token;
            } catch (error) {
                console.error('Error getting the cookie:', error);
            return null;
        }
    }

    isSessionValid() : boolean {
        console.log("isSessionValid()");
        const userSession: UserSessionToken | null = this.getUserSession();
     
        if (!userSession) {
            return false;
        }

        const expiration: number | undefined = userSession?.duration;
        if (expiration) {
            const expirationDateInMilliseconds = expiration *  1000;
            return new Date() <  new Date(expirationDateInMilliseconds);
        }
        return false;
    }
}

export const authService = () => new AuthService();