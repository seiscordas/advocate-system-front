import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { jwtDecode } from 'jwt-decode';
import { AccessToken, UserCredentials, DecodedToken } from './resources';

const url = 'http://localhost:8082/v1/auth/login';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;

            const userCredentials: UserCredentials = { login: email, password: password };
            
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userCredentials)
            });
  
            if (!response.ok) {
              console.log("Error: ", response)
              return null;
            }
            
            const token: AccessToken = await response.json();
            
            const decodedToken: DecodedToken = jwtDecode(token.accessToken);
              
            const user: User = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                name: decodedToken.name,
                // role:  decodedToken.role,
            };
              
            return user;
        }

        console.log('auth: Invalid credentials');
        return null;
      },
    }),
  ],
});