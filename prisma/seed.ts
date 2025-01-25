import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  const hashedPassword = await bcryptjs.hash('123456', 10);

  const userCount = await db.user.count();

  if (userCount === 0) {
    await db.user.createMany({
      data: [
        {
          email: 'user@trpc.com',
          password: hashedPassword,
          name: 'Admin',
        },
      ],
    });
  }
}
main()
  .catch(async () => {
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
