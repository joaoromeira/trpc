import { TRPCError } from '@trpc/server';

import { SignInSchema } from '@modules/auth/application/schemas/sign-in-schema';
import { comparePasswordUseCase } from '@modules/auth/use-cases/compare-password';
import { createTRPCRouter, publicProcedure } from '@root/server/api/trpc';

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not found',
        });
      }

      const isEqual = await comparePasswordUseCase({
        plainTextPassword: password,
        hashedPassword: user.password,
      });

      if (!isEqual) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      return {
        id: user.id,
        name: user.name ?? 'User',
        email: user.email,
      };
    }),
});
