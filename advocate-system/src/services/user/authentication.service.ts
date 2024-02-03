import { AccessToken, Credentials, User, UserSessionToken } from '../../resources/user/user.resources';
import { jwtDecode } from 'jwt-decode';

class AuthService {
    baseURL: string = 'http://localhost:8082/v1/auth';
    static AUTH_PARAM: string = "_auth";

    async authenticate(credentials: Credentials): Promise<AccessToken> {

        const response = await fetch(this.baseURL + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            console.log("Error",response)
            console.log("Invalid User or Password",  await response.text());
        }

        return await response.json();
    }

    initSession(token: AccessToken) {
        if (token.accessToken) {
            const decodedToken: any = jwtDecode(token.accessToken);

            console.log("decoded token: ", decodedToken);

            const userSessionToken: UserSessionToken = {
                accessToken: decodedToken.accessToken,
                login: decodedToken.sub,
                name: decodedToken.name,
                duration: decodedToken.exp
            };

            this.setUserSession(userSessionToken);
        }
    }

    setUserSession(userSessionToken: UserSessionToken) {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));
            } else {
                console.error('Your browser do not support localStorage.');
            }
        } catch (error) {
            console.error('Error to define session:', error);
        }
    }

    getUserSession() : UserSessionToken | null {
        try{
            if (typeof localStorage !== 'undefined') {
                const authString = localStorage.getItem(AuthService.AUTH_PARAM);

                if(!authString){
                    return null;
                }
                const token: UserSessionToken = JSON.parse(authString);
                return token;
            }else{
                console.log("Error getting the local storage.");
                return null;
            }
        }catch(error){
            console.log("error:", error);
            return null;
        }
    }

    isSessionValid() : boolean {
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

export const userAuth = () => new AuthService();