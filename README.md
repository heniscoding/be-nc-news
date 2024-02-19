# NC Backend Project #

Welcome to the documentation for the Northcoders News API!

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

Below, you'll find instructions on setting up environment variables, creating databases, and familiarizing yourself with the project structure.


## Getting Started ##

### Prerequisites ###

Before getting started, make sure you have the following installed on your machine:

Node.js
npm (Node Package Manager)
PostgreSQL

### Cloning the Repository ###

`git clone https://github.com/heniscoding/be-nc-news`
`cd your-repo`

## Installing Dependaencies ##

Run the following command to install project dependencies:

`npm install`

## Setting Up Environment Variables ##

This project uses environment variables to configure database connections. Follow these steps to set up the necessary environment variable files:

### 1. Create a .env.development file in the project root for development: ###

Database Configuration for development. Copy the following into your .env file

`PGDATABASE=database_name`

### 2. Create a `` file in the project root for testing: ###

Database Configuration for test. Copy the following into your .env file

`PGDATABASE=database_name_test`

## Running Scripts ##

The project includes the following npm scripts:

To setup the databases run:

`npm run setup-dbs`

To seed the database run and test the development environment:

`npm run seed`

To test the app

`npm run test`