import { SignInForm } from '@modules/auth/presentation/components/sign-in-form/sign-in-form';
import { HydrateClient } from '@root/trpc/server';

export default async function SignIn() {
  return (
    <HydrateClient>
      <div className="item-center flex h-screen flex-col justify-center">
        <SignInForm />
      </div>
    </HydrateClient>
  );
}
