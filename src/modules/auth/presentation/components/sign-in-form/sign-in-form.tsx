'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button, TextField } from '@components/index';
import {
  SignInInterface,
  SignInSchema,
} from '@modules/auth/application/schemas/sign-in-schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@root/components/ui/card';

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInterface>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (input: SignInInterface) => {
    try {
      setIsLoading(true);
      await signIn('credentials', { ...input, callbackUrl: '/admin' });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            label="Email"
            placeholder="joao@example.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="******"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button className="w-full" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
