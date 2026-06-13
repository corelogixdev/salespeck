const queries = require('./prisma/queries');

async function test() {
  console.log("Testing products.list with name filter...");
  const result = await queries.products.list({
    page: 1,
    pageSize: 10,
    where: { name: { contains: "1590" } }
  });
  console.log("Count:", result.count);
  console.log("Rows:", result.rows.map(r => r.name));
  
  console.log("\nTesting products.list with price filter...");
  const result2 = await queries.products.list({
    page: 1,
    pageSize: 10,
    where: { saleprice: { gte: 850 } }
  });
  console.log("Count 2:", result2.count);
  console.log("Rows 2:", result2.rows.map(r => r.name));
  
  console.log("\nTesting products.list with category filter...");
  const cat = await queries.categories.list({page:1, pageSize: 1, search: ""});
  if (cat.rows.length > 0) {
    const catId = cat.rows[0].id;
    const result3 = await queries.products.list({
      page: 1,
      pageSize: 10,
      where: { category: catId }
    });
    console.log("Count 3 (Cat " + catId + "):", result3.count);
    console.log("Rows 3:", result3.rows.map(r => r.name));
  }
}

test().catch(console.error).finally(() => process.exit());
