# bpp-sqe-assessment-2

Welcome to a really simple to-do list micro-app. We'd like you to review the project, add in some further tests, highlight any issues with the project, and provide some recommendations on how best to improve the quality of this micro-app.

We're looking for you to really dig in & improve this micro-app in the same way you would any other.

## Getting Started

**Pre-requisites:**

- Node 16/18/20
- NPM / Yarn

```sh
# Install dependencies
$ npm ci

# To run the dev server
$ npm run dev

# To build production assets
$ npm run build

# To run the prod server
$ npm start
```

## Running unit tests

To launch unit tests, run the following command:
```sh
npm run test
```
This will run the unit tests.

## Running E2E test

In two separate terminal windows, run the following commands:

```sh
npm run dev
```

This will start the application. Next, run:
```sh
npm run test:e2e
```

To run the tests with the UI, use the following:
```sh
npm run test:e2e:ui
```
