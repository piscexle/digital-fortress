// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string;
    user: {
      access_token: string;
      email: string;
      exp: number;
      iat: number;
      idUser: string;
      jti: string;
      name: string;
      picture: string;
      sub: string;
    };
    status: string;
  }
}
