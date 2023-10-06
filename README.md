# Bank Servince Unit Testing
This project demonstrates unit testing for a customer's bank service (DEPOSIT, JOIN, TRANSFER MONEY, VIEW BALANCE) and more.

## Design Choices
- **BankArr Array:** I use a global array (`bankArr`) to represent the bank's customer data. Each customer is an object with properties such as `id`, `name`, `balance`, and `transaction_logs`. I use this data structure to simulate customer actions like joining the bank, depositing money, withdrawing money, checking balances, and transferring money.

- **Test Structure:** I use Mocha as the testing framework and Chai for assertions. The tests are organized into different describe blocks for customers and the bank manager, with individual it blocks for each specific test case.

# To run the tests, follow these steps:

1. Clone or download this repository to your local machine.

2. Open a terminal/command prompt and navigate to the project directory.

4. Install the project dependencies by running the following command:

   ```bash
   npm install or yarn install
5. To Run the testing,
   ```bash
   npm run test or yarn test

# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```
