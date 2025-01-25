import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

export default async function AdminPage() {
  return <div>Admin</div>;
}
