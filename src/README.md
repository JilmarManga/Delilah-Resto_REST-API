# Delilah Resto Backend Project

Project require to sprint 3 'Backcend' on Full Stack Web Developer Program from Acamica and Rosario University.

The project 

The project consists of creating an online ordering system for a restaurant, in this case called Delilah Restó. The necessary parts must be put into operation to set up a REST API that allows adding, deleting, modifying and obtaining information about a data structure that a client could consume.

## Resources and technologies used

- Node.js: Core server-side functionalities.
- Workbrench: MySQL server side functionality.
- MySQL: Relational database.
- JWT: Authentication via Token.
- Postman: Endpoint management and testing.
- Swagger: API documentation.
- Express
- Sequelize
- Nodemon

## Characteristics

- User login with JWT
- Role validation
- CRUD Users
- CRUD Products
- CRUD Orders

## API DOCUMENTATION

In the following swagger link, you can view all the endpoints and documentation necessary for delilah rest.

[SWAGGER DOCUMENTATION](https://app.swaggerhub.com/apis/jilmarcode/delilah_resto/1.0.0)

## Installation and initialization steps

### 1 - Install Node

Nodejs is going to be needed. You can check if you already have it installed on your system using the command

`node -v`

### 2 - Clone project and install dependencies

`git clone https://github.com/JilmarManga/Delilah-Resto_REST-API`

`cd project-delilah`

`npm install`

### 3 - Database creation and initialization

- Open the MySQL control panel or start MYSQL Wrokbench.
- Inside the control panel, import the file `/database/delilahResto.sql`

Note: 2 users, 10 products, 5 means of payment and 6 order status are pre-loaded in the database.

- admin user 
`User: admin, Password: admin`

- regular user  
`User: user, Password: user`

### 4 - Starting the server

From the terminal run the following commands:

- `npm install`

- `nodemon index`

If everything was done correctly, you should be able to see the following legend:

`delilah_restó app listening at http: // localhost: 3000`
`Executing (default): SELECT 1 + 1 AS result`
`Connected`

In this way we already have our server running and ready to use.

### 5 - Test API:

- Download and install the [Postman] application.

- In the path `/Documentation/DelilahResto.postman_collection.json` a functional collection of endpoints with examples is provided to be able to use the API, which should only be imported into Postman.
