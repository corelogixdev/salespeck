require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const path = require('path');
const os = require('os');
const cors = require('cors');
const logi = require('../utils/logi');
const expressLayouts = require('express-ejs-layouts');
const config = require('../installEnv.js'); // Link to the Express app
const sessionDataMiddleware = require('../middleware/sessionData');
const routes = require('../routes');
const { formatNumber } = require('../utils/formatNumber');
const moment = require('moment');
const app = express();

function getUploadsBaseDir() {
  if (__dirname.includes('app.asar')) {
    const appDataPath = process.env.APPDATA
      || (process.platform === 'darwin'
        ? path.join(os.homedir(), 'Library', 'Application Support')
        : path.join(os.homedir(), '.config'));
    return path.join(appDataPath, 'salespeck', 'uploads');
  }

  return path.join(__dirname, '..', 'uploads');
}

// Make formatNumber and moment available to all views
app.locals.formatNumber = formatNumber;
app.locals.moment = moment;

// CORS Configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
// Serve uploaded files
app.use('/uploads', express.static(getUploadsBaseDir()));
// Serve static files from the "node_modules" directory
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

// Serve generated report PDFs from temp directory
const tempPdfDir = path.join(os.tmpdir(), 'salespeck-pdfs');
try { require('fs').mkdirSync(tempPdfDir, { recursive: true }); } catch (e) {}
app.use('/temp-pdfs', express.static(tempPdfDir));
// Set view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
if (!__dirname.includes('app.asar')) {
  app.set('view cache', false);
}
app.set('view cache', false);

// Session must run before layouts so res.locals.user is available to every view
app.use(
  session({
    name: 'session',
    secret: config.session_secret || require('crypto').randomBytes(48).toString('hex'),
    maxAge: 3600000 // 1 hour
  })
);
app.use(sessionDataMiddleware);

const licenseGate = require('../middleware/licenseGate');
app.use(licenseGate);

// Use express-ejs-layouts
app.use(expressLayouts);

// Add these route imports
const brandRoutes = require('../routes/brandRoutes');
const categoryRoutes = require('../routes/categoryRoutes');

// API Server verification endpoint
app.get('/api/verify-server', (req, res) => {
  res.status(200).json({ status: "success", message: 'Server is running' });
});

// Routes
app.use('/license', require('../routes/licenseRoutes'));
app.use('/', routes.mainRoutes);
app.use('/products', routes.productRoutes);
app.use('/users', routes.userRoutes);
app.use('/settings', routes.settingRoutes);
app.use('/sales', routes.saleRoutes);
app.use('/accounting', routes.accountingRoutes);
app.use('/reports', routes.reportRoutes);

// Add these routes
app.use('/brands', brandRoutes);
app.use('/categories', categoryRoutes);
app.use('/invoices', routes.invoiceRoutes);
const partyTypeRoutes = require('../routes/partyTypeRoutes');
app.use('/partytypes', partyTypeRoutes);
app.use('/', require('../routes/profile')); // Profile routes

// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

// Start HTTP server and export a ready promise so Electron can wait before loadURL.
function listenAsync() {
  return new Promise((resolve, reject) => {
    const port = Number(config.port) || 5783;
    const server = app.listen(port, '127.0.0.1', () => {
      logi('Express server listening on http://127.0.0.1:' + port);
      resolve(server);
    });
    server.on('error', (err) => {
      reject(err);
    });
  });
}

const serverReady = listenAsync();

module.exports = app;
module.exports.serverReady = serverReady;
