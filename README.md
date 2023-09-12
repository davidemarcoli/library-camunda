This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, prepare the database:

```bash
npx prisma db push
# or
yarn prisma db push
# or
pnpx prisma db push
# or
bun x prisma db push
```

Then, generate the Prisma client:

```bash
npx prisma generate
# or
yarn prisma generate
# or
pnpx prisma generate
# or
bun x prisma generate
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

If you want to see the database, run:

```bash
npx prisma studio
# or
yarn prisma studio
# or
pnpx prisma studio
# or
bun x prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.