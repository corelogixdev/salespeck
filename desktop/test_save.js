const controller = require('./controllers/productController');

async function test() {
  const req = {
    body: {
      name: 'TEST-SERVICE',
      is_service: 'on',
      saleactive: 'on',
      purchaseactive: 'off'
    },
    session: { user: { id: 'mqi4ga8dPNWII7BLCrpnWeWIDSvuP6aM' } }
  };
  const res = {
    send: console.log,
    status: (c) => ({ json: console.log })
  };
  await controller.save(req, res);
}

test().catch(console.error).finally(() => process.exit(0));
