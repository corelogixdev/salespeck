const queries = require('./prisma/queries');

async function test() {
  const data = await queries.products.searchByName("D-1488");
  console.log("Search by name:", data);

  const filter = { name: { contains: "D-1488" } };
  const all = await queries.products.findForSale(filter);
  console.log("All matching:", all);

  const servicesOnly = await queries.products.findForSale({ ...filter, is_service: true });
  console.log("Services matching:", servicesOnly);
}

test().catch(console.error).finally(() => process.exit(0));
