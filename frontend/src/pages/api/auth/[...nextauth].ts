import { API_ENDPOINTS } from '@framework/api-endpoints';
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
        const loginResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/${API_ENDPOINTS.LOGIN}`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const token = await loginResponse.json();

        if (loginResponse.ok && token) {
          return token;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
