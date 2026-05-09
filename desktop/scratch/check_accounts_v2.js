const { PrismaClient } = require('../generated/prisma-client');
const prisma = new PrismaClient();

async function checkAccounts() {
  try {
    const codes = ['5100', '1110', '4100'];
    for (const code of codes) {
      const account = await prisma.financeaccount.findFirst({ where: { code } });
      console.log(`Account ${code}:`, account ? `Found (${account.name})` : 'NOT FOUND');
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAccounts();
