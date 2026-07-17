const { PrismaClient } = require('./generated/prisma-client');
const prisma = new PrismaClient();
prisma.product.findMany({ where: { name: { contains: 'D-1488' } } })
  .then(console.log)
  .finally(() => prisma.$disconnect());
