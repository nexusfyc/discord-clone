This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, install dependency:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

It should be noted that some open source projects are used in the project: [Clerk](https://clerk.com/), [uploadthing](https://uploadthing.com/), [LiveKit](https://livekit.io/) and MySQL. You need to configure the environment variables used in the project in the .env file, including the following variables:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_CLERK_PUBLISHABLE_KEY>
- CLERK_SECRET_KEY=<your_CLERK_SECRET_KEY>

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

- DATABASE_URL="<database>://<username>:<password>@<database_ip>:<port>/<database_name>"

- UPLOADTHING_SECRET=<your_uploadthing_SECRET>
- UPLOADTHING_APP_ID=<your_uploadthing_ID>

- LIVEKIT_API_KEY=<your_LiveKit_KEY>
- LIVEKIT_API_SECRET=<your_LiveKit_SECRET>
- NEXT_PUBLIC_LIVEKIT_URL=<your_LiveKit_URL>

- NEXT_PUBLIC_SITE_URL=https://<your_domain>

These environment variables need to be registered before they can be used. After registration, fill in the KEY and SECRET information provided by these projects into the .env file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy
You can deploy this application on the [Railway platform](https://railway.app/). Note that since we use websockets in our project, we cannot use a serverless platform like Vercel to deploy it.

It should be noted here that the domain name provided by the platform needs to replace the NEXT_PUBLIC_SITE_URL variable in the .env file.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
