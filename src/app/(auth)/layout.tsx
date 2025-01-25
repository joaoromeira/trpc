import { HydrateClient } from '@root/trpc/server';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HydrateClient>{children}</HydrateClient>;
}
