import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // pages: {
  //   signIn: 'login',
  // },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt: ({ token, account }) => ({
      ...token,
      ...account,
    }),
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session,
        ...token,
      },
    }),

    // async signIn(params: {
    //   user: User | AdapterUser;
    //   account: Account | null;
    //   profile?: Profile | undefined;
    //   email?: { verificationRequest?: boolean | undefined } | undefined;
    //   credentials?: Record<any, any> | undefined;
    // }) {
    //   console.log('account: ', params);
    //   if (params.account && params.account.provider === 'facebook') {
    //     // TODO: write the API call to store the user in DB
    //     await auth.loginWithFacebook({
    //       gender: 'MALE',
    //       socialToken: params.account?.access_token as string,
    //       fullName: params.profile?.name as string,
    //       email: params.profile?.email as string,
    //       avatar: params.user?.image as string,
    //     });
    //     return true;
    //   }
    //   return true;
    // },
  },
};

export default authOptions;
