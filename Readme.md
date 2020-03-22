# Simple user manager

Service which provides simple user API 

## Getting started

Installing instructions.

### Dependencies

Please, make sure you have next modules on you local machine:


* [yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable) - awesome Node.js package manager
* [docker](https://docs.docker.com/install/) - Enterprise container platform

### Prepare environment

Open terminal in the project root folder and run next commands. They make all necessary setup.

```
yarn install
docker-compose up -d
cp .env.example .env
```

Verify docker environment

```bash
docker-compose ps
       Name                     Command               State           Ports         
------------------------------------------------------------------------------------
security-plugin-db   docker-entrypoint.sh postg ...   Up      0.0.0.0:5432->5432/tcp
```

Migrations will create all necessary database structure:

```
yarn migrate
```

### Tests and start

For running all tests (acceptance, unit and integration), please, run:

```
yarn test
```

Start the app:

```
yarn start:dev
```
