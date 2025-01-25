import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

import { SignInSchema } from '@modules/auth/application/schemas/sign-in-schema';
import { comparePasswordUseCase } from '@modules/auth/use-cases/compare-password';
import { db } from '@server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any): Promise<any> => {
        try {
          const { email, password } =
            await SignInSchema.parseAsync(credentials);

          const user = await db.user.findFirst({
            where: { email },
          });

          if (!user) return null;

          const isValidPassword = await comparePasswordUseCase({
            plainTextPassword: password,
            hashedPassword: user.password,
          });

          if (!isValidPassword) return null;

          return { id: user.id, email };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.user.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: '/',
  },
  secret: 'super-secret',
} satisfies NextAuthConfig;
