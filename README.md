# OpenMenu

OpenMenu is a desktop-first POS, inventory, and invoicing system built with Electron, Express, EJS, Sequelize, and SQLite.

It is optimized for offline-friendly local operation, fast billing flows, and incremental feature expansion for restaurants and retail businesses.

## Product Overview

- Primary app: `desktop/` (Electron + Express + EJS MVC stack)
- Reporting/web extension target: `web/`
- Current focus: fast POS, inventory control, accounting visibility, and operational reliability
- Architecture direction: modular, feature-flag-ready, and prepared for phased Sequelize to Prisma migration

## How The Desktop App Works

Request/runtime flow:

1. Electron starts from `desktop/main.js`
2. `main.js` boots the Express app and opens the desktop window
3. Browser window loads local server UI (EJS views)
4. Routes map URLs to controllers
5. Controllers call Sequelize models and utilities
6. Views render paginated data and reusable components
7. IPC events handle desktop-specific actions (focus lock, close, maximize, switch server, updater events)

## Desktop Structure (Detailed)

The desktop application follows a layered MVC-style structure in `desktop/`:

- `main.js`: Electron lifecycle, updater behavior, IPC handlers, server switching.
- `preload.js`: Secure context bridge for renderer-safe desktop actions.
- `server/`: Express initialization, middlewares, app wiring.
- `routes/`: Route modules for each domain (sales, products, users, reports, settings, accounting, taxes, profile).
- `controllers/`: Business logic and request processing.
- `models/`: Sequelize models and associations.
- `migrations/`: Database schema changes and table definitions.
- `views/`: EJS pages and shared partials.
- `middleware/`: Authentication and request-level access checks.
- `utils/`: Shared services (`pagination`, permissions, formatting, search query helpers, cache, encryption, id generation).
- `assets/`: CSS/JS/images/fonts/vendors.
- `build/`: Build and package upload utilities.
- `z-docs/`: Local development and update testing notes.

## Existing Features (Current State)

### Authentication And User Access

- Login, logout, registration flow.
- Profile management APIs and profile image upload.
- Route-level authorization checks with permissions middleware.

### Sales And Billing

- Create and save sales with product selection.
- Customer search support in sales workflow.
- Sale detail and list views with table-driven UI.

### Purchases And Vendors

- Purchase create/save flow.
- Vendor search, purchase detail view, and purchase listing.

### Products, Categories, Brands

- Product list/search/create/view/update quantity.
- Category CRUD and search.
- Brand CRUD and search.

### Inventory And Accounting

- Inventory logs listing and searchable history.
- Tax management.
- Accounting-related routes and views for transaction visibility.

### Reporting

- Sales, purchases, inventory, and customer reports.
- Export templates for PDF-based reporting outputs.

### Desktop Runtime Features

- Server switch capability from desktop UI.
- Auto-updater integration and release checks.
- IPC-based window behaviors for scanner-focused operations.

## Data Domains (Core Models)

Major data entities include:

- `user`, `taxes`
- `brand`, `category`, `product`, `productsub`, `productbatches`
- `purchase`, `purchasedproducts`
- `sale`, `soldproducts`
- `inventorylogs`
- `financeaccount`, `financetransaction`, `productsalepurchase`, `cashclosing`
- `softwaresetting`

Schema bootstrap is currently centered in `desktop/migrations/20260131000000-init-all-tables.js`.

## Important Files

- `desktop/main.js`: Electron runtime entry point.
- `desktop/routes/index.js`: Auto-loads route modules.
- `desktop/prisma/queries.js`: Centralized Prisma query-layer for all controllers.
- `desktop/utils/prismaStartupBootstrap.js`: Prisma migrate+seed startup bootstrap for installed/packaged runs.
- `desktop/prisma/seed.js`: Default Prisma seeding (startup-safe).
- `desktop/migrations/20260131000000-init-all-tables.js`: Primary schema migration.
- `desktop/middleware/isAuthenticated.js`: Session authentication middleware.
- `desktop/utils/permissions.js`: Permission validation helpers.
- `desktop/utils/pagination.js` and `desktop/utils/paginationHelper.js`: Pagination utilities.
- `desktop/controllers/`: Domain logic for each module.
- `desktop/views/components/partials/`: Shared table/filter/pagination/modal components.
- `z-docs/dev-mode.md`: Development mode notes.
- `z-docs/update-release.md`: Update testing and release guide.
- `z-docs/local-update-test.md`: Local update testing guide.

## Local Testing And Publish

- Run in local development mode: `cd desktop && npm run dev`
- Run migration scripts: `cd desktop && npm run prisma:migrate`
- Seed default data (optional): `cd desktop && npm run prisma:seed`
- Seed test small dataset (optional): `cd desktop && npm run prisma:seed:test-small`
- Seed test large dataset (optional): `cd desktop && npm run prisma:seed:test-large`
- Build desktop app: `cd desktop && npm run build`
- Upload/publish package: `cd desktop && npm run upload`
- Release verification helper: `cd desktop && npm run test:update`
- Local update testing guide: `z-docs/local-update-test.md`
- Update testing workflow: `z-docs/update-release.md`

## Performance And Scalability Principles

- Keep design sleek and simple so operators can move fast.
- Optimize queries for high-volume datasets (millions of rows).
- Use pagination for all large-list pages.
- Keep list endpoints selective and index-friendly.
- Keep UI responsive during billing and scanning operations.
- Apply caching carefully for repeated read-heavy lookups.

## Change Management Rules

- Any schema change must propagate to:
  - migration files
  - models and associations
  - controllers and validations
  - routes and API contracts
  - views and table columns
  - reports and export templates
- Remove debug logs before release builds.
- Prefer reusable partials and utility methods over copy-paste implementations.



## Future Roadmap

- Kitchen & Operations:
  - Kitchen Display System (KDS) with live order state tracking.
  - Delivery options with queue management.
  - Table operations for dine-in workflows.
  - Shift and handover support for cashier/floor teams.
- Advanced Inventory:
  - Low-stock alerts and reorder suggestions.
  - Supplier performance and lead-time tracking.
  - Recipe/BOM based inventory deduction on every sale.
  - Inventory movement analytics for fast/slow moving items.
- Customer & Growth:
  - WhatsApp integration for customer communications and order updates.
  - Customer history and segmentation for better targeting.
  - Repeat customer and basket-size insight dashboards.
- Platform & Integrations:
  - Card machine payment integration (bank POS terminals).
  - Settlement and payment reconciliation screens.
  - Website/online reporting for OpenMenu Desktop in `web/`.
- AI-Focused Enhancements (minimal showcase):
  - Demand forecast preview for top products.
  - Basic anomaly alerts for unusual refunds/voids.
  - Natural-language report helper for quick management questions.
- Mobile & Omnichannel:
  - Local mobile app for menu display and QR/mobile scan selling.
  - Staff mobile app for table/order handling.
  - Owner mobile dashboard for daily KPIs and alerts.
- Data Layer Modernization:
  - Convert from Sequelize to Prisma in phased steps.
  - Migrate read-heavy modules first, then write-critical flows.
  - Maintain schema parity and regression checks throughout migration.
- Features Control:
  - Feature flags to enable/disable modules by business type.
  - Branch-wise feature controls.
  - Role-aware feature visibility for safe rollout.
  - Add FBR API integration for tax invoice/reporting compliance workflows.
