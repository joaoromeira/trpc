import { AppSidebar } from '@components/index';
import { SidebarProvider, SidebarTrigger } from '@root/components/ui/sidebar';
import { HydrateClient } from '@root/trpc/server';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HydrateClient>
      <SidebarProvider>
        <AppSidebar />
        <div className="relative w-full">
          <SidebarTrigger />
          <div className="w-full px-8 pt-8">{children}</div>
        </div>
      </SidebarProvider>
    </HydrateClient>
  );
}
