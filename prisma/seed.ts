import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function mail() {
  // const admin = await prisma.user.upsert({
  //   where: { email: 'admin@mail.com' },
  //   update: {},
  //   create: {
  //     email: 'admin@mail.com',
  //     passwordHash: 'password',
  //     role: 'ADMIN',
  //   },
  // })
}