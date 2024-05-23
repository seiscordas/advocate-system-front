import NextAuth from "next-auth";
import { JWT } from "@auth/core/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      role?: string;
    };
  }
  interface User {
      accessToken?: string;
      role?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string;
    accessToken?: string;
  }
}

// import NextAuth, { type DefaultSession } from "next-auth"
// declare module "next-auth" {
//     /**
//      * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface Session {
//       user: {
//         /** The user's postal address. */
//         address: string
//         // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
//       } & DefaultSession["user"] // To keep the default types
//     }
//   }
  

// export const { auth } = NextAuth({
//     callbacks: {
//       session({ session, token, user }) {
//         // session.user.address is now a valid property, and will be type-checked
//         // in places like `useSession().data.user` or `auth().user`
//         return {
//           ...session,
//           user: {
//             ...session.user,
//             address: user.address,
//           },
//         }
//       },
//     },
// })