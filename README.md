# TRPC

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/getting-started/install)

### Project Setup

1. Clone repo

```shell
# With ssh
git clone git@github.com:joaoromeira/trpc.git
```

2. Install packages

```shell
yarn install
```

3. Create `.env`

```shell
cp .env.example .env
```

4. Start db container

```shell
docker-compose up -d
```

5. Generate Prisma Client and sync database

```shell
# Generate prisma client
yarn db:generate

# First sync db
yarn db:push

# Seed database
yarn db:seed
```

6. Start the application

```shell
yarn dev
```

### Commit allowed type values:

- feat (new feature)
- fix (bug fix)
- docs (changes to documentation)
- style (formatting, missing semi colons, etc; no code change)
- refactor (refactoring production code)
- test (adding missing tests, refactoring tests; no production code change)
- chore (updating webpack config etc; no production code change)

## Environments

- Development: [http://localhost:3000](http://localhost:3000)

## Technologies used

- Next.js
- NodeJS
- Typescript
- Next Auth
- Tailwind
- Shadcn
- TRPC
- Husky
- Docker
- Prisma
- PostgresSQL
