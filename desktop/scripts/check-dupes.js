const { requirePrismaClient } = require('../utils/prismaClient');
const prisma = requirePrismaClient();
prisma.financeaccount.findMany({select: {id: true, name: true, code: true}}).then(r => console.log(r)).finally(() => prisma.$disconnect());
