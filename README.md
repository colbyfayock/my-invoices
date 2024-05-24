# Demo Invoice App Starter

- Next.js
- Clerk
- Neon Database

> Note: This is not a production ready application and is intended to be a
> demo in order to teach additional concepts within the context of a
> Next.js app with authentication.

## Getting Started

To get started, create a new local instance of the project:

```
npx create-next-app@latest -e https://github.com/colbyfayock/demo-invoicing-starter my-invoices
```

This will clone the project locally, install dependencies, and reset Git history.

### Setting Up Clerk

Clerk is used as the authentication layer of the application, which allows
you to easily add a secure way to manage users and login.

Create a new Clerk application within your organization. Once you land on the
creation UI:
- Enter a name for your application (ex: My Invoicing App)
- Select the authentication methods you'd like (ex: Google)
- Click Create application

The dependencies you need for Clerk should already be installed through this project,
so what's left is for you to configure your environment variables, including your
Publishable Key and Secret Key inside a `.env.local` file in the root of this
project.

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_abcd1234"
CLERK_SECRET_KEY="sk_abcd1234"
```

#### Webhooks

If you'd like to use Webhooks, you can also configure a Webhook secret by navigating
to the Webhooks section and creating a new Webhook with your API Endpoint. The API 
endpoing is available in this project at /api/webhooks/clerk.

Once set up in Clerk, you can then copy your Signing Secret, then add it as an
environment variable:

```
CLERK_WEBHOOK_SECRET="whsec_abcd1234"
```

This project is currently only set up for a single API route with a single Webhook
secret key. You can add more by simply creating additional environment variables
and API routes.

### Setting Up Neon Database

Neon Database is the database platform used to store invoicing details for
the application. The database is interfaced with using Drizzle.

Create a new Neon project in your organization. Once you land on the
creation UI:
- Enter a name for your project (ex: My Invoicing App)
- Use the default provided Postgres version
- Enter a database name (ex: invoices)
- Select a region or use the default
- Click Create Project

Once set up in Neon, you'll want to find your database URL, which can be
your dev branch or main branch depending on how you would like to set up
the project.

```
DATABASE_URL="postgresql://<Role>:<Password>@<Host>.<Region>.aws.neon.tech/<Database Name>?sslmode=require"
```

We also need to generate migrations to allow Drizzle to work appropriately.

In your terminal, navigated to this project directory, run:

```
npx drizzle-kit generate -- dotenv_config_path='.env.local'
```

Then apply the migrations with:

```
npx drizzle-kit push -- dotenv_config_path='.env.local'
```

### Starting Your Application

Once you've completed the above, you can now start your app by
running the following in your terminal in your project's root:

```
npm run dev
```

And your app will now be available at http://localhost:3000!
