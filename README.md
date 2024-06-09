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

After running the app, the API will be accessible from:

- `http://localhost:3000/doctor` for the Doctor API.
- `http://localhost:3000/patient` for the Patient API.

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Documentation

After running the app, the API documentation will be explored from:

- `http://localhost:3000/api/doctor` for the Doctor API.
- `http://localhost:3000/api/patient` for the Doctor API.

An OpenAPI specification can be imported to various tools including Postman using:

- `http://localhost:3000/api/doctor-json` for the Doctor API.
- `http://localhost:3000/api/patient-json` for the Patient API.

Also two Postman collections(converted from OpenAPI spec using [ openapi-to-postman
](https://github.com/postmanlabs/openapi-to-postman)) can be found from:

- `postman-collections/doctor.json` for the Doctor API.
- `postman-collections/patient.json` for the Patient API.
