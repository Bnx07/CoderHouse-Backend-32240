# CoderHouse-Backend-32240

Repository of all the files and challenges made during my Backend's course from CoderHouse
## Author

- [@Bnx07](https://github.com/Bnx07)

## Repository's structure

```markdown
├───Clases
│   ├───Clase01
│   ├───Clase02
│   ├───Clase03
│   ├───Clase04
│   ├───Clase05
│   ├───ETC
├───Ejercitaciones
│   ├───Desafios
│   │   ├───Desafio-1
│   │   ├───Desafio-2
│   │   ├───Desafio-Clase-06
│   │   ├───Desafio-Clase-09
│   │   ├───Desafio-Clase-11
│   │   ├───Desafio-Clase-15
│   │   ├───Desafio-Clase-17
│   │   ├───Desafio-Clase-19
│   │   ├───Desafio-Clase-21
│   │   ├───Desafio-Clase-24
│   │   ├───Desafio-Clase-27
│   │   ├───Desafio-Clase-30
│   │   ├───Desafio-Clase-32
│   │   ├───Desafio-Clase-34
│   │   ├───Desafio-Clase-37
│   │   ├───Desafio-Clase-39
│   │   ├───Desafio-Clase-41
│   │   └───Desafio-Clase-44
│   ├───Hands On Lab
│   ├───ProyectoFinal
├───Extra
├───Proyectos
│   └───Clase05
```

## Ecommerce Web App

 - [Repository of app itself](https://github.com/Bnx07/ECommerce-32240)

 - [Code with examples](https://github.com/Bnx07/CoderHouse-Backend-32240/tree/main/Ejercitaciones/ProyectoFinal)

## Installation

Install ECommerce-32240 with git

```bash
  git clone https://github.com/Bnx07/ECommerce-32240.git
```

OR install everything with

```bash
  git clone https://github.com/Bnx07/CoderHouse-Backend-32240.git
```
## Env Settings

 - `PORT`
 - `CONNECTION` 
 - `BCRYPTGENSALT`
 - `JWTKEY`
 - `PERSISTENCE`
 - `MAILPASSWORD`
 - `LOGGER`
## Deployment

To run this project run

```bash
  npm install
  npm run dev
```

## API Reference

The App has a total of 5 APIs, these are

 - session
 - carts
 - products
 - tickets
 - messages

In order to see the documentation, excecute the app and go to the route in the browser. This will give you information about carts and products routes

```http
/apidocs
```
## Tests

To run the server tests that make up the main paths of the session, products and carts APIs, run 
```sh
npx mocha test/supertest.test.js
```
## Persistence

The project can work with both Mongo and file persistence, this is defined in the PERSISTENCE of the .env and uses the Factory pattern to toggle between them
## UX

The application has several sections, including a chat for users, a role system for creating and modifying files, users with auto-generated carts for each user, a shopping system with stock control and verification, and a template engine with handlebars. Products can be added by both administrators and premium users; the latter can modify and delete their products, but cannot add them to their carts.

## Admin User

The administrator user has coderUser@coderhouse.com as email and coderPassword as password.
## Utility and test routes

In order to get 100 products as if it was a MongoDB request, excecute

```http
GET /api/products/mockProducts
``` 

To get a log of every type, run

```http
GET /loggerTest
```

## Error and logs details

The program throws too many fatal errors due to favicon and reading of other files.

In order for users to become premium, they need to upload their documents.

For the server to be in production and not show the loggers, the LOGGER of the .env file must be "PRODUCTION".
## Related

To see the spanish documentation of the project itself, read

[Spanish README](https://github.com/Bnx07/ECommerce-32240)
