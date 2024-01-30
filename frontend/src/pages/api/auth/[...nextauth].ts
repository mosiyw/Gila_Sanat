import { API_ENDPOINTS } from '@framework/api-endpoints';
import { LoginType, ProfileType } from '@framework/auth/types';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone_number: { label: 'شماره تلفن', type: 'text' },
        password: { label: 'رمز عبور', type: 'password' },
      },
      async authorize(credentials, req) {
        const login = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/${API_ENDPOINTS.LOGIN}`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const loginResult: LoginType['response'] = await login.json();

        const profile = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/${API_ENDPOINTS.PROFILE}`,
          {
            method: 'GET',
            headers: { authorization: `${loginResult.token}` },
          }
        );

        const profileResult: ProfileType = await profile.json();

        if (login.ok && profile.ok) {
          return {
            id: profileResult.user._id,
            username: profileResult.user.username,
            token: loginResult.token,
            phone_number: profileResult.user.phone_number,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...user,
          ...token,
        };
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 360000,
  },
};

export default NextAuth(authOptions);
