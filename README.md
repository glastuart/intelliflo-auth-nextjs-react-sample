## Intelliflo Login Sample

This project is a sample OAuth2 process for authenticating with the Itelliflo API using NextJS and NextAuth (React).
I've also added some logic for fetching basic data from the Intelliflo API and how to append the API key in the serverside
proxy endpoint.

## Getting Started

First, create the `.env` file in the root of the project (this should not be shared or checked into this repo!). Then 
add the following variables (filling in the values that you obtain from your Intelliflo developer portal).

```
NEXT_BASE=http://localhost:3000
NEXTAUTH_SECRET= **same as the IFLO_CLIENT_SECRET
IFLO_AUTHORITY=https://identity.gb.intelliflo.net/core
IFLO_CLIENT_ID=
IFLO_CLIENT_SECRET=
IFLO_API_URL=https://api.gb.intelliflo.net/v2/
IFLO_API_KEY=
```

Then you can, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.