# Dev Mode Quickstart

## Start Development
Run inside `desktop`:

```bash
npm install
npm run prisma:generate
npm run dev
```

In development mode, startup bootstrap does **not** create database backups and does **not** run automatic `prisma migrate deploy`.
For dev schema work, run Prisma commands manually.

## Fresh Setup Note
On a fresh machine or fresh workspace, the generated `desktop/.settings` file may start with:

```ini
env=production
```

After the first `npm run dev`, open `desktop/.settings` and change it to:

```ini
env=development
```

This keeps `logi` output in the console and makes local development behavior match dev mode expectations.



## Apply Schema Changes (dev)
After editing `desktop/prisma/schema.prisma`:

```bash
npm run prisma:migrate
npm run prisma:generate
```

For quick local sync (not tracked like migrations):

```bash
npm run prisma:push
npm run prisma:generate
```

## Seed Data (Prisma scripts)
This app uses startup migrations + Prisma seed for must-data.

Must-data seed (company setting + chart of accounts):
```bash
npm run prisma:seed
```

Small test dataset (creates test user/vendor/customer + a few products):
```bash
npm run prisma:seed:test-small
```

Large performance dataset (customers + products + sales):
```bash
npm run prisma:seed:test-large
```

Note: must-data does *not* create a login admin user. Use the app registration flow for a fresh install, or run the test seeds.

