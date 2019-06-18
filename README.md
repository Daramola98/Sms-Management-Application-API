# SMS-API

The API functionalities of SMS-API

## Technologies Used
- Node.js/ExpressJS (Server Side)
- PostgreSQL DB

## Prerequisites
The following should be installed in your machine
- Node v10.13.0
- PostgreSQL v9+

## How To Install And Run The Application
* Clone this Repo and `cd` into it
* Install all the dependancies by running the `yarn install`
* Ensure to setup  `MySQL on your local machine`
* Create a `.env` file and request for values from ADMIN
* Substitute all these values `DB_USERNAME_DEV`, `DB_PASSWORD_DEV`, `DB_NAME_DEV`, and `DB_HOST_DEV`, with the values used to setup MySQL on your local machine
* Run `yarn dev:migration` to setup the database tables.
* Start the application on development mode by running `yarn dev`

## To Run migration to database on development environments
* Run `yarn dev:migration` for development environment

## To undo migration to database on development environments
* Run `yarn dev:undoall:migration` for development environment

## To Seed necesary data to database
* Run `yarn dev:seed:all` for development environment


