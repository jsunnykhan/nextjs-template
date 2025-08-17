import NextAuth, { Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import apiService from './lib/apiService';
import { decodeJWT } from './utils/next-auth/jwt';
import { JWT } from 'next-auth/jwt';

const authOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'johndoe@example.com',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '*****',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await apiService.login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          const { access_token, token_type } = response;
          console.log(access_token, token_type);

          if (access_token) {
            const decodedToken = decodeJWT(access_token);
            return {
              id: decodedToken?.sub || credentials.email,
              email: credentials.email,
              name: decodedToken?.name || credentials.email,
              role: decodedToken?.role || 'user',
              accessToken: access_token,
              tokenType: token_type,
              permissions: [''],
            } as User;
          }

          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.tokenType = user.tokenType;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.tokenType = token.tokenType;
      session.user.role = token.role;
      session.user.permissions = token.permissions;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
