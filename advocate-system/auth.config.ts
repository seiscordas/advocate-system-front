import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // console.log("auth:" + auth?.user.name);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {

      
      // const timestamp = Date.now() -1;
      
      // Converta o timestamp para segundos (divida por 1000)
      // const timestampInSeconds = Math.floor(timestamp / 1000);
      
      // console.log('timestamp em segundos:', timestampInSeconds);
      // token.exp = timestampInSeconds;
      
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;