## Description

Doctor Office REST API.

## Installation

```bash
$ npm install
```

## Configuration

- copy `.env.example` file to `.env` and edit the environment variables.
- generate a different and strong secret for `DOCTOR_SECRET` and `PATIENT_SECRET` and fill the values in the `.env` file.
- update the database environment variables(`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME` `DB_PASSWORD`) and create the postgres database if it doesn't exist yet.
- migrate the database using this command:
```
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```