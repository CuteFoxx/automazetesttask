import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: [
      { name: 'First todo', status: true, priority: 0 },
      { name: 'Second todo', status: false, priority: 1 },
      { name: 'Third todo', status: true, priority: 2 },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
