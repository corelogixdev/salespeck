const productController = require('./controllers/productController');

const req = {
  method: 'GET',
  query: { name: '1590' },
  session: { permissions: {} }
};

const res = {
  render: (view, data) => {
    console.log("Rendered View:", view);
    console.log("Data count:", data.data.length);
    console.log("Data rows names:", data.data.map(d => d.name));
  },
  status: (code) => {
    console.log("Status:", code);
    return {
      json: (data) => console.log("JSON:", data)
    };
  },
  redirect: (url) => console.log("Redirect:", url)
};

productController.index(req, res).then(() => console.log("Done.")).catch(console.error);
