# EcommerceApi_Node    
This is an Ecommerce Api built with Node and TypeScript:rocket:
CLICK [HERE](https://documenter.getpostman.com/view/20276941/2s935hS7TG) TO VIEW THE API DOCUMENTATION

***
To run on a development server: 

```sh
> git clone https://github.com/harryportal/EcommerceApi_Node
> cd EcommerceApi_Node
> npm install
```

***
Create a .env.test and .env.development and populate using the .env.sample file.
***
If you have docker installed, you can start the postgres database with ```npm run start:db```

```sh
# run migrations on your database
> npm run db:migrate
# start server
> npm run dev
```

To run the Unit and Integration test:
- Create a test database or your use this command if you have docker installed to start the test db ```npm run test:db```
```sh
# run migration
> npm run migrate:test
# run test
> npm run test
```

ROADMAP:
- [x] Dockerize the Application
- [x] Set up model with Prisma
- [x] Implement Authentication Endpoints
- [x] Implement Product Review and Adding Endpoints
- [x] Add Documentation with Postman
- [x] Implement Payment Endpoints with Flutterwave Api
- [x] Add Logging with winston
- [x] Write Unit and Integration Test
- [x] Implement Sign in with Google
- [x] Seed the database with bdummy Data: 
- [x] Deploy to Heroku:rocket: 

