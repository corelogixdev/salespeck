const { requirePrismaClient } = require('../utils/prismaClient');
const prisma = requirePrismaClient();

async function main() {
  const accounts = await prisma.financeaccount.findMany();
  console.log(JSON.stringify(accounts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
      // Don't disconnect global client
  });
