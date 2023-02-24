# EcommerceApi_Node    
This is an Ecommerce Api built with Node and TypeScript:rocket:[API DOCUMENTATION](https://documenter.getpostman.com/view/20276941/2s935hS7TG)

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
Start the application and run migration:
```sh
> npm run docker:up
> npm run migrate
```

Set up test DB and run tests:
```sh
> npm run migrate:test
> npm run test
```
***
Run `npm run logs` to view server logs
***
Run `npm run docker:down` to kill Server
***
ROADMAP:
- [x] Dockerize the Application
- [x] Set up model with Prisma
- [x] Implement Authentication Endpoints
- [x] Implement Product Review and Adding Endpoints
- [ ] Add Documentation with Postman
- [x] Implement Payment Endpoints with Flutterwave Api
- [x] Add Logging with winston
- [x] Write Unit and Integration Test
- [ ] Deploy to Heroku:rocket: 

